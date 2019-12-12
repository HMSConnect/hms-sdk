import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogActions from '@material-ui/core/DialogActions'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import React from 'react'

const styles = (theme: Theme) =>
  createStyles({
    closeButton: {
      color: theme.palette.grey[500],
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1)
    },
    root: {
      margin: 0,
      padding: theme.spacing(2)
    }
  })

export interface IDialogTitleProps extends WithStyles<typeof styles> {
  id: string
  children: React.ReactNode
  onClose: () => void
}

const DialogTitle = withStyles(styles)((props: IDialogTitleProps) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent)

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions)

const Modal: React.FunctionComponent<{
  id?: string
  modalTitle?: string
  isOpen: boolean
  fullScreen?: boolean
  onClose: any
  children: any
}> = ({
  id = 'customized-dialog-title',
  modalTitle = 'Modal title',
  isOpen,
  onClose,
  children,
  fullScreen
}) => {
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby={id}
      open={isOpen}
      fullScreen={fullScreen}
    >
      <DialogTitle id={id} onClose={onClose}>
        {modalTitle}
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose} color='primary'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Modal

interface IOptionModalHook {
  isOpen?: boolean | undefined
  fullScreen?: boolean
  params?: any
}

export const useModal = (
  ModalContenent: any,
  option: IOptionModalHook = {}
) => {
  const [isOpen, setOpen] = React.useState<boolean | null>(
    option.isOpen || null
  )
  const handleModalClose = () => {
    setOpen(false)
  }
  const handleModalShow = () => {
    setOpen(true)
  }

  const renderModal =
    isOpen === null ? null : (
      <Modal
        isOpen={isOpen}
        onClose={handleModalClose}
        fullScreen={option.fullScreen}
      >
        <ModalContenent />
      </Modal>
    )

  return {
    closeModal: handleModalClose,
    isOpen,
    renderModal,
    showModal: handleModalShow
  }
}
