import { timestamp, pgTable, varchar, text, uuid } from "drizzle-orm/pg-core";

export const user = pgTable(
    'users', {
    id: text('id').primaryKey(),
    username: varchar('username', { length: 225 }).notNull(),
    email: varchar('email', { length: 225 }).notNull(),
    avatar: text('avatar').notNull(),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow()
}
)

export const server = pgTable(
    'server', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 225 }).notNull(),
    admin: text('admin').notNull().references(() => user.id),
    icon: text('icon').notNull(),
    description: text('description').notNull(),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow()
}
);

export const serverMember = pgTable(
    'server_member', {
        id: uuid('id').primaryKey().defaultRandom(),
        serverId: uuid('serverId').notNull().references(() => server.id),
        userId: text('userId').notNull().references(() => user.id),
        role: varchar('role', { length: 50 }).notNull(),
        joinedAt: timestamp('joinedAt').defaultNow(),
        updatedAt: timestamp('updatedAt').defaultNow()

    }
)