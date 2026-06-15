import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core'

export const produtos = sqliteTable('produtos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  desc: text('desc').notNull(),
  price: real('price').notNull(),
})

export type Produto = typeof produtos.$inferSelect       // resultado de SELECT
export type NovoProduto = typeof produtos.$inferInsert    // payload de INSERT

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password_hash: text('password_hash').notNull(),
  role: text('role').default('user'),
  created_at: text('created_at').default("CURRENT_TIMESTAMP"),
  updated_at: text('updated_at').default("CURRENT_TIMESTAMP")
});


export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;