import Movie from "../interfaces/Movie";
import removeMovieWithoutRatings from "./removeMovieWithoutRatings";

interface MovieWithAverage extends Movie {
    average: number;
}

function calculateMoviesAverage(movies: Movie[]): MovieWithAverage[] {
    const sanitizedMovies = removeMovieWithoutRatings(movies);

    return sanitizedMovies.map(movie => {
        const initialValue = 0;
        const length = movie.ratings.length;
        const sumFn = (previous: number, current: number) => previous + current

        const average = Math.floor(movie.ratings.reduce(sumFn, initialValue) / length);

        return {
            ...movie,
            average,
        }
    });
}

export default calculateMoviesAverage;