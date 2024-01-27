import { Box, Typography } from '@mui/material'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'
import { useEffect } from 'react'

const client = new ApolloClient({
  uri: 'https://flyby-router-demo.herokuapp.com/',
  cache: new InMemoryCache()
})

function App() {

  useEffect(() => {
    setup();
  }, [])

  const setup = async () => {
    const res = await client.query({
      query: gql`
        query GetLocations {
          locations {
            id
            name
            description
            photo
          }
        }
      `
    })
    console.log(res);
  }

  return (
    <Box>
      <Typography>Welcome to GraphQL</Typography>
    </Box>
  )
}

export default App
