import "dotenv/config";
import express from "express";
import cors from "cors";
import { authRoutes, userRoutes, postRoutes, testRoutes } from "routes";
import { endClient } from "db/db";
import errorMiddleware from "middleware/errorMiddleware";
import { closeS3Client } from "bucket/s3";


const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.PORT || 5001;

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/test", testRoutes);

app.use(errorMiddleware);

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
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
const handleShutdown = async (signal: string) => {
    console.log(`Received ${signal}. Shutting down gracefully...`);
    await closeDatabaseConnection();
    closeS3Client();
    server.close(() => {
        console.log("Server closed");
        process.exit(0);
    });
};

// Listen for termination signals
process.on("SIGINT", () => handleShutdown("SIGINT"));
process.on("SIGTERM", () => handleShutdown("SIGTERM"));

// In case of an uncaught exception, ensure the database is closed properly
process.on("uncaughtException", (err) => {
    console.error("Uncaught exception:", err);
    handleShutdown("uncaughtException");
});

// In case of an unhandled promise rejection, ensure the database is closed properly
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled rejection at:", promise, "reason:", reason);
    handleShutdown("unhandledRejection");
});
