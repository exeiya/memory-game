import { Drawer, Button, Typography } from "@mui/material";
import styled from "@emotion/styled";
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';

const TitleBackground = styled.div`
  position: relative;
  height: 70px;
  margin-top: 20px;
  margin-bottom: 30px;
  padding-top: 10px;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: -12px;
    right: 0;
    bottom: 0;
    transform: skewY(-9deg);
    background-color: #4db6ff;
    box-shadow: 0px 10px #6bc2ff;
  }
`;

const TitleText = styled(Typography)`
  padding-top: 10px;
  position: relative; 
  color: white;
  font-weight: bold; 
  text-shadow: 1px 1px 4px #001529;
`

const GameMenuDrawer = ({ setNewGame, children }) => {
  return (
    <Drawer variant="permanent" anchor="left" sx={{
      width: "250px",
      height: "100%",
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: "250px",
        boxSizing: 'border-box',
        background: "linear-gradient(171deg, #020024 0%, #5dabf4 50%, #00d4ff 100%)",
        color: "white",
      },
    }}>
      <TitleBackground>
        <TitleText variant="h5" gutterBottom align="center">Memory Game</TitleText>
      </TitleBackground>
      <Button 
        style={{ alignSelf: "center", marginBottom: "8px" }}
        variant="contained" 
        onClick={setNewGame}
        startIcon={<RestartAltRoundedIcon />}>
          New game
      </Button>
      {children}
    </Drawer>
  )
}

export default GameMenuDrawer