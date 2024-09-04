import { Controller, Get } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getMovies(): Promise<any> {
    return this.moviesService.getMovies();
  }

  @Get('popular')
  getPopularMovies(): Promise<any> {
    return this.moviesService.getPopularMovies();
  }
}
