import { Dialog, DialogTitle, DialogContent, Table, TableHead, 
  TableRow, TableCell, TableBody, Button, DialogActions, DialogContentText } from "@mui/material"

const WordListDialog = ({ show, close, deck }) => {
  const title = deck ? deck.title : ""
  const content = deck ? deck.content : []

  return (
    <Dialog open={show} onClose={close}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ textAlign: "center" }}>Words in the deck:</DialogContentText>
        <Table>
            <TableHead>
              <TableRow>
                <TableCell>Korean</TableCell>
                <TableCell>English</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {content.map((pair, i) => 
                <TableRow key={i}>
                  <TableCell>{pair.targetLang}</TableCell>
                  <TableCell>{pair.translationLang}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={close}>Close</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default WordListDialog