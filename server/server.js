import "dotenv/config";
import chalk from 'chalk';
import app from './src/app.js';
import { testConnection } from './src/config/db.js';

const PORT = process.env.PORT || 5000;

// Initialize server
const startServer = async () => {
    console.log(chalk.cyan('\n🚀 Starting Stock Management Server...\n'));
    
    // Test database connection
    console.log(chalk.yellow('📊 Testing database connection...'));
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
        console.error(chalk.red('\n❌ Failed to connect to database. Server not started.\n'));
        process.exit(1);
    }
    
    // Start Express server
    app.listen(PORT, () => {
        console.log(chalk.green(`\n✓ Server running on port ${PORT}`));
        console.log(chalk.blue(`  Environment: ${process.env.NODE_ENV || 'development'}`));
        console.log(chalk.blue(`  Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`));
        console.log(chalk.cyan('\n📡 Backend is ready!\n'));
    });
};

startServer();
