import { useMutation, useQuery } from "@apollo/client"
import { Box, Button, Typography } from "@mui/material"
import { GET_MY_TODOS } from "../utils/queries"
import { EditDialog } from "../components/EditDialog";
import { useState } from "react";
import { UPDATE_TODO } from "../utils/mutations";
import { useMyContext } from "../store";


export const Home = () => {
  const [open, setOpen] = useState(false);
  const [todo, setTodo] = useState(null);
  const { data, loading, refetch } = useQuery(GET_MY_TODOS);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const { trigger, handleTrigger } = useMyContext();

  if(loading) {
    return <Typography variant="h3" mt={10} textAlign="center">Loading...</Typography>
  }

  const handleOpen = (value, todo) => {
    setOpen(value);
    setTodo(todo ? todo : null);
  }

  if(trigger) {
    refetch();
    handleTrigger(false);
  }
  
  const handleUpdate = async (todo, id) => {
    try {
      const { data } = await updateTodo({
        variables: {
          ...todo,
          id
        }
      })
      if(data?.updateTodo?.status) {
        // alert(data.updateTodo.message);
      }
      refetch();
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
    handleOpen(false);
  }

  return (
    <Box>
      <Typography fontSize="28px" fontWeight={600} textAlign="center">My Todos</Typography>
      <Box display="flex" flexDirection="column" gap={1}>
        { data?.myTodos?.map((todo) => {
          return <Box key={todo.id} display="flex" justifyContent="space-between" borderRadius={1} 
                  bgcolor="aqua" px={6} py={2} boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" 
                  sx={{ cursor: 'pointer'}} alignItems="center"
                >
                  <Typography>{todo.task}</Typography>
                  <Box display="flex" gap={4} alignItems="center">
                    <Typography color={todo.status === 'PENDING' ? 'red' : 'green'}>{todo.status}</Typography>
                    <Button variant="contained" color="warning" 
                      onClick={() => handleOpen(true, todo)}
                    >Edit</Button>
                  </Box>
                </Box>
        })}
      </Box>
      { open && todo && <EditDialog handleClose={() => handleOpen(false)} {...todo} handleUpdate={handleUpdate} flag/> }
    </Box>
  )
}
