import style from './Post.module.scss'
import { Divider, Skeleton } from '@mui/material'

// Postagem que será exibida enquanto as postagens reais não forem carregadas ainda.
export function SkeletonPost() {
  return (
    <li className={style.postContainer}>
      <header>
        <Skeleton
          variant="rectangular"
          width="30px"
          className={style.skeleton}
        />

        <Divider orientation="vertical" />

        <Skeleton
          variant="rectangular"
          width="100%"
          className={style.skeleton}
        />

        <Skeleton
          variant="rectangular"
          width="30px"
          className={style.skeleton}
        />
      </header>

      <main>
        <Skeleton
          variant="rectangular"
          height="100px"
          className={style.skeleton}
        />
      </main>

      <footer>
        <Skeleton
          variant="rectangular"
          width="130px"
          height="30px"
          className={style.skeleton}
        />
      </footer>
    </li>
  )
}
