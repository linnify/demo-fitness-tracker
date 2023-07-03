import { PrismaClient, PersonalDetails, User } from '@prisma/client';
import { Md5 } from 'ts-md5';

export class UserService {
    prismaClient: PrismaClient;

    constructor() {
        this.prismaClient = new PrismaClient();
    }

    async getUser(email: string): Promise<User> {
        const user = await this.prismaClient.user.findUniqueOrThrow({
            where: { email }
        });
        return user;
    }

    async createUser(firstName: string, lastName: string, email: string, password: string) {
        const hashedPassword = this.hashPassword(password);
        console.log(`raw: ${password}, hashed: ${hashedPassword}`);
        await this.prismaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                password,
            }
        });
    }

    async getPersonalDetailsForUser(id: number): Promise<PersonalDetails> {
        const personalDetails = await this.prismaClient.personalDetails.findUniqueOrThrow({
            where: { userId: id }
        });
        return personalDetails;
    }

    async setPersonalDetailsForUser(id: number, height: number, weight: number, active: boolean) {
        await this.prismaClient.personalDetails.create({
            data: {
                height,
                weight,
                active,
                userId: id,
            }
        });
    }

    async verifyCredentials(email: string, password: string): Promise<boolean> {
        const hashedPassword = this.hashPassword(password);
        const user = await this.getUser(email);
        return user.password == hashedPassword;
    }

    async hasPersonalDetails(email: string): Promise<boolean> {
        const user = await this.getUser(email);
        try {
            const personalDetails = await this.getPersonalDetailsForUser(user.id);
        } catch {
            return false;
        }
        return true;
    }

    hashPassword(password: string): string {
        return Md5.hashStr(password);
    }
}
