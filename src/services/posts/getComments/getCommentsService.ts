import http from '@/http'

export function getCommentsService(postId: number) {
  return http.get(`/comments?postId=${postId}`)
}
