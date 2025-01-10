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

const AtividadeEditar = (props) => {
    const { id } = props.match.params;
    const { logged } = props
    const [openLoadingDialog, setOpenLoadingDialog] = useState(false)
    const [openMessageDialog, setOpenMessageDialog] = useState(false)
    const [message, setMessage] = useState('')

    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [fkUnidade, setFkUnidade] = useState('')
    const [atividade, setAtividade] = useState([])
    const [forma, getForma] = useState('')
    const [indicacao, getIndicacao] = useState('')
    const [informacoes, getInformacoes] = useState('')
    const [material, getMaterial] = useState('')
    const [eletro, getEletro] = useState('')
    const [dimensao, setDimensao] = useState('')
    const [categoria, getCategoria] = useState('')
    const [medida, getMedida] = useState('')
    const [cor, getCor] = useState('')
    const [centroCusto, getCentroCusto] = useState('')
    const [categoriaChamado, setCategoriaChamado] = useState('')
    const [title, setTitle] = useState('')
    const [fksolicitante, setFkSolicitante] = useState('')



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
                            setAtividade(data.data)




                            getForma(data.data.forma)
                            getMedida(data.data.medida)
                            getCor(data.data.cor)
                            setDimensao(data.data.dimensao)
                            getIndicacao(data.data.indicacao)
                            getInformacoes(data.data.informacoes)
                            getMaterial(data.data.material)
                            getEletro(data.data.eletro)
                            

                            getCategoria(data.data.categoria)
                            getCentroCusto(data.data.centroCusto)



                            setCategoriaChamado(data.data.categoria)
                            setTitle(data.data.titulo)
                            setFkSolicitante(data.data.fkUsuarioSolicitante)
                            // setCentroCusto(data.data.centroCusto)

                            setOpenLoadingDialog(false)

                        }
                    }).catch(err => setOpenLoadingDialog(false))
                })
        }

        carregarRegistro()



    }, [])

    useEffect(() => {



    }, [])




    const onSaveStatus = () => {
        const token = getCookie('_token_task_manager')
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                centroCusto,
                forma,
                dimensao,
                material,
                eletro,
                medida,
                indicacao,
                informacoes,
                cor


                
            })
        }

        fetch(`${process.env.REACT_APP_DOMAIN_API}/api/atividade/${id}/edit/`, params)
            .then(response => {
                const { status } = response
                response.json().then(data => {
                    setOpenLoadingDialog(false)
                    if (status === 401) {
                        setMessage(data.message)
                        setOpenMessageDialog(true)
                    } else if (status === 200) {

                        window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/${id}/edit`
                        // alert(JSON.stringify(data.data))
                        setMessage(data.message)
                        setOpenMessageDialog(true)
                        // setArea(data.data)
                    }
                }).catch(err => setOpenLoadingDialog(true))
            })
    }

    return (
        <PageContainer>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <h3>Alterar dados do cadastro de : {title}</h3>
                <div style={{ flex: 1 }}></div>
            </div>
            

            {logged && logged.id === fksolicitante ?
             <div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                <TextField size="small" fullWidth label="Grupo de Pagamento" variant="outlined" value={centroCusto} onChange={e => getCentroCusto(e.target.value)}
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: 4
                    }} /><p></p>
                <TextField
                    size="small"
                    fullWidth
                    label="Descrição da forma"
                    variant="outlined"
                    value={forma}
                    multiline
                    minRows={2}
                    maxRows={4}
                    onChange={e => getForma(e.target.value)}
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: 4
                    }}
                    InputLabelProps={{ style: { color: '#888' } }}
                    InputProps={{
                        style: {
                            color: '#333'
                        },
                        classes: {
                            notchedOutline: {
                                borderColor: '#ccc'
                            }
                        }
                    }}
                /><p></p>
                <TextField
                    size="small"
                    fullWidth
                    label="Dimensão"
                    variant="outlined"
                    value={dimensao}
                    multiline
                    minRows={2}
                    maxRows={4}
                    onChange={e => setDimensao(e.target.value)}
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: 4
                    }}
                    InputLabelProps={{ style: { color: '#888' } }}
                    InputProps={{
                        style: {
                            color: '#333'
                        },
                        classes: {
                            notchedOutline: {
                                borderColor: '#ccc'
                            }
                        }
                    }}
                /><p></p>

<TextField
                    size="small"
                    fullWidth
                    label="Cor"
                    variant="outlined"
                    value={cor}
                    multiline
                    minRows={2}
                    maxRows={4}
                    onChange={e => getCor(e.target.value)}
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: 4
                    }}
                    InputLabelProps={{ style: { color: '#888' } }}
                    InputProps={{
                        style: {
                            color: '#333'
                        },
                        classes: {
                            notchedOutline: {
                                borderColor: '#ccc'
                            }
                        }
                    }}
                /><p></p>

                <TextField
                    size="small"
                    fullWidth
                    label="Material"
                    variant="outlined"
                    value={material}
                    multiline
                    minRows={2}
                    maxRows={4}
                    onChange={e => getMaterial(e.target.value)}
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: 4
                    }}
                    InputLabelProps={{ style: { color: '#888' } }}
                    InputProps={{
                        style: {
                            color: '#333'
                        },
                        classes: {
                            notchedOutline: {
                                borderColor: '#ccc'
                            }
                        }
                    }}
                /><p></p>
                <TextField
                    size="small"
                    fullWidth
                    label="Especificações técnicas"
                    variant="outlined"
                    value={eletro}
                    multiline
                    minRows={2}
                    maxRows={4}
                    onChange={e => getEletro(e.target.value)}
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: 4
                    }}
                    InputLabelProps={{ style: { color: '#888' } }}
                    InputProps={{
                        style: {
                            color: '#333'
                        },
                        classes: {
                            notchedOutline: {
                                borderColor: '#ccc'
                            }
                        }
                    }}
                /><p>
                </p>
                <TextField
                    size="small"
                    fullWidth
                    label="Medidas"
                    variant="outlined"
                    value={medida}
                    multiline
                    minRows={2}
                    maxRows={4}
                    onChange={e => getMedida(e.target.value)}
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: 4
                    }}
                    InputLabelProps={{ style: { color: '#888' } }}
                    InputProps={{
                        style: {
                            color: '#333'
                        },
                        classes: {
                            notchedOutline: {
                                borderColor: '#ccc'
                            }
                        }
                    }}
                /><p></p>
                <TextField
                    size="small"
                    fullWidth
                    label="Indicações"
                    variant="outlined"
                    value={indicacao}
                    multiline
                    minRows={2}
                    maxRows={4}
                    onChange={e => getIndicacao(e.target.value)}
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: 4
                    }}
                    InputLabelProps={{ style: { color: '#888' } }}
                    InputProps={{
                        style: {
                            color: '#333'
                        },
                        classes: {
                            notchedOutline: {
                                borderColor: '#ccc'
                            }
                        }
                    }}
                /><p></p>
                <TextField
                    size="small"
                    fullWidth
                    label="Informações"
                    variant="outlined"
                    value={informacoes}
                    multiline
                    minRows={2}
                    maxRows={4}
                    onChange={e => getInformacoes(e.target.value)}
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: 4
                    }}
                    InputLabelProps={{ style: { color: '#888' } }}
                    InputProps={{
                        style: {
                            color: '#333'
                        },
                        classes: {
                            notchedOutline: {
                                borderColor: '#ccc'
                            }
                        }
                    }}
                /><p></p>


                <Button onClick={() => { onSaveStatus() }} >Alterar</Button>

            </div>

             </div>
             
             :"Usuário não autorizado"}

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
                    <Button onClick={() => setOpenMessageDialog(false)}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </PageContainer>
    );
};

export default AtividadeEditar;
