import { Grid } from "@mui/material";
import WordCard from "./WordCard";

const CardGrid = ({ words, selected, found, handleSelect }) => {
  const cardItems = () => words.reduce((prev, curr) => {
    prev.push(
      <WordCard 
        word={curr.word} 
        isSelected={selected.find(elem => elem.word === curr.word) ? true : false}
        isFound={found.find(elem => elem.word === curr.word) ? true : false}
        handleSelect={() => handleSelect(curr)}
      />)
    return prev
  }, []).map((v, i) => <Grid key={i} item lg={2} md={2} sm={1}>{v}</Grid>)

  return (
    <Grid sx={{height: 720, position: "relative"}} container columns={{ lg: 12, md: 8, sm: 3 }} spacing={0.5} justifyContent="center" alignItems="center">
      {cardItems()}
    </Grid>
  )
}

export default CardGrid