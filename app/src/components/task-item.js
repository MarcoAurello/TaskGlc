import React, { useEffect, useState } from 'react'
import { Button, Chip, IconButton, LinearProgress } from '@mui/material'

import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import FolderCopyIcon from '@mui/icons-material/FolderCopy';

const getCookie = require('../utils/getCookie')

const TaskItem = (props) => {
  const { logged } = props

  const { idChamado, tituloChamado, protocoloChamado, Arquivado, usuarioExecutor,
    classificacao, criacaoChamado, status, fkUsuarioSoloicitante, fklogado
    , usuarioDemandanteTelefone, usuarioDemandanteEmail, tela, tempoEstimado } = props
  const [statusAtividade, setStatus] = useState('')


  const [mensagem, setMensagem] = useState([])
  // alert(tela)
  const [openLoadingDialog, setOpenLoadingDialog] = useState(false)
  const [openMessageDialog, setOpenMessageDialog] = useState(false)
  const [message, setMessage] = useState('')
  const [arquivado, setArquivado] = useState(true)





  const data = new Date(props.criacaoChamado)
  function formDate(data) {
    var day = data.getDate();
    var month = data.getMonth() + 1;
    var year = data.getFullYear();
    var dateFormatted = day + '/' + (month) + '/' + year;
    return dateFormatted
  }
  var date = formDate(data)



  // function carregarMensagem() {
  //   // setOpenLoadingDialog(true)
  //   const token = getCookie('_token_task_manager')
  //   const params = {
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //     }
  //   }
  //   fetch(`${process.env.REACT_APP_DOMAIN_API}/api/mensagem/?fkAtividade=${idChamado}`, params)
  //     .then(response => {
  //       const { status } = response
  //       response.json().then(data => {
  //         // setOpenLoadingDialog(false)

  //         if (status === 401) {
  //           alert('1111')

  //         } else if (status === 200) {
  //           // alert(JSON.stringify(data.data))
  //           setMensagem(data.data)
  //            alert(JSON.stringify(mensagem))
  //           // alert("3")
  //           // alert(JSON.stringify(data))

  //         }
  //       }).catch(err =>{
  //         alert(err)
  //       })
  //     })
  // }





  // if(protocoloChamado != null){
  //   carregarMensagem()

  // }

  function arquivarAtividade() {
    // alert(arquivado)


    if (props.status != 'Concluido' || props.status != 'Cancelado') {
      alert('para arquivar a atividade deve ser Concluida ou Cancelada')
    } else {

      const token = getCookie('_token_task_manager')
      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          arquivado

        })

      }

      fetch(`${process.env.REACT_APP_DOMAIN_API}/api/atividade/${idChamado}/edit`, params)
        .then(response => {
          const { status } = response
          response.json().then(data => {
            // setOpenLoadingDialog(false)
            if (status === 401) {
              // setMessage(data.message)
              // setOpenMessageDialog(true)
              alert('erro')
            } else if (status === 200) {
              alert('chamado arquivado com sucesso')
              window.location.href = `${process.env.REACT_APP_DOMAIN}/home`


              setMessage(data.message)
              // alert(message)

            }
          }).catch(err => alert(err))
        })



    }
  }




  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      minHeight: 100,
      color: '#424242',
      padding: 16
      // cursor: 'pointer'
    }}>
      {/* <div style={{ display: 'flex', flexDirection: 'column', paddingRight: 16, borderRight: '1px solid #E0E0E0' }}>
        <div style={{ fontSize: 13, fontWeight: 'bold', color: '#424242' }}>09:15</div>
        <div style={{ fontSize: 12, color: '#757575' }}>11:00</div>
      </div> */}
      <div style={{
        backgroundColor: '#ffffff',
        marginLeft: 16,
        padding: 16,
        flex: 1,
        borderRadius: 45,
        boxShadow: '0px 0px 20px -10px #424242',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #e0e0e0'
      }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {/* <div style={{ flex: 1, fontSize: 15, fontWeight: 'bold', color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>Titulo : {props.tituloChamado}</div>
         
          <div>
            <IconButton size="small" edge="end" color="inherit">
              <MoreIcon />
            </IconButton>
          </div> */}
        </div>
        <div style={{ flex: 1, fontSize: 15, fontWeight: 'bold', color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          Titulo:  {props.tituloChamado}</div>

        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 8 }}>








          <div style={{ fontSize: 12, fontWeight: 'bold', marginLeft: 5, marginRight: 8, marginBottom: 5, position: 'relative' }}>
            <Chip size="small" label={"Protocolo: " + props.protocoloChamado} />
          </div>
          <div style={{ fontSize: 12, fontWeight: 'bold', marginLeft: 5, marginRight: 8, marginBottom: 5, position: 'relative' }}>
            <Chip size="small" label={"Status: " + props.status} />
          </div>

          {props.tempoEstimado != null ?

            <div style={{ fontSize: 12, fontWeight: 'bold', marginLeft: 5, marginRight: 8, marginBottom: 5, position: 'relative' }}>
              <Chip size="small" label={"Tempo para conclusão apos inicio: " + props.tempoEstimado + '/horas'} />
            </div>

            :
            ''
          }












        </div>
        <div style={{ fontSize: 13, color: '#424242', marginTop: 16 }}>

          <div style={{ flex: 1, fontSize: 12, color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            Abertura : {date}</div>



          {tela == 'minhas' ? <div style={{ flex: 1, fontSize: 12, color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            Solicitante : {props.usuarioDemandante}</div> : ''}




          {tela == 'minhas' ? <div style={{ flex: 1, fontSize: 12, color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            Email : {props.usuarioDemandanteEmail}</div> : ''}




          {tela == 'minhas' ? <div style={{ flex: 1, fontSize: 12, color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            Telefone : {props.usuarioDemandanteTelefone}</div> : ''}





          <div style={{ flex: 1, fontSize: 12, color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            Classificação : {props.classificacao}</div>





          {props.Arquivado == true
            ?
            <div style={{ color: 'red' }}>
              Chamado arquivado pelo Executor
            </div>
            :
            ''
          }











        </div>

        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'row' }}>
          <Button variant="contained" size="small" startIcon={<PlayCircleIcon />} onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/${idChamado}/edit`}>
            detalhes do chamado
          </Button>



          {usuarioExecutor === fklogado && Arquivado === false ?

            <div style={{ flex: 1, marginLeft: 5 }}>
              <Button variant="contained" size="small" startIcon={<FolderCopyIcon />} onClick={() => arquivarAtividade()}>
                arquivar
              </Button>

            </div>
            :
            ''
          }
          {/* <LinearProgress color="success" variant="determinate" value={100} /> */}
        </div>
      </div>
      
    </div>
    

    
  )
}

export default TaskItem