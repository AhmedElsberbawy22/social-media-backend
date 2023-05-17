const express = require('express');
const router = express.Router();
const {User} = require('../models/user');
const auth = require('../middleware/auth');


// follow
router.post('/', auth, async (req, res) =>{
    let followedUser = await User.findOne({userName: req.body.userName}).select('-password');
    if (!followedUser) return res.status(400).send("this user does not exist.");
    
    const { _id } = req.user;
    const{following} = await User.findById(_id);
    let newFollowing;


    if(following.length === 0){
        newFollowing = [followedUser.userName];
    }
    else if (following.includes(followedUser.userName)){
        return res.status(400).send("You have followed this user before");
    }
    else {
        newFollowing = [...following, followedUser.userName];
    }

    const result = await User.findByIdAndUpdate({ _id }, {
        $set: { following: newFollowing }
    }, { new: true });

    res.send(result);
});


module.exports = router;
