import { gql } from '@apollo/client'

export const GET_TODOS = gql`
    query getTodos {
        todos {
            id
            task
            status
            createdAt
            userId
        }
    }
`

export const GET_MY_TODOS = gql`
    query myTodos {
        myTodos {
            id
            task
            status
            createdAt
        }
    }
`