import { db } from "@/Database/db";
import { server } from "@/Database/schemas/schema";
import { eq } from "drizzle-orm";

export class Server {
    constructor(
        public id: string,
        public name: string,
        public owner: string,
        public icon: string,
        public description: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ) { }

    public static async getServersById(id: string) {
        const [currServer] = await db
            .select()
            .from(server)
            .where(eq(server.id, id));
        return currServer;
    }
    public static async getAllServers() {
        const servers = await db
            .select()
            .from(server);
        return servers;
    }

    public static async createServer(
        name: string,
        owner: string,
        description: string,
        icon?: string | '',
    ) {
        const serverValues = {
            name,
            owner,
            description,
            icon: icon || '',
        }

        const [newServer] = await db
            .insert(server)
            .values(serverValues)
            .returning();
        return newServer;
    }
    public static async updateServer(
        id: string,
        name?: string,
        description?: string,
        icon?: string
    ) {
        const updateData: Partial<{
            id: string,
            name?: string,
            description?: string,
            icon?: string
        }> = {}
        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (icon) updateData.icon = icon;

        const [updatedServer] = await db
            .update(server)
            .set(updateData)
            .where(eq(server.id, id))
            .returning();
        return updatedServer;
    }

    public static async deleteServer(id: string) {
        const [deletedServer] = await db
            .delete(server)
            .where(eq(server.id, id))
            .returning();
        return deletedServer;
    }
}