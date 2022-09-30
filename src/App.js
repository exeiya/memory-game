import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";

import WordCard from './WordCard';
import WinDialog from './WinDialog';
import { useState, useEffect } from 'react';


function App() {
  const [wordPairs, setWordPairs] = useState([
    { id: "1", targetLang: "반려동물", translation: "a pet" },
    { id: "2", targetLang: "강아지", translation: "a puppy" },
    { id: "3", targetLang: "고양이", translation: "a cat" },
    { id: "4", targetLang: "물고기", translation: "a fish" },
    { id: "5", targetLang: "토끼", translation: "a rabbit" },
    { id: "6", targetLang: "새", translation: "a bird" },
    { id: "7", targetLang: "개", translation: "a dog" },
    { id: "8", targetLang: "햄스터", translation: "a hamster" },
  ]);
  
  const [selected, setSelected] = useState([]); 
  const [found, setFound] = useState([]);
  const [words, setWords] = useState([]);
  const [gameFinished, setGameFinished] = useState(false)

  useEffect(() => {
    let wordList = [];
    wordPairs.forEach((v, i) => {
      wordList.push({ id: v.id, word: v.targetLang })
      wordList.push({ id: v.id, word: v.translation })
    })
    setWords(wordList)
  }, [])

  const handleSelect = (item) => {
    const currSelected = [...selected, item]
    console.log('clicked', item)
    if (currSelected.length < 2) {
      setSelected(currSelected)
    } else if (currSelected.length === 2) {
      setSelected(currSelected)
      if (currSelected[0].id === currSelected[1].id) {
        const currFound = [...found, currSelected[0], currSelected[1]]
        setFound(currFound)
        if (currFound.length === words.length) {
          console.log("all pairs found!")
          setGameFinished(true)
        }
      }
      setTimeout(() => setSelected([]), 700)
    }
  }

  const startNewGame = () => {
    setGameFinished(false)
    setSelected([])
    setFound([])
  }

  const isCardOpen = (word) => (selected.find(elem => elem.word === word) || found.find(elem => elem.word === word)) ? true : false

  const cardItems = () => words.reduce((prev, curr) => {
    prev.push(
      <WordCard 
        word={curr.word} 
        isSelected={isCardOpen(curr.word)}
        handleSelect={() => handleSelect(curr)}
      />)
    return prev
  }, []).map((v, i) => <Grid key={i} item md={3}>{v}</Grid>)

  return (
    <div className="App">
      <Typography variant="h5">Memory Game</Typography>
      <Container style={{ height: 900, maxWidth: 900}}>
        <WinDialog open={gameFinished} handleNewGame={startNewGame} handleClose={() => setGameFinished(false)}/>
        <Grid sx={{height: '100%'}} container columns={{ md: 12 }} spacing={1} justifyContent="center">
          {cardItems()}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
