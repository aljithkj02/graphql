import { Box, Button, Input, Typography } from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { REGISTER_USER } from '../utils/mutations'
import { storeToken } from '../utils/localStorage.js'

export const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [registerUser] = useMutation(REGISTER_USER);
  
  const navigate = useNavigate();

  const handleShowPass = () => {
    setShowPass(!showPass);
  }

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerUser({
        variables: {
          ...userInfo
        }
      })
      
      if(data?.registerUser?.status) {
        storeToken(data.registerUser.token);
        navigate('/');
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  }

  return (
    <Box width="100%" height="100vh" display="flex" alignItems="center" justifyContent="center">
        <Box width="30%">
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" p={5} bgcolor="ThreeDFace" borderRadius={2}
              gap={2} boxShadow="0 0 10px rgba(0, 0, 0, 0.3)"
            >
              <Typography variant='h4' textAlign="center">Register</Typography>
              <Input type='text' placeholder='Name' name='name' onChange={handleChange} required/>
              <Input type='email' placeholder='Email' name="email" onChange={handleChange} required/>
              <Box position="relative">
                <Input type={showPass ? 'text' : 'password'} placeholder='Password' sx={{ width: "100%"}}
                  name='password' onChange={handleChange} required
                />
                <Button variant='outlined' onClick={handleShowPass} sx={{ 
                  fontSize: "11px", position: 'absolute', right: 0, bottom: 5
                }}>{showPass ? 'Hide' : 'Show'}</Button>
              </Box>
              <Button variant='contained' type='submit'>Register</Button>
              <Typography>Already have an account? <Link to='/login'>login</Link></Typography>
            </Box>
          </form>
        </Box>
    </Box>
  )
}
