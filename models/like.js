const mongoose = require('mongoose');

const Like = mongoose.model('Like', new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    postId:{
        type: String,
        required: true
    },
}));

exports.Like = Like;
