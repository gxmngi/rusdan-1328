import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//import { User } from 'src/entities';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) { }

    async create(data: Partial<User>) {
        // check if email already exists
        if (data.email) {
            const existingUser = this.repo.findOneBy({ email: data.email });
            if (await existingUser) {
                return {
                    status: 'error',
                    message: 'Email already exists',
                }
            }
        }
        const hashedPassword = await bcrypt.hash(data.password ?? '', 10);
        data.password = hashedPassword;
        const user = await this.repo.save(this.repo.create(data));
        return {
            status: 'success',
            message: 'User created successfully',
            data: { ...user, password: undefined },
        };
    }

    findAll() {
        return this.repo.find();
    }

    async findOne(id: number) {
        const user = await this.repo.findOneBy({ id });
        if (!user) {
            return {
                status: 'error',
                message: 'User not found',
            };
        }
        return {
            status: 'success',
            data: { ...user, password: undefined },
        };
    }

    findByEmail(email: string) {
        return this.repo.findOneBy({ email });
    }

    async update(id: number, data: Partial<User>) {
        const res = await this.repo.update(id, data);
        if (res.affected === 0) {
            return {
                status: 'error',
                message: 'User not found',
            };
        }
        const updatedUser = await this.repo.findOneBy({
            id
        });
        return {
            status: 'success',
            message: 'User updated successfully',
            data: { ...updatedUser, password: undefined },
        };
    }

    remove(id: number) {
        return this.repo.delete(id);
    }
}
