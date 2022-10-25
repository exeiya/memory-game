import { Divider, Box, Typography, Button } from "@mui/material"
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';

const ScoreMenu = ({ handleNewGame }) => {
return (
  <Box sx={{ padding: "10px" }}>
    <Divider>
      <Typography variant="button">Score</Typography>
    </Divider>
    
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button 
        variant="contained" 
        onClick={handleNewGame}
        startIcon={<RestartAltRoundedIcon />}
      >New game</Button>
    </div>
  </Box>
  )
}

export default ScoreMenu