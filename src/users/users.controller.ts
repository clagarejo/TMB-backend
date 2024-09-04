import { Controller, Get, Post, Delete, Query, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('details')
    async getUserDetails(@Query('session_id') session_id: string): Promise<any> {
        console.log('Received session_id in controller:', session_id);
        return this.usersService.getUserDetails(session_id);
    }

    @Post('favorite')
    async addMovieToFavorites(
        @Body('sessionId') sessionId: string,
        @Body('movieId') movieId: number,
        @Body('favorite') favorite: boolean,
    ): Promise<any> {
        return this.usersService.addMovieToFavorites(sessionId, movieId, favorite);
    }

    @Delete('session')
    async deleteSession(@Query('sessionId') sessionId: string): Promise<any> {
        return this.usersService.deleteSession(sessionId);
    }
}
