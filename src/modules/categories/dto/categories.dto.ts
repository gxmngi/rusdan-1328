import { ApiProperty } from "@nestjs/swagger";

export class CategoryDto {
    @ApiProperty({description: 'Category name', example: 'Groceries'})
    name: string;
    @ApiProperty({description: 'Category type', example: 'expense', enum: ['income', 'expense']})
    type: 'income' | 'expense';
    @ApiProperty({description: 'User ID', example: 1, required: true})
    userId: number; // Optional, as it may not be set during creation
}