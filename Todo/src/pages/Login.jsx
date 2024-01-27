import { Box, Button, Input, Typography } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const Login = () => {
  const [showPass, setShowPass] = useState(false);

  const handleShowPass = () => {
    setShowPass(!showPass);
  }

  return (
    <Box width="100%" height="100vh" display="flex" alignItems="center" justifyContent="center">
        <Box width="30%">
          <form>
            <Box display="flex" flexDirection="column" p={5} bgcolor="ThreeDFace" borderRadius={2}
              gap={2} boxShadow="0 0 10px rgba(0, 0, 0, 0.3)"
            >
              <Typography variant='h4' textAlign="center">Login</Typography>
              <Input type='email' placeholder='Email' />
              <Box position="relative">
                <Input type={showPass ? 'text' : 'password'} placeholder='Password' sx={{ width: "100%"}}/>
                <Button variant='outlined' onClick={handleShowPass} sx={{ 
                  fontSize: "11px", position: 'absolute', right: 0, bottom: 5
                }}>{showPass ? 'Hide' : 'Show'}</Button>
              </Box>
              <Button variant='contained' type='submit'>Login</Button>
              <Typography>Don't have an account? <Link to='/register'>register</Link></Typography>
            </Box>
          </form>
        </Box>
    </Box>
  )
}
