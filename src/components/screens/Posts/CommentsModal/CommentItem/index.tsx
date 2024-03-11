import { Avatar, Divider } from '@mui/material'
import style from './CommentItem.module.scss'

type Props = {
  name: string
  body: string
  email: string
}

export function CommentItem({ name, body }: Props) {
  return (
    <li className={style.itemContainer}>
      <header>
        <Avatar
          sx={{ width: 25, height: 25 }}
          className={style.avatar}
          alt={name || '--'}
        />
        <h5 className={style.username}>{name || '--'}</h5>
      </header>

      <Divider />

      <main>
        <p>{body || '--'}</p>
      </main>
    </li>
  )
}
