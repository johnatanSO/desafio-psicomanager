import http from '@/http'

export function deletePostService(postId: string) {
  return http.delete(`/posts/${postId}`)
}
