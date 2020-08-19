## Box Challenge
Box Score built using ReactJS at FrontEnd and Nodejs at Backend.

#### API EndPoints

    GET /api/nba : Get NBA Matches Data

    GET /api/mlb : Get MLB Matches Data

    POST /api : POST a Match Data.
    Parameters to be passed in body:
        - league: String [Name of The League(NBA or MLB)]
        - away_team: Object Consisting of Details of Away team
            - team_id: String
            - abbreviation: String
            - first_name: String
            - last_name: String
        - home_team: Object Consisting of Details of Home team
            - team_id: String
            - abbreviation: String
            - first_name: String
            - last_name: String
        - away_period_scores: Array of Numbers(Scores of Away Team in all the rounds)
        - home_period_scores: Array of Numbers(Scores of Home Team in all the rounds)