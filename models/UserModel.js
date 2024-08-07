import bcrypt from "bcryptjs";  // Import bcryptjs instead of bcrypt
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
    },
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    color: {
        type: Number,
        required: false,
    },
    profileSetup: {
        type: Boolean,
        default: false,
    },
},
{
    timestamps: true,
});

userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {  
        const salt = await bcrypt.genSalt(); 
        this.password = await bcrypt.hash(this.password, salt); 
    }
    next();
});

const User = mongoose.model("chatUser", userSchema);

export default User;
