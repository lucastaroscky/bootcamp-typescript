import inquirer from "inquirer";

async function answerCli(question: object) {
    return await inquirer.prompt(question);
}

export default answerCli;