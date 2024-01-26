export const resolvers = {
    Query: {
        users() {
            return [{
                id: 1,
                name: "Aljith K J",
                email: "aljith@gmail.com",
                password: "123"
            }]
        }
    }
}