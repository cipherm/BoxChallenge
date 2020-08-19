const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// * Create NBA Schema and Model
const gameSchema = new Schema({
    league: {
        type: String,
        required: [true]
    },
    away_team: {
        team_id: {
            type: String
        },
        abbreviation: {
            type: String
        },
        first_name: {
            type: String
        },
        last_name: {
            type: String
        }
    },
    home_team: {
        team_id: {
            type: String
        },
        abbreviation: {
            type: String
        },
        first_name: {
            type: String
        },
        last_name: {
            type: String
        }
    },
    away_period_scores: {
        type: [Number]
    },
    home_period_scores: {
        type: [Number]
    },
})

const Game = mongoose.model("games", gameSchema);

module.exports = Game;