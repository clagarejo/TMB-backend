import { BadRequestException, Controller, Get, Param, Query } from '@nestjs/common';
import { FiltersService } from './filters.service';

@Controller('filters')
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) {}

  @Get('genres')
  async getGenres() {
    return this.filtersService.getGenres();
  }

  @Get('movies/:genreId')
  async getMoviesByGenre(@Param('genreId') genreId: string) {
    return this.filtersService.getMoviesByGenre(parseInt(genreId));
  }

  @Get('search')
  async searchMovies(@Query('query') query: string) {
    if (!query) {
      throw new BadRequestException('Query parameter is required');
    }
    
    return this.filtersService.getMoviesBySearch(query);
  }
}
