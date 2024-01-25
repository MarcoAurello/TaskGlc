import { Button, Chip, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';

const AtividadeNotificationItem = (props) => {
  const { item } = props
  const[selecionar , setselecionar] = useState('')


  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    let wordNumber = name.split(' ')
    let text = ''
    if(wordNumber.length > 1) {
      text = `${name.split(' ')[0][0].toUpperCase()}${name.split(' ')[1][0].toUpperCase()}`
    } else {
      text = `${name.split(' ')[0][0].toUpperCase()}${name.split(' ')[0][1].toUpperCase()}`
    }

    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: text,
    };
  }

  return (
    <MenuItem  style={{display: 'flex',marginBottom:5, flexDirection: 'row',
    borderBottom: '2px solid #EEEEEE', minWidth: 150, maxWidth:400}}
     onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/${item.id}/edit`}>
      
      <div style={{ marginLeft: 16,marginBottom:5 }}><b style={{color:'red'}}>Selecionar Executor &#10145; </b>
      <div style={{ width: '80%', fontSize: 12,  color: '#424242', wordBreak:"break-all", whiteSpace:'pre-wrap' }}><b>{'Assunto: '+item.titulo}</b></div>
        
      {/* <div style={{ width: '100%', fontSize: 12, color: '#424242'}}>{'Solicitado por: '+ item.Usuario.nome}</div> */}
      {/* <div style={{ width: '100%', fontSize: 12, color: '#424242'}}>{'Solicitado por: '+ item.Usuario.nome}</div> */}

      {item.Usuario?
      <div style={{ width: '100%', fontSize: 12, color: '#424242'}}>{'Solicitado por: '+ item.Usuario.nome}</div>

      :
      ""
      }

      {item.Usuario?
          <div style={{ width: '100%', fontSize: 12, color: '#424242'}}>{'Unidade: '+ item.Usuario.Area.Unidade.nome}</div>:
          ''}



     
      {/* <div style={{ width: '100%', fontSize: 12, color: '#424242'}}>{'Unidade: '+ item.Area.nome}</div> */}
        
        {item.categoria ==='' ?'' :
         <div style={{ width: '100%', fontSize: 12,  color: '#424242'}}>{'Categoria:'+ item.categoria}</div>  }
        
        <div style={{ width: '70%' , marginTop: 4 }}>
          <Button  variant="contained" size="small" >Selecionar Funcionario</Button>
        </div>
      </div>
    </MenuItem>

    
  )
}


export default AtividadeNotificationItem