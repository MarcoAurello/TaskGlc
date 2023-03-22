import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import {
  Alert, Avatar, Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel,
  FormGroup, Hidden, IconButton, InputLabel, MenuItem, Select, Switch, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination,
  TableRow, TextField, Tooltip
} from "@mui/material";

import TaskItemDoChamado from "../components/task-item-do-chamado";
import PerfilUtils from "../utils/perfil.utils";

import PersonIcon from '@mui/icons-material/Person';
import AttachFileIcon from '@mui/icons-material/AttachFile';


const getCookie = require('../utils/getCookie')

const PageContainer = styled.div`
  margin: 16px;
  padding: 32px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-shadow: 0px 0px 20px -18px #424242;
`

const AtividadeForm = (props) => {
  const { logged } = props

  const [checked, setChecked] = React.useState(false);
  // alert(JSON.stringify(logged.nome))
  const [arquivado, setArquivado] = useState(true)

  const [open, setOpen] = useState(false);
  const [openMsg, setOpenMsg] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  const { id } = props.match.params;
  const [openLoadingDialog, setOpenLoadingDialog] = useState(false)
  const [openMessageDialog, setOpenMessageDialog] = useState(false)
  const [message, setMessage] = useState('')

  const [classificacao, setClassificacao] = useState('')
  const [newClassificacao, setNewClassificacao] = useState('')
  const [newStatus, setNewStatus] = useState('')
  const [newStatusControler, setNewStatusControler] = useState('')
  const [statusId, setStatusId] = useState('')

  const [protocolo, setProtocolo] = useState('')
  const [status, setStatus] = useState('')
  const [valueArea, setValueArea] = useState('')
  const [valueUnidade, setValueUnidade] = useState('')
  const [usuarioSolicitante, setUsuarioSolicitante] = useState('')
  const [emailUsuarioSolicitante, setEmailUsuarioSolicitante] = useState('')
  const [telefoneSolicitante, setTelefoneSolicitante] = useState('')
  const [setorSolicitante, setSetorSolicitante] = useState('')
  const [btnMsg, setBtnMsg] = useState(false);

  const [tempoEstimado, setTempoEstimado] = useState('')
  const [createdAt, setCreatedAt] = useState('')
  const [title, setTitle] = useState('')

  const [titulo, setTitulo] = useState('')
  const [conteudo, setConteudo] = useState('')
  const [fkUnidade, setFkUnidade] = useState('')
  const [fkArea, setFkArea] = useState('')
  const [unidade, setUnidade] = useState([])
  const[unidadeTrue, setUnidadeTrue] =useState([])
  const [area, setArea] = useState([])
  const [atividade, setAtividade] = useState(null)
  const [mensagens, setMensagens] = useState([])
  const [classificarChamado, setClassificarChamado] = useState([])
  const [alterarStatus, setAltararStatus] = useState([])
  const [fkUnidadeExecutor, getFkUnidadeExecutor] = useState('')


  const [usuarioExecutor, setusuarioExecutor] = useState([])
  const [fkUsuarioExecutor, setFKUsuarioExecutor] = useState('')
  const [fkAreaDemandada, setFkAreaDemandada] = useState('')
  const [nomeExecutor, getNomeExecutor] = useState('')
  const [emailExecutor, getEmailExecutor] = useState('')
  const [telefoneExecutor, getTelefoneExecutor] = useState('')
  const [fkDemandante, setFkDemandante] = useState('')
  const [fkUsuarioSolicitante, setFkUsuarioSolicitante] = useState('')
  const [fkExecutor, getFkExecutor] = useState('')



  const [idChamado, setIdChamado] = useState('')

  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };






  useEffect(() => {
    function carregarRegistro() {
      setOpenLoadingDialog(true)
      const token = getCookie('_token_task_manager')
      const params = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      fetch(`${process.env.REACT_APP_DOMAIN_API}/api/atividade/${id}`, params)
        .then(response => {
          const { status } = response
          response.json().then(data => {
            setOpenLoadingDialog(false)
            if (status === 401) {
              setMessage(data.message)
              setOpenMessageDialog(true)
            } else if (status === 200) {
              setClassificacao(data.data.Classificacao.nome)
              setProtocolo(data.data.protocolo)
              setStatus(data.data.Status.nome)
              setStatusId(data.data.Status.id)
              setValueArea(data.data.Area.nome)
              setValueUnidade(data.data.Area.Unidade.nome)
              getFkUnidadeExecutor(data.data.Area.fkUnidade)

              setUsuarioSolicitante(data.data.Usuario.nome)

              setEmailUsuarioSolicitante(data.data.Usuario.email)
              setTelefoneSolicitante(data.data.Usuario.telefone)
              setFkDemandante(data.data.fkDemandante)
              
              setTitle(data.data.titulo)
              setFkAreaDemandada(data.data.fkArea)
              setIdChamado(data.data.id)
              setFkUsuarioSolicitante(data.data.fkUsuarioSolicitante)


              // alert(JSON.stringify(data.data.UsuarioExecutor))


              getNomeExecutor(data.data.UsuarioExecutor.nome)
              getEmailExecutor(data.data.UsuarioExecutor.email)
              getTelefoneExecutor(data.data.UsuarioExecutor.telefone)
              getFkExecutor(data.data.UsuarioExecutor.id)
              setSetorSolicitante(data.data.Usuario.Area.nome)

              carregarMensagem()
              // alert(emailExecutor)

            }
          }).catch(err => setOpenLoadingDialog(false))
        })
    }



    function carregarMensagem() {
      const token = getCookie('_token_task_manager')
      const params = {
        headers: {
          'Authorization': `Bearer ${token}`,

        },
      }
      fetch(`${process.env.REACT_APP_DOMAIN_API}/api/mensagem/?fkAtividade=${id}`, params)
        .then(response => {
          const { status } = response
          response.json().then(data => {
            setOpenLoadingDialog(false)
            if (status === 401) {
              setMessage(data.message)
              setOpenMessageDialog(true)
            } else if (status === 200) {
              setOpenLoadingDialog(false)
              setMensagens(data.data)
            }
          }).catch(err => setOpenLoadingDialog(false))
        })
    }

    function carregarUnidade() {
      // setOpenLoadingDialog(true)
      const token = getCookie('_token_task_manager')
      const params = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      fetch(`${process.env.REACT_APP_DOMAIN_API}/api/unidade`, params)
        .then(response => {
          const { status } = response
          response.json().then(data => {
            setOpenLoadingDialog(false)
            if (status === 401) {
            } else if (status === 200) {
              // alert(data.data.nome)
              // if(data.data.nome === 'DEP'){
                setUnidade(data.data)
              // }
              
              filtroUnidade()
              if (id) {
                carregarRegistro()
               
              } else {
                setOpenLoadingDialog(false)
              }
            }
          }).catch(err => setOpenLoadingDialog(true))
        })
    }

    function filtroUnidade() {
      // alert(JSON.stringify(unidade))
       setUnidadeTrue(unidade.filter(item => item.receber === true))
    }


    function carregarClassificacao() {
      // setOpenLoadingDialog(true)
      const token = getCookie('_token_task_manager')
      const params = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      fetch(`${process.env.REACT_APP_DOMAIN_API}/api/classificacao/`, params)
        .then(response => {
          const { status } = response
          response.json().then(data => {
            setOpenLoadingDialog(false)

            if (status === 401) {

            } else if (status === 200) {
              setClassificarChamado(data.data)
              // alert("3")
              // alert(JSON.stringify(data))

            }
          }).catch(err => setOpenLoadingDialog(true))
        })
    }


    function carregarStatus() {
      // setOpenLoadingDialog(true)
      const token = getCookie('_token_task_manager')
      const params = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      fetch(`${process.env.REACT_APP_DOMAIN_API}/api/status/`, params)
        .then(response => {
          const { status } = response
          response.json().then(data => {
            setOpenLoadingDialog(false)

            if (status === 401) {

            } else if (status === 200) {
              setAltararStatus(data.data)
              // alert("3")
              // alert(JSON.stringify(data))

            }
          }).catch(err => setOpenLoadingDialog(true))
        })
    }

    function carregarFuncionarios() {
      // setOpenLoadingDialog(true)
      const token = getCookie('_token_task_manager')
      const params = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      fetch(`${process.env.REACT_APP_DOMAIN_API}/api/usuarioAtividade/`, params)
        .then(response => {
          const { status } = response
          response.json().then(data => {
            setOpenLoadingDialog(false)

            if (status === 401) {
              // alert(status)
            } else if (status === 200) {
              setusuarioExecutor(data.data)
              // filtrarUsuariosDemandados()

            }
          }).catch(err => setOpenLoadingDialog(true))
        })
    }





    if (id) {
      carregarRegistro()
      carregarClassificacao()
      carregarFuncionarios()
      carregarStatus()
      carregarMensagem()


    } else {
      carregarUnidade()
    }
  }, [])


  useEffect(() => {
    function carregarArea() {
      // setOpenLoadingDialog(true)
      const token = getCookie('_token_task_manager')
      const params = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      fetch(`${process.env.REACT_APP_DOMAIN_API}/api/area/?fkUnidade=${fkUnidade}`, params)
        .then(response => {
          const { status } = response
          response.json().then(data => {
            setOpenLoadingDialog(false)
            if (status === 401) {
            } else if (status === 200) {
              setArea(data.data)
              setOpenLoadingDialog(false)

            }
          }).catch(err => setOpenLoadingDialog(true))
        })
    }

    if (fkUnidade) {
      carregarArea()

    }
  }, [fkUnidade])

  // const onSaveStatus = () => {
  //   setOpenMsg(true)
  //   onSaveStatusA()

  // }


  const onSaveStatus = () => {
    // alert(newStatus)


    const token = getCookie('_token_task_manager')
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        fkStatus: newStatus,
        tempoEstimado,
        // email: emailUsuarioSolicitante,
        // titulo: title,


      })

    }

    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/atividade/${id}/edit`, params)
      .then(response => {
        const { status } = response
        response.json().then(data => {
          setOpenLoadingDialog(false)
          if (status === 401) {
            setMessage(data.message)
            setOpenMessageDialog(true)
          } else if (status === 200) {
            setMessage(data.message)
            setOpenMessageDialog(true)
            setOpenMsg(true)
            //  window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/${idChamado}/edit`


            // setArea(data.data)
          }
        }).catch(err => setOpenLoadingDialog(true))
      })
  }


  const onSave = () => {
    const token = getCookie('_token_task_manager')
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        fkUnidade,
        fkArea,
        titulo,
        conteudo,
        arquivado: false
      })
    }

    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/atividade/`, params)
      .then(response => {
        const { status } = response
        response.json().then(data => {
          setOpenLoadingDialog(false)
          if (status === 401) {
            setMessage(data.message)
            setOpenMessageDialog(true)
          } else if (status === 200) {
            setAtividade(data.data)
            setMessage(data.message)
            setOpenMessageDialog(true)
            window.location.href = `${process.env.REACT_APP_DOMAIN}/home/`


            // setArea(data.data)
          }
        }).catch(err => setOpenLoadingDialog(true))
      })
  }

  // const onSaveMeu = () => {
  //   const token = getCookie('_token_task_manager')
  //   const params = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`
  //     },
  //     body: JSON.stringify({
  //       fkUnidade: logged.Area.fkUnidade,
  //       fkArea : logged.fkArea,
  //       titulo,
  //       conteudo,
  //       arquivado: false,
  //       pessoal: true,
  //       fkUsuarioExecutor : logged.id
  //     })
  //   }

  //   fetch(`${process.env.REACT_APP_DOMAIN_API}/api/atividade/`, params)
  //     .then(response => {
  //       const { status } = response
  //       response.json().then(data => {
  //         setOpenLoadingDialog(false)
  //         if (status === 401) {
  //           setMessage(data.message)
  //           setOpenMessageDialog(true)
  //         } else if (status === 200) {
  //           setAtividade(data.data)
  //           setMessage(data.message)
  //           setOpenMessageDialog(true)
  //           window.location.href = `${process.env.REACT_APP_DOMAIN}/home/`


  //           // setArea(data.data)
  //         }
  //       }).catch(err => setOpenLoadingDialog(true))
  //     })
  // }

  const novaInteracao = () => {

    const token = getCookie('_token_task_manager')
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        fkAtividade: id,
        conteudo,
        email: emailUsuarioSolicitante,
        emailExecutor: emailExecutor,



      })
    }

    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/mensagem/`, params)
      .then(response => {
        const { status } = response
        response.json().then(data => {
          setOpenLoadingDialog(false)
          if (status === 401) {
            setMessage(data.message)
            setOpenMessageDialog(true)
          } else if (status === 200) {
            // alert(JSON.stringify(data.data))
            setAtividade(data.data)
            setMessage(data.message)
            setOpenMessageDialog(true)
            window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/${idChamado}/edit`


            // setArea(data.data)

          }
        }).catch(err => setOpenLoadingDialog(true))
      })

  }








  const criarExecucao = () => {

    // alert(emailExecutor)
    const token = getCookie('_token_task_manager')
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        fkClassificacao: newClassificacao,
        fkAtividade: idChamado,
        fkUsuario: fkUsuarioExecutor,
        ativo: true,
        email: emailExecutor



      })
    }

    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/usuarioAtividade/`, params)
      .then(response => {
        const { status } = response
        response.json().then(data => {
          setOpenLoadingDialog(false)
          if (status === 401) {
            // alert('o1')
            setMessage(data.message)
            setOpenMessageDialog(true)
          } else if (status === 200) {


            setAtividade(data.data)
            setMessage(data.message)
            setOpenMessageDialog(true)
            window.location.href = `${process.env.REACT_APP_DOMAIN}/home`

            // setArea(data.data)
          }
        }).catch(err => setOpenLoadingDialog(true))
      })
  }

  return (
    <PageContainer>


      {id ? <div style={{ flex: 1, marginBottom: 16, marginLeft: 25 }}>
        <TextField size="small" fullWidth label="Protocolo" disabled variant="outlined" value={protocolo} />
      </div> : ''}

      {(logged && logged.fkArea === fkAreaDemandada && logged.Perfil.nome === PerfilUtils.Coordenador) ||
        (logged && logged.Perfil.nome === PerfilUtils.Gerente && logged.Area.fkUnidade === fkUnidadeExecutor)

        ?
        <div style={{ flex: 1, marginBottom: 16, marginLeft: 5 }}>
          <Button variant="contained" size='small' color="error" onClick={() => setOpen(true)}>Selecionar Funcionario<PersonIcon></PersonIcon></Button>
        </div> : ''

      }

      {logged && props.logged.id === fkExecutor ?
        <div style={{ flex: 1, marginBottom: 16, marginLeft: 5 }}>
          <Button size='small' variant="contained" onClick={() => setOpenStatus(true)}>Alterar Status da Atividade</Button>
        </div> : ''

      }


      {id ? <div >
        <TaskItemDoChamado
        
          protocolo={protocolo}
          unidade={valueUnidade}
          area={valueArea}
          classificacao={classificacao}
          solicitante={usuarioSolicitante}
          status={status}
          titulo={title}
          setorSolicitante={setorSolicitante}
          emailUsuarioSolicitante={emailUsuarioSolicitante}
          telefoneSolicitante={telefoneSolicitante}
          setorSol={valueUnidade}
          nomeExecutor={nomeExecutor}
          emailExecutor={emailExecutor}
          telefoneExecutor={telefoneExecutor}

        />
      </div> : ''}






      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 16, marginRight: 3 }}>







        <div style={{ flex: 1 }}></div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* {id ? <div style={{ flex: 1, marginBottom: 16 }}>
          <TextField size="small" fullWidth label="Unidade" disabled variant="outlined" value={valueUnidade} />
        </div> : ''}
        {id ? <div style={{ flex: 1, marginBottom: 16 }}>
          <TextField size="small" fullWidth label="Área" disabled variant="outlined" value={valueArea} />
        </div> : ''}

        {id ? <div style={{ flex: 1, marginBottom: 16 }}>
          <TextField size="small" fullWidth label="Classificacao" disabled variant="outlined" value={classificacao} />
        </div> : ''} */}
        {/* {id ? <div style={{ flex: 1, marginBottom: 16 }}>
          <TextField size="small" fullWidth label="Status" disabled variant="outlined" value={status} />
        </div> : ''}
        {id ? <div style={{ flex: 1, marginBottom: 16 }}>
          <TextField size="small" fullWidth label="Solicitante" disabled variant="outlined" value={usuarioSolicitante} />
        </div> : ''} */}
        {/* {id ? <div style={{ flex: 1, marginBottom: 16 }}>
          <TextField size="small" fullWidth label="Chamado" disabled variant="outlined" value={title} />
        </div> : ''} */}
        {!id ? <>
              <FormGroup>

            <div style={{ flex: 1, marginBottom: 16 }}>
              Solicitar Atividade<br></br>
              
              
              
             

              <FormControl fullWidth size="small">

                <InputLabel id="demo-select-small">Unidade</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-select-small"
                  id="demo-select-small"
                  label="Unidade"
                  value={fkUnidade}>
                  <MenuItem value="" onClick={() => setFkUnidade("")}>
                    {/* <em>Nenhum</em> */}
                  </MenuItem>
                  {unidade.map((item, index) =>{
                    if(item.receber ===  true){
                      return <MenuItem key={index} value={item.id} onClick={() => setFkUnidade(item.id)}>{item.nome}</MenuItem>
                    } 
                  } )}
                </Select>
              </FormControl>
            </div>
            
            <div style={{ flex: 1, marginBottom: 16 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-select-small">Área</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-select-small"
                  id="demo-select-small"
                  label="Unidade"
                  value={fkArea}>
                  <MenuItem value="" onClick={() => setFkUnidade("")}>
                    <em>Nenhum</em>
                  </MenuItem>
                  {area.map((item, index) => <MenuItem key={index} value={item.id} onClick={() => setFkArea(item.id)}>{item.nome}</MenuItem>)}
                </Select>
              </FormControl>
            </div>
            <div style={{ flex: 1, marginBottom: 16 }}>
              <TextField size="small" fullWidth label="Título" variant="outlined" value={titulo} onChange={e => setTitulo(e.target.value)} />
            </div>
            <div style={{ flex: 1, marginBottom: 16 }}>
              <TextField size="small" fullWidth label="Descrição" multiline rows={2} variant="outlined" value={conteudo} onChange={e => setConteudo(e.target.value)} />
            </div>

            {/* <div style={{ flex: 1, marginBottom: 16 }}>
              <File size="small" fullWidth label="Descrição" multiline rows={2} variant="outlined" value={conteudo} onChange={e => setConteudo(e.target.value)} />
            </div> */}
          
            <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
              {/* <Button variant="outlined" onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/area/`}>Voltar</Button> */}
              <div style={{ flex: 1 }}></div>
              <Button variant="contained" onClick={onSave}>{'Criar'}</Button>
            </div>
          </FormGroup>
              
              
          
        </> : ''}


        {/* {envioFuncionario ? <div style={{flex: 1, marginBottom: 16}}>
          <TextField size="small" fullWidth label="Solicitante" disabled variant="outlined" value='ssssssssddfdfssfgd' />
        </div> : 'dddddd'} */}
        {/* {mensagens =! null ? <div>{
          mensagens[0].id}  </div>: '' } */}

        {/* {area.map((item, index) => <b key={index} value={item.id} >{item.nome}</b>)} */}


        {id ? <>





          {logged && (props.logged.id != fkUsuarioExecutor && props.logged.id != fkDemandante)
            ?

            <div style={{ flex: 1, marginBottom: 16, marginLeft: 5 }}>
              <h4>Histórico da Atividade</h4>
              <Button size="small" variant="contained" onClick={() => [setOpenMsg(true)]}>Mensagem</Button>
            </div>

            :
            <h4>Atividade Concluida
            </h4>


          }





          {mensagens.map((item, index) => <div style={{ borderTop: '1px solid #e0e0e0', padding: 2, background: '#FFFFE0', borderRadius: 10, marginBottom: 1, border: '2px solid #e0e0e0' }}>
            <div style={{ display: 'flex', flexDirection: 'colrowumn' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <b style={{ fontSize: 10, marginRight: 5 }}>{item.Usuario.nome}</b>
                <div style={{ flex: 1 }}></div>
                <b style={{ fontSize: 10 }}>{new Date(item.createdAt).toLocaleString()}</b>
              </div>
            </div>
            <p>{item.conteudo}</p>
          </div>)}
        </> : ''}

      </div>

      <Dialog open={openLoadingDialog}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 120, height: 120 }}>
          <CircularProgress />
        </div>
      </Dialog>

      <Dialog
        open={openMessageDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          Atenção
        </DialogTitle>
        <DialogContent style={{ width: 400 }}>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={atividade ? () => window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/${atividade.id}/edit` : () => setOpenMessageDialog(false)}>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <hr></hr>

      <Dialog open={open} >
        <DialogTitle style={{ color: '#1E90FF' }} >Encaminhar Atividade</DialogTitle>
        <DialogContent>
          <DialogContentText>

          </DialogContentText>

          <InputLabel id="demo-select-small"><b>Titulo Atividade:</b></InputLabel>
          {title}
          <br></br>
          <InputLabel id="demo-select-small"><b>Unidade</b></InputLabel>
          {valueUnidade}
          <InputLabel id="demo-select-small"><b>Solicitante</b></InputLabel>
          {usuarioSolicitante}

          <hr></hr>

          <p></p>

          <FormControl fullWidth labelId="demo-simple-select-label" id="demo-simple-select">


            <select style={{ fontSize: 14 }} onChange={e => setNewClassificacao(e.target.value)}>
              <option >CLASSIFIQUE A ATIVIDADE</option>)

              {
                classificarChamado.map((classificacao, key) => <option name={classificacao.nome} value={classificacao.id} >
                  {classificacao.nome}</option>)
              }
            </select>

            <hr></hr>

            <select style={{ fontSize: 14 }} onChange={e => setFKUsuarioExecutor(e.target.value)}>

              <option >SELECIONE  O EXECUTOR</option>)
              {
                usuarioExecutor.map((user, key) => <option name={user.nome} value={user.id} >
                  {user.nome}</option>)
              }

            </select>


          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={() => { criarExecucao() }} >Enviar</Button>
        </DialogActions>
      </Dialog>






      <Dialog open={openStatus}  >

        <DialogContent>
          <DialogContentText>

          </DialogContentText>



          <p></p>

          <FormControl labelId="demo-simple-select-label" id="demo-simple-select" style={{ width: 250 }}>
            <InputLabel id="demo-simple-select-label">{status}</InputLabel>


            <Select style={{ fontSize: 20 }} onChange={e => setNewStatus(e.target.value)}>
              {/* <option>{status}</option> */}


              {
                alterarStatus.map((status, key) => <MenuItem name={status.nome} value={status.id} >
                  {status.nome}</MenuItem>)
              }
            </Select>

          </FormControl>


          <p></p>
          <FormControl labelId="demo-simple-select-label" id="demo-simple-select" style={{ width: 250 }}>

            <InputLabel id="demo-simple-select-label"> Tempo para concluir</InputLabel>


            <Select style={{ fontSize: 20 }} onChange={e => setTempoEstimado(e.target.value)}>


            <MenuItem value={1} >0 hora</MenuItem>
              <MenuItem value={1} >1 hora</MenuItem>
              <MenuItem value={2} >2 horas</MenuItem>
              <MenuItem value={3} >3 horas</MenuItem>
              <MenuItem value={4} >4 horas</MenuItem>
              <MenuItem value={5} >5 horas</MenuItem>
              <MenuItem value={6} >6 horas</MenuItem>
              <MenuItem value={7} >7 horas</MenuItem>
              <MenuItem value={8} >8 horas</MenuItem>




            </Select>

            <hr></hr>


          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenStatus(false)}>Cancelar</Button>
          <Button onClick={() => { onSaveStatus() }} >Alterar</Button>
        </DialogActions>
      </Dialog>




      <Dialog open={openMsg}  >

        <DialogContent>

              { openStatus === false ? 
              <h2>Deixe uma mensagem</h2>
              :<h4>Informe o motivo da alteração do Status</h4> }
          







          {/* {classificacao == "Não Definido" && status == "Aberto" ?
            <div style={{ flex: 1, marginBottom: 16, marginLeft: 5 }}>
              <Button variant="contained" onClick={() => setOpen(true)}>{'Encaminhar chamado'}</Button>
            </div> : ''

          } */}

          <div style={{ flex: 1, marginBottom: 2 }}>
            <TextField fullWidth sx={{ m: 1 }} size='200px' label='Digite sua mensagem...' multiline rows={8} variant="outlined" value={conteudo} onChange={e => setConteudo(e.target.value)} />
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
            {/* <Button variant="outlined" onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/area/`}>Voltar</Button> */}
            <div style={{ flex: 1 }}></div>
            <Button variant="contained" onClick={novaInteracao}>{'Enviar'}</Button>


            <Button onClick={() => setOpenMsg(false)}>Cancelar</Button>


          </div>
        </DialogContent>

      </Dialog>






    </PageContainer>
  );
};

export default AtividadeForm;
