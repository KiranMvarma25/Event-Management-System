const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketIo = require("socket.io");

const io = socketIo(server, { 
    cors: { origin: "*", credentials: true } 
});

const dbConnect = require("./config/db");
require("dotenv").config();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cors = require("cors");
app.use(cors({
    origin: "*", 
    credentials: true 
}));

dbConnect();
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
app.use("/base", userRoutes);

const eventRoutes = require("./routes/createEventRoutes");
app.use("/base", eventRoutes);

const attendeeRoutes = require("./routes/attendeeRoutes");
app.use("/base", attendeeRoutes);

io.on("connection", (socket) => {
    console.log("Client connected");
    socket.on("disconnect", () => console.log("Client disconnected"));
});

module.exports = { io, server };

const PORT = process.env.PORT || 3600;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});