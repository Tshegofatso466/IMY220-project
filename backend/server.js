import express from "express";
//CREATE APP
const app = express();
//SERVE A STATIC PAGE IN THE PUBLIC DIRECTORY
app.use(express.static("frontend/public"));
//PORT TO LISTEN TO
app.listen(1337, () => {
});