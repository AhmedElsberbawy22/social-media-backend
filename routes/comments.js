const {Comment, validate} = require('../models/comment');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {Post} = require('../models/post');



router.post('/:postId/comments', auth, async (req, res) => {
    const{error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let post = await Post.findOne({_id: req.params.postId});
    if (!post) return res.status(400).send("this post does not exist.");

    const {userName} = req.user;

    const comment = new Comment({body: req.body.body, userName, postId: req.params.postId});
    
    post.comments = [...post.comments, comment];

    await comment.save();
    await post.save();
    res.send(comment);
});



module.exports = router;
