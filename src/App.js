import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import WordCard from './WordCard';


function App() {

  const wordCards = () => Array.apply(null, Array(16)).map((v, i) => 
      <Grid key={`word${i}`} item md={3}><WordCard  word={`word ${i+1}`}/></Grid>
    );

  return (
    <div className="App">
      <Typography variant="h5">Memory Game</Typography>
      <Container style={{ height: 900, maxWidth: 900}}>
        <Grid sx={{height: '100%'}} container columns={{ md: 12 }} spacing={1} justifyContent="center">
          {wordCards()}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
