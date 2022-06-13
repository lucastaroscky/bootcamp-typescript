import Movie from "../../interfaces/Movie";
import calculateMoviesAverage from "../calculateMoviesAverage";

async function showMoviesAverage(movies: Movie[]) {
    try {
        const moviesWithAverage = calculateMoviesAverage(movies);
        moviesWithAverage.map((movie => console.log(`${movie.name} - ${movie.average}`)))

    } catch (error) {
        console.log("Erro ao listar avaliação média dos filmes!")
    }
}

export default showMoviesAverage;