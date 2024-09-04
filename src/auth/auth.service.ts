import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) { }

    async getRequestToken(): Promise<any> {
        try {
            const response = await firstValueFrom(
                this.httpService.get(
                    `/authentication/token/new?api_key=${this.configService.get<string>('API_KEY')}` // Usa ConfigService para obtener la API_KEY
                )
            );

            return response.data;
        } catch (error) {
            console.error('There was a problem with the token request:', error);
            throw new HttpException(
                {
                    ok: false,
                    msg: 'There was a problem with the token request. Please try again.',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async validateToken(requestToken: string, username: string, password: string): Promise<any> {
        try {
            const response = await firstValueFrom(
                this.httpService.post(
                    `/authentication/token/validate_with_login?api_key=${this.configService.get<string>('API_KEY')}`, // Usa ConfigService
                    {
                        request_token: requestToken,
                        username: username,
                        password: password,
                    }
                )
            );

            if (!response.data || response.data.success === false) {
                throw new HttpException(
                    {
                        ok: false,
                        msg: 'Invalid token or credentials. Please try again.',
                    },
                    HttpStatus.BAD_REQUEST,
                );
            }

            return response.data;
        } catch (error) {
            console.error('There was a problem with the token validation:', error);
            throw new HttpException(
                {
                    ok: false,
                    msg: 'There was a problem with the token validation. Please try again.',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async createSession(request_token: string): Promise<any> {
        try {
            const response = await firstValueFrom(
                this.httpService.post(
                    `/authentication/session/new?api_key=${this.configService.get<string>('API_KEY')}`, // Usa ConfigService
                    { request_token }
                )
            );

            console.log({ response });

            if (!response.data || !response.data.success) {
                throw new HttpException(
                    {
                        ok: false,
                        msg: 'Failed to create session. Please try again.',
                    },
                    HttpStatus.BAD_REQUEST,
                );
            }

            return response.data;
        } catch (error) {
            console.error('There was a problem with creating the session:', error.response?.data || error.message);
            throw new HttpException(
                {
                    ok: false,
                    msg: 'There was a problem with creating the session. Please try again.',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
