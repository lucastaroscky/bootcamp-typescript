import User from "../../interfaces/User";

async function listUsers(users: User[]) {
    try {
        console.log("Carregando usuários...")
        users.map((user) => console.log(`${user.id} - ${user.name}`));

    } catch (error) {
        console.log("Erro ao listar usuários!")
    }
}

export default listUsers;