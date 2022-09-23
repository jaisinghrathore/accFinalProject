import Input from "./Input";
import React from 'react'

export default function FormikControl({control,...rest}) {
    switch(control){
        case 'input' : return <Input {...rest} />;
        default : return 0;
    }
}

