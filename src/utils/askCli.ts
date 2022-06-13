function askCli(type: string, message: string) {
    return [
        {
            type,
            name: "option",
            message,
        }
    ]
}

export default askCli;