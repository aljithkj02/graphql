import { Box, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"

export const Navbar = () => {
  return (
    <nav>
      <Box bgcolor="Highlight" position="fixed" width="100%">
        <Box px={10} py={2} display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography color="#FFF" fontSize="20px" fontWeight={600}>Todo</Typography>
          </Box>
          <Box>
            <NavLink to='/'>Home</NavLink>
          </Box>
        </Box>
      </Box>
    </nav>
  )
}
