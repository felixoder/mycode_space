const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcryptjs = require('bcryptjs');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret ='wbefiefiueqrgjqrejgewgjjn4hbh4iogjo4jmgnmbhrogk0v9mu9r gjnrngbmnrgbrglhjmrmth';
const app = express();
const Post = require("./models/Post"); // Import the Post model

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: "https://65acc817865d582f94fce824--felixcodez.netlify.app",
}));
app.use(express.urlencoded({ extended: true }));

async function connection() {
  try {
    await mongoose.connect(
   "mongodb+srv://my_code:BF5Lpc8IjEVbaA4N@cluster0.zmuiene.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
connection();
app.get('/',(req,res)=>{
  res.json('hello')
})
app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const salt = bcryptjs.genSaltSync(10);
        const userDoc = await User.create({ username, password: bcryptjs.hashSync(password, salt), email });
        console.log(userDoc);
        res.status(201).json({ message: 'User is successfully registered' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    
    if (!userDoc) {
        return res.status(400).json({ error: 'User not found' });
    }

    const passOk = bcryptjs.compareSync(password, userDoc.password);

    if (passOk) {
        jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
            if (err) {
                console.error("Error signing JWT:", err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.cookie('token', token).json({
                    id: userDoc._id,
                    username,
                });
            }
        });
    } else {
        res.status(400).json({ error: 'Wrong Credentials' });
    }
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
});

app.get("/profile", (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            console.error("Error verifying JWT:", err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(info);
        }
    });
});

app.put("/post", async (req, res) => {
    try {
        const { token } = req.cookies;
        const info = await jwt.verify(token, secret, {});
        const { id, title, summery, content } = req.body;

        console.log("Request Body:", req.body);

        const postDoc = await Post.findOneAndUpdate(
            { _id: id, author: info.id },
            { title, summery, content },
            { new: true }
        );

        if (!postDoc) {
            return res.status(400).json("You are not the Author or Post not found");
        }

        res.json(postDoc);
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json("Internal Server Error");
    }
});

app.post("/logout", (req, res) => {
    res.cookie("token", "").json("ok");
});

app.get("/post", async (req, res) => {
    res.json(
        await Post.find()
            .populate("author", ["username"])
            .sort({ createdAt: -1 })
    );
});

app.get("/post/:id", async (req, res) => {
    const { id } = req.params;
    postDoc = await Post.findById(id).populate("author", ["username"]);
    res.json(postDoc);
});

app.put("/post/:id", async (req, res) => {
    try {
        const { token } = req.cookies;
        const info = await jwt.verify(token, secret, {});
        const { id } = req.params;
        const { title, summery, content } = req.body;

        console.log("Post ID:", id);
        console.log("Request Body:", req.body);

        const postDoc = await Post.findOneAndUpdate(
            { _id: id, author: info.id },
            { title, summery, content },
            { new: true }
        );

        if (!postDoc) {
            return res.status(400).json("You are not the Author or Post not found");
        }

        res.json(postDoc);
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json("Internal Server Error");
    }
});
app.post("/post",  async (req, res) => {
  

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;

    const { title, summery, content } = req.body;
    const authorInfo = await User.findById(info.id);
    const postDoc = await Post.create({
      title,
      summery,
      content,
     
      author: authorInfo,
    });
    res.json(postDoc);
  });
});
app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
