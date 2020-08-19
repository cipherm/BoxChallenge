"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose = require("mongoose");
const Game = require("./models/gameSchema");
//* initialize app
const app = express_1.default();
const PORT = process.env.PORT || 3001;
// * Body Parser Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// * Cors MiddleWare
app.use(cors_1.default());
// * Static Folder (used when data was fetched from json files)
app.use(express_1.default.static('public'));
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
app.get("/", (req, res, next) => {
    res.send("<h1>Home Page</h1><p>Go to /api/nba for NBA Data<p><p>Go to /api/mlb for MLB Data<p>");
});
app.get("/api/nba", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const games = yield Game.find({ league: "NBA" });
        res.status(200).send(games);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
app.post("/api", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const game = new Game(req.body);
    try {
        yield game.save();
        res.status(201).send(game);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
app.get("/api/mlb", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const games = yield Game.find({ league: "MLB" });
        res.status(200).send(games);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
// * Listen on Port
app.listen(PORT, () => console.log(`Server Running at http://localhost:${PORT}`));
