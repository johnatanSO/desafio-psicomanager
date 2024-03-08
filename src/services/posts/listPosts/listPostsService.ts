import http from '@/http'

export function listPostsService() {
  return http.get('/posts')
}
