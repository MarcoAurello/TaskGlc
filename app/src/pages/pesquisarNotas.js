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
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const getCookie = require('../utils/getCookie')

const PageContainer = styled.div`
  margin: 16px;
  padding: 32px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-shadow: 0px 0px 20px -18px #424242;
`

const PesquisarNotas = (props) => {
    const { logged } = props
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const [openLoadingDialog, setOpenLoadingDialog] = useState(false);
    const [modalCadContrato, setModalCadContrato] = useState(false);
    const [newSetor, setNewSetor] = useState('');
    const [nomeEmpresa, setNomeEmpresa] = useState('');
    const [registros, setRegistros] = useState([]);
    const [valorContrato, setValorContrato] = useState('')
    const [inicioVigencia, setInicioVigencia] = useState('')
    const [finalVigencia, setFinalVigencia] = useState('')
    const [setor, setSetor] = useState([]);
    const [message, setMessage] = useState('');
    const [descricaoEmpresa, setDescricaoEmpresa] = useState('');
    const [parcelasEmpresa, setParcelasEmpresa] = useState('');
    const [openMessageDialog, setOpenMessageDialog] = useState(false)
    const [keyword, setKeyword] = useState('')


    useEffect(() => {




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

        const url = `${process.env.REACT_APP_DOMAIN_API}/api/atividade/`
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





    const [searchText, setSearchText] = useState('');


    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredRows = registros.filter((row) => {
        const titulo = row?.titulo || '';
        const numeroNota = row?.numeroNota || '';
        const nomeUnidade = row?.Usuario?.Area?.Unidade?.nome || '';
        const protocolo = row?.protocolo || '';
        const status1 = row?.Status?.nome || '';
        const usuario = row?.Usuario?.nome || '';
        const criacao = row?.creatAt
            ? new Date(row.creatAt).toISOString().slice(0, 10)
            : '';

        return (
            protocolo.toLowerCase().includes(searchText.toLowerCase()) ||
            titulo.toLowerCase().includes(searchText.toLowerCase()) ||
            numeroNota.toLowerCase().includes(searchText.toLowerCase()) ||
            status1.toLowerCase().includes(searchText.toLowerCase()) ||
            usuario.toLowerCase().includes(searchText.toLowerCase()) ||
            nomeUnidade.toLowerCase().includes(searchText.toLowerCase()) ||
            criacao.includes(searchText)
        );
    });

    const exportToExcel = () => {
        const dataToExport = filteredRows.map(row => ({
            Protocolo: row.id,
            Fornecedor: row.titulo,
            NF: row.numeroNota,
            Setor: row?.Usuario?.Area?.Unidade?.nome,
            Status: row?.Status?.nome,
            Solicitante: row?.Usuario?.nome,
            'Criado em': moment(row?.createdAt).format('DD/MM/YYYY')
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Registros');

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });

        const now = moment().format('YYYY-MM-DD_HH-mm-ss');
        saveAs(data, `Acompanhamento de Notas_${now}.xlsx`);
    };


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

            
            <br></br>
            <b
  style={{
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#333',
    fontSize: '14px',
    backgroundColor: '#f0f0f5',
    padding: '8px 12px',
    borderLeft: '4px solid #1976d2',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  }}
>
  Pesquise por: número da nota, empresa, setor, protocolo, status, data de criação ou solicitante
</b>

            <TextField
                label=""
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mb: 2 }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <h3>Todas as Notas Fiscais Cadastradas</h3>

            <TableContainer sx={{ borderRadius: 2, boxShadow: 3 }}>
                <Table sx={{ minWidth: 650 }} aria-label="tabela de contratos">
                    {logged && logged.usuarioPagamento === true?

                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={exportToExcel}
                                    sx={{ mb: 2 }}
                                >
                                    Exportar para Excel
                                </Button>:""}
                    <TableHead sx={{ backgroundColor: '#1e1e2f' }}>
                        <TableRow>
                            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Fornecedor</TableCell>
                            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>NF</TableCell>
                            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Setor</TableCell>
                            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Criado em </TableCell>
                            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Solicitante </TableCell>
                            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>

                               

                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow
                                key={row.id}
                                hover
                                sx={{
                                    transition: 'background-color 0.2s',
                                    '&:hover': { backgroundColor: '#f5f5f5' }
                                }}
                            >
                                <TableCell>{row.titulo}</TableCell>
                                <TableCell>{row.numeroNota}</TableCell>
                                <TableCell>{row?.Usuario?.Area?.Unidade?.nome}</TableCell>
                                <TableCell>{row?.Status?.nome}</TableCell>
                                <TableCell>{moment(row?.createdAt).format('DD/MM/YYYY')}</TableCell>
                                <TableCell>{row?.Usuario?.nome}</TableCell>
                                <TableCell>
                                    {logged && (logged.usuarioAtesto === true || logged.usuarioSolicitante === true)
                                        &&
                                        logged.Area.Unidade.nome === row?.Usuario?.Area?.Unidade?.nome
                                        ?
                                        <Tooltip title="Editar">




                                            <IconButton
                                                onClick={() =>
                                                    (window.location.href = `${process.env.REACT_APP_DOMAIN}/nfCadastro/${row.id}/edit/`)
                                                }
                                            >
                                                <EditIcon color="primary" />
                                            </IconButton>
                                        </Tooltip>

                                        : ''}

                                    {logged && (logged.usuarioPagamento === true || logged.usuarioCarteiraFiscal === true ||
                                         logged.usuarioFinanceiro === true || logged.usuarioPatrimonio === true
                                    )

                                        ?
                                        <Tooltip title="Editar">




                                            <IconButton
                                                onClick={() =>
                                                    (window.location.href = `${process.env.REACT_APP_DOMAIN}/nfCadastro/${row.id}/edit/`)
                                                }
                                            >
                                                <EditIcon color="primary" />
                                            </IconButton>
                                        </Tooltip>

                                        : ''}

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter><p></p>
                        
                    </TableFooter>
                </Table>
            </TableContainer>

            <Dialog open={openLoadingDialog}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 120, height: 120 }}>
                    <CircularProgress />
                </div>
            </Dialog>




        </PageContainer>
    );
};

export default PesquisarNotas;
