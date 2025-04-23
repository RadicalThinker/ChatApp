import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email : {
            type : String,
            required : true,
            unique : true
        },
        password : {    
            type : String,
            required : true,
            minlength : 6
        },
        username : {
            type : String,
            required : true
        },
        profilePicture : {
            type : String,
            default : ""
        }
    },
    { timestamps : true }
);

const user = mongoose.model("User", userSchema);
export default user;