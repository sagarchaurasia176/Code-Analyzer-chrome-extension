import mongoose from "mongoose";

// LimitSchema 
const LimitSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        requierd:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    clickCount: {
        type: Number,
        default: 0
    },
    LimitOfBot: {
        type: Number,
        default: 15
    }
})
export const LimitSchemaOfBot = mongoose.model('LimitOfBot', LimitSchema);


