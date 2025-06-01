import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User } from "./user.entity";
import { Category } from "./category.entity";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @Column({ type: 'enum', enum: ['income', 'expense'] })
    type: 'income' | 'expense';

    @ManyToOne(() => Category, (category) => category.id)
    category: Category;

    @Column('decimal')
    amount: number;

    @Column()
    note: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    date: Date;
}