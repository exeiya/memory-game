import { Divider, Box, Typography, Button } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styled from "@emotion/styled"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/loginReducer";

const UsernameDiv = styled.div`
  background-color: #13527a8c;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  border-radius: 2px 2px; 
`

const UserMenu = ({ handleShowLogin }) => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.login)

  const handleLogin = () => {
    handleShowLogin()
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Box sx={{ minHeight: "150px", padding: "10px" }}>
      <Divider sx={{ marginBottom: "10px"}}>
        <UsernameDiv>
          <AccountCircleIcon sx={{ paddingRight: "4px" }}/>
          <Typography variant="button" >{ loggedUser ? loggedUser.username : "Guest" }</Typography>
        </UsernameDiv>
      </Divider>
      <Box style={{ display: "flex", justifyContent: "center" }}>
      { loggedUser 
        ? <Button variant="contained" size="small" onClick={handleLogout}>Logout</Button>
        : <Button variant="contained" size="small" onClick={handleLogin}>Login</Button> 
      }
      </Box>
    </Box>
  )
}

export default UserMenu