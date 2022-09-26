import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function WordCard({word}) {
  return (
    <Card sx={{ width: 200, height: 200, margin: "auto", display: "flex" }}>
      <CardContent sx={{ margin: "auto", position: "relative" }}>
        <Typography variant="h5">{word}</Typography>
      
      </CardContent>
    </Card>
  );
}

export default WordCard;