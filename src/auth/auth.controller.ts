import { Controller, Get, Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(
    @GetUser() user: User
  ){

    return this.authService.checkAuthStatus(user);
  }

  // este es un ejemplo para validar el rol de la ruta
  // @Auth(ValidRoles.admin) 
  
  // @Get('private3')
  // @Auth()

  // privateRoute3(
  //   @GetUser() user: User
  // ){
  //   return{
  //     ok: true,
  //     user
  //   }
  // }

}
