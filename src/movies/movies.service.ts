import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MoviesService {
    private readonly apiKey: string;
    private readonly baseUrl: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {
        this.apiKey = this.configService.get<string>('API_KEY');
        this.baseUrl = this.configService.get<string>('BASE_URL');
    }

    async getMovies(): Promise<any> {
        try {
            const response = await firstValueFrom(
                this.httpService.get(
                    `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&language=en-US`
                )
            );
            return response.data;
        } catch (error) {
            console.error('There was a problem with fetching movies:', error.response?.data || error.message);
            throw new HttpException(
                {
                    ok: false,
                    msg: 'There was a problem with fetching movies. Please try again.',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getPopularMovies(): Promise<any> {
        try {
            const response = await firstValueFrom(
                this.httpService.get(
                    `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=en-US`
                )
            );
            return response.data;
        } catch (error) {
            console.error('There was a problem with fetching movies:', error.response?.data || error.message);
            throw new HttpException(
                {
                    ok: false,
                    msg: 'There was a problem with fetching movies. Please try again.',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
