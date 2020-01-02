import * as React from 'react'

import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'

export interface ISimpleDialogItem {
  label: string
  value: string | number
}

const SimpleDialog: React.FunctionComponent<{
  id?: string
  buttonText?: string
  dialogTitle?: string
  list: ISimpleDialogItem[]
  onDialogClose?: any
  open: boolean
}> = ({
  id = 'simple-dialog-title',
  onDialogClose,
  list,
  open,
  dialogTitle = 'Simple Dialog'
}) => {
  return (
    <Dialog
      onClose={() => onDialogClose(null)}
      aria-labelledby={id}
      open={open}
    >
      <DialogTitle id={id}>{dialogTitle}</DialogTitle>
      <List>
        {list.map((item: ISimpleDialogItem) => (
          <ListItem button onClick={() => onDialogClose(item)} key={item.value}>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}

export default SimpleDialog
