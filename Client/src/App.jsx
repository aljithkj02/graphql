import { Box, Typography } from '@mui/material'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { Locations } from './components/Locations'

const client = new ApolloClient({
  uri: 'https://flyby-router-demo.herokuapp.com/',
  cache: new InMemoryCache()
})

function App() {

  return (
    <ApolloProvider client={client}>
      <Box>
        <Typography textAlign="center" variant='h3'>Welcome to GraphQL</Typography>
      </Box>
      <Locations />
    </ApolloProvider>
  )
}

export default App
