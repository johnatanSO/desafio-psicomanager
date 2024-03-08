import { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import style from './PostForm.module.scss'
import { IPostDataForm } from '../interfaces/IPostDataForm'
import { AlertContext } from '@/contexts/alertContext'
import { createPostService } from '@/services/posts/createPost/createPostService'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { Loading } from '@/components/_ui/Loading'
import { Modal } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
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
  } = useForm<IPostDataForm | IPost>({
    defaultValues: postToEdit || defaultValuesNewPost,
  })

  const onCreatePost: SubmitHandler<IPostDataForm> = ({ title, body }) => {
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

  return (
    <Modal open={open} onClose={handleClose} className={style.overlay}>
      <section className={style.content}>
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
          <form onSubmit={handleSubmit(onCreatePost)}>
            <CustomTextField
              size="small"
              className={style.input}
              fullWidth
              placeholder="Título"
              {...register('title', { required: true })}
            />

            <CustomTextField
              size="small"
              fullWidth
              rows={3}
              multiline
              className={style.input}
              placeholder="Escreva a sua mensagem..."
              {...register('body', { required: true })}
            />
          </form>
        </main>

        <footer>
          <button
            className={style.submitButton}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loading size={18} /> : 'Postar'}
          </button>
        </footer>
      </section>
    </Modal>
  )
}
