import axios from 'axios'

// Criando uma instância do axios e definindo o baseURL
const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_END_POINT,
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})

export default http
