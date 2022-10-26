import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { Divider } from "@mui/material"

const SettingsMenu = () => {
  return (
    <Box sx={{ padding: "10px" }}>
      <Divider><Typography variant="button">Settings</Typography></Divider>
    </Box>
  )
}

export default SettingsMenu