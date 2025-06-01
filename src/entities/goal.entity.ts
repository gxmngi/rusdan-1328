import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Goal {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @Column()
    goalName: string;

    @Column('decimal')
    amountTarget: number;

    @Column('decimal', { default: 0 })
    currentAmount: number;

    @Column({ type: 'date' })
    dueDate: Date;
}