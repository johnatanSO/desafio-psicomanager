import http from '@/http'

interface IUpdatePostParams {
  title: string
  body: string
  id: string
}

export function updatePostService({ title, body, id }: IUpdatePostParams) {
  const bodyRequest = {
    title,
    body,
  }

  return http.put(`/posts/${id}`, bodyRequest)
}
