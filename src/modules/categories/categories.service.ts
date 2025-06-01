import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities';
import { Repository } from 'typeorm';
import { CategoryDto } from './dto/categories.dto';

@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(Category) private repo: Repository<Category>) { }

    create(data: Partial<CategoryDto>) {
        const { userId, ...rest } = data;
        const entity = this.repo.create({
            ...rest,
            user: { id: userId },
        });
        return this.repo.save(entity);
    }

    findAll() {
        return this.repo.find({ relations: ['user'] });
    }

    findByUser(userId: number) {
        return this.repo.find({ where: { user: { id: userId } } });
    }

    update(id: number, data: Partial<CategoryDto>) {
        const { userId, ...rest } = data;
        const updateData = {
            ...rest,
            user: { id: userId } ,
        };
        return this.repo.update(id, updateData);
    }

    remove(id: number) {
        return this.repo.delete(id);
    }
}
