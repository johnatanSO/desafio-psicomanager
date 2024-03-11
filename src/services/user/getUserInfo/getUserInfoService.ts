import axios from 'axios'

// Buscando dados da API do Github.
export function getUserInfoService() {
  return axios.get('https://api.github.com/users/johnatanSO')
}
