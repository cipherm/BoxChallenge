import React, { useState, useEffect } from 'react'
import axios from "axios";
import "./BoxScore.css"
import API_URL from "../baseUrl"

const BoxScore = ({ league }) => {
    const [gameData, setGamedata] = useState(null);
    const away_score = gameData?.away_period_scores.reduce((a, b) => a + b, 0)
    const home_score = gameData?.home_period_scores.reduce((a, b) => a + b, 0)

    const fetchData = async (league) => {
        try {
            const data = await axios.get(`${API_URL}/${league}`);
            setGamedata(data.data[0])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData(league)
    }, [league])

    return (
        <div className="box-score-main-div">
            {
                gameData === null
                    ? null :
                    <div>
                        <div className="scores">
                            <h4>{gameData["away_team"]["abbreviation"]}</h4>
                            {
                                gameData["away_period_scores"].map(
                                    (score, idx) => {
                                        return (
                                            <span key={idx}>{score}</span>
                                        )
                                    }
                                )
                            }
                        </div>
                        <div className="scores">
                            <h4>{gameData["home_team"]["abbreviation"]}</h4>
                            {
                                gameData["home_period_scores"].map(
                                    (score, idx) => <span key={idx}>{score}</span>
                                )
                            }
                        </div>
                        <div className="team-names-wth-total">
                            <div className="team-away">
                                <h2>{gameData["away_team"]["first_name"] + " " + gameData["away_team"]["last_name"]}</h2>
                                <h3>{away_score}</h3>
                            </div>
                            <div className="team-home">
                                <h2>{gameData["home_team"]["first_name"] + " " + gameData["home_team"]["last_name"]}</h2>
                                <h3>{home_score}</h3>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default BoxScore
