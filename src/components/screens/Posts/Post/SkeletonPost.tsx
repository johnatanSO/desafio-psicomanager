'use client'

import style from './Post.module.scss'
import { Skeleton } from '@mui/material'

export function SkeletonPost() {
  return (
    <li className={style.postContainer}>
      <header>
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
