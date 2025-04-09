import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  async register(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      

      const user = this.userRepository.create({ ...userData, password: bcrypt.hashSync(password, 10) });
      await this.userRepository.save(user);
      delete user.password; 
      return {
        ...user,
        token: this.getJwtToken({ id: user.id }),
      };

    } catch (error) {
      this.handleDBErrors(error);

    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
  
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true, username: true },
    });
  
    if (!user) throw new UnauthorizedException('Correo no registrado');
  
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }
  
    delete user.password;
  
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }
  

  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      if (error.detail.includes('email')) {
        throw new BadRequestException('El correo ya está registrado');
      }
      throw new BadRequestException('Ya existe un registro con ese valor único');
    }
  
    console.error(error);
    throw new InternalServerErrorException('Error inesperado, revisa los logs del servidor');
  }
}
