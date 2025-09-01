import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
});

export const courses = sqliteTable('courses', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	title: text('title').notNull().unique(),
	description: text('description'),
	
});