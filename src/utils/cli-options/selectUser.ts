import User from "../../interfaces/User";
import askCli from "../askCli";
import answerCli from "./answer-cli";

async function selectUser(loggedUserId: number, users: User[]) {
    try {
        const userQuestion = askCli("number", "Selecione um usuário para continuar:");
        const userId = await answerCli(userQuestion);
        loggedUserId = users.findIndex((user) => user.id === userId.option)

    } catch (error) {
        console.log("Erro ao selecionar usuário!")
    }
}

export default selectUser;