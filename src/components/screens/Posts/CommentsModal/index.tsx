import style from './CommentsModal.module.scss'

import { Modal } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState } from 'react'
import { AlertContext } from '@/contexts/alertContext'
import { getCommentsService } from '@/services/posts/getComments/getCommentsService'
import { IComment } from '../interfaces/IComments'
import { Empty } from '@/components/_ui/Empty'
import { CommentItem } from './CommentItem'
import { SkeletonCommentItem } from './CommentItem/SkeletonCommentItem'

type Props = {
  open: boolean
  postId: number
  handleClose: () => void
}

export function CommentsModal({ open, handleClose, postId }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const [comments, setComments] = useState<IComment[]>([])
  const [loadingComments, setLoadingComments] = useState<boolean>(true)

  function getComments() {
    setLoadingComments(true)

    getCommentsService(postId)
      .then(({ data }) => {
        const ordenedComments = data.sort((a: IComment, b: IComment) => {
          if (a.name < b.name) {
            return -1
          }

          if (a.name > b.name) {
            return 1
          }

          return 0
        })
        setComments(ordenedComments)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao buscar comentários da postagem - ${err?.response?.data?.message || err?.message || ''}`,
        })
      })
      .finally(() => {
        setLoadingComments(false)
      })
  }

  const skeletonComments = [1, 2, 3, 4, 5]

  useEffect(() => {
    getComments()
  }, [])

  return (
    <Modal open={open} onClose={handleClose} className={style.overlay}>
      <section className={style.content}>
        <header>
          <h3>Comentários</h3>

          <button
            type="button"
            className={style.closeButton}
            onClick={handleClose}
          >
            <FontAwesomeIcon icon={faXmark} className={style.icon} />
          </button>
        </header>

        <main>
          {!loadingComments && comments.length === 0 && (
            <Empty text="Este post não tem comentários" />
          )}

          <ul className={style.listComments}>
            {!loadingComments &&
              comments.length > 0 &&
              comments.map((comment) => {
                return (
                  <CommentItem
                    body={comment.body}
                    email={comment.email}
                    name={comment.name}
                    key={comment.id}
                  />
                )
              })}

            {loadingComments &&
              skeletonComments.map((skeletonItem) => {
                return <SkeletonCommentItem key={skeletonItem} />
              })}
          </ul>
        </main>

        <footer></footer>
      </section>
    </Modal>
  )
}
