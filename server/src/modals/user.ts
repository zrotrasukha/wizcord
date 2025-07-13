import { eq } from "drizzle-orm";
import { db } from "../Database/db";
import { user } from "../Database/schemas/schema";

export class User {
    constructor(
        public id: string,
        public username: string, 
        public email : string,
        public avatar : string, 
        public createdAt?: Date,
        public updatedAt?: Date
    ){}
    
    public static async getAllUsers(){
        const users = await db.select().from(user);
        return users; 
    }; 
    
    public static async getUser(id: string){
        const currUser = await db.select().from(user)
        .where(eq(user.id , id));
        return currUser[0];
    };

}