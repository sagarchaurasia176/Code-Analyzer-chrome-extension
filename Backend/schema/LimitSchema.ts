import mongoose from "mongoose";

// LimitSchema 
const LimitSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
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
        default: 2
    }
})
export const LimitSchemaOfBot = mongoose.model('LimitOfBot', LimitSchema);


