import { Divider, Box, Typography, Select, MenuItem, FormControl, Button } from "@mui/material"
import ListIcon from '@mui/icons-material/List';

const SettingsMenu = ({ deckTitles, currentDeck, handleDeckChange, showWords }) => {
  return (
    <Box sx={{ padding: "10px" }}>
      <Divider sx={{ marginBottom: "10px" }}><Typography variant="button">Settings</Typography></Divider>
      <Typography variant="button">Card deck</Typography>
      <FormControl fullWidth size="small">
        <Select onChange={handleDeckChange} value={currentDeck ?? ""} sx={{ backgroundColor: "#0c66b394", color:"white" }} MenuProps={{ sx: { left: "-6px" } }}>
          {deckTitles.map((deck, i) => <MenuItem key={i} value={deck}><Typography>{deck}</Typography></MenuItem>)}
        </Select>
      </FormControl>
      <div style={{ display: "flex", justifyContent: "center" }}>
      <Button style={{ marginTop: "5px" }}
        variant="contained"
        size="small"
        onClick={showWords}
        startIcon={<ListIcon />}>View words</Button>
      </div>
    </Box>
  )
}

export default SettingsMenu