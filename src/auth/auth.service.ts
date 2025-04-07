import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from  'bcrypt'
import { LoginUserDto } from './dto/login-user.dto';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({...userData, password: bcrypt.hashSync(password, 10) });
      await this.userRepository.save(user);
      delete user.password; // Remove password from the response
      return user;

    } catch (error) {
      this.handleDBErrors(error);

    }
  }


  async login (loginUserDto: LoginUserDto) {

    try {
      const { email, password } = loginUserDto;
      const user = await this.userRepository.findOne({ where: { email }, select: { email: true, password: true } });

      if (!user) throw new UnauthorizedException('Credentials are not valid (email)');

      if (!bcrypt.compareSync(password, user.password)) throw new UnauthorizedException('Credentials are not valid (password)');

      return user;
      //RETORNAR JWT

    } catch (error) {
      this.handleDBErrors(error);
    }

  }


  private handleDBErrors(error: any): never {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);
    console.log(error);

    throw new Error('Internal server error');
  }
}
