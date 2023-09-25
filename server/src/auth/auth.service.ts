import * as bcrypt from 'bcryptjs';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LogInDto } from './dto/login.dto';
import { sign, verify } from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import { ResetPasswordDto } from './dto/resetpassword.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { firstname, lastname, email, password } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    // check if user with this email already exists
    const isEmailExists = await this.userModel.findOne({ email });

    if (isEmailExists) {
      throw new UnauthorizedException('Email already exists');
    }

    const user = await this.userModel.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    return user;
  }

  async login(loginDto: LogInDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.jwtService.sign({
      id: user._id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    });
    return { token };
  }

  async forgetPassword(email: string) {
    const resetToken = sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    const user = await this.userModel.findOneAndUpdate(
      { email },
      { resetToken },
      { new: true },
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.sendResetPasswordEmail(email, resetToken);
  }

  private async sendResetPasswordEmail(email: string, resetToken: string) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      auth: {
        user: 'kareemheidar@outlook.com',
        pass: 'KimoKono@123',
      },
    });

    const mailOptions = {
      from: 'kareemheidar@outlook.com',
      to: email,
      subject: 'Reset Password',
      text: `Click the following link to reset your password: http://localhost:3001/ResetPassword/${resetToken}`,
    };

    await transporter.sendMail(mailOptions);
  }

  async resetPassword(token: string, resetPasswordDto: ResetPasswordDto) {
    const { password } = resetPasswordDto;

    // check if token is expired 
    let decodedToken = null;
    try {
      decodedToken = verify(token, process.env.JWT_SECRET) as { email: string };
    } catch (error) {
      throw new UnauthorizedException('Expired token');
    }
    if(!decodedToken) {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.userModel.findOne({ email: decodedToken.email });
    if(!user) {
      throw new NotFoundException('User not found');
    }

    if(user.resetToken !== token) {
      throw new UnauthorizedException('Invalid token');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = null;

    await user.save();

  }

}
