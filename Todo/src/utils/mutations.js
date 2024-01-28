import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        loginUser(Input: { email: $email, password: $password }) {
            status
            token
        }
    }
`

export const REGISTER_USER = gql`
    mutation registerUser($name: String!, $email: String!, $password: String!) {
        registerUser(Input: { name: $name, email: $email, password: $password}) {
            status,
            token
        }
    }
`