require("dotenv").config();

const express = require("express");
const path = require("path");

const cookieParser = require("cookie-parser");

const Blog = require('./models/blog');

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const {checkforauthenticationofcookie} = require("./middlewares/auth")

const mongoose = require("mongoose");

const app = express();

// if port is not avaliable or we are running from out local machine
const PORT = process.env.PORT || 8000;

// mongoose.connect('mongodb://localhost:27017/blog').then(e => console.log("Mongodb connected"));
mongoose.connect(process.env.MONGO_URL).then(e => console.log("Mongodb connected"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(checkforauthenticationofcookie("token"));
app.use(express.static(path.resolve('./public')));


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/blog", blogRoute);
app.use("/user", userRoute);

app.get("/", async (req, res) => {
    const allBlog = await Blog.find({});
    res.render("home", {
        user: req.user,
        blogs: allBlog,
    })
})

app.listen(PORT, () =>console.log('Server is started at PORT: 8000'));