import { use } from "react";
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
        // return users; 
        return users.map(user => new User(
            user.id,
            user.username,
            user.email,
            user.avatar
        ))
    }; 

    
}