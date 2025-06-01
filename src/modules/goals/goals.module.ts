import { Module } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { GoalsController } from './goals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Goal } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Goal])], // Assuming UserGoal is the entity for goals
  providers: [GoalsService],
  controllers: [GoalsController],
  exports: [GoalsService], // Exporting the service if needed in other modules
})
export class GoalsModule {}
