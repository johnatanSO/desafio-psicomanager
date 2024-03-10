import { Divider, Skeleton } from '@mui/material'
import style from './CommentItem.module.scss'

export function SkeletonCommentItem() {
  return (
    <li className={style.itemContainer}>
      <header>
        <Skeleton
          className={style.skeleton}
          width={25}
          height={25}
          variant="circular"
        />
        <Skeleton
          sx={{ marginRight: 'auto' }}
          className={style.skeleton}
          width={300}
          variant="rounded"
        />
      </header>

      <Divider />

      <main>
        <Skeleton className={style.skeleton} height={46} variant="rounded" />
      </main>
    </li>
  )
}
