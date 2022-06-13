import Movie from "../interfaces/Movie";
import User from "../interfaces/User";

function addMoviesToUserList(user: User, ...movies: Movie[]): void {
    user.myList = [
        ...user.myList,
        ...movies
    ]
}

export default addMoviesToUserList;