export default {
    schema: './src/db/schema.ts',
    out: './drizzle',
    dialect: 'sqlite',
    dbCredentials: {
        url: process.env.DATABASE_PATH || 'produtos.db'
    }
};
//# sourceMappingURL=drizzle.config.js.map