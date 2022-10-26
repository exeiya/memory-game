import { useState, useEffect } from 'react';
import { Container, Grid, Drawer, Button, Typography } from '@mui/material';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import WordCard from './WordCard';
import WinDialog from './WinDialog';
import SettingsMenu from './SettingsMenu';
import ScoreBoard from './ScoreBoard';
import bgpicture from './assets/tic-tac-toe.png';
import styled from '@emotion/styled';

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

const wordPairs = [
  { id: "1", targetLang: "반려동물", translation: "a pet" },
  { id: "2", targetLang: "강아지", translation: "a puppy" },
  { id: "3", targetLang: "고양이", translation: "a cat" },
  { id: "4", targetLang: "물고기", translation: "a fish" },
  { id: "5", targetLang: "토끼", translation: "a rabbit" },
  { id: "6", targetLang: "새", translation: "a bird" },
  { id: "7", targetLang: "개", translation: "a dog" },
  { id: "8", targetLang: "햄스터", translation: "a hamster" },
]

function App() {
  const [selected, setSelected] = useState([]); 
  const [found, setFound] = useState([]);
  const [words, setWords] = useState([]);
  const [gameFinished, setGameFinished] = useState(false)
  const [newGame, setNewGame] = useState(false)
  const [score, setScore] = useState(0)
  const [highscore, setHighscore] = useState()

  useEffect(() => {
    let wordList = [];
    wordPairs.forEach((v, i) => {
      wordList.push({ id: v.id, word: v.targetLang })
      wordList.push({ id: v.id, word: v.translation })
    })
    wordList = shuffleWords(wordList)
    setWords(wordList)
    setScore(0)
    const existingHighscore = window.localStorage.getItem('highscore')
    if (existingHighscore) {
      setHighscore(parseInt(existingHighscore))
    }
  }, [])

  useEffect(() => {
    if (newGame) {
      setTimeout(() => {
        setWords(shuffleWords(words))
      }, 400)
      setNewGame(false)
      setSelected([])
      setFound([])
      setGameFinished(false)
      setScore(0)
    }
  }, [words, newGame])

  const shuffleWords = (array) => {
    let arr = [...array]
    let remainingWordsAmount = arr.length
    let unshuffledWord, currentLastWord

    while (remainingWordsAmount) {
      unshuffledWord = Math.floor(Math.random() * remainingWordsAmount--)
      currentLastWord = arr[remainingWordsAmount]
      arr[remainingWordsAmount] = arr[unshuffledWord]
      arr[unshuffledWord] = currentLastWord
    }

    return arr
  }

  const handleSelect = (item) => {
    const currSelected = [...selected, item]
    const newScore = score + 1
    console.log('clicked', item)
    if (currSelected.length < 2) {
      setSelected(currSelected)
      setScore(newScore)
    } else if (currSelected.length === 2) {
      setSelected(currSelected)
      setScore(newScore)
      if (currSelected[0].id === currSelected[1].id) {
        const currFound = [...found, currSelected[0], currSelected[1]]
        setFound(currFound)
        if (currFound.length === words.length) {
          console.log("all pairs found!")
          setGameFinished(true)
          if (!highscore || (newScore < highscore)) {
            setHighscore(newScore)
            window.localStorage.setItem("highscore", newScore)
          }
        }
      }
      setTimeout(() => setSelected([]), 700)
    }
  }

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
    <div className="App" style={{ backgroundImage: `url(${bgpicture})`, height:'100vh', display: "flex"}}>
      <Drawer variant="permanent" anchor="left" sx={{
        width: "250px",
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
          onClick={() => setNewGame(!newGame)}
          startIcon={<RestartAltRoundedIcon />}>
            New game
        </Button>
        <ScoreBoard score={score} highscore={highscore} />
        <SettingsMenu />
      </Drawer>
      <Container style={{ maxHeight: 1000, maxWidth: 1200}}>
        <WinDialog open={gameFinished} handleNewGame={() => setNewGame(!newGame)} handleClose={() => setGameFinished(false)}/>
        <Grid sx={{height: 720, position: "relative"}} container columns={{ lg: 12, md: 8, sm: 3 }} spacing={0.5} justifyContent="center" alignItems="center">
          {cardItems()}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
