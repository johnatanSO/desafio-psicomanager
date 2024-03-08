'use client'

import { useContext, useState } from 'react'
import { Divider, Popover, Typography } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

import style from './Post.module.scss'
import { AlertContext } from '@/contexts/alertContext'
import { deletePostService } from '@/services/posts/deletePost/deletePostService'
import { IPost } from '../interfaces/IPost'

type Props = {
  title: string
  body: string
  id: string
  handleEditPost: (postToEdit: IPost) => void
  getPosts: () => void
}

export function Post({ title, body, id, getPosts, handleEditPost }: Props) {
  const {
    alertConfirmConfigs,
    setAlertConfirmConfigs,
    alertNotifyConfigs,
    setAlertNotifyConfigs,
  } = useContext(AlertContext)

  const [anchorOptions, setAnchorOptions] = useState<HTMLElement | null>(null)

  async function onDeletePost() {
    deletePostService(id)
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Post excluido com sucesso',
          type: 'success',
        })

        /* Observação: A API JSONPLACEHOLDER não deleta os dados realmente, 
        então o post continuará na listagem. */
        getPosts() // Fazendo a busca de novos posts.
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar excluir o post - ${err?.response?.data?.message || err?.message}`,
          type: 'error',
        })
      })
  }

  function handleDeletePost() {
    setAlertConfirmConfigs({
      ...alertConfirmConfigs,
      open: true,
      title: 'Alerta de confirmação',
      text: 'Tem certezq que deseja realmente excluir este post?',
      textColor: '#ed4252',
      onClickAgree: onDeletePost,
    })
  }

  return (
    <li className={style.postContainer}>
      <header>
        <h4>{title || 'Título'}</h4>

        <button
          onClick={(event) => {
            setAnchorOptions(event?.currentTarget)
          }}
          type="button"
        >
          <FontAwesomeIcon className={style.icon} icon={faEllipsis} />
        </button>

        <Popover
          open={!!anchorOptions}
          anchorEl={anchorOptions}
          onClose={() => {
            setAnchorOptions(null)
          }}
        >
          <Typography>
            <div className={style.optionsContainer}>
              <button
                className={style.editButton}
                type="button"
                onClick={() => {
                  handleEditPost({ title, body, id })
                }}
              >
                <FontAwesomeIcon icon={faPen} className={style.icon} />
                Editar
              </button>

              <Divider />

              <button
                className={style.deleteButton}
                onClick={handleDeletePost}
                type="button"
              >
                <FontAwesomeIcon icon={faTrash} className={style.icon} />
                Excluir
              </button>
            </div>
          </Typography>
        </Popover>
      </header>

      <main>
        <p>{body || '--'}</p>
      </main>
    </li>
  )
}
