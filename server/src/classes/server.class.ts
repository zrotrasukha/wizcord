import { db } from "@/Database/db";
import { server, serverMember } from "@/Database/schemas/schema";
import { eq, sql } from "drizzle-orm";

export class Server {
    constructor(
        public id: string,
        public name: string,
        public admin: string,
        public icon: string,
        public description: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ) { }

    public static async getAllServers(userId: string) {
        const adminServers = await db.select().from(server)
            .where(eq(server.admin, userId));

        const memberServer = await db.select().from(server)
            .innerJoin(serverMember, eq(serverMember.serverId, server.id))
            .where(eq(serverMember.userId, userId));
        
        const allServer = [...adminServers, ...memberServer];
        return allServer;
    }

    public static async getServersById(id: string) {
        const servers = await db.select().from(server)
            .where(eq(server.id, id));
        return servers[0] || null;
    }

    public static async createServer(
        name: string,
        admin: string,
        description: string,
        icon?: string | '',
    ) {
        const serverValues = {
            name,
            admin,
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