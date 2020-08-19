import express, { Application, Request, Response, NextFunction } from "express";
import axios from "axios";
import cors from "cors";
const mongoose = require("mongoose");
const Game = require("./models/gameSchema")

//* initialize app
const app = express();
const PORT = process.env.PORT || 3001

// * Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// * Cors MiddleWare
app.use(cors())
// * Static Folder (used when data was fetched from json files)
app.use(express.static('public'))

// * Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/BoxScore", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
// * Create a Connection
const connection = mongoose.connection;

connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
});

// * Routes / EndPoints
app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("<h1>Home Page</h1><p>Go to /api/nba for NBA Data<p><p>Go to /api/mlb for MLB Data<p>")
})

app.get("/api/nba", async (req: Request, res: Response) => {
    try {
        const games = await Game.find({ league: "NBA" })
        res.status(200).send(games);
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post("/api", async (req: Request, res: Response) => {
    const game = new Game(req.body);
    try {
        await game.save()
        res.status(201).send(game)
    } catch (error) {
        res.status(400).send(error)
    }

})

app.get("/api/mlb", async (req: Request, res: Response) => {
    try {
        const games = await Game.find({ league: "MLB" })
        res.status(200).send(games);
    } catch (error) {
        res.status(500).send(error)
    }
})

// * Listen on Port
app.listen(PORT, () => console.log(`Server Running at http://localhost:${PORT}`))