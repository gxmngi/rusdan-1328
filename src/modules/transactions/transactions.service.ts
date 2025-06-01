import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from 'src/entities';
import { Repository } from 'typeorm';
import { TransactionDto } from './dto/transaction.dto';
import { GoalsService } from '../goals/goals.service';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction) private repo: Repository<Transaction>,
        private readonly goalsService: GoalsService // <-- inject here
    ) { }

    async create(data: Partial<TransactionDto>) {
        const { userId, categoryId, ...transaction } = data;
        const entity = this.repo.create({
            ...transaction,
            user: { id: userId },
            category: { id: categoryId },
        });
        const res = await this.repo.save(entity);

        //ใน transactions.service.ts หลังจาก create รายรับ
        if (data.type === 'income' && data.amount !== undefined) {
            await this.goalsService.applyIncomeToGoal(userId ?? 0, +data.amount);
        }
        return {
            status: 'success',
            message: 'Transaction created successfully',
            data: res,
        };
    }

    findAll() {
        return this.repo.find({ relations: ['user', 'category'] });
    }

    findByUser(userId: number) {
        return this.repo.find({ where: { user: { id: userId } }, relations: ['category'] });
    }

    async update(id: number, data: Partial<TransactionDto>) {
        const old = await this.repo.findOne({ where: { id }, relations: ['user'] });
        const { userId, categoryId, ...rest } = data;
        const updateData = {
            ...rest,
            user: { id: userId },
            category: { id: categoryId },
        };
        const updated = await this.repo.update(id, updateData).then(() => this.repo.findOneBy({ id }));

        if (old && old.type === 'income') {
            // คืนเงินจากยอดเดิม
            await this.goalsService.applyIncomeToGoal(old.user.id, -old.amount);
        }
        if (updated && updated.type === 'income') {
            // เติมเงินด้วยยอดใหม่
            await this.goalsService.applyIncomeToGoal(updated.user.id, +updated.amount);
        }
    }

    remove(id: number) {
        return this.repo.delete(id);
    }
}
