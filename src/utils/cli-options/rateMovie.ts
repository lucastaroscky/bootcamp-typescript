import Movie from "../../interfaces/Movie";
import askCli from "../askCli";
import answerCli from "./answer-cli";

async function rateMovie(movies: Movie[]) {
    try {
        const chooseMovieQuestions = askCli("number", "Qual filme?");
        const answersMovie = await answerCli(chooseMovieQuestions);
        const movieId = answersMovie.option;
        
        console.log(movieId);

        const rateQuestion = askCli("number", "Qual avaliacao de 0 a 5?")
        const answerRatings = await answerCli(rateQuestion);
        let rate = answerRatings.option;

        movies.forEach((movie => {
            if (movie.id === movieId) {
                movie.ratings.push(rate)
            }
        }))
    } catch (error) {
        console.log("Erro ao avaliar filme!")
    }
}

export default rateMovie;