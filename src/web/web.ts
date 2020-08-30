import express from "express";
const app = express();

// Path
import path from "path";

// Views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Serve static files
app.use(express.static(path.join(__dirname + "/public")));

// Use routes
import routes from "../routes";
app.use("/", routes);

// Start server
export const PORT = Number(process.env.PORT) || 3000;
export const IP = process.env.IP || "127.0.0.1";

app.listen(PORT, IP, () => console.log("Server panel started"));
