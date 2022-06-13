import PossibleAnswer from "./enums/PossibleAnswers";
import Movie from "./interfaces/Movie";
import User from "./interfaces/User";
import MovieService from "./services/MovieService";
import askCli from "./utils/askCli"
import calculateMoviesAverage from "./utils/calculateMoviesAverage";
import addFilms from "./utils/addMovies";
import answerCli from "./utils/answerCli";

let movies: Movie[] = [];
let loggedUserId: number;

const users: User[] = [{
    id: 1,
    name: "Lucas starosky",
    age: 23,
    myList: []
}];

const movieService = new MovieService();

async function userOptions() {
    const questions = askCli("input", "Digite uma opção: \n 1 - Download dos filmes \n 2 - Dar avaliação \n 3 - Calcular média avaliação \n 4 - Adicionar filme a lista \n 0 - Sair \n");
    const { option } = await answerCli(questions);

    return option;
}

async function listMovies() {
    try {
        console.log("Carregando Filmes...");
        movies = await movieService.listAll();
        console.log("Download concluído!");

        movies.map((movie) => console.log(`${movie.id} - ${movie.name}`));

    } catch (error) {
        console.error("Erro ao carregar filme!");
    } finally {
        run();
    }
}

async function listUsers() {
    try {
        console.log("Carregando usuários...");
        users.map((user) => console.log(`${user.id} - ${user.name}`));

    } catch (error) {
        console.log("Erro ao listar usuários!");
    }
}

async function selectUser() {
    try {
        const userQuestion = askCli("number", "Selecione um usuário para continuar:");
        const userId = await answerCli(userQuestion);
        loggedUserId = users.findIndex((user) => user.id === userId.option);
    } catch (error) {
        console.log("Erro ao selecionar usuário!")
    }
}

async function rateMovie() {
    try {
        const chooseMovieQuestions = askCli("number", "Qual filme?");
        const answersMovie = await answerCli(chooseMovieQuestions);
        const movieId = answersMovie.option;

        const rateQuestion = askCli("number", "Qual avaliacao de 0 a 5?")
        const answerRatings = await answerCli(rateQuestion);
        let rate = answerRatings.option;

        movies.forEach((movie => {
            if (movie.id === movieId) {
                movie.ratings.push(rate);
                console.log(movie);
            }
        }))

    } catch (error) {
        console.log("Erro ao avaliar filme!")
    } finally {
        run()
    }
}

async function showMoviesAverage() {
    try {
        const moviesWithAverage = calculateMoviesAverage(movies);
        moviesWithAverage.map((movie => console.log(`${movie.name} - ${movie.average}`)));
        console.log(moviesWithAverage)
    } catch (error) {
        console.log("Erro ao listar avaliação média dos filmes!");
    } finally {
        run()
    }
}

async function addMovieToList() {
    try {
        const addToListQuestion = askCli("input", "Digite o(s) id(s) do(s) filme(s): ex: (1, 2, 3, 4, 5)");
        const answerId = await answerCli(addToListQuestion);

        const ids = answerId.option
            .split(",")
            .map((id: string) => parseInt(id));

        users[loggedUserId] = addFilms(users[loggedUserId], movies, ...ids);

        console.log(users[loggedUserId]);
    } catch (error) {
        console.log("Erro ao adicionar filme(s) a lista!");
    } finally {
        run()
    }
}


async function run() {
    await listUsers();
    await selectUser();

    switch (await userOptions()) {
        case PossibleAnswer.DOWNLOAD:
            await listMovies();
            break;
        case PossibleAnswer.RATE_MOVIE:
            await rateMovie();
            break;
        case PossibleAnswer.SHOW_WITH_AVERAGE:
            await showMoviesAverage();
            break;
        case PossibleAnswer.ADD_MOVIE_TO_LIST:
            return await addMovieToList();
        case PossibleAnswer.EXIT:
            return;
    }
}

run()