import { ApiProperty } from "@nestjs/swagger";

export class CreateGoalDto {
    @ApiProperty({ description: 'Goal description', example: 'Save money for a trip to Hawaii' })
    goalName: string;
    @ApiProperty({ description: 'Current amount saved towards the goal', example: 1500 })
    currentAmount: number;
    @ApiProperty({ description: 'Target amount for the goal', example: 5000 })
    amountTarget?: number;
    @ApiProperty({ description: 'Due date for the goal', example: '2024-12-31' })
    dueDate: Date;
    @ApiProperty({ description: 'User ID', example: 1, required: true })
    userId: number; // Assuming the user ID is required to associate the goal with a user
}