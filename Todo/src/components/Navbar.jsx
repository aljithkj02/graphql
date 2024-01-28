import { Box, Button, Typography } from "@mui/material"
import { NavLink, useNavigate } from "react-router-dom"
import { useMutation } from '@apollo/client'
import { clearToken } from '../utils/localStorage.js'
import { useState } from "react"
import { EditDialog } from "./EditDialog.jsx"
import { ADD_TODO } from '../utils/mutations.js'

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [addTodo] = useMutation(ADD_TODO);

  const handleLogout = () => {
    clearToken();
    navigate('/login');
  }

  const handleOpen = (value) => {
    setOpen(value);
  }

  const handleCreate = async (taskData) => {
    try {
      const { data } = await addTodo({
        variables: {
          ...taskData
        }
      })
      console.log(data.addTodo);
      handleOpen(false);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  }

  return (
    <nav>
      <Box bgcolor="Highlight" position="fixed" width="100%">
        <Box px={10} py={2} display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography color="#FFF" fontSize="20px" fontWeight={600}>Todo</Typography>
          </Box>
          <Box display="flex" gap={4} alignItems="center">
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/todos'>Todos</NavLink>

            <Button variant="contained" color="secondary" onClick={() => handleOpen(true)}>Create</Button>
            <Button variant="contained" color="error" onClick={handleLogout}>Logout</Button>
          </Box>
        </Box>
      </Box>
      { open && <EditDialog handleClose={() => handleOpen(false)} handleUpdate={handleCreate} /> }
    </nav>
  )
}
