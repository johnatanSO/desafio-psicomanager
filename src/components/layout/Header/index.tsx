import Image from 'next/image'
import style from './Header.module.scss'
import logoImage from '../../../../public/assets/images/logo.png'
import { Avatar } from '@mui/material'
import { getUserInfoService } from '@/services/user/getUserInfo/getUserInfoService'
import Link from 'next/link'

export async function Header() {
  /* Utilizando o Server Side do Next para buscar os dados de usuário da API do Github,
  no caso estou fazendo a busca da minha própria conta. */
  const { data: userInfo } = await getUserInfoService()

  return (
    <header className={style.headerContainer}>
      <Image
        src={logoImage}
        width={600}
        height={600}
        className={style.logoImage}
        alt="Logo do sistema"
      />

      <h1>Desafio Psicomanager</h1>

      <Link
        target="_blank"
        className={style.link}
        href="http://github.com/johnatanSO"
      >
        <h4 className={style.userName}>{userInfo?.name || '--'}</h4>
        <Avatar
          alt={userInfo?.name}
          src={userInfo?.avatar_url}
          className={style.avatar}
        />
      </Link>
    </header>
  )
}
