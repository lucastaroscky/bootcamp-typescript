import { fchown } from "fs";
import Movie from "../../interfaces/Movie";
import User from "../../interfaces/User";
import addFilms from "../addMovies";
import askCli from "../askCli";
import answerCli from "./answer-cli";

async function addMovieToList(users: User[], loggedUserId: number, movies: Movie[]) {
    try {
        const addToListQuestion = askCli("input", "Digite o(s) id(s) do(s) filme(s): ex: (1, 2, 3, 4, 5)")
        const answerId = await answerCli(addToListQuestion)

        const ids = answerId.option
            .split(",")
            .map((id: string) => parseInt(id));

        users[loggedUserId] = addFilms(users[loggedUserId], movies, ...ids)

    } catch (error) {
        console.log("Erro ao adicionar filme(s) a lista!")
    }
}

export default addMovieToList;