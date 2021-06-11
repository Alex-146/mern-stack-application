
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/promocode", require("./routes/promocode"));

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  const p = path.resolve("client", "build");
  app.use("/", express.static(p));

  app.get("*", (req, res) => res.sendFile(path.resolve("client", "build", "index.html")));
}

async function run() {
  try {
    const dbUrl = "mongodb+srv://deynekos:-Qwerty123@cluster0.rb0sz.mongodb.net/auth-test?retryWrites=true&w=majority";
    await mongoose.connect(dbUrl, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      useCreateIndex: true
    });
    const PORT = process.env.PORT ?? 5000;
    app.listen(PORT, () => console.log(`Server started at ${PORT}...`));
  }
  catch(error) {
    console.log(error);
  }
}

run();
