import { Box } from '@mui/material'
import { Navbar } from './Navbar'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
      <Box>
          <Navbar />
          <Box px={10} py={10}>
              <Outlet />
          </Box>
      </Box>
  )
}
