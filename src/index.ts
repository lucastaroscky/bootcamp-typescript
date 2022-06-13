import PossibleAnswer from "./enums/PossibleAnswers";
import Movie from "./interfaces/Movie";
import User from "./interfaces/User";
import MovieService from "./services/MovieService";
import askCli from "./utils/askCli"
import showMovies from "./utils/cli-options/showMovies";
import answerCli from "./utils/cli-options/answer-cli";
import listUsers from "./utils/cli-options/listUsers";
import selectUser from "./utils/cli-options/selectUser";
import rateMovie from "./utils/cli-options/rateMovie";
import addMovieToList from "./utils/cli-options/addMoviesById";
import showMoviesAverage from "./utils/cli-options/showMoviesAverage";

const movieService = new MovieService();
const users: User[] = [{
    id: 1,
    name: "Lucas starosky",
    age: 23,
    myList: []
}]

let movies: Movie[];
let loggedUserId: number;

async function run() {
    await showMovies(movies, movieService);
    await listUsers(users);
    await selectUser(loggedUserId, users);
    console.log(loggedUserId)

    const questions = askCli("input", "Digite uma opção: \n 1 - Dar avaliação \n 2 - Calcular média avaliação \n 3 - Adicionar filme a lista \n 0 - Sair \n");
    const { option } = await answerCli(questions);

    switch (option) {
        case PossibleAnswer.RATE_MOVIE:
            await rateMovie(movies);
            run()
            break;
        case PossibleAnswer.SHOW_WITH_AVERAGE:
            await showMoviesAverage(movies);
            run()
            break;
        case PossibleAnswer.ADD_MOVIE_TO_LIST:
            await addMovieToList(users, loggedUserId, movies);
            break;
        case PossibleAnswer.EXIT:
            return;
    }
}

run()
