import { useQuery } from "@apollo/client"
import { Box, Typography } from "@mui/material"
import { GET_MY_TODOS } from "../utils/queries"


export const Home = () => {
  const { data, loading } = useQuery(GET_MY_TODOS);

  if(loading) {
    return <Typography variant="h3" mt={10} textAlign="center">Loading...</Typography>
  }
  console.log(data);
  return (
    <Box>
      <Typography fontSize="28px" fontWeight={600} textAlign="center">My Todos</Typography>
      <Box display="flex" flexDirection="column" gap={1}>
        { data?.myTodos?.map((todo) => {
          return <Box key={todo.id} display="flex" justifyContent="space-between" borderRadius={1} 
                  bgcolor="aqua" px={6} py={2} boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" 
                  sx={{ cursor: 'pointer'}}
                >
                  <Typography>{todo.task}</Typography>
                  <Typography color={todo.status === 'PENDING' ? 'red' : 'green'}>{todo.status}</Typography>
                </Box>
        })}
      </Box>
    </Box>
  )
}
