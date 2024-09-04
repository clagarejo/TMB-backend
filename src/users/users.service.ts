import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) { }

  async getUserDetails(sessionId: string): Promise<any> {
    console.log(sessionId, 'sessionID')
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `/account?api_key=${this.configService.get<string>('API_KEY')}&session_id=${sessionId}`
        )
      );
      return response.data;
    } catch (error) {
      console.error('There was a problem with getting user details:', error.response?.data || error.message);
      throw new HttpException(
        {
          ok: false,
          msg: 'There was a problem with getting user details. Please try again.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addMovieToFavorites(sessionId: string, movieId: number, favorite: boolean): Promise<any> {
    try {
      const accountId = '';
      const response = await firstValueFrom(
        this.httpService.post(
          `/account/${accountId}/favorite?api_key=${this.configService.get<string>('API_KEY')}&session_id=${sessionId}`,
          {
            media_type: 'movie',
            media_id: movieId,
            favorite: favorite
          }
        )
      );
      return response.data;
    } catch (error) {
      console.error('There was a problem with adding movie to favorites:', error.response?.data || error.message);
      throw new HttpException(
        {
          ok: false,
          msg: 'There was a problem with adding movie to favorites. Please try again.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteSession(sessionId: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.delete(
          `/authentication/session?api_key=${this.configService.get<string>('API_KEY')}&session_id=${sessionId}`
        )
      );
      return response.data;
    } catch (error) {
      console.error('There was a problem with deleting the session:', error.response?.data || error.message);
      throw new HttpException(
        {
          ok: false,
          msg: 'There was a problem with deleting the session. Please try again.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
