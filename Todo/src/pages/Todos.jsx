import { useQuery } from '@apollo/client'
import { Box, Typography } from '@mui/material'
import { GET_TODOS } from '../utils/queries';

export const Todos = () => {
  const { data, loading } = useQuery(GET_TODOS);

  if(loading) {
    return <Typography variant="h3" mt={10} textAlign="center">Loading...</Typography>
  }

  return (
    <Box>
      <Typography fontSize="28px" fontWeight={600} textAlign="center">All Todos</Typography>
      <Box display="flex" flexDirection="column" gap={1}>
        { data?.todos?.map((todo) => {
          return <Box key={todo.id} display="flex" justifyContent="space-between" borderRadius={1} 
                  bgcolor="aqua" px={6} py={2} boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" 
                  sx={{ cursor: 'pointer'}}
                >
                  <Typography>{todo.task}</Typography>
                  <Typography>Author: {todo.user.name}</Typography>
                  <Typography color={todo.status === 'PENDING' ? 'red' : 'green'}>{todo.status}</Typography>
                </Box>
        })}
      </Box>
    </Box>
  )
}
