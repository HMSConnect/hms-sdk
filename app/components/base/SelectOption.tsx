import React, { useEffect, useState } from 'react'

import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Theme,
  Typography,
} from '@material-ui/core'

interface IOptionItem {
  value: any
  label: string
}

const SelectOption: React.FunctionComponent<{
  label: string
  labelId: string
  id: string
  value: any
  options: IOptionItem[]
  onChange: (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ) => void
  classOption?: any
}> = ({ label, value, options, labelId, id, onChange, classOption }) => {
  const [labelWidth, setLabelWidth] = useState(0)
  useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth)
  }, [])

  const inputLabel = React.useRef<HTMLLabelElement>(null)
  return (
    <FormControl variant='outlined' className={classOption}>
      <InputLabel ref={inputLabel} id={labelId}>
        {label}
      </InputLabel>
      <Select
        labelId={labelId}
        id={id}
        value={value}
        onChange={onChange}
        variant='outlined'
        labelWidth={labelWidth}
      >
        {options.map((item, index) => {
          return (
            <MenuItem key={index} value={item.value}>
              <Typography variant='body2'>{item.label}</Typography>
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

export default SelectOption
