// @ManyToOne(() => User, (user) => user.id)
//     user: User;

import { ApiProperty } from "@nestjs/swagger";

//     @Column({ type: 'enum', enum: ['income', 'expense'] })
//     type: 'income' | 'expense';

//     @ManyToOne(() => Category, (category) => category.id)
//     category: Category;

//     @Column('decimal')
//     amount: number;

//     @Column()
//     note: string;

export class TransactionDto {
    @ApiProperty({ description: 'User ID', example: 1, required: true })
    userId: number;
    @ApiProperty({ description: 'Transaction type', example: 'income', enum: ['income', 'expense'] })
    type: 'income' | 'expense';
    @ApiProperty({ description: 'Category ID', example: 1, required: true })
    categoryId: number;
    @ApiProperty({ description: 'Transaction amount', example: 100.50 })
    amount: number;
    @ApiProperty({ description: 'Transaction date', example: '2024-01-01T12:00:00Z' })
    note: string;
}