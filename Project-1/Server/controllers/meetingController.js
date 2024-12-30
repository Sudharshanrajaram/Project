const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');
const Counselor = require('../models/counselor');
const { create } = require('../models/Appointment');
const nodemailer = require('nodemailer');
require('dotenv').config();


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
    },
});

const generateJwt = async (req, res) => {
    const { username, roomName, counselorName, email } = req.body;

    if (!username || !roomName) {
        return res.status(400).json({ error: "Both username and room name are required." });
    }
    try{
    const payload = {
        aud: "jitsi",
        iss: "chat",
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
        nbf: Math.floor(Date.now() / 1000),
        sub: `vpaas-magic-cookie-${Date.now()}`,
        context: {
            features: {
                livestreaming: true,
                "outbound-call": true,
                "sip-outbound-call": false,
                transcription: true,
                recording: true
            },
            user: {
                "hidden-from-recorder": false,
                moderator: true,
                name: username,
                id: `google-oauth2|${Math.floor(Math.random() * 1000000000)}`,
                avatar: "",
                email: `${username}@example.com`
            }
        },
        room: roomName
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY);
    const meetingLink = `https://meet.jit.si/${roomName}#jwt=${token}`;
    const adminUser = await User.findOne({ name: username });
    const adminCounselor = await Counselor.findOne({ name: counselorName });
    const MeetingLink = adminUser.MeetingLink;
    MeetingLink.push({data: meetingLink, name: roomName, counselorName: `Meeting with ${counselorName}`, createdAt: new Date()});
    await adminUser.save();
    const Meeting = adminCounselor.Meeting;
    Meeting.push({data:meetingLink, name: roomName, userName: `Meeting with ${username}`, createdAt: new Date()});
    await adminCounselor.save();
    await transporter.sendMail({
        from: process.env.USER_EMAIL,
        to: email,
        subject: 'Appointment Request',
        text: `Dear ${username}, Your Appointment scheduled with ${counselorName} has Approved. your meeting link is ${meetingLink}`,
      });
    res.json({ token, meetingLink });
    }catch(error){
    res.status(500).json({ message: error.message });
}
}

module.exports = { generateJwt };