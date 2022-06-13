import Movie from "../interfaces/Movie";
import User from "../interfaces/User";
import addMoviesToUserList from "./addMoviesToUserList";

function addMovieByIdOnUserList(movies: Movie[], user: User, ...ids: number[]): void {
    return movies.forEach((movie) => {
        if (ids.includes(movie.id)) {
            console.log(movie)
            addMoviesToUserList(user, movie);
        }
    })
}

export default addMovieByIdOnUserList;
