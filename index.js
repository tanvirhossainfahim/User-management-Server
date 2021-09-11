const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
// MONGO_URL = mongodb+srv://userData:user1234@cluster0.dwwpp.mongodb.net/userData?retryWrites=true&w=majority
dotenv.config();
const port = process.env.PORT || 5050;
const mongoURL = process.env.MONGO_URL;
// mongoose.set('useFindAndModify', false);

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify:false
  })
  .then(() => console.log("Database is working properly!"))
  .catch((err) => console.log(err));

// middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

app.use("/user", userRoute);
app.use("/auth", authRoute);

app.get("/", (req, res) => {
  res.send("It's working!");
});

app.listen(port, () => {
  console.log("Listening");
});
