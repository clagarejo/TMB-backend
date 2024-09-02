import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('token')
    getToken(): Promise<any> {
        return this.authService.getRequestToken();
    }

    @Post('validate-token')
    async validateToken(@Body() body: { requestToken: string; username: string; password: string }): Promise<any> {
        const { requestToken, username, password } = body;
        return this.authService.validateToken(requestToken, username, password);
    }

    @Post('create-session')
    async createSession(@Body() body: { request_token: string }): Promise<any> {
        const { request_token } = body;
        return this.authService.createSession(request_token);
    }
}
