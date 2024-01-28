import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password: String!) {
        loginUser(Input: { email: $email, password: $password }) {
            status
            token
        }
    }
`