import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/authCredentials.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @Post('/signin')
  signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialsDto): Promise<{ accesToken: string }> {
    return this.authService.signIn(authCredentialDto);
  }

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialDto);
  }
}
