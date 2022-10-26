import { Divider, Box, Typography, Stack } from "@mui/material"
import styled from '@emotion/styled';

const ScoreBox = styled.div`
  background-color: #6bc2ff;
  padding: 5px;
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  box-shadow: inset 0 0 0px 4px #b8e2ff, 1px 1px 2px #545454;
  margin: 5px 0 10px 0;
`

const HighScoreBox = styled(ScoreBox)`
  background-color: #f5bb00;
  box-shadow: inset 0 0 0px 4px #ffe800, 1px 1px 2px #545454;
  color: white;
`

const ScoreTypography = styled(Typography)`
  font-size: 26px; 
  text-shadow: 1px 1px 3px #262626;
`

const ScoreAlignment = styled.div`
  display: flex; 
  justify-content: center;
  align-items: center; 
  width: 100%;
`

const ScoreBoard = ({ score, highscore }) => {
  return (
    <Box sx={{ padding: "10px"}}>
      <Divider>
        <Typography variant="button">Scoreboard</Typography>
      </Divider>
      <Stack alignItems="center">
      <ScoreAlignment>
        <Typography variant="button" sx={{ margin: "10px" }}>Score</Typography>
        <ScoreBox>
          <ScoreTypography>{score}</ScoreTypography>
        </ScoreBox>
      </ScoreAlignment>
      <ScoreAlignment>
        <Typography variant="button" sx={{ margin: "10px" }}>Highscore</Typography>
        <HighScoreBox>
          <ScoreTypography>{ highscore ?? 0 }</ScoreTypography>
        </HighScoreBox>
        </ScoreAlignment>
      </Stack>
    </Box>
  )
}

export default ScoreBoard