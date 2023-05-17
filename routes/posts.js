const {Post, validate} = require('../models/post');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {User} = require('../models/user');
const {Comment} = require('../models/comment');
const {Like} = require('../models/like');


router.get('/home', auth, async (req, res) => {
    const { userName } = req.user;
    const user = await User.findOne({ userName });
    if (user) {
      const { following } = user;
      const posts = await Post.find({ userName: { $in: following } }).sort({ date: -1 });
      res.send(posts);
    } else {
      res.status(404).send('User not found');
    }
});

router.get('/:userName', auth, async (req, res) => {
    const posts = await Post.find({userName: req.params.userName}).sort({date: -1});
    res.send(posts);
});

router.get('/post/:id', auth, async (req, res) => {
    const post = await Post.findOne({_id: req.params.id});
    res.send(post)
});

router.post('/', auth, async (req, res) => {
    const{error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const {userName} = req.user;
    
    let post = new Post({body: req.body.body, userName});
    post = await post.save();
    res.send(post);
});

router.put('/:id', auth, async (req, res) => {
    let post = await Post.findOne({_id: req.params.id});
    if (!post) return res.status(400).send("this post does not exist.");

    const {userName} = req.user;
    if(userName !== post.userName) return res.status(401).send('Access denied.');

    const{error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    await Post.updateOne({_id: post._id},{
        $set: {body: req.body.body}});
    res.send(post);

});


router.delete('/:id', auth, async (req, res) => {
    
    let post = await Post.findOne({_id: req.params.id});
    if (!post) return res.status(400).send("this post does not exist.");

    const {userName} = req.user;
    if(userName !== post.userName) return res.status(401).send('Access denied.');

    await Comment.deleteMany({postId: post._id});
    await Like.deleteMany({postId: post._id});
    const result = await Post.deleteOne({_id: post._id});


    res.send(result);
});





module.exports = router;
