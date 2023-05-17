const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {Like} = require('../models/like');
const {Post} = require('../models/post');

router.get('/:postId/likes', auth, async (req, res) => {
    let post = await Post.findOne({_id: req.params.postId});
    if (!post) return res.status(400).send("this post does not exist.");

    const noOfLikes = await Like.find({postId: req.params.postId});

    res.send({noOfLikes: noOfLikes.length});
});

// add and delete like
router.get('/:postId', auth, async (req, res) => {
    const {userName} = req.user;
    let post = await Post.findOne({_id: req.params.postId});
    if (!post) return res.status(400).send("this post does not exist.");

    let like = await Like.findOne({userName, postId: req.params.postId});
    if(like) {
        const result = await Like.deleteOne(like);
        return res.send(result);
    }
    like = new Like({userName, postId: req.params.postId});
    like = await like.save();
 
    res.send(like);
});

module.exports = router;
