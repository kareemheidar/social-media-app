import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LogInDto } from './dto/login.dto';
import { User } from './schemas/user.schema';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { ResetPasswordDto } from './dto/resetpassword.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() signUpDto: SignUpDto): Promise<User> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  login(@Body() loginDto: LogInDto): Promise<{ token: string; email: string; firstname: string; lastname: string; id: string }> {
    return this.authService.login(loginDto);
  }

  @Post('/forgetpassword')
  async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    await this.authService.forgetPassword(forgetPasswordDto.email);
  }

  @Post('/resetpassword/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto) {
    await this.authService.resetPassword(token, resetPasswordDto);
  }

  // get user by id
  @Get('/:id')
  async getUser(@Param('id') id: string): Promise<{id: string, firstname: string, lastname: string, email: string}> {
    return await this.authService.getUser(id);
  }
}
