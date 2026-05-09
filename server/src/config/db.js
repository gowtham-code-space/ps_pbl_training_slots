import dotenv from 'dotenv/config';
import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// TiDB SSL Configuration
const sslConfig = process.env.DB_SSL_CA_PATH ? {
    ssl: {
        ca: fs.readFileSync(path.resolve(__dirname, '../../', process.env.DB_SSL_CA_PATH)),
        rejectUnauthorized: true
    }
} : {};

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 10,
    ...sslConfig
});

// Test database connection
export const testConnection = async () => {
    try {
        const connection = await db.getConnection();
        console.log(chalk.green('✓ TiDB Database connected successfully!'));
        console.log(chalk.blue(`  Host: ${process.env.DB_HOST}`));
        console.log(chalk.blue(`  Database: ${process.env.DB_NAME}`));
        connection.release();
        return true;
    } catch (error) {
        console.error(chalk.red('✗ Database connection failed:'));
        console.error(chalk.red(`  ${error.message}`));
        return false;
    }
};

export default db;
