import { Box } from '@mui/material'
import { Navbar } from './Navbar'
import { Outlet } from 'react-router-dom'
import { ContextProvider } from '../store'

export const Layout = () => {
  return (
    
    <ContextProvider>
      <Box>
          <Navbar />
          <Box px={10} py={10}>
              <Outlet />
          </Box>
      </Box>
    </ContextProvider>
  )
}
