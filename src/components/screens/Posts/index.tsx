'use client'

import { useEffect, useState } from 'react'

import { Post } from './Post'
import { PostFormModal } from './PostFormModal'
import style from './Posts.module.scss'
import { IPost } from './interfaces/IPost'
import { Empty } from '@/components/_ui/Empty'
import { listPostsService } from '@/services/posts/listPosts/listPostsService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { SkeletonPost } from './Post/SkeletonPost'
import { CommentsModal } from './CommentsModal'

export function Posts() {
  const [posts, setPosts] = useState<IPost[]>([])
  const [modalPostFormOpened, setModalPostFormOpened] = useState<boolean>(false)
  const [modalCommentsOpened, setModalCommentsOpened] = useState<boolean>(false)
  const [postToEdit, setPostToEdit] = useState<IPost | null>(null)
  const [postCommentsId, setPostCommentsId] = useState<number | null>(null)
  const [loadingPosts, setLoadingPosts] = useState<boolean>(true)
  const skeletonPosts = [1, 2, 3, 4, 5]

  function getPosts() {
    setLoadingPosts(true)

    listPostsService()
      .then(({ data }) => {
        // Colocando as postagens em ordem alfabética pelo título, como pedido no case do desafio.
        const ordenedPosts = data.sort((a: IPost, b: IPost) => {
          if (a.title < b.title) {
            return -1
          }

          if (a.title > b.title) {
            return 1
          }

          return 0
        })

        setPosts(ordenedPosts)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setLoadingPosts(false)
      })
  }

  function handleEditPost(post: IPost) {
    setPostToEdit(post)
    setModalPostFormOpened(true)
  }

  function handleNewPost() {
    setModalPostFormOpened(true)
  }

  function handleShowComments(postId: number) {
    setModalCommentsOpened(true)
    setPostCommentsId(postId)
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <>
      <section className={style.listHeader}>
        <button
          className={style.newPostButton}
          type="button"
          onClick={handleNewPost}
        >
          <FontAwesomeIcon icon={faPlus} className={style.icon} />
          Novo post
        </button>

        <h4>Minhas postagens</h4>
      </section>

      {!loadingPosts && posts.length === 0 && (
        <Empty text="Nenhum post encontrado" />
      )}

      {/* No case fornecido para o desafio, não ficou muito claro se era OBRIGATÓRIO a utilização de uma <table> para exibir as postagens. */}
      {/* Fiz a listagem com uma <ul>, pois achei que seria mais "semântico", mas todos os itens pedidos estão sendo exibidos (id, title, body) */}
      <ul className={style.listPosts}>
        {!loadingPosts &&
          posts.length > 0 &&
          posts.map((post) => {
            return (
              <Post
                key={post.id}
                title={post.title}
                body={post.body}
                id={post.id}
                getPosts={getPosts}
                handleEditPost={handleEditPost}
                handleShowComments={handleShowComments}
              />
            )
          })}

        {/* Lista com modelo de postagens que será exibida enquanto as postagens reais não forem carregadas ainda. */}
        {loadingPosts &&
          skeletonPosts.map((skeletonItem) => {
            return <SkeletonPost key={skeletonItem} />
          })}
      </ul>

      {/* O mesmo modal para cadastro e atualização de uma postagem  */}
      {modalPostFormOpened && (
        <PostFormModal
          getPosts={getPosts}
          posts={posts}
          open={modalPostFormOpened}
          postToEdit={postToEdit}
          handleClose={() => {
            setModalPostFormOpened(false)
            if (postToEdit) setPostToEdit(null)
          }}
        />
      )}

      {modalCommentsOpened && postCommentsId && (
        <CommentsModal
          open={modalCommentsOpened}
          postId={postCommentsId}
          handleClose={() => {
            setModalCommentsOpened(false)
            setPostCommentsId(null)
          }}
        />
      )}
    </>
  )
}
