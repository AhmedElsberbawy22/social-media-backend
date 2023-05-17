const mongoose = require('mongoose'); // npm i mongoose
const Joi = require('joi');



const commentSchema = new mongoose.Schema({
    body:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    postId:{
        type:String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now,
    }
});

const Comment = mongoose.model('Comment', commentSchema);

function validateComment(comment){
    schema = Joi.object({
        body: Joi.string().required(),
    });
    return schema.validate(comment);
}

exports.Comment = Comment;
exports.validate = validateComment;
exports.commentSchema = commentSchema;
