const express = require("express");
const connectDB = require("./config/db");

//connect database db
connectDB();

const app = express();

//init middleware (check here later; should work causes app crash)
app.use(express.json());

app.get("/", (req, res) => res.json({ msg: "Voting Info API" }));

//define routes
app.use("/api/voters", require("./routes/voters"));
app.use("/api/elections", require("./routes/elections"));
app.use("/api/poll", require("./routes/poll"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
