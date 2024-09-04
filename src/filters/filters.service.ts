import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FiltersService {
    private readonly apiKey: string;
    private readonly baseUrl: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {
        this.apiKey = this.configService.get<string>('API_KEY');
        this.baseUrl = this.configService.get<string>('BASE_URL');
    }

    async getGenres(): Promise<any> {
        try {
            const response = await firstValueFrom(
                this.httpService.get(
                    `${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}&language=en-US`
                )
            );
            return response.data.genres; // Devuelve solo la lista de géneros
        } catch (error) {
            console.error('There was a problem with fetching genres:', error.response?.data || error.message);
            throw new HttpException(
                {
                    ok: false,
                    msg: 'There was a problem with fetching genres. Please try again.',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getMoviesByGenre(genreId: number): Promise<any> {
        try {
            const response = await firstValueFrom(
                this.httpService.get(
                    `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=${genreId}&language=en-US`
                )
            );
            return response.data.results; // Devuelve solo la lista de películas
        } catch (error) {
            console.error('There was a problem with fetching movies by genre:', error.response?.data || error.message);
            throw new HttpException(
                {
                    ok: false,
                    msg: 'There was a problem with fetching movies by genre. Please try again.',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
