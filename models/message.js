const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    message: {
        text: {
            type: String,
            required: true,
            max: 2000
        },
        delivered: {
            type: Boolean,
            required: true
        },
        read: {
            type: Boolean,
            required: true
        }
    },
    // if you want to make a group chat, you can have more than 2 users in this array
    users: [ {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
    }],
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    read: {
        type: Date
    },
}, {
    timestamps: true
});

const Message = mongoose.model(`Messages`, messageSchema );

module.exports = Message;