import React from 'react'
import {Box,TextField} from '@mui/material';
import { Field,ErrorMessage } from 'formik';

export default function Input({name,label,type,...rest}) {

    const a ={
    rows:4,
    multiline:'multiline'
    }

  return (
      <>
      <Field name={name} >
          {
              ({field})=>{
                const {name,value,onChange,onBlur} = field;
                  return (
                      <>
                      {name=='message'?
                      <TextField id="outlined-basic" {...rest} {...a} name={name} value={value} onChange={onChange} onBlur={onBlur} label={label} type={type} variant="outlined"  sx={{width:'70%',margin:'5px 0'}} /> 
                      :
                      <>
                      {/* <TextField id="outlined-basic" {...rest} name={name} value={name==='image'?rest.value:value}  onChange={onChange} onBlur={onBlur} label={label} type={type} variant="outlined"  sx={{width:'70%',margin:'5px 0'}} />  */}
                      <TextField id="outlined-basic" {...rest} name={name} value={name==='image'?rest.value?rest.value:value:value}  onChange={onChange} onBlur={onBlur} label={label} type={type} variant="outlined"  sx={{width:'70%',margin:'5px 0'}} /> 
                      </>
                      }
                      </>
                      )
              }
          }
      </Field>
      <ErrorMessage name={name} component={({children})=><Box sx={{width:'70%'}}><p style={{color:'red',marginTop:'4px'}} >{children}</p></Box>} />
      </>
  )
}


