import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogTitle, DialogContent, DialogContentText, Button } from '@mui/material';

const WinDialog = ({ open, handleNewGame, handleClose}) => {
  return (
		<Dialog open={open}>
    	<DialogTitle>Congratulations!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You found all pairs! Do you want to play again?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center"}}>
					<Button variant="outlined" onClick={handleClose}>No, thanks.</Button>
					<Button variant="contained" style={{ backgroundColor: "#8bc34a"}} onClick={handleNewGame}>Yeah, sure!</Button>
        </DialogActions>
    </Dialog>
	)
}

export default WinDialog;