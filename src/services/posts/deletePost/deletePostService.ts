import http from '@/http'

export function deletePostService(postId: number) {
  return http.delete(`/posts/${postId}`)
}
