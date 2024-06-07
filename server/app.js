import express from "express";

// routes
import userRoutes from "./routes/user.js";

const app = express();

app.use("/user", userRoutes);

// default home route
app.get("/", (req, res) => {
  res.send("Hello home")
})

app.listen(3000, () => {
  console.log("Sever is running on port 3000");
});
