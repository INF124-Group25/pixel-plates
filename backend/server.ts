import express from "express";
import cors from 'cors';
// import authRoutes from "./routes/auth.routes";
import testRoutes from './routes/test.routes';
import { endClient } from "db/db";


const app = express();
app.use(cors());


const port = 5001;

// If your app is served through a proxy
// trust the proxy to allow us to read the `X-Forwarded-*` headers
app.set("trust proxy", true);


app.get("/", (req, res) => {
    res.send("Hello world");
});

// app.use('/auth', authRoutes);
app.use('/api/test', testRoutes);

const server = app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
});







// closing database gracefully below

// Function to close the database connection
const closeDatabaseConnection = async () => {
    // Your code to close the database connection goes here
    console.log("Closing database connection...");
    // For example: await db.close();
    await endClient();

};

// Function to handle shutdown
const handleShutdown = async (signal:string) => {
    console.log(`Received ${signal}. Shutting down gracefully...`);
    await closeDatabaseConnection();
    server.close(() => {
        console.log("Server closed");
        process.exit(0);
    });
};

// Listen for termination signals
process.on('SIGINT', () => handleShutdown('SIGINT'));
process.on('SIGTERM', () => handleShutdown('SIGTERM'));

// In case of an uncaught exception, ensure the database is closed properly
process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err);
    handleShutdown('uncaughtException');
});

// In case of an unhandled promise rejection, ensure the database is closed properly
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled rejection at:', promise, 'reason:', reason);
    handleShutdown('unhandledRejection');
});