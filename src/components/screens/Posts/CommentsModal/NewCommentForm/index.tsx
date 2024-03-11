import { Divider } from '@mui/material'
import style from './NewCommentForm.module.scss'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IComment } from '../../interfaces/IComments'
import { createCommentService } from '@/services/posts/createComment/createCommentService'
import { useContext } from 'react'
import { AlertContext } from '@/contexts/alertContext'

type Props = {
  postId: number
  handleClose: () => void
}

export function NewCommentForm({ postId, handleClose }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const defaultValuesNewPost = {
    name: '',
    body: '',
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<IComment>({
    defaultValues: defaultValuesNewPost,
  })

  const onCreateComment: SubmitHandler<IComment> = ({ name, body }) => {
    createCommentService({ name, body, postId })
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Comentário realizado com sucesso.',
          type: 'success',
        })

        reset(defaultValuesNewPost)
        handleClose()
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar realizar comentário - ${err?.response?.data?.message || err?.message || ''}`,
          type: 'error',
        })
      })
  }

  return (
    <li className={style.itemContainer}>
      <form onSubmit={handleSubmit(onCreateComment)}>
        <header>
          <CustomTextField
            required
            fullWidth
            className={style.titleInput}
            placeholder="Título"
            size="small"
            label="Título"
            error={!!errors.name}
            {...register('name', { required: true })}
          />
          <button
            onClick={() => {
              reset(defaultValuesNewPost)
              handleClose()
            }}
            type="button"
            className={style.cancelCommentButton}
          >
            Cancelar
          </button>
          <button
            disabled={isSubmitting}
            className={style.confirmCommentButton}
            type="submit"
          >
            Comentar
          </button>
        </header>

        <Divider />

        <main>
          <CustomTextField
            className={style.commentInput}
            placeholder="Comentário"
            rows={2}
            fullWidth
            required
            label="Comentário"
            multiline
            error={!!errors.body}
            {...register('body', { required: true })}
          />
        </main>
      </form>
    </li>
  )
}
