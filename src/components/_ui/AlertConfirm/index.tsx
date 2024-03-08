import { useContext } from 'react'
import style from './AlertConfirm.module.scss'
import { Modal } from '@mui/material'
import { AlertContext } from '@/contexts/alertContext'

export function AlertConfirm() {
  const { alertConfirmConfigs } = useContext(AlertContext)

  if (!alertConfirmConfigs.open) return <></>

  return (
    <Modal
      open={alertConfirmConfigs.open}
      onClose={() => undefined}
      className={style.alertOverlay}
    >
      <div className={style.alertContainer}>
        <h3 className={style.title}>{alertConfirmConfigs.title || '--'}</h3>
        <p
          style={{ color: alertConfirmConfigs?.textColor || '' }}
          className={style.text}
        >
          {alertConfirmConfigs.text || '--'}
        </p>

        <div className={style.buttonsContainer}>
          <button
            className={style.cancelButton}
            onClick={alertConfirmConfigs.handleClose}
          >
            Cancelar
          </button>
          <button
            className={style.confirmButton}
            onClick={async () => {
              await alertConfirmConfigs.onClickAgree()
              alertConfirmConfigs.handleClose()
            }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </Modal>
  )
}
