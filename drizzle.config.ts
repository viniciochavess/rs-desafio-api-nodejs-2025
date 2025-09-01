import {defineConfig} from 'drizzle-kit'


export default defineConfig({
    dialect: 'sqlite',
    dbCredentials:{
        url: process.env.DATABASE_URL ?? './database.sqlite'
    },
    out:'./drizzle',
    schema:'./src/database/drizzle/schema.ts'

});
