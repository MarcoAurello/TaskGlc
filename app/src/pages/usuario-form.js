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
  const [openLoadingDialog, setOpenLoadingDialog] = useState(false);
  
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [chapa, setChapa] = useState('')
  const [demandante, setDemandante] = useState(false)
  const [fkPerfil, setFkPerfil] = useState(null)
  const [fkArea, setFkArea] = useState(null)
  const [validade, setValidade] = useState(false)
  const [createdAt, setCreatedAt] = useState(null)
  const [updatedAt, setUpdatedAt] = useState(null)


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
              setNome(data.data.nome)
              setEmail(data.data.email)
              setTelefone(data.data.telefone)
              setChapa(data.data.chapa)
              setDemandante(data.data.demandante)
              setFkPerfil(data.data.fkPerfil)
              setFkArea(data.data.fkArea)
              setValidade(data.data.validade)
              setCreatedAt(data.data.createdAt)
              setUpdatedAt(data.data.updatedAt)
            }
          }).catch(err => setOpenLoadingDialog(true))
        })
    }

    if(id) {
      carregarRegistro()
    }
  }, [])

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
              <TextField size="small" fullWidth label="Nome" variant="outlined" value={nome} />
            </div>
            <div style={{flex: 1}}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-select-small">Perfil</InputLabel>
              <Select
                fullWidth
                labelId="demo-select-small"
                id="demo-select-small"
                label="Area">
                <MenuItem value="">
                  <em>Nenhum</em>
                </MenuItem>
                <MenuItem value={10}>Administrador</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            </div>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', marginBottom: 16}}>
            <TextField size="small" fullWidth label="Email" variant="outlined" value={email} />
          </div>
          <div style={{display: 'flex', flexDirection: 'row', marginBottom: 16}}>
            <div style={{flex: 1, marginRight: 16}}>
              <TextField size="small" fullWidth label="Chapa" variant="outlined" value={chapa} />
            </div>
            <div style={{flex: 1}}>
              <TextField size="small" fullWidth label="Telefone" variant="outlined" value={telefone} />
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
                  label="Unidade">
                  <MenuItem value="">
                    <em>Nenhum</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
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
                  label="Area">
                  <MenuItem value="">
                    <em>Nenhum</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', marginBottom: 16}}>
            <FormControlLabel control={<Switch />} label="Demandante" />
          </div>
          <div style={{flex: 1, display: 'flex', flexDirection: 'row'}}>
            <Button variant="outlined" onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/usuario/`}>Voltar</Button>
            <div style={{flex: 1}}></div>
            <Button variant="contained">{id ? 'Alterar' : 'Salvar'}</Button>
          </div>
        </FormGroup>
      </div>
    </PageContainer>
  );
};

export default UsuarioForm;
