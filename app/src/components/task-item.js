import React from 'react'
import { Button, Chip, IconButton, LinearProgress } from '@mui/material'
import MoreIcon from '@mui/icons-material/MoreVert'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'

const TaskItem = (props) => {
  const { idChamado, tituloChamado, protocoloChamado,
    classificacao, criacaoChamado,status } = props


  const data = new Date(props.criacaoChamado)
  function formDate(data) {
    var day = data.getDate();
    var month = data.getMonth() + 1;
    var year = data.getFullYear();
    var dateFormatted = day + '/' + (month) + '/' + year;
    return dateFormatted
  }
  var date = formDate(data)



  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      minHeight: 100,
      color: '#424242',
      padding: 16
      // cursor: 'pointer'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', paddingRight: 16, borderRight: '1px solid #E0E0E0' }}>
        <div style={{ fontSize: 13, fontWeight: 'bold', color: '#424242' }}>09:15</div>
        <div style={{ fontSize: 12, color: '#757575' }}>11:00</div>
      </div>
      <div style={{
        backgroundColor: '#ffffff',
        marginLeft: 16,
        padding: 16,
        flex: 1,
        borderRadius: 5,
        boxShadow: '0px 0px 20px -18px #424242',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #e0e0e0'
      }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ flex: 1, fontSize: 15, fontWeight: 'bold', color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>Titulo : {props.tituloChamado}</div>
          <div>
            <IconButton size="small" edge="end" color="inherit">
              <MoreIcon />
            </IconButton>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: 8 }}>


          <div style={{ fontSize: 12, marginLeft: 8, marginRight: 8, position: 'relative' }}>
            <Chip size="small" label={"Protocolo: " + props.protocoloChamado} />
          </div>




          <div style={{ marginLeft: 15, marginRight: 8, position: 'relative' }}>
            <Chip size="small" label={"Chamado aberto em: " + date} />
          </div>
          <div style={{ fontSize: 12, marginLeft: 8, marginRight: 8, position: 'relative' }}>
            <Chip size="small" label={"Classificação: " + props.classificacao} />
          </div>

          <div style={{ fontSize: 12, marginLeft: 8, marginRight: 8, position: 'relative' }}>
            <Chip size="small" label={"Status: " + props.status} />
          </div>


        
        </div>
        <div style={{ fontSize: 13, color: '#424242', marginTop: 16 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'row' }}>
          <Button variant="contained" startIcon={<PlayCircleIcon />}>
            Iniciar
          </Button>
          <div style={{ flex: 1 }}></div>
          <LinearProgress color="success" variant="determinate" value={100} />
        </div>
      </div>
    </div>
  )
}

export default TaskItem