import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import styled from '@emotion/styled';
import { css } from '@mui/material';
import { CardActionArea } from '@mui/material';

const FlipCardContainer = styled.div`
  display: flex;
  width: 150px;
  height: 150px;
  position: relative;
  -webkit-perspective: 1000px;
  perspective: 1000px;
`

const CardArea = css`
  width: 100%;
  min-width: 100%;
  height: 100%;
  display: flex;
  backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
`

/* -webkit-transform property is for fixing 
   -webkit-backface-visibility: hidden;
   as it currently bugs on chrome
*/
const CardFront = styled(Card)`
  ${CardArea}
  -webkit-transform: translate3d(0, 0, 0);
`

const CardBack = styled(Card)`
  ${CardArea}
  background: #b8e2ff;
  transform: rotateY(-180deg) translate(100%, 0);
`

const FlipCardInner = styled.div`
  flex: 1;
  display: flex;
  transition: transform 400ms;
  transform-style: preserve-3d;

  &.flipped {
    transform: rotateY(180deg);
  }
`

const CardFrontContent = styled(CardContent)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &.found {
    color: #6bc2ff;
    box-shadow: inset 0 0 4px 1px #6bc2ff;
    background: #b8e2ff;
  }

  &:last-child {
    padding-bottom: 16px;
  }
`

// Simply to give some texture for the back of a card
const BackgroundSquare = styled.div`
  height: 90%;
  width: 90%;
  background-color: #6bc2ff;
  border-radius: 2px;
  margin: auto;
  position: relative;
`

function WordCard({word, isSelected, isFound, handleSelect}) {
  //console.log(word, isSelected, isFound)

  return (
    <FlipCardContainer>
      <FlipCardInner className={isSelected || isFound ? "" : "flipped"}>
        <CardFront>
            <CardFrontContent className={isFound ? "found" : ""}>
              <Typography variant="h5">{word}</Typography>
            </CardFrontContent>
        </CardFront>
        <CardBack onClick={handleSelect}>
          <CardActionArea>
            <BackgroundSquare />
          </CardActionArea>
        </CardBack>
      </FlipCardInner>
    </FlipCardContainer>
  )
}

export default WordCard;