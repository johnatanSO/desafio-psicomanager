'use client'

import { useContext, useState } from 'react'
import { Divider, Popover, Typography } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faComments,
  faEllipsis,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'

import style from './Post.module.scss'
import { AlertContext } from '@/contexts/alertContext'
import { deletePostService } from '@/services/posts/deletePost/deletePostService'
import { IPost } from '../interfaces/IPost'

type Props = {
  title: string
  body: string
  id: number
  handleEditPost: (postToEdit: IPost) => void
  handleShowComments: (postId: number) => void
  getPosts: () => void
}

export function Post({
  title,
  body,
  id,
  getPosts,
  handleEditPost,
  handleShowComments,
}: Props) {
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
          text: 'Postagem excluida com sucesso',
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
          text: `Erro ao tentar excluir a postagem - ${err?.response?.data?.message || err?.message}`,
          type: 'error',
        })
      })
  }

  function handleDeletePost() {
    setAnchorOptions(null)
    // Alerta de confirmação para remover uma postagem, como pedido no case do desafio.
    setAlertConfirmConfigs({
      ...alertConfirmConfigs,
      open: true,
      title: 'Alerta de confirmação',
      text: 'Atenção! Ao excluir esta postagem os comentários também serão excluídos.',
      textColor: '#ed4252',
      onClickAgree: onDeletePost,
    })
  }

  return (
    <li className={style.postContainer}>
      <header>
        <b
          onClick={() => {
            // Eu não colocaria este onClick aqui, deixaria ele somente no botão do canto superior direito,
            // Porém, no case do desafio, é pedido para que seja aberto os comentários ao clicar em qualquer área da postagem,
            // então resolvi deixar.
            handleShowComments(id)
          }}
        >
          {id || '--'}
        </b>

        <Divider orientation="vertical" />

        <h4
          onClick={() => {
            handleShowComments(id)
          }}
        >
          {title || '--'}
        </h4>

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
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Typography>
            <div className={style.optionsContainer}>
              <button
                className={style.editButton}
                type="button"
                onClick={() => {
                  handleEditPost({ title, body, id })
                  setAnchorOptions(null)
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

      <main
        onClick={() => {
          handleShowComments(id)
        }}
      >
        <p>{body || '--'}</p>
      </main>

      <footer>
        <button
          className={style.showCommentsButton}
          onClick={() => {
            handleShowComments(id)
          }}
          type="button"
        >
          <FontAwesomeIcon icon={faComments} className={style.icon} />
          Comentários
        </button>
      </footer>
    </li>
  )
}
