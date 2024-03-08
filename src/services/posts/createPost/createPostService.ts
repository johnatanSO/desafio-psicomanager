import http from '@/http'

interface ICreatePostParams {
  title: string
  body: string
}

export function createPostService({ title, body }: ICreatePostParams) {
  const bodyRequest = {
    title,
    body,
  }

  return http.post('/posts', bodyRequest)
}
