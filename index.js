import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";
import contactsRoute from "./routes/ContactRoutes.js";
import setupSocket from "./socket.js";
import messagesRoute from "./routes/MessageRoutes.js";
import channelsRoute from "./routes/ChannelRoutes.js";

dotenv.config()

const app = express();
const port = process.env.PORT || 4000;
const mongoUri = 'mongodb+srv://user:user174@cluster0.izggpmk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// CORS configuration
app.use(cors({
  origin: "https://mern-chat-app-frontend-leut7u4z0-priyanshus-projects-f4f4f618.vercel.app", // Allow requests from all origins
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true, 
}));

// Serve static files
app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use("/uploads/files", express.static("uploads/files"));

app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactsRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/channel", channelsRoute);

const server = app.listen(port, () => {
    console.log(`Server is running at :${port}`);
});

// Set up socket    
setupSocket(server);

// Connect to Database
mongoose
  .connect(mongoUri)
  .then(async () => {
    console.log('Database connected successfully!');
    const temp = (await mongoose.connection.listDatabases()).databases.map(d => d.name);
    const temp2 = (await mongoose.connection.db.listCollections().toArray()).map(c => c.name);
    console.log("All databases: ", temp);
    console.log("Collections in current selected database: ", temp2);
  })
  .catch((error) => {
    console.log(error.message);
  });
