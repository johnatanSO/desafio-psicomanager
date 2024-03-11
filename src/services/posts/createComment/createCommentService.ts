import http from '@/http'

interface ICreateCommentParams {
  name: string
  body: string
  postId: number
}

export function createCommentService({
  name,
  body,
  postId,
}: ICreateCommentParams) {
  const bodyRequest = {
    name,
    body,
    postId,
  }

  return http.post('/comments', bodyRequest)
}
