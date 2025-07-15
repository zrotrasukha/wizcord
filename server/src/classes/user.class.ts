import { eq } from "drizzle-orm";
import { db } from "../Database/db";
import { user } from "../Database/schemas/schema";
import type { BasicUser } from "../Types/user.types";

export class User {
    constructor(
        public id: string,
        public username: string,
        public email: string,
        public avatar: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ) { }

    public static async getAllUsers(): Promise<typeof user.$inferSelect[]> {
        const users = await db.select().from(user);
        return users;
    }

    public static async getUser(id: string): Promise<typeof user.$inferSelect | undefined> {
        const currUser = await db.select().from(user)
            .where(eq(user.id, id));
        return currUser[0];
    }
}