import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField, FormControl, Link, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { loginUser } from "../reducers/loginReducer";
import styled from "@emotion/styled";

const ErrorArea = styled.div`
  color: #910404;
  background-color: #fad2d2;
  border: solid #d16666 1px;
  border-radius: 2px 2px;
  padding: 8px;
  width: 190px;
  text-align: center;
`

const LoginDialog = ({ show, handleShow }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState()
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault();
    
    try {
      await dispatch(loginUser({ username, password }))
      handleShow()
    } catch (err) {
      if (err.response.status === 401) {
        setError("Wrong username or password")
      } else {
        setError("Something went wrong")
      }
    }
    setUsername("")
    setPassword("")
  }

  const handleClose = () => {
    setError()
    setUsername("")
    setPassword("")
    handleShow()
  }

  return (
    <Dialog open={show} onClose={handleClose}>
    	<DialogTitle sx={{ textAlign: "center" }}>Login</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {error ? <ErrorArea><Typography>{error}</Typography></ErrorArea> : null}
          <form onSubmit={handleLogin}>
            <FormControl sx={{ margin: "10px" }}>
              <TextField sx={{ marginBottom: "10px" }} label="Username" onChange={(e) => setUsername(e.target.value)} value={username}/>
              <TextField sx={{ marginBottom: "10px" }} label="Password" onChange={(e) => setPassword(e.target.value)} value={password} type="password" />
              <Button type="submit" variant="contained" disabled={!username || !password}>Login!</Button>
            </FormControl>
          </form>
          <DialogContentText sx={{ marginTop: "20px" }}>
            <Link href="#">No account yet? Sign up here!</Link>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button variant="outlined" size="small" onClick={handleShow}>Cancel</Button>
        </DialogActions>
    </Dialog>
  )
}

export default LoginDialog