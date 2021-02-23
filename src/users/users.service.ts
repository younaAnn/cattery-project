import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { User } from './entities/user.entity';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateUserDto, UpdateUserDto} from "./dto/user-dto";

const mediaFolder = '../media/';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    async getAllUsers() {
        const users = await this.usersRepository.find()
        return users.map((user) => {
            user.password = undefined;
            return user
        });
    }

    async getUserById(id: string) {
        const user = await this.usersRepository.findOne(id);
        if (user) {
            user.password = undefined;
            return user;
        }
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    async getUserByEmail(email: string) {
        const user = await this.usersRepository.findOne({email});
        if (user) {
            return user;
        }
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    async getCatsByUserId(id: string) {
        const user = await this.usersRepository.findOne(id, {relations:['bredCats', 'ownedCats']});
        if (user) {
            return user;
        }
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    async getFullUserInfo(id: string) {
        const user = await this.usersRepository.findOne(id, {relations:['bredCats', 'ownedCats', 'createdAdvertisements']});
        if (user) {
            return user;
        }
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    async createUser(createUserDto: CreateUserDto) {
        await this.checkUniqueFieldsForCreate(createUserDto);
        if (createUserDto.image) createUserDto.image = `${mediaFolder}${createUserDto.image}`
        const newUser = await this.usersRepository.create(createUserDto);
        await this.usersRepository.save(newUser);
        return newUser;
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto) {
        await this.checkUniqueFieldsForUpdate(updateUserDto);
        await this.usersRepository.update(id, updateUserDto);
        const updatedUser = await this.usersRepository.findOne(id);
        if (updatedUser) {
            return updatedUser
        }
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    async deleteUser(id: string) {
        const deleteResponse = await this.usersRepository.delete(id);
        if (!deleteResponse.affected) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }

    async checkIfEmailUses(email: string) {
        const user = await this.usersRepository.findOne({ email })
        return !!user;
    }

    async checkIfUsernameUses(username: string) {
        const user = await this.usersRepository.findOne({ username })
        return !!user;
    }


    async checkUniqueFieldsForCreate(createUserDto: CreateUserDto): Promise<void> {
        if (await this.checkIfEmailUses(createUserDto.email))
            throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
        if (await this.checkIfUsernameUses(createUserDto.username))
            throw new HttpException('User with that username already exists', HttpStatus.BAD_REQUEST);
    }

    async checkUniqueFieldsForUpdate(updateUserDto: UpdateUserDto): Promise<void> {
        if (updateUserDto.email && await this.checkIfEmailUses(updateUserDto.email))
            throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
        if (updateUserDto.username && await this.checkIfUsernameUses(updateUserDto.username))
            throw new HttpException('User with that username already exists', HttpStatus.BAD_REQUEST);
    }
}