'use client'

import { useEffect, useState } from 'react'

import { Post } from './Post'
import { PostForm } from './PostForm'
import style from './Posts.module.scss'
import { IPost } from './interfaces/IPost'
import { Empty } from '@/components/_ui/Empty'
import { listPostsService } from '@/services/posts/listPosts/listPostsService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export function Posts() {
  const [posts, setPosts] = useState<IPost[]>([])
  const [modalPostFormOpened, setModalPostFormOpened] = useState<boolean>(false)
  const [postToEdit, setPostToEdit] = useState<IPost | null>(null)

  function getPosts() {
    listPostsService()
      .then((res) => {
        setPosts(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function handleEditPost(post: IPost) {
    setPostToEdit(post)
  }

  function handleNewPost() {
    setModalPostFormOpened(true)
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <>
      <button
        className={style.newPostButton}
        type="button"
        onClick={handleNewPost}
      >
        <FontAwesomeIcon icon={faPlus} className={style.icon} />
        Novo post
      </button>

      {posts.length === 0 && <Empty text="Nenhum post encontrado" />}

      {posts.length > 0 && (
        <ul className={style.listPosts}>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                title={post.title}
                body={post.body}
                id={post.id}
                getPosts={getPosts}
                handleEditPost={handleEditPost}
              />
            )
          })}
        </ul>
      )}

      {modalPostFormOpened && (
        <PostForm
          getPosts={getPosts}
          open={modalPostFormOpened}
          postToEdit={postToEdit}
          handleClose={() => {
            setModalPostFormOpened(false)
          }}
        />
      )}
    </>
  )
}
