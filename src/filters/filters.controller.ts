import { Controller, Get, Param } from '@nestjs/common';
import { FiltersService } from './filters.service';

@Controller('filters')
export class FiltersController {
    constructor(private readonly filtersService: FiltersService) { }

    @Get('genres')
    async getGenres() {
        return this.filtersService.getGenres();
    }

    @Get('movies/:genreId')
    async getMoviesByGenre(@Param('genreId') genreId: string) {
        return this.filtersService.getMoviesByGenre(parseInt(genreId));
    }
}
