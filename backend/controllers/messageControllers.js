import User from "../models/userModel.js";
import Message from "../models/messageModel.js";
import cloudinary from "../lib/cloudinary.js";
export const getUsers = async (req, res) => {
    try {
        const loggedinUser = req.user._id
        const filteredusers = await User.find({_id: {$ne: loggedinUser}}).select("-password");
        res.status(200).json({
            success: true,
            users: filteredusers,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export const getMessages = async (req, res) => {
    try {
        const {id : usertoChatid} = req.params; //Rename id to usertoChatid
        const myid = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myid, receiverId: usertoChatid },
                { senderId: usertoChatid, receiverId: myid },
            ]
        })

        res.status(200).json({
            success: true,
            messages,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const {text, image } = req.body;
        const senderId = req.user._id;
        const {id : receiverId} = req.params;

        let imageurl;

        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image, {
                folder: "chat-app",
            });
            imageurl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageurl,
        });

        await newMessage.save();

        //todo : realtime socket io here

        res.status(200).json({
            success: true,
            message: 'Message sent',
            newMessage,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
    };