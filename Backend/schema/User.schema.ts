import { model, Schema } from "mongoose";

const userDetails = new Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

})
export  const GoogleAuthSchema = model('User', userDetails);


