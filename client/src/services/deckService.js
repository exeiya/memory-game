import axios from "axios";

const url = "http://localhost:3001/api/decks"

const getAll = async () => {
   const response = await axios.get(url)
   console.log(response.data)
   return response.data
}

export default { getAll }