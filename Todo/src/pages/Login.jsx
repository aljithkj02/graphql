import { Box, Button, Input, Typography } from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../utils/mutations'

export const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  })
  const [ loginUser , { loading, error }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const handleShowPass = () => {
    setShowPass(!showPass);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({
        variables: {
          ...userInfo
        }
      })
      if(data?.loginUser?.id) {
        navigate('/');
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  }

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Box width="100%" height="100vh" display="flex" alignItems="center" justifyContent="center">
        <Box width="30%">
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" p={5} bgcolor="ThreeDFace" borderRadius={2}
              gap={2} boxShadow="0 0 10px rgba(0, 0, 0, 0.3)"
            >
              <Typography variant='h4' textAlign="center">Login</Typography>
              <Input type='email' placeholder='Email' required name="email" onChange={handleChange}/>
              <Box position="relative">
                <Input type={showPass ? 'text' : 'password'} placeholder='Password' sx={{ width: "100%"}} required 
                  name='password' onChange={handleChange}
                />
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
