'use client'

import { ReactNode, createContext, useState } from 'react'
import { AlertConfirm } from '@/components/_ui/AlertConfirm/index'
import { AlertNotify } from '@/components/_ui/AlertNotify/index'

interface AlertContextComponentProps {
  children: ReactNode
}

interface AlertConfirmConfigs {
  open: boolean
  title: string
  text: string
  textColor?: string
  handleClose: () => void
  onClickAgree(): Promise<void>
}

interface AlertNotifyConfigs {
  open: boolean
  type: 'success' | 'error'
  text: string
  handleClose: () => void
}

interface AlertContextInterface {
  alertConfirmConfigs: AlertConfirmConfigs
  setAlertConfirmConfigs: (alertConfigs: AlertConfirmConfigs) => void
  alertNotifyConfigs: AlertNotifyConfigs
  setAlertNotifyConfigs: (notifyConfigs: AlertNotifyConfigs) => void
}

export const AlertContext = createContext({} as AlertContextInterface)

export function AlertContextComponent({
  children,
}: AlertContextComponentProps) {
  const [alertConfirmConfigs, setAlertConfirmConfigs] =
    useState<AlertConfirmConfigs>({
      open: false,
      title: '',
      text: '',
      handleClose: onCloseAlertConfirm,
      onClickAgree: async () => undefined,
    })

  const [alertNotifyConfigs, setAlertNotifyConfigs] =
    useState<AlertNotifyConfigs>({
      open: false,
      text: '',
      type: 'success',
      handleClose: onCloseNotify,
    })

  // Função que faz o reset de configurações do alerta de notificação.
  function onCloseNotify() {
    setAlertNotifyConfigs({
      ...alertNotifyConfigs,
      open: false,
      text: '',
      type: 'success',
    })
  }

  // Função que faz o reset de configurações do alerta de confirmação.
  function onCloseAlertConfirm() {
    setAlertConfirmConfigs({
      ...alertConfirmConfigs,
      open: false,
      title: '',
      text: '',
      onClickAgree: async () => undefined,
    })
  }

  return (
    <AlertContext.Provider
      value={{
        alertConfirmConfigs,
        setAlertConfirmConfigs,
        alertNotifyConfigs,
        setAlertNotifyConfigs,
      }}
    >
      {children}

      <AlertConfirm />

      <AlertNotify />
    </AlertContext.Provider>
  )
}
