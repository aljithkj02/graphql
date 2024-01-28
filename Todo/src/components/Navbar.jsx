import { Box, Button, Typography } from "@mui/material"
import { NavLink, useNavigate } from "react-router-dom"
import { clearToken } from '../utils/localStorage.js'

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate('/login');
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

            <Button variant="contained" color="error" onClick={handleLogout}>Logout</Button>
          </Box>
        </Box>
      </Box>
    </nav>
  )
}
