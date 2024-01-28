import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, MenuItem, Select } from '@mui/material'
import { useState } from 'react'

// eslint-disable-next-line react/prop-types
export const EditDialog = ({ handleClose, task, id, status, handleUpdate, flag}) => {
    const [todo, setTodo] = useState({
        task,
        status,
    })

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setTodo({
            ...todo,
            [name]: value
        })
    }

    const handleSubmit = () => {
        handleUpdate(todo, id);
    }

    return (
        <Box>
            <Dialog
                open
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {flag ? 'Edit' : 'Create'} Todo
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description" width="500px"
                    display="flex" flexDirection="column" gap={3}
                >
                    <Box display="flex" flexDirection="column">
                        <label>Task</label>
                        <Input type='text' name='task' value={todo.task} onChange={handleChange} required/>
                    </Box>

                    { flag && <Box display="flex" flexDirection="column">
                        <label>Status</label>
                        <Select value={todo.status} name='status' onChange={handleChange}>
                            <MenuItem value='PENDING' style={{ padding: "15px"}}>Pending</MenuItem>
                            <MenuItem value='DONE' style={{ padding: "15px"}}>Done</MenuItem>
                        </Select>
                    </Box> }
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} autoFocus variant='contained'>
                        { flag ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
