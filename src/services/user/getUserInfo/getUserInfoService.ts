import axios from 'axios'

export function getUserInfoService() {
  return axios.get('https://api.github.com/users/johnatanSO')
}
