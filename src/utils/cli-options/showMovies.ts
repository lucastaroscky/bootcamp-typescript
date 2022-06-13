import Movie from "../../interfaces/Movie";
import MovieService from "../../services/MovieService";

async function showMovies(movies: Movie[], movieService: MovieService) {
    try {
        console.log("Carregando Filmes...");
        movies = await movieService.listAll();
        console.log("Download concluído!");

        movies.map((movie) => console.log(`${movie.id} - ${movie.name}`));

    } catch (error) {
        console.error("Erro ao carregar filme!")
    }
}

export default showMovies;