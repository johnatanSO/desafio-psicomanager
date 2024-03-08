import axios from 'axios'

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_END_POINT,
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})

export default http
