const Joi = require('joi');
const mongoose = require('mongoose');
const {commentSchema} = require('./comment');


const Post = mongoose.model('Post', new mongoose.Schema({
    body:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now,
    },
    comments: [commentSchema]
}));

function validatePost(post){
    schema = Joi.object({
        body: Joi.string().required()
    });
    return schema.validate(post);
}

exports.Post = Post;
exports.validate = validatePost;