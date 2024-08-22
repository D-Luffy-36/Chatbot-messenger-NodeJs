import express from "express"
import dotenv from "dotenv"
import configViewEngine from "./config/viewEngine.js";
import router from "./routes/web.js";
import bodyParser from "body-parser";

const app = express();
dotenv.config();


const port = process.env.PORT || 8888;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// config template
configViewEngine(app);
// khai báo route
app.use('/', router);

app.listen(port, () => {
    console.log(`Server Chatbot is running on port ${port}`);
});