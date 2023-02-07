import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import { Avatar, Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, IconButton, InputLabel, MenuItem, Select, Switch, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Tooltip } from "@mui/material";
import Paper from '@mui/material/Paper';
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const getCookie = require('../utils/getCookie')

const PageContainer = styled.div`
  margin: 16px;
  padding: 32px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-shadow: 0px 0px 20px -18px #424242;
`

const UsuarioForm = (props) => {
  const { id } = props.match.params;
  const [openLoadingDialog, setOpenLoadingDialog] = useState(false)
  const [openMessageDialog, setOpenMessageDialog] = useState(false)
  const [message, setMessage] = useState('')
  
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [chapa, setChapa] = useState('')
  const [demandante, setDemandante] = useState(false)
  const [fkPerfil, setFkPerfil] = useState(null)
  const [fkUnidade, setFkUnidade] = useState(null)
  const [fkArea, setFkArea] = useState(null)
  const [validade, setValidade] = useState(false)
  const [createdAt, setCreatedAt] = useState(null)
  const [updatedAt, setUpdatedAt] = useState(null)

  const [perfil, setPerfil] = useState([])
  const [unidade, setUnidade] = useState([])
  const [area, setArea] = useState([])


  useEffect(() => {
    function carregarRegistro() {
      setOpenLoadingDialog(true)
      const token = getCookie('_token_task_manager')
      const params = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      fetch(`${process.env.REACT_APP_DOMAIN_API}/api/usuario/${id}`, params)
        .then(response => {
          const { status } = response
          response.json().then(data => {
            setOpenLoadingDialog(false)
            if(status === 401) {  
              // setMessage(data.message)
              // setOpenMessageDialog(true)
            } else if(status === 200) {
              setOpenLoadingDialog(false)
              setNome(data.data.nome)
              setEmail(data.data.email)
              setTelefone(data.data.telefone)
              setChapa(data.data.chapa)
              setDemandante(data.data.demandante)
              setFkPerfil(data.data.fkPerfil)
              setFkArea(data.data.fkArea)
              setFkUnidade(data.data.Area.Unidade.id)
              setValidade(data.data.validade)
              setCreatedAt(data.data.createdAt)
              setUpdatedAt(data.data.updatedAt)
            }
          }).catch(err => setOpenLoadingDialog(false))
        })
    }

    function carregarPerfil() {
      setOpenLoadingDialog(true)
      const token = getCookie('_token_task_manager')
      const params = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      fetch(`${process.env.REACT_APP_DOMAIN_API}/api/perfil/`, params)
        .then(response => {
          const { status } = response
          response.json().then(data => {
            // setOpenLoadingDialog(false)
            if(status === 401) {  
            } else if(status === 200) {
              setPerfil(data.data)
              carregarUnidade()
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
      fetch(`${process.env.REACT_APP_DOMAIN_API}/api/unidade/`, params)
        .then(response => {
          const { status } = response
          response.json().then(data => {
            setOpenLoadingDialog(false)
            if(status === 401) {  
            } else if(status === 200) {
              setUnidade(data.data)
              if(id) {
                carregarRegistro()
              } else {
                setOpenLoadingDialog(false)
              }
            }
          }).catch(err => setOpenLoadingDialog(true))
        })
    }

    carregarPerfil()
  }, [])

  useEffect(() => {
    function carregarArea() {
      setOpenLoadingDialog(true)
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
            if(status === 401) {  
            } else if(status === 200) {
              setArea(data.data)
            }
          }).catch(err => setOpenLoadingDialog(false))
        })
    }

    if(fkUnidade) {
      carregarArea()
    }
  }, [fkUnidade])


  const onSalvar = () => {
    const token = getCookie('_token_task_manager')
    const params = {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ 
        nome,
        email,
        telefone,
        chapa,
        demandante,
        fkPerfil,
        fkUnidade,
        fkArea
      }) 
    }

    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/usuario/`, params)
      .then(response => {
        const { status } = response
        response.json().then(data => {
          setOpenLoadingDialog(false)
          if(status === 401) {  
            setMessage(data.message)
            setOpenMessageDialog(true)
          } else if(status === 200) {
            alert(JSON.stringify(data.data))
            // setArea(data.data)
          }
        }).catch(err => setOpenLoadingDialog(true))
      })
  }

  const onAlterar = () => {
    alert('Alterar')
  }

  return (
    <PageContainer>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 16}}>
        <h3>Cadastro de Usuários</h3>
        <div style={{flex: 1}}></div>
      </div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <FormGroup>
          <div style={{display: 'flex', flexDirection: 'row', marginBottom: 16}}>
            <div style={{flex: 1, marginRight: 16}}>
              <TextField size="small" fullWidth label="Nome" variant="outlined" value={nome}  onChange={e => setNome(e.target.value)}/>
            </div>
            <div style={{flex: 1}}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-select-small">Perfil</InputLabel>
              <Select
                fullWidth
                labelId="demo-select-small"
                id="demo-select-small"
                label="Area"
                value={fkPerfil}>
                <MenuItem value="">
                  <em>Nenhum</em>
                </MenuItem>
                {perfil.map((item, index) => <MenuItem key={index} value={item.id} onClick={() => setFkPerfil(item.id)}>{item.nome}</MenuItem>)}
              </Select>
            </FormControl>
            </div>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', marginBottom: 16}}>
            <TextField size="small" fullWidth label="Email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div style={{display: 'flex', flexDirection: 'row', marginBottom: 16}}>
            <div style={{flex: 1, marginRight: 16}}>
              <TextField size="small" fullWidth label="Chapa" variant="outlined" value={chapa} onChange={e => setChapa(e.target.value)} />
            </div>
            <div style={{flex: 1}}>
              <TextField size="small" fullWidth label="Telefone" variant="outlined" value={telefone} onChange={e => setTelefone(e.target.value)} />
            </div>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', marginBottom: 16}}>
            <div style={{flex: 1, marginRight: 16}}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-select-small">Unidade</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-select-small"
                  id="demo-select-small"
                  label="Unidade"
                  value={fkUnidade}>
                  <MenuItem value={null} onClick={() => {
                    setFkUnidade(null)
                    setFkArea(null)
                  }}>
                    <em>Nenhum</em>
                  </MenuItem>
                  {unidade.map((item, index) => <MenuItem key={index} value={item.id} onClick={() => {
                    setFkUnidade(item.id)
                    setFkArea(null)
                  }}>{item.nome}</MenuItem>)}
                </Select>
              </FormControl>
            </div>
            <div style={{flex: 1}}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-select-small">Área</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-select-small"
                  id="demo-select-small"
                  label="Area"
                  value={fkArea}>
                  <MenuItem value={null} onClick={() => setFkArea(null)}>
                    <em>Nenhum</em>
                  </MenuItem>
                  {area.map((item, index) => <MenuItem key={index} value={item.id} onClick={() => setFkArea(item.id)}>{item.nome}</MenuItem>)}
                </Select>
              </FormControl>
            </div>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', marginBottom: 16}}>
            <FormControlLabel control={<Switch />} label="Demandante" />
            <FormControlLabel control={<Switch />} label="Ativo" />
          </div>
          <div style={{flex: 1, display: 'flex', flexDirection: 'row'}}>
            <Button variant="outlined" onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/usuario/`}>Voltar</Button>
            <div style={{flex: 1}}></div>
            <Button variant="contained" onClick={id ? onAlterar : onSalvar}>{id ? 'Alterar' : 'Salvar'}</Button>
          </div>
        </FormGroup>
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
        <DialogContent style={{width: 400}}>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMessageDialog(false)}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default UsuarioForm;
