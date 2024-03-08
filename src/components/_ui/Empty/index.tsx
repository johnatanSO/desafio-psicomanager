import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './Empty.module.scss'
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

type Props = {
  text?: string
  icon?: IconDefinition
}

export function Empty({ text, icon }: Props) {
  return (
    <section className={style.container}>
      <FontAwesomeIcon className={style.icon} icon={icon || faSquareXmark} />
      <p className={style.text}>{text || 'Nenhum item encontrado'}</p>
    </section>
  )
}
