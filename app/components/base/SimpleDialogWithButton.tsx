import { Button } from '@material-ui/core'
import React from 'react'
import SimpleDialog, { ISimpleDialogItem } from './SimpleDialog'

export const SimpleDialogWithButton: React.FunctionComponent<{
  id?: string

  onDialogClose?: any
  buttonText?: string
  dialogTitle?: string
  list: ISimpleDialogItem[]
}> = ({
  id,
  onDialogClose,
  list,
  dialogTitle,
  buttonText = 'Dialog Simple Button'
}) => {
  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (item: ISimpleDialogItem) => {
    setOpen(false)
    if (onDialogClose) {
      onDialogClose(item)
    }
  }

  return (
    <>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        {buttonText}
      </Button>
      <SimpleDialog
        id={id}
        open={open}
        dialogTitle={dialogTitle}
        onDialogClose={handleClose}
        list={list}
      />
    </>
  )
}
