const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const sessionNotesRoutes = require('./routes/sessionNotesRoutes');
const meetingRoutes = require('./routes/meetingRoutes');
const chatRoutes = require('./routes/chatRoutes');
const bodyParser = require('body-parser');
const counselorRoutes = require('./routes/counselorRoutes');
require('dotenv').config();
const http = require('http')
const Server = require('socket.io').Server
const Connection = require('./config/db.js')
const Chat = require('./models/chat.js')


const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

io.on("connection", (socket) => {
    console.log("connected");

    const loadMessages = async () => {
        try {
            const messages = await Chat.find().sort({timeStamp : 1}).exec();
            socket.emit('chat', messages)
        } catch(err) {
            console.log(err)
        }
    }
    loadMessages();

    socket.on('newMessage', async (msg) => {
        try {
            const newMessage = new Chat(msg)
            await newMessage.save()
            io.emit('message', msg)
        }catch(err) {
            console.log(err)
        }
    })

    socket.on("disconnect", () => {
        console.log("disconnect")
    })
})

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/session', sessionNotesRoutes);
app.use('/api/meet', meetingRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/counselor', counselorRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
