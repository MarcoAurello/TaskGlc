import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import {
    Alert, Avatar, Box, Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel,
    FormGroup, FormLabel, Hidden, Grid, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, Switch, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination,
    TableRow, TextField, Tooltip
} from "@mui/material";
import Paper from '@mui/material/Paper';
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import moment from 'moment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const getCookie = require('../utils/getCookie')

const PageContainer = styled.div`
  margin: 16px;
  padding: 32px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-shadow: 0px 0px 20px -18px #424242;
`


const ContratosSetor = (props) => {
    const { logged } = props;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openLoadingDialog, setOpenLoadingDialog] = useState(false);
    const [modalCadContrato, setModalCadContrato] = useState(false);
    const [newSetor, setNewSetor] = useState('');
    const [nomeEmpresa, setNomeEmpresa] = useState('');
    const [registros, setRegistros] = useState([]);
    const [valorContrato, setValorContrato] = useState('')
    const [inicioVigencia, setInicioVigencia] = useState('')
    const [finalVigencia, setFinalVigencia] = useState('')
    const [filtro, setFiltro] = useState('');
    const [setor, setSetor] = useState([]);
    const [message, setMessage] = useState('');
    const [descricaoEmpresa, setDescricaoEmpresa] = useState('');
    const [parcelasEmpresa, setParcelasEmpresa] = useState('');
    const [openMessageDialog, setOpenMessageDialog] = useState(false)
    const [keyword, setKeyword] = useState('')

    useEffect(() => {

        carregarSetores()


        carregarRegistros()


    }, [])

    function carregarRegistros() {
        console.log('📦 Iniciando carregamento de registros...')
        // setOpenLoadingDialog(true)

        const token = getCookie('_token_task_manager')
        console.log('🔐 Token recuperado:', token)

        const params = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        const url = `${process.env.REACT_APP_DOMAIN_API}/api/contrato/`
        console.log('🌐 URL da requisição:', url)

        fetch(url, params)
            .then(response => {
                const { status } = response
                console.log('📥 Status da resposta:', status)

                response.json()
                    .then(data => {
                        console.log('📊 Dados recebidos:', data)
                        setOpenLoadingDialog(false)

                        if (status === 401) {
                            console.warn('🔐 Token inválido ou expirado:', data.message)
                            setMessage(data.message)
                            //   setOpenMessageDialog(true)
                        } else if (status === 200) {
                            console.log('✅ Registros carregados com sucesso:', data.data.length)
                            setRegistros(data.data)
                        } else {
                            console.warn('⚠️ Resposta inesperada:', status, data)
                        }
                    })
                    .catch(err => {
                        console.error('❌ Erro ao converter resposta JSON:', err)
                        // setOpenLoadingDialog(true)
                    })
            })
            .catch(error => {
                console.error('❌ Erro na requisição fetch:', error)
                setOpenLoadingDialog(false)
                setMessage('Erro ao buscar registros.')
                // setOpenMessageDialog(true)
            })
    }



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    function onSaveContrato() {
        const token = getCookie('_token_task_manager')
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

            body: JSON.stringify({
                newSetor,
                nomeEmpresa,
                descricaoEmpresa,
                parcelasEmpresa,
                valorContrato,
                inicioVigencia,
                finalVigencia




            })

        }


        fetch(`${process.env.REACT_APP_DOMAIN_API}/api/contrato/`, params)
            .then(response => {
                const { status } = response
                response.json().then(data => {
                    setOpenLoadingDialog(false)
                    if (status === 401) {
                        setMessage(data.message)
                        setOpenMessageDialog(true)
                    } else if (status === 200) {

                        setOpenLoadingDialog(false)
                        setMessage(data.message)
                        setOpenMessageDialog(true)
                        setModalCadContrato(false)




                        // setArea(data.data)
                    }
                }).catch(err => setOpenLoadingDialog(true))
            })
    }

    function carregarSetores() {
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

                    if (status === 401) {

                    } else if (status === 200) {
                        setSetor(data.data)
                        // alert("3")
                        // alert(JSON.stringify(data))

                    }
                }).catch(err => setOpenLoadingDialog(true))
            })
    }

    return (
        <PageContainer>
            <Button
                size="small"
                variant="contained"
                startIcon={<ArrowBackIcon />}
                onClick={() =>
                    (window.location.href = `${process.env.REACT_APP_DOMAIN}/pagamentos`)
                }
                style={{
                    marginBottom: 16,
                    borderRadius: 6,

                    textTransform: 'none',
                    fontSize: 13,
                }}
            >
                Voltar
            </Button>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <h3>Contratos</h3>
                <div style={{ flex: 1 }}></div>
                <div>
                <input
      type="text"
      placeholder="Pesquisar"
      value={filtro}
      onChange={(e) => setFiltro(e.target.value)}
      style={{
        height: 32,
        border: '1px solid #e0e0e0',
        borderRadius: 3,
        outline: 'none',
        paddingRight: 8,
        paddingLeft: 8,
        marginBottom: 16,
      }}
    />
                    
                    <Button size="small" variant="contained"
                        startIcon={<AddIcon />} style={{ marginLeft: 8 }}
                        onClick={() => setModalCadContrato(true)} >
                        Cadastrar Contrato
                    </Button>
                </div>
            </div>
            <TableContainer sx={{ borderRadius: 2, boxShadow: 3 }}>
  <Table sx={{ minWidth: 650 }} aria-label="tabela de contratos">
    <TableHead sx={{ backgroundColor: '#1e1e2f', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
      <TableRow>
        <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Empresa</TableCell>
        <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Setor Responsável</TableCell>
        <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Parcela</TableCell>
        <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Início Vigência</TableCell>
        <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Final Vigência</TableCell>
        <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {registros
        .filter(row => row.fkUnidade === logged.Area.Unidade.id)
        .filter(row => {
          const termo = filtro.toLowerCase();
          return (
            row.nomeEmpresa?.toLowerCase().includes(termo) ||
            row?.Unidade?.nome?.toLowerCase().includes(termo)
          );
        })
        .map(row => (
          <TableRow
            key={row.id}
            hover
            sx={{
              transition: 'background-color 0.2s',
              '&:hover': { backgroundColor: '#f5f5f5' }
            }}
          >
            <TableCell>{row.nomeEmpresa}</TableCell>
            <TableCell>{row?.Unidade?.nome}</TableCell>
            <TableCell>{row.parcelas}</TableCell>
            <TableCell>{moment(row.inicioVigencia).format('DD/MM/YYYY')}</TableCell>
            <TableCell>{moment(row.finalVigencia).format('DD/MM/YYYY')}</TableCell>
            <TableCell>
              <Tooltip title="Editar">
                <IconButton
                  onClick={() =>
                    (window.location.href = `${process.env.REACT_APP_DOMAIN}/contrato/${row.id}/edit/`)
                  }
                >
                  <EditIcon color="primary" />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
    </TableBody>
    <TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'Todos', value: -1 }]}
          colSpan={6}
          count={registros.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage='Linhas por Página'
          SelectProps={{
            inputProps: { 'aria-label': 'Linhas por Página' },
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </TableRow>
    </TableFooter>
  </Table>
</TableContainer>

            <Dialog open={openLoadingDialog}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 120, height: 120 }}>
                    <CircularProgress />
                </div>
            </Dialog>


            <Dialog open={modalCadContrato}  >

                <DialogContent>
                    <DialogContentText>
                        <h3>

                            Cadastro de contrato
                        </h3>

                    </DialogContentText>



                    <p></p>

                    <FormControl
                        size="small"
                        labelId="demo-simple-select-label" id="demo-simple-select" style={{ width: 350 }}>


                        Setor responsavel pelo contrato:

                        <Select style={{ fontSize: 20 }} onChange={e => setNewSetor(e.target.value)}>
                            {/* <option>{status}</option> */}


                            {
                                setor.filter(row => row.id === logged.Area.Unidade.id).map((s, key) => <MenuItem name={s.nome} value={s.id} >
                                    {s.nome}</MenuItem>)
                            }
                        </Select>
                        <br></br>


                        <TextField size="small" fullWidth label="Nome da empresa" variant="outlined" value={nomeEmpresa} onChange={e => setNomeEmpresa(e.target.value)}
                            style={{
                                backgroundColor: '#fff',
                                borderRadius: 4
                            }} />

                        <br></br>


                        <TextField size="small" fullWidth label="Descrição do contrato" variant="outlined" value={descricaoEmpresa} onChange={e => setDescricaoEmpresa(e.target.value)}
                            style={{
                                backgroundColor: '#fff',
                                borderRadius: 4
                            }} />
                        <br></br>


                        <TextField size="small" fullWidth label="Parcelas ou digite pedido sob demanda" variant="outlined" value={parcelasEmpresa} onChange={e => setParcelasEmpresa(e.target.value)}
                            style={{
                                backgroundColor: '#fff',
                                borderRadius: 4
                            }} />
                        <br></br>

                        <TextField
                            size="small"
                            fullWidth
                            label="Valor do contrato"
                            variant="outlined"
                            type="number"
                            value={valorContrato}
                            onChange={e => setValorContrato(parseFloat(e.target.value))}
                            style={{

                                backgroundColor: '#fff',
                                borderRadius: 4
                            }}
                        />

                        {/* Início da Vigência */}
                        <TextField
                            size="small"
                            fullWidth
                            label="Início da Vigência"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            value={inicioVigencia}
                            onChange={e => setInicioVigencia(e.target.value)}
                            style={{
                                backgroundColor: '#fff',
                                borderRadius: 4,
                                marginTop: 12
                            }}
                        />

                        {/* Final da Vigência */}
                        <TextField
                            size="small"
                            fullWidth
                            label="Final da Vigência"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            value={finalVigencia}
                            onChange={e => setFinalVigencia(e.target.value)}
                            style={{
                                backgroundColor: '#fff',
                                borderRadius: 4,
                                marginTop: 12
                            }}
                        />





                    </FormControl>


                    <p></p>
                    <FormControl labelId="demo-simple-select-label" id="demo-simple-select" style={{ width: 250 }}>






                        <hr></hr>


                    </FormControl>
                </DialogContent>
                <DialogActions>
                    {newSetor && inicioVigencia && finalVigencia
                        && descricaoEmpresa &&
                        nomeEmpresa && valorContrato
                        && parcelasEmpresa ?
                        <div>
                            <DialogActions>

                                <Button onClick={() => { onSaveContrato() }} >inserir</Button>
                            </DialogActions>

                        </div>
                        : ''}
                    <Button onClick={() => setModalCadContrato(false)}>Cancelar</Button>
                </DialogActions>
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
                    <Button onClick={() => setOpenMessageDialog(false)}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </PageContainer>
    );
};

export default ContratosSetor;
