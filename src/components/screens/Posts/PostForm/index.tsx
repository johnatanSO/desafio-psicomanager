import { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import style from './PostForm.module.scss'
import { AlertContext } from '@/contexts/alertContext'
import { createPostService } from '@/services/posts/createPost/createPostService'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { Loading } from '@/components/_ui/Loading'
import { Modal } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { updatePostService } from '@/services/posts/updatePost/updatePostService'
import { IPost } from '../interfaces/IPost'

type Props = {
  open: boolean
  postToEdit: IPost | null
  getPosts: () => void
  handleClose: () => void
}

export function PostForm({ getPosts, open, handleClose, postToEdit }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const defaultValuesNewPost = {
    title: '',
    body: '',
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<IPost>({
    defaultValues: postToEdit || defaultValuesNewPost,
  })

  const onCreatePost: SubmitHandler<IPost> = ({ title, body }) => {
    createPostService({ title, body })
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Post realizado com sucesso',
          type: 'success',
        })

        /* Observação: A API JSONPLACEHOLDER não faz a inserção de dados realmente, 
        então o novo post cadastrado não estará na listagem. */
        getPosts() // Fazendo a busca de novos posts.

        reset(defaultValuesNewPost)

        handleClose()
      })
      .catch((err) => {
        console.error(err)

        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar realizar o post - ${err?.response?.data?.message || err?.message}`,
          type: 'error',
        })
      })
  }

  const onUpdatePost: SubmitHandler<IPost> = ({ title, body, id }) => {
    updatePostService({ title, body, id })
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Post atualizado com sucesso',
          type: 'success',
        })

        /* Observação: A API JSONPLACEHOLDER não faz a inserção de dados realmente, 
        então o novo post cadastrado não estará na listagem. */
        getPosts() // Fazendo a busca de novos posts.

        handleClose()
      })
      .catch((err) => {
        console.error(err)

        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar atualizar o post - ${err?.response?.data?.message || err?.message}`,
          type: 'error',
        })
      })
  }

  return (
    <Modal open={open} onClose={handleClose} className={style.overlay}>
      <form
        onSubmit={handleSubmit(postToEdit ? onUpdatePost : onCreatePost)}
        className={style.content}
      >
        <header>
          <h3>Fazer novo post</h3>

          <button
            type="button"
            className={style.closeButton}
            onClick={handleClose}
          >
            <FontAwesomeIcon icon={faXmark} className={style.icon} />
          </button>
        </header>

        <main>
          <CustomTextField
            size="small"
            className={style.input}
            fullWidth
            placeholder="Título"
            label="Título"
            {...register('title', { required: true })}
          />

          <CustomTextField
            size="small"
            fullWidth
            rows={5}
            multiline
            label="Mensagem"
            className={style.input}
            placeholder="Escreva a sua mensagem..."
            {...register('body', { required: true })}
          />
        </main>

        <footer>
          <button
            className={style.submitButton}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loading size={18} />}
            {!isSubmitting && postToEdit && 'Editar'}
            {!isSubmitting && !postToEdit && 'Postar'}
          </button>
        </footer>
      </form>
    </Modal>
  )
}
