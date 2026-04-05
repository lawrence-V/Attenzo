import { Controller, Post, Body, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // POST /auth/register
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  // POST /auth/login
  @Post('login')
  async login(@Body() dto, @Res({ passthrough: true }) res) {
    const tokens = await this.authService.login(dto);

    res.cookie('access_token', tokens.access_token, {
      httpOnly: true,
      secure: false, // true in production HTTPS
      sameSite: 'lax',
    });

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

    return { message: 'Logged in' };
  }
  // @Post('login')
  // login(@Body() dto: LoginDto) {
  //   return this.authService.login(dto);
  // }

  @Post('refresh')
  refresh(@Req() req) {
    return this.authService.refreshToken(req.cookies.refresh_token);
  }

  @Post('logout')
  logout(@Req() req, @Res({ passthrough: true }) res) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    return this.authService.logout(req.user?.id);
  }
}
