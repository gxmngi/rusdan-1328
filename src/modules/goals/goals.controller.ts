import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Goal } from 'src/entities';
import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dto/goals.dto';

@Controller('goals')
export class GoalsController {
    constructor(private readonly service: GoalsService) { }

    @Post()
    create(@Body() body: CreateGoalDto) {
        return this.service.create(body);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get('user/:userId')
    findByUser(@Param('userId') userId: string) {
        return this.service.findByUser(+userId);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: Partial<CreateGoalDto>) {
        return this.service.update(+id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(+id);
    }
}
