    import { model, Schema } from "mongoose";

    // 👉Problem : user id not updated in this schema 


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
        name:{
            type: String,
        }

    })
    export  const GoogleAuthSchema = model('User', userDetails);


