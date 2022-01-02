import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/styles'
import { Controller, useForm } from 'react-hook-form'
import { Autocomplete } from '@material-ui/lab'
import { fetchMarket, Market } from '../../store/modules/market/MarketSlice'
import { useAppDispatch, useAppSelector } from '../../store/store'

const useStyles = makeStyles((theme) => ({
 input: {
  '&:invalid': {
   borderColor: red,
  },
 },
}))

const MarketContainer = function () {
 const dispatch = useAppDispatch()
 const { data, loading, error } = useAppSelector((state) => state.market)

 useEffect(() => {
  dispatch(fetchMarket())
 }, [dispatch])

 const [itemList, setItemList] = useState<Market[]>([])
 const classes = useStyles()

 const {
  control,
  handleSubmit,
  setValue,
  formState: { errors },
 } = useForm<{ item: Market[] }>({
  mode: 'onChange',
  //   defaultValues: { item: [...itemList] },
 })

 const onSubmit = (formInputs: any) => {
  console.log('formInputs', formInputs)
 }

 useEffect(() => {
  setItemList(data)
  setValue('item', data)
 }, [data])

 return (
  <form onSubmit={handleSubmit(onSubmit)} noValidate>
   <Controller
    control={control}
    name="item"
    rules={{ required: true }}
    render={({ field: { onChange, value } }) => {
     return (
      <Autocomplete
       onChange={(event, item) => {
        onChange(item)
       }}
       value={!value ? undefined : value[0]}
       options={itemList}
       getOptionLabel={(item) => `${item.english_name}=${item.korean_name}=${item.market}`}
       getOptionSelected={(option, value) => {
        return value === undefined || option.market === value.market
       }}
       renderInput={(params) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <TextField {...params} label="items" margin="normal" variant="outlined" error={!!errors.item} helperText={errors.item && 'item required'} required />
       )}
      />
     )
    }}
   />

   <Button type="submit" fullWidth size="large" variant="contained" color="primary">
    submit
   </Button>
  </form>
 )
}

export default MarketContainer
