const express = require("express");
const cors = require("cors");
const app = express();
const User = require("./models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");
const Post = require("./models/Post");
const path = require('path');

const uploadMiddleware = multer({ dest: "uploads/" });

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))

const secret = "jdklf9703y89JKDLFJH872";

//connect to the database
mongoose.connect("mongodb://localhost:27017/mernblog", (err) => {
  if (err) console.log(err);
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.send(userDoc);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passResult = bcrypt.compareSync(password, userDoc.password);

  if (passResult) {
    //logged in
    jwt.sign({ username, id: userDoc._id }, secret, (err, token) => {
      if (err) throw err;

      res.cookie("token", token).json({ username, id: userDoc._id });
    });
  } else {
    //wrong credentials
    res.status(400).json("Wrong password or username");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, secret, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("logged out");
});

app.post("/create", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];

  const { token } = req.cookies;

  jwt.verify(token, secret, async (err, info) => {
    if (err) throw err;

    const { title, summary, content } = req.body;

    const newPath = `${path}.${ext}`;
    fs.renameSync(path, newPath);

    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });

    res.json(postDoc);
  });
});

app.get("/post", async (req, res) => {
 
    res.json(await Post.find().populate('author', ['username']).sort({createdAt: -1}).limit(20));
});

app.get('/post/:id', async(req,res) => {
  const {id} = req.params;
  try {
    const postDoc = await Post.findById(id).populate('author',['username']);
    res.json(postDoc);
  } catch(err) {
    if(err) throw err;
  }
  
})

app.listen(4000, () => console.log("Server listening..."));
