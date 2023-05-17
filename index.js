const Joi = require('joi')
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const users = require('./routes/users');
const posts = require('./routes/posts');
const comments = require('./routes/comments');
const like = require('./routes/like');
const follow = require('./routes/follow');
const auth = require('./routes/auth');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


if(!process.env.JWT_SECRET_KEY){
    console.error("FATAL ERROR: jwtPrivateKey is not defined.");
    process.exit(1);
}
mongoose.connect(process.env.DB_URL)
.then(()=>console.log('connected to DB...'))
.catch(err => console.log('can not connect...', err))


app.use(cors());
app.use(express.json());
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/posts', comments);
app.use('/api/like', like);
app.use('/api/follow', follow);
app.use('/api/auth', auth);


const PORT = process.env.PORT || 3600;
app.listen(PORT, () => console.log(`listening on ${PORT}`))