import React, { useEffect, useState, useRef, useMemo } from "react";
import styled from 'styled-components'
import ReactQuill from 'react-quill';
import {
    Alert, Avatar, Box, Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel,
    FormGroup, FormLabel, Hidden, Grid, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, Switch, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination,
    TableRow, TextField, Tooltip, Typography
} from "@mui/material";

import Stepper from '@mui/material/Stepper';

import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import 'react-quill/dist/quill.snow.css';

import TaskItemDoChamadoFornecedor from "../components/task-item-do-chamadoFornecedor";
import moment from 'moment';
import TaskItemDoChamado from "../components/task-item-do-chamado";
import TaskItemDoChamadoProjeto from "../components/task-item-do-chamadoProjeto";
import PerfilUtils from "../utils/perfil.utils";
import MessageIcon from '@mui/icons-material/Message';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import UploadButton from "../components/UploadButton";
import { color } from "@mui/system";
import TaskFilter from "../components/task-filter";
import FileViewer from '../components/fileViewer';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';



const getCookie = require('../utils/getCookie')


const PageContainer = styled.div`
  margin: 16px;
  padding: 32px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-shadow: 0px 0px 20px -18px #424242;
  
`

const NfForm = (props) => {
    const { logged } = props

    const [checked, setChecked] = React.useState(false);
    // alert(JSON.stringify(logged.nome))
    const [arquivado, setArquivado] = useState(true)

    const [open, setOpen] = useState(false);
    const ImageLogo = require('../assets/coment.png')
    const ImageCalc = require('../assets/calc.png')
    const ImagePlan = require('../assets/zip.png')
    const [openImg, setOpenImg] = useState(false);
    const [openMsg, setOpenMsg] = useState(false);
    const [openStatus, setOpenStatus] = useState(false);
    const [boleanDimensao, setBoleanDimensao] = useState(false);
    const [dimensao, setDimensao] = useState("");
    const ImageProd = require('../assets/pdf.png')
    const ImageMsg = require('../assets/msg.png')

    const { id } = props.match.params;
    const [openLoadingDialog, setOpenLoadingDialog] = useState(false)
    const [openMessageDialog, setOpenMessageDialog] = useState(false)
    const [message, setMessage] = useState('')
    const [selectedButton, setSelectedButton] = useState("");


    const [classificacao, setClassificacao] = useState('')
    const [newClassificacao, setNewClassificacao] = useState('')
    const [newStatus, setNewStatus] = useState('')
    const [newStatusControler, setNewStatusControler] = useState('')
    const [statusId, setStatusId] = useState('')
    const [setorDemandante, setSetorDemandante] = useState('')

    const [protocolo, setProtocolo] = useState('')
    const [status, setStatus] = useState('')
    const [valueArea, setValueArea] = useState('')
    const [valueUnidade, setValueUnidade] = useState('')
    const [detalhes, setDetalhes] = useState('')
    const [usuario, setUsuario] = useState('')
    const [emailUsuario, setEmailUsuario] = useState('')
    const [telefoneSolicitante, setTelefoneSolicitante] = useState('')
    const [setorSolicitante, setSetorSolicitante] = useState('')
    const [setorSolicitanteFk, setSetorSolicitanteFK] = useState('')
    const [categoriaChamado, setCategoriaChamado] = useState('')
    const [btnMsg, setBtnMsg] = useState(false);
    const [tempoEstimado, setTempoEstimado] = useState('')
    const [numeroSerie, setNumeroSerie] = useState("");
    const [numeroPedido, setNumeroPedido] = useState("");

    const [fornecedor, setFornecedor] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [numeroNota, setNumeroNota] = useState('')
    const [rateio, setRateio] = useState('')
    const [atesto, setAtesto] = useState('')
    const [codigoMira, setCodigoMira] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [title, setTitle] = useState('')
    const [valorNF, setValorNF] = useState('')
    const [numeroContrato, setNumeroContrato] = useState('')
    const [newContrato, setNewContrato] = useState('')




    const [botaoDesabilitado, setBotaoDesabilitado] = useState(false);
    const [gti, setGti] = useState('')
    const fileInputRef = useRef(null);
    const anexo2 = require('../assets/ane.png')
    const anexo4 = require('../assets/log.png')


    const [titulo, setTitulo] = useState('')
    const [centroCusto, setCentroCusto] = useState('')
    const [timelineStatus, setTimelineStatus] = useState([])
    const anexo = require('../assets/zip.png')

    const [centroCusto1, getCentroCusto] = useState('')
    const [openMsg2, setOpenMsg2] = useState(false);
    const [openMsg3, setOpenMsg3] = useState(false);
    const [openMsg4, setOpenMsg4] = useState(false);
    const [openMsg5, setOpenMsg5] = useState(false);
    const [conteudo, setConteudo] = useState('')
    const [contrato, setContrato] = useState([]);
    const [fkUnidade, setFkUnidade] = useState('')
    const [newSetor, setNewSetor] = useState('')
    const [numeroNF, setNumeroNF] = useState('')
    const [justificativaNota, setJustificativaNota] = useState('')
    const [fkArea, setFkArea] = useState('')
    const [unidade, setUnidade] = useState([])
    const [arquivoDoChamado, setArquivoDoChamado] = useState([])
    const [unidadeTrue, setUnidadeTrue] = useState([])
    const [area, setArea] = useState([])
    const [subArea, setSubArea] = useState([])
    const [atividade, setAtividade] = useState(null)
    const [mensagens, setMensagens] = useState([])
    const [classificarChamado, setClassificarChamado] = useState([])
    const [alterarStatus, setAltararStatus] = useState([])
    const [valorNota, setValorNota] = useState('')
    const [informacoes, setInformacoes] = useState('')
    const [fkUnidadeExecutor, getFkUnidadeExecutor] = useState('')
    const [meuSetor, setMeuSetor] = useState([]);
    const [meuSetorCount, setMeuSetorCount] = useState([]);
    const [animate, setAnimate] = useState(false);
    const [cor1, getCor] = useState('')
    const [nomeProjeto, setNomeProjeto] = useState('')
    const [usuarioExecutor, setusuarioExecutor] = useState([])
    const [fkUsuarioExecutor, setFKUsuarioExecutor] = useState('')
    const [fkAreaDemandada, setFkAreaDemandada] = useState('')
    const [nomeExecutor, getNomeExecutor] = useState('')
    const [emailExecutor, getEmailExecutor] = useState('')
    const [telefoneExecutor, getTelefoneExecutor] = useState('')
    const [fkDemandante, setFkDemandante] = useState('')
    const [fkUsuario, setFkUsuario] = useState('')
    const [fkExecutor, getFkExecutor] = useState('')
    const [categoria, setCategoria] = useState('')
    const [arquivo, setArquivo] = useState(null)
    const [localPatrimonio, setLocalPatrimonio] = useState('')
    const [arquivoEnviado, setArquivoEnviado] = useState(false);


    const [listaDeArquivosEnviados, setListaDeArquivosEnviados] = useState([])
    const [caminho, setCaminho] = useState()
    const [openDialogFile, setOpenDialogFile] = useState(false)
    const [termo, setTermo] = useState(false)

    const [openFile, setOpenFile] = useState('')

    const [cpfTermo, setCpfTermo] = useState('')
    const [mensagemAlert, setMensagemAlert] = useState('')
    const [openMensagens, setOpenMensagens] = useState(false)

    const [modalSave, setModalSave] = useState(false)

    const [errorMessage, setErrorMessage] = useState('');

    const [categoria1, getCategoria] = useState('')


    const [dataInicio, setDataInicio] = useState(null)

    const [uploadResult, setUploadResult] = useState(null);

    const [hash, setHash] = useState('')




    const [idChamado, setIdChamado] = useState('')

    // const toggleChecked = () => {
    //     setChecked((prev) => !prev);
    // };



    const steps = [
        'Aguardando Aprovação do Gestor',
        'Nota em análise fiscal',
        'Nota aguardando pagamento',
        'Nota Fiscal paga',

    ];

    const statusMap = {
        Aberto: 0,
        Iniciado: 1,
        Pendênte: 2,
        Concluido: 3,
        PagoNoSetor: 4,
    };

    function StatusStepper({ status }) {
        const activeStep = ['Pendênte', 'Planejado para Iniciar'].includes(status) ? 2 : (statusMap[status] ?? 0);

        return (
            <Box
                sx={{
                    width: '100%',
                    padding: 2,
                    backgroundColor: '#f9f9f9',
                    borderRadius: '12px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    marginBottom: 3,
                }}
            >
                <Stepper
                    activeStep={activeStep}
                    alternativeLabel
                    sx={{
                        '& .MuiStepLabel-label': {
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: '#666',
                        },
                        '& .MuiStepLabel-root.Mui-completed .MuiStepLabel-label': {
                            color: '#4caf50', // verde para etapas concluídas
                        },
                        '& .MuiStepLabel-root.Mui-active .MuiStepLabel-label': {
                            color: '#1976d2', // azul para etapa atual
                        },
                        '& .MuiStepIcon-root.Mui-completed': {
                            color: '#4caf50', // ícone verde concluído
                        },
                        '& .MuiStepIcon-root.Mui-active': {
                            color: '#1976d2', // ícone azul ativo
                        },
                    }}
                >
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>


            </Box>
        );
    }





    useEffect(() => {
        if (mensagens && mensagens.length > 0) {
            setAnimate(true);
            const timer = setTimeout(() => {
                setAnimate(false);
            }, 5000);
            return () => clearTimeout(timer);
        }



    }, [mensagens, newContrato]);
    const handleDataChange = (event) => {
        const selectedDate = event.target.value;
        const currentDate = new Date();
        const [year, month, day] = selectedDate.split('-');
        const newDate = new Date(year, month - 1, day, currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds());
        setDataInicio(newDate.toISOString());

    }

    function carregarContratos() {
        // setOpenLoadingDialog(true)
        const token = getCookie('_token_task_manager')
        const params = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        fetch(`${process.env.REACT_APP_DOMAIN_API}/api/contrato/`, params)
            .then(response => {
                const { status } = response
                response.json().then(data => {
                    setOpenLoadingDialog(false)

                    if (status === 401) {

                    } else if (status === 200) {
                        setContrato(data.data)
                        // alert("3")
                        // alert(JSON.stringify(data))

                    }
                }).catch(err => setOpenLoadingDialog(true))
            })
    }


    useEffect(() => {


        function carregarStatus1(id) {
            const token = getCookie('_token_task_manager')
            const params = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }
            fetch(`${process.env.REACT_APP_DOMAIN_API}/api/timeLineStatus/${id ? id : ''}`, params)
                .then(response => {
                    const { status } = response
                    response.json().then(data => {
                        setOpenLoadingDialog(false)
                        if (status === 401) {
                            alert(data.message)
                            // setOpenMessageDialog(true)
                        } else if (status === 200) {
                            // alert(data.message)

                            // setOpenLoadingDialog(false)
                            setTimelineStatus(data.data)
                        }
                    }).catch(err => setOpenLoadingDialog(false))
                })
        }

        if (id) {


            carregarStatus1(id)
        }



    }, [])







    const salvarArquivo = () => {
        // alert(newStatus)


        const token = getCookie('_token_task_manager')
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({

                nomeArquivo: uploadResult.data.nome,
                hash: uploadResult.data.hash,
                id
            })

        }
        fetch(`${process.env.REACT_APP_DOMAIN_API}/api/arquivo/api`, params)
            .then(response => {
                const { status } = response
                response.json().then(data => {
                    setOpenLoadingDialog(false)
                    if (status === 401) {
                        // alert(2)
                        // setOpenMessageDialog(true)
                    } else if (status === 200) {
                        alert(data.message)
                        // window.location.reload()

                    }
                }).catch(err => setOpenLoadingDialog(true))
            })
    }

    function baixar(item) {
        window.location.href = `${process.env.REACT_APP_DOMAIN_API}/api/arquivo/${item}`


    }

    const handleChange = (event) => {
        setNewContrato(event.target.checked ? 'pagamento sem contrato' : '');
    };

    const label = { inputProps: { 'aria-label': 'Checkbox pagamento sem contrato' } };









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
                            // alert(JSON.stringify(data.data.prazoInicioAtividades))

                            setProtocolo(data.data.protocolo)
                            setDetalhes(data.data.detalhes)
                            setStatus(data.data.Status.nome)
                            setStatusId(data.data.Status.id)


                            setClassificacao(data.data.informacoes)
                            getCategoria(data.data.categoria)
                            setValueArea(data.data.Area.nome)
                            setSetorSolicitante(data.data.Usuario.Area.Unidade.nome)
                            setSetorSolicitanteFK(data.data.Usuario.Area.Unidade.id)
                            setValueUnidade(data.data.Area.Unidade.nome)
                            getFkUnidadeExecutor(data.data.Area.fkUnidade)
                            setUsuario(data.data.Usuario.nome)
                            setEmailUsuario(data.data.Usuario.email)
                            setTelefoneSolicitante(data.data.Usuario.telefone)
                            setFkDemandante(data.data.fkDemandante)
                            setCategoriaChamado(data.data.categoria)
                            setTitle(data.data.titulo)
                            setCentroCusto(data.data.centroCusto)
                            setValorNF(data.data.valorNota)
                            setNumeroSerie(data.data.numeroSerie)

                            setLocalPatrimonio(data.data.localPatrimonio)
                            setNumeroPedido(data.data.numeroPedido)



                            setNumeroContrato(data.data.numeroContrato)
                            setFornecedor(data.data.fornecedor)
                            setNumeroNota(data.data.numeroNota)
                            setRateio(data.data.rateio)
                            setCodigoMira(data.data.codigoMira)
                            setAtesto(data.data.atesto)
                            setCnpj(data.data.cnpj)

                            setFkAreaDemandada(data.data.fkArea)

                            setIdChamado(data.data.id)
                            setFkUsuario(data.data.fkUsuario)
                            getNomeExecutor(data.data.UsuarioExecutor.nome)
                            getEmailExecutor(data.data.UsuarioExecutor.email)
                            getTelefoneExecutor(data.data.UsuarioExecutor.telefone)
                            getFkExecutor(data.data.UsuarioExecutor.id)







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









        function carregarAtividadesDoSetor() {
            setOpenLoadingDialog(true);
            const token = getCookie("_token_task_manager");
            const params = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            fetch(
                `${process.env.REACT_APP_DOMAIN_API}/api/atividade/recebidasSetor/`,
                params
            ).then((response) => {
                const { status } = response;
                response.json().then((data) => {
                    setOpenLoadingDialog(false);
                    if (status === 401) {
                    } else if (status === 200) {
                        setOpenLoadingDialog(false);

                        // alert(JSON.stringify(data.data))

                        setMeuSetor(data.data);
                    }
                });
            });
        }

        function carregarAtividadesDoSetorCount() {
            setOpenLoadingDialog(true);
            const token = getCookie("_token_task_manager");
            const params = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            fetch(
                `${process.env.REACT_APP_DOMAIN_API}/api/atividade/recebidasSetorCount/`,
                params
            ).then((response) => {
                const { status } = response;
                response.json().then((data) => {
                    setOpenLoadingDialog(false);
                    if (status === 401) {
                    } else if (status === 200) {
                        setOpenLoadingDialog(false);

                        // alert(JSON.stringify(data.data))

                        setMeuSetorCount(data.data);
                    }
                });
            });
        }




        function carregarArquivo() {
            // setOpenLoadingDialog(true)
            const token = getCookie('_token_task_manager')
            const params = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            fetch(`${process.env.REACT_APP_DOMAIN_API}/api/arquivo/?fkAtividade=${id}`, params)
                .then(response => {
                    const { status } = response
                    response.json().then(data => {
                        setOpenLoadingDialog(false)
                        if (status === 401) {
                        } else if (status === 200) {

                            setArquivoDoChamado(data.data)

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
            carregarArquivo()


            carregarMensagem()
            carregarAtividadesDoSetor()
            carregarAtividadesDoSetorCount()


        } else {
            carregarUnidade()

        }

        // if(meuSetor){
        //   alert(JSON.stringify(meuSetor))
        // }


    }, [fkUnidade, area])





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





    useEffect(() => {
        function carregarSubArea() {
            // setOpenLoadingDialog(true)
            const token = getCookie('_token_task_manager')
            const params = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            fetch(`${process.env.REACT_APP_DOMAIN_API}/api/subarea/?fkArea=${fkArea}`, params)
                .then(response => {
                    const { status } = response
                    response.json().then(data => {
                        setOpenLoadingDialog(false)
                        if (status === 401) {
                        } else if (status === 200) {
                            setSubArea(data.data)
                            setOpenLoadingDialog(false)

                        }
                    }).catch(err => setOpenLoadingDialog(true))
                })
        }

        if (fkArea) {
            carregarSubArea()


        }
    }, [fkArea])

    // const onSaveStatus = () => {
    //   setOpenMsg(true)
    //   onSaveStatusA()

    // }


    function onSaveStatus(statusNF) {

        const token = getCookie('_token_task_manager');
        console.log('Token obtido:', token);

        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                logged: props.logged.id,
                statusNF,
                informacoes,
                newStatus
            })
        };

        fetch(`${process.env.REACT_APP_DOMAIN_API}/api/atividade/${id}/notaParaAnalise`, params)
            .then(response => {
                console.log('Resposta recebida do fetch:', response);

                const { status } = response;
                response.json()
                    .then(data => {
                        console.log('Dados da resposta:', data);

                        setOpenLoadingDialog(false);

                        if (status === 401) {

                            console.log('Erro 401:', data.message);
                            setMessage(data.message);
                            setOpenMessageDialog(true);
                        } else if (status === 200) {
                            console.log('Sucesso 200:', data.message);
                            alert(data.message);


                            window.location.href = `${process.env.REACT_APP_DOMAIN}/nfCadastro/${id}/edit`;


                        }
                    })
                    .catch(err => {
                        console.error('Erro ao processar JSON da resposta:', err);
                        setOpenLoadingDialog(true);
                    });
            })
            .catch(err => {
                console.error('Erro ao fazer fetch:', err);
            });
    }




    const handleUpload = () => {
        const file = fileInputRef.current.files[0];

        if (!file) {
            setErrorMessage('Por favor, selecione um arquivo.');
            return;
        }

        const myHeaders = new Headers();
        myHeaders.append("keyapi", "99bd4c69-322d-424d-8b9c-4622fdd997ab");

        const formData = new FormData();
        formData.append("arquivo", file, file.name);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formData,
            redirect: "follow"
        };

        fetch("https://www7.pe.senac.br/storage/api/arquivo", requestOptions)
            .then(response => {
                console.log('Status da resposta:', response.status);
                console.log('Cabeçalhos da resposta:', Array.from(response.headers.entries()));

                // Verificar se a resposta foi bem-sucedida
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                return response.text(); // Lê a resposta como texto
            })
            .then(result => {
                console.log('Resposta recebida:', result); // Mostra a resposta bruta

                try {
                    const parsedResult = JSON.parse(result);
                    console.log('Resposta parseada:', parsedResult); // Mostra a resposta parseada
                    setUploadResult(parsedResult);
                    setErrorMessage('');
                    setArquivoEnviado(true)

                } catch (e) {
                    console.error('Erro ao parsear a resposta:', e);
                    setErrorMessage('Ocorreu um erro ao salvar o arquivo.');
                }
            })
            .catch(error => {
                console.error('Erro ao fazer o fetch:', error);
                setUploadResult(null);
                setErrorMessage('Ocorreu um erro ao salvar o arquivo.');
            })
    };








    const onSave = () => {

        // alert(newContrato);
        // alert(valorNota)
        setOpenLoadingDialog(true);

        const token = getCookie('_token_task_manager');
        const payload = {
            setorSolicitante: props.logged.Area.Unidade.nome,
            listaDeArquivosEnviados,
            caminho,
            hash,
            fkUnidade,
            fkArea,
            titulo: numeroNF,
            dataInicio,
            conteudo: justificativaNota,
            dimensao,
            tipoCadastro: 'notaFiscal',
            informacoes: 'teste',
            arquivado: false,
            newContrato,
            valorNota
        };



        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        };

        const url = `${process.env.REACT_APP_DOMAIN_API}/api/atividade/nota`;


        fetch(url, params)
            .then(response => {
                const { status } = response;


                response.json().then(data => {
                    setOpenLoadingDialog(false);



                    if (status === 401) {
                        setMessage(data.message);
                        setOpenMessageDialog(true);
                    } else if (status === 200) {
                        setAtividade(data.data);
                        setMessage(data.message);
                        setOpenMessageDialog(true);
                        setModalSave(false);

                        window.location.href = `${process.env.REACT_APP_DOMAIN}/pagamentoDeNotas/`;
                    }
                }).catch(err => {
                    alert(err.message);
                    setOpenLoadingDialog(false);
                    setMessage('Erro ao processar a resposta do servidor.');
                    setOpenMessageDialog(true);
                });
            })
            .catch(err => {
                alert("🚨 Erro na requisição fetch:\n" + err.message);
                setOpenLoadingDialog(false);
                setMessage('Erro na conexão com o servidor.');
                setOpenMessageDialog(true);
            });
    };


    const novaInteracao = () => {
        setOpenLoadingDialog(true)

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
                email: emailUsuario,
                emailExecutor: emailExecutor,
                caminho,
                listaDeArquivosEnviados



            })
        }

        fetch(`${process.env.REACT_APP_DOMAIN_API}/api/mensagem/`, params)
            .then(response => {
                const { status } = response
                response.json().then(data => {
                    setOpenLoadingDialog(true)
                    if (status === 401) {
                        setOpenLoadingDialog(false)
                        setMessage(data.message)
                        setOpenMessageDialog(true)
                    } else if (status === 200) {
                        // alert(JSON.stringify(data.data))
                        // alert(JSON.stringify(arquivoDoChamado))
                        setOpenLoadingDialog(false)
                        setAtividade(data.data)
                        setMessage(data.message)



                        window.location.href = `${process.env.REACT_APP_DOMAIN}/nfCadastro/${idChamado}/edit`


                        // setArea(data.data)

                    }
                }).catch(err => setOpenLoadingDialog(true))
            })

    }

    function isValidCPF(cpf) {
        cpf = cpf.replace(/[^\d]/g, ''); // Remove caracteres não numéricos

        // Verifica se o CPF tem 11 dígitos
        if (cpf.length !== 11) {
            return false;
        }

        // Verifica se todos os dígitos são iguais (ex: 000.000.000-00)
        if (/^(\d)\1+$/.test(cpf)) {
            return false;
        }

        // Validação dos dígitos verificadores
        let sum = 0;
        let remainder;

        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cpf[i - 1]) * (11 - i);
        }

        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === parseInt(cpf[9])) {
            sum = 0;
            for (let i = 1; i <= 10; i++) {
                sum += parseInt(cpf[i - 1]) * (12 - i);
            }
            remainder = (sum * 10) % 11;
            return remainder === 10 || remainder === parseInt(cpf[10]);
        }

        return false;
    }






    const checarTermo = () => {

        const camposObrigatorios = ['cpf'];
        if (!isValidCPF(cpfTermo)) {
            mensagens1('CPF  Inválido')
            setOpenLoadingDialog(false)
            return;
        } else {
            checar()
        }

    };

    function mensagens1(msg) {
        setMensagemAlert(msg)
        setOpenMensagens(true)
    }


    function checar() {
        const token = getCookie('_token_task_manager');
        const params = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        fetch(`${process.env.REACT_APP_DOMAIN_API}/api/atividade/termo/${cpfTermo}`, params)
            .then(response => {
                const { status } = response;
                console.log('Status da resposta:', status);

                response.json().then(data => {
                    console.log('Dados da resposta:', data);

                    setOpenLoadingDialog(false);
                    if (status === 401) {
                        console.error('Erro 401: Não Autorizado');
                        // Adicione o código para lidar com o erro 401 aqui
                    } else if (status === 200) {
                        console.log('Sucesso: Termo de Compromisso assinado');
                        mensagens1(data.message)
                        setTermo(false)
                        setOpenMensagens(true)
                        // Adicione o código para lidar com o sucesso aqui
                    }
                }).catch(err => {
                    console.error('Erro ao processar resposta JSON:', err);
                    setOpenLoadingDialog(true);
                });
            }).catch(err => {
                console.error('Erro na solicitação:', err);
                console.log(err)
                setOpenLoadingDialog(true);
            });
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
                email: emailExecutor,




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
                        window.location.href = `${process.env.REACT_APP_DOMAIN}/nfCadastro/${id}/edit`

                        // setArea(data.data)
                    }
                }).catch(err => setOpenLoadingDialog(true))
            })
    }

    const sendFile = (method, url, params) => {
        const token = getCookie('_token_task_manager')

        return new Promise(function (resolve, reject) {
            let req = new XMLHttpRequest();
            req.open(method, url);
            req.setRequestHeader("Authorization", `Bearer ${token}`);

            req.addEventListener(
                "load",
                () => {
                    if (req.status === 200) {
                        resolve(JSON.parse(req.responseText));
                    } else {
                        reject(JSON.parse(req.responseText));
                    }
                },
                false
            );
            req.send(params);
        });
    };



    useEffect(() => {
        if (uploadResult) {
            setHash(uploadResult.data.hash)
            salvarArquivo()

        }

        // Verifique se há um item com nome "GLC" e defina o valor selecionado
        const glcItem = unidade.find(item => item.nome === 'GLC' && item.receber === true);
        if (glcItem) {
            setFkUnidade(glcItem.id);
        }

        carregarContratos()
    }, [unidade, uploadResult]);





    return (

        <PageContainer>


            {/* {id ? <div style={{ flex: 1, marginBottom: 16, marginLeft: 25 }}>
        <TextField size="small" fullWidth label="Protocolo" disabled variant="outlined" value={protocolo} />
      </div> : ''} */}

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 16,
                marginLeft: 5
            }}>
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




                <div style={{ overflow: 'hidden', marginLeft: '20PX' }}>
                    <a>
                        <img
                            src={ImageMsg}
                            height={70}
                            onClick={() => setOpenMsg3(true)}
                            style={{ cursor: 'pointer', border: '2px solid #ddd', borderRadius: '8px', transition: 'transform 0.3s ease' }}
                            onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                        />
                    </a>
                </div>

                {logged &&
                    (logged.usuarioSolicitante === true ||
                        logged.usuarioAtesto === true ||
                        logged.usuarioPagamento === true ||
                        logged.usuarioCarteiraFiscal === true)

                    ?
                    <div style={{ borderRadius: '8px', overflow: 'hidden', marginLeft: '20PX' }}>
                        <a>
                            <img
                                src={anexo2}
                                height={70}
                                onClick={() => setOpenMsg2(true)}
                                style={{ cursor: 'pointer', border: '2px solid #ddd', borderRadius: '8px', transition: 'transform 0.3s ease' }}
                                onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                            />
                        </a>
                        <a style={{ marginLeft: '20PX' }}>
                            <img
                                src={anexo4}
                                height={70}
                                onClick={() => setOpenMsg4(true)}
                                style={{ cursor: 'pointer', border: '2px solid #ddd', borderRadius: '8px', transition: 'transform 0.3s ease' }}
                                onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                            />
                        </a>
                    </div>

                    : ''}



            </div>

            <div>

                {id
                    ?
                    <div
                        style={{
                            background: '#f9fafb',
                            padding: 24,
                            borderRadius: 16,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                            fontFamily: 'Segoe UI, sans-serif',
                            color: '#333',
                            maxWidth: 900,
                            margin: 'auto',
                        }}
                    >
                        {logged && logged.Area.fkUnidade === '1ac87340-11f0-4e12-8c0e-4552f2ac1e6c' && logged.usuarioPagamento ?
                            <Button variant="contained" size="small" color="error" onClick={() => setOpen(true)} style={{ marginRight: 10 }}>
                                Selecionar funcionário para atender<PersonIcon />
                            </Button>
                            : ''
                        }

                        {(logged && props.logged.id === fkExecutor && logged.usuarioPagamento) || (logged && logged.Perfil.nome === PerfilUtils.Coordenador && props.logged.fkArea === fkAreaDemandada)
                        || logged && logged.usuarioCarteiraFiscal

                            ?
                            <Button variant="contained" size="small" color="error" onClick={() => setOpenStatus(true)} style={{ marginRight: 10 }}>
                                Alterar Status da Atividade
                            </Button>
                            : ''
                        }
                        {/* Informações da nota */}
                        {nomeExecutor ?
                            <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Executor:</span> {nomeExecutor}
                            </h3>

                            :
                            <div><b>Atividade sem executor</b></div>
                        }
                        <div
                            style={{
                                marginBottom: 24,
                                padding: 16,
                                background: '#f5f7fa',
                                borderRadius: 12,
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',

                            }}
                        >

                            <h3 style={{ margin: '8px 0', color: 'red', fontSize: 16 }}>
                                <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Protocolo:</span> {protocolo}
                            </h3>
                            <h3 style={{ margin: '8px 0', color: 'red', fontSize: 16 }}>
                                <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Status:</span> {status}
                            </h3>
                            <h3 style={{ margin: '8px 0', color: 'red', fontSize: 16 }}>
                                <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Tipo Pagamento:</span> {detalhes}
                            </h3>

                            <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Fornecedor:</span> {title}
                            </h3>
                            {/* <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Contrato:</span> {numeroContrato}
                            </h3> */}

                            <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Setor:</span> {setorSolicitante}
                            </h3>
                            <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Usuário:</span> {usuario}
                            </h3>
                            <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Email:</span> {emailUsuario}
                            </h3>


                            {codigoMira ?
                                <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                    <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Codigo Mira:</span> {codigoMira}
                                </h3>
                                : ''}



                            {detalhes === 'Enviado para análise fiscal, pagamento direto pela unidade' ?
                                <>
                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Fornecedor:</span> {fornecedor}
                                    </h3>

                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Cnpj:</span> {cnpj}
                                    </h3>
                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>n° Nota:</span> {numeroNota}
                                    </h3>
                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Atesto:</span> {atesto}
                                    </h3>
                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>C/ Custo:</span> {centroCusto}
                                    </h3>
                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Rateio:</span> {rateio}
                                    </h3>

                                </>
                                : ''}




                            {detalhes === 'contrato' ?
                                <div>

                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Fornecedor:</span> {fornecedor}
                                    </h3>
                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Cnpj:</span> {cnpj}
                                    </h3>
                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>n° Contrato:</span> {numeroContrato}
                                    </h3>
                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>n° Nota:</span> {numeroNota}
                                    </h3>
                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>C/ Custo:</span> {centroCusto}
                                    </h3>
                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Rateio:</span> {rateio}
                                    </h3>
                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Atesto:</span> {atesto}
                                    </h3>
                                    {logged &&
                                        (logged.id === fkExecutor && logged.usuarioPagamento === true)

                                        ?
                                        <div style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>





                                            {/* <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => onSaveStatus('Enviada para Análise Fiscal')}
                                                sx={{
                                                    paddingX: 3,
                                                    paddingY: 1,
                                                    marginBottom: '10px',
                                                    borderRadius: '8px',
                                                    textTransform: 'none',
                                                    fontWeight: 'bold',
                                                    marginRight: '10px'
                                                }}
                                            >
                                                Enviar para Analise Fiscal
                                            </Button>

                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => onSaveStatus('Enviado para Contas a Pagar')}
                                                sx={{
                                                    paddingX: 3,
                                                    paddingY: 1,
                                                    marginBottom: '10px',
                                                    borderRadius: '8px',
                                                    textTransform: 'none',
                                                    fontWeight: 'bold',
                                                    marginRight: '10px'
                                                }}
                                            >
                                                Enviar para contas a pagar
                                            </Button> */}






                                        </div>

                                        : ''}






                                </div>
                                :
                                ''}


                            {detalhes === 'Pagamento Direto pela Unidade' ?
                                <div>

                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Fornecedor:</span> {fornecedor}
                                    </h3>
                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Cnpj:</span> {cnpj}
                                    </h3>

                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>n° Nota:</span> {numeroNota}
                                    </h3>
                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>C/ Custo:</span> {centroCusto}
                                    </h3>
                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Rateio:</span> {rateio}
                                    </h3>
                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Atesto:</span> {atesto}
                                    </h3>





                                </div>
                                :
                                ''}

                            {detalhes === 'consumo' ?
                                <div>

                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Fornecedor:</span> {fornecedor}
                                    </h3>
                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Cnpj:</span> {cnpj}
                                    </h3>
                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>n° Nota:</span> {numeroNota}
                                    </h3>
                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>n° Serie:</span> {numeroSerie}
                                    </h3>
                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>n° Pedido:</span> {numeroPedido}
                                    </h3>


                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Recebido por:</span> {rateio}
                                    </h3>
                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Atesto:</span> {atesto}
                                    </h3>


                                    {logged &&
                                        (logged.id === fkExecutor && logged.usuarioPagamento === true)

                                        ?
                                        <div style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>



                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => setOpenMsg2(true)}
                                                sx={{
                                                    paddingX: 3,
                                                    paddingY: 1,
                                                    marginBottom: '10px',
                                                    borderRadius: '8px',
                                                    textTransform: 'none',
                                                    fontWeight: 'bold',
                                                    marginRight: '10px'
                                                }}
                                            >
                                                Anexar relatório MXM
                                            </Button>

                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => onSaveStatus('Enviada para Análise Fiscal')}
                                                sx={{
                                                    paddingX: 3,
                                                    paddingY: 1,
                                                    marginBottom: '10px',
                                                    borderRadius: '8px',
                                                    textTransform: 'none',
                                                    fontWeight: 'bold',
                                                    marginRight: '10px'
                                                }}
                                            >
                                                Enviar para Analise Fiscal
                                            </Button>

                                            {/* <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => onSaveStatus('Enviado para Contas a Pagar')}
                                                sx={{
                                                    paddingX: 3,
                                                    paddingY: 1,
                                                    marginBottom: '10px',
                                                    borderRadius: '8px',
                                                    textTransform: 'none',
                                                    fontWeight: 'bold',
                                                    marginRight: '10px'
                                                }}
                                            >
                                                Enviar para contas a pagar
                                            </Button> */}






                                        </div>

                                        : ''}





                                </div>
                                :
                                ''}

                            {detalhes === 'patrimonio' ?
                                <div>

                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Fornecedor:</span> {fornecedor}
                                    </h3>
                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Cnpj:</span> {cnpj}
                                    </h3>
                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>n° Nota:</span> {numeroNota}
                                    </h3>
                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>n° Serie:</span> {numeroSerie}
                                    </h3>
                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>n° Pedido:</span> {numeroPedido}
                                    </h3>


                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Recebido por:</span> {rateio}
                                    </h3>
                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Atesto:</span> {atesto}
                                    </h3>

                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Local do Bem:</span> {localPatrimonio}
                                    </h3>


                                    {logged &&
                                        (logged.id === fkExecutor && logged.usuarioPagamento === true)

                                        ?
                                        <div style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>

                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => setOpenMsg2(true)}
                                                sx={{
                                                    paddingX: 3,
                                                    paddingY: 1,
                                                    marginBottom: '10px',
                                                    borderRadius: '8px',
                                                    textTransform: 'none',
                                                    fontWeight: 'bold',
                                                    marginRight: '10px'
                                                }}
                                            >
                                                Anexar relatório MXM
                                            </Button>


                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => setOpenMsg2(true)}
                                                sx={{
                                                    paddingX: 3,
                                                    paddingY: 1,
                                                    marginBottom: '10px',
                                                    borderRadius: '8px',
                                                    textTransform: 'none',
                                                    marginRight: '10px',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Anexar relatório de tombamento
                                            </Button>

                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => onSaveStatus('Enviada para Análise Fiscal')}
                                                sx={{
                                                    paddingX: 3,
                                                    paddingY: 1,
                                                    marginBottom: '10px',
                                                    borderRadius: '8px',
                                                    textTransform: 'none',
                                                    fontWeight: 'bold',
                                                    marginRight: '10px'
                                                }}
                                            >
                                                Enviar para Analise Fiscal
                                            </Button>

                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => onSaveStatus('Enviado para Contas a PagarPatr')}
                                                sx={{
                                                    paddingX: 3,
                                                    paddingY: 1,
                                                    marginBottom: '10px',
                                                    borderRadius: '8px',
                                                    textTransform: 'none',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Enviar para contas a pagar e patrimônio
                                            </Button>

                                        </div>

                                        : ''}



                                </div>
                                :
                                ''}

                            {logged && logged.usuarioFinanceiro && status === 'Enviado para Contas a Pagar' ?
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => onSaveStatus('Pago')}
                                    sx={{
                                        paddingX: 3,
                                        paddingY: 1,
                                        marginBottom: '10px',
                                        borderRadius: '8px',
                                        textTransform: 'none',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Pagamento feito
                                </Button>

                                : ''}

                            {logged && logged.Area?.Unidade?.nome === setorSolicitante && status === 'Analisado pela carteira fiscal pagamento direto pela unidade'
                                && classificacao ?
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => setOpenMsg5(true)}

                                    sx={{
                                        paddingX: 3,
                                        paddingY: 1,
                                        marginBottom: '10px',
                                        borderRadius: '8px',
                                        textTransform: 'none',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Nota inserida no MXM, enviar para Analise Fiscal
                                </Button>

                                : ''}



                            {detalhes === 'servico' ?
                                <div>

                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Fornecedor:</span> {fornecedor}
                                    </h3>
                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Cnpj:</span> {cnpj}
                                    </h3>
                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>n° Nota:</span> {numeroNota}
                                    </h3>
                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>n° Serie:</span> {numeroSerie}
                                    </h3>
                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>n° Pedido:</span> {numeroPedido}
                                    </h3>
                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Grupo Pagamento:</span> {centroCusto}
                                    </h3>



                                    <h3 style={{ margin: '8px 0', color: '#333', fontSize: 16 }}>
                                        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Atesto:</span> {atesto}
                                    </h3>



                                    {logged &&
                                        (logged.id === fkExecutor && logged.usuarioPagamento === true)

                                        ?
                                        <div style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>



                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => setOpenMsg2(true)}
                                                sx={{
                                                    paddingX: 3,
                                                    paddingY: 1,
                                                    marginBottom: '10px',
                                                    borderRadius: '8px',
                                                    textTransform: 'none',
                                                    fontWeight: 'bold',
                                                    marginRight: '10px'
                                                }}
                                            >
                                                Anexar relatório MXM
                                            </Button>

                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => onSaveStatus('Enviada para Análise Fiscal')}
                                                sx={{
                                                    paddingX: 3,
                                                    paddingY: 1,
                                                    marginBottom: '10px',
                                                    borderRadius: '8px',
                                                    textTransform: 'none',
                                                    fontWeight: 'bold',
                                                    marginRight: '10px'
                                                }}
                                            >
                                                Enviar para Analise Fiscal
                                            </Button>

                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => onSaveStatus('Enviado para Contas a Pagar')}
                                                sx={{
                                                    paddingX: 3,
                                                    paddingY: 1,
                                                    marginBottom: '10px',
                                                    borderRadius: '8px',
                                                    textTransform: 'none',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Enviar para contas a pagar
                                            </Button>

                                           







                                        </div>

                                        : ''}

                                        



                                </div>
                                :
                                ''}
                            {logged?.usuarioCarteiraFiscal && (status === 'Enviada para Análise Fiscal' || status === 'Enviado para análise fiscal, pagamento direto pela unidade') && (
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => setModalSave(true)}
                                        sx={{
                                            paddingX: 3,
                                            paddingY: 1,
                                            borderRadius: '8px',
                                            textTransform: 'none',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Analisar nota
                                    </Button>
                                </div>
                            )}

                            {logged && logged.usuarioCarteiraFiscal &&
                                (status === 'Mxm cadastrado, segue para validação da carteira fiscal') ?
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => onSaveStatus('Enviado para Contas a Pagar')}
                                    sx={{
                                        paddingX: 3,
                                        paddingY: 1,
                                        marginBottom: '10px',
                                        borderRadius: '8px',
                                        textTransform: 'none',
                                        fontWeight: 'bold',
                                        marginRight: '10px'
                                    }}
                                >
                                    Enviar para contas a pagar
                                </Button>


                                :
                                ''}

                                 {logged && logged.usuarioPagamento &&
                                                logged.nome === nomeExecutor &&
                                                status === 'Enviada para lançar pagamento GLC' && classificacao
                                                ?
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => setOpenMsg5(true)}

                                                    sx={{
                                                        paddingX: 3,
                                                        paddingY: 1,
                                                        marginBottom: '10px',
                                                        borderRadius: '8px',
                                                        textTransform: 'none',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    Nota inserida no MXM, enviar para Analise Fiscal
                                                </Button>

                                                : ''}






                            {arquivoDoChamado.length > 0 && (
                                <div
                                    style={{
                                        border: '2px solid #e0e0e0',
                                        borderRadius: 12,
                                        padding: 16,
                                        marginBottom: 24,
                                        backgroundColor: '#fff',
                                    }}
                                >
                                    <strong style={{ display: 'block', marginBottom: 12 }}>
                                        Baixe os documentos para analisar este pagamento:
                                    </strong>

                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            gap: 12,
                                            flexWrap: 'wrap',
                                            marginBottom: 16,
                                        }}
                                    >
                                        {arquivoDoChamado
                                            .filter(item => !item.hash)
                                            .map((item, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => baixar(item.id)}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        whiteSpace: 'nowrap',
                                                        padding: '6px 12px',
                                                        borderRadius: 6,
                                                        border: '1px solid #ccc',
                                                        backgroundColor: '#f5f5f5',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    <AttachFileIcon style={{ marginRight: 4 }} />
                                                    {item.nomeApresentacao}
                                                </button>
                                            ))}
                                    </div>


                                    <FileViewer arquivoDoChamado={arquivoDoChamado} />
                                </div>


                            )}

                        </div>


                        {classificacao ?
                            <div
                                style={{
                                    marginBottom: 24,
                                    padding: 16,
                                    background: '#000', // fundo preto
                                    borderRadius: 12,
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-word',
                                    display: 'flex', // coloca os itens lado a lado
                                    alignItems: 'center', // alinha verticalmente
                                    gap: 16, // espaçamento entre os itens
                                    color: '#fff' // texto branco
                                }}
                            >
                                <img
                                    src={ImageCalc}
                                    height={70}
                                    style={{
                                        cursor: 'pointer',

                                        borderRadius: '8px',
                                        transition: 'transform 0.3s ease'
                                    }}
                                />
                                <h3 style={{ margin: 0, color: '#fff', fontSize: 16 }}>
                                    <span style={{ color: '#4dabf7', fontWeight: 'bold' }}>Análise Fiscal:</span> {classificacao}
                                </h3>
                            </div>



                            : ''}



                        {/* Documentos */}





                        {/* Botão de ação do gestor */}



                        <div style={{
                            maxHeight: '300px',
                            overflowY: 'auto',
                            padding: '10px',
                            backgroundColor: '#e5ddd5',
                            borderRadius: '10px',
                            marginBottom: '20px',
                        }}>
                            {mensagens.map((item, index) => (
                                <div key={index} style={{
                                    borderTop: '1px solid #e0e0e0',
                                    padding: 10,
                                    background: '#FFFFE0',
                                    borderRadius: 10,

                                    border: '2px solid #e0e0e0',
                                }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <b style={{ fontSize: 12 }}>{item.Usuario ? item.Usuario.nome : ''}</b>
                                            <b style={{ fontSize: 12 }}>{new Date(item.createdAt).toLocaleString()}</b>
                                        </div>
                                    </div>
                                    <div>


                                        <Box
                                            sx={{

                                            }}
                                            dangerouslySetInnerHTML={{ __html: item.conteudo }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Campo para mensagem */}


                        {/* Botão de enviar mensagem */}









                        {logged?.usuarioAtesto && status === 'Nota Cadastrada - Aguardando aprovação do gestor' &&
                            (detalhes === 'contrato' || detalhes === 'patrimonio' || detalhes === 'servico'
                                || detalhes === 'consumo'
                            ) &&
                            logged.Area.Unidade.nome === setorSolicitante && (
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => onSaveStatus('Enviada para Análise Fiscal')}
                                        sx={{
                                            paddingX: 3,
                                            paddingY: 1,
                                            borderRadius: '8px',
                                            textTransform: 'none',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Aprovar e enviar para Analise Fiscal
                                    </Button>
                                </div>
                            )}


                        {logged?.usuarioAtesto && status === 'Nota Cadastrada - Aguardando aprovação do gestor' &&
                            detalhes === 'Enviado para análise fiscal, pagamento direto pela unidade'
                            &&
                            logged.Area.Unidade.nome === setorSolicitante && (
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => onSaveStatus('Enviado para análise fiscal, pagamento direto pela unidade')}
                                        sx={{
                                            paddingX: 3,
                                            paddingY: 1,
                                            borderRadius: '8px',
                                            textTransform: 'none',
                                            fontWeight: 'bold',
                                        }}
                                    >Aprovar e enviar para Analise Fiscal
                                    </Button>
                                </div>
                            )}








                        <hr style={{ borderTop: '1px solid #e0e0e0', marginBottom: 24 }} />

                        {/* Mensagens anteriores */}


                    </div>



                    :
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '24px',
                            maxWidth: '600px',
                            margin: '40px auto',
                            padding: '32px',
                            backgroundColor: '#fafafa',
                            borderRadius: '16px',
                            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.06)',
                        }}
                    >

                        {/* Botão de voltar */}
                        <Button
                            size="small"
                            variant="contained"
                            startIcon={<ArrowBackIcon />}
                            onClick={() =>
                                (window.location.href = `${process.env.REACT_APP_DOMAIN}/pagamentos`)
                            }
                            style={{
                                borderRadius: 6,
                                maxWidth: '90px',
                                textTransform: 'none',
                                fontSize: 13,
                            }}
                        >
                            Voltar
                        </Button>
                        <h3>Cadastro de Nota fiscal para acompanhamento</h3>


                        {/* Seleção de contrato */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <label style={{ fontWeight: '500', fontSize: '14px' }}>Contrato:</label>
                            <Select
                                onChange={e => setNewContrato(e.target.value)}
                                style={{
                                    width: '100%',
                                    height: '38px',
                                    fontSize: '13px',
                                    backgroundColor: '#fff',
                                    borderRadius: '6px',
                                    border: '1px solid #ccc',
                                    padding: '4px 8px',
                                }}
                            >
                                {contrato
                                    .filter(s => s.fkUnidade === logged.Area.Unidade.id)
                                    .map((s, key) => (
                                        <MenuItem
                                            key={key}
                                            value={s.id}
                                            style={{ fontSize: '13px', padding: '6px 10px' }}
                                        >
                                            {s.nomeEmpresa}
                                        </MenuItem>
                                    ))}
                            </Select>

                            {/* Checkbox: Pagamento sem contrato */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Checkbox
                                    onChange={handleChange}
                                    sx={{
                                        color: '#1976d2',
                                        '&.Mui-checked': { color: '#1976d2' },
                                        transform: 'scale(1.2)',
                                    }}
                                />
                                <span style={{ fontSize: '14px' }}>Pagamento sem contrato</span>
                            </div>
                        </div>

                        {/* Dados da nota */}

                        {newContrato != ''
                            ? <div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <TextField
                                        size="small"
                                        label="Número da Nota"
                                        variant="outlined"
                                        value={numeroNF}
                                        onChange={e => setNumeroNF(e.target.value)}
                                        style={{ backgroundColor: '#fff', borderRadius: 6 }}
                                        InputLabelProps={{ style: { color: '#888' } }}
                                        InputProps={{ style: { color: '#333' } }}
                                    />

                                    <TextField
                                        size="small"
                                        label="Valor da Nota"
                                        variant="outlined"
                                        type="number"
                                        value={valorNota}
                                        onChange={e => setValorNota(parseFloat(e.target.value))}
                                        style={{ backgroundColor: '#fff', borderRadius: 6 }}
                                    />

                                    <TextField
                                        size="small"
                                        fullWidth
                                        label="Justificativa do Pagamento"
                                        variant="outlined"
                                        value={justificativaNota}
                                        onChange={e => setJustificativaNota(e.target.value)}
                                        style={{ backgroundColor: '#fff', borderRadius: 6 }}
                                        InputLabelProps={{ style: { color: '#888' } }}
                                        InputProps={{ style: { color: '#333' } }}
                                    />
                                </div>

                                {/* Data e anexo */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <TextField
                                        id="date"
                                        label="Data prevista para Pagamento"
                                        type="date"
                                        size="small"
                                        defaultValue={new Date()}
                                        onChange={handleDataChange}
                                        InputLabelProps={{ shrink: true }}
                                        style={{ backgroundColor: '#fff', borderRadius: 6 }}
                                    />

                                    <div
                                        style={{
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                            maxWidth: 'fit-content',
                                        }}
                                    >
                                        <a>
                                            <img
                                                src={anexo}
                                                height={70}
                                                onClick={() => setOpenMsg2(true)}
                                                style={{
                                                    cursor: 'pointer',
                                                    border: '2px solid #ddd',
                                                    borderRadius: '8px',
                                                    transition: 'transform 0.3s ease',
                                                }}
                                                onMouseEnter={e => (e.target.style.transform = 'scale(1.05)')}
                                                onMouseLeave={e => (e.target.style.transform = 'scale(1)')}
                                            />
                                        </a>
                                    </div>
                                </div>

                                {/* Botão de envio */}



                                <Button
                                    variant="contained"
                                    disabled={botaoDesabilitado}
                                    onClick={() => onSave()}
                                    style={{
                                        padding: '10px 16px',
                                        fontWeight: '500',
                                        borderRadius: 8,
                                        fontSize: '14px',
                                    }}
                                >
                                    Enviar Nota para aprovação do seu gestor
                                </Button>
                            </div>
                            : ''}

                    </div>



                }



                <div>

                    {uploadResult && (
                        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid green' }}>
                            {uploadResult.message === "Cadastro realizado com sucesso." ? (
                                <div>
                                    {/* <p><strong>Sucesso:</strong> {uploadResult.message}</p> */}
                                    <p><strong>Nome do Arquivo:</strong> {uploadResult.data.nome}</p>
                                    <p><strong>Tamanho:</strong> {uploadResult.data.tamanho}</p>
                                    {/* <p><strong>Hash:</strong> {uploadResult.data.hash}</p> */}

                                </div>
                            ) : (
                                <p><strong>Erro:</strong> {uploadResult.message}</p>
                            )}
                        </div>
                    )}


                </div>

                <p></p>




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
                    <Button onClick={() => [setOpenMessageDialog(false), setTermo(false)]}>
                        fechar
                    </Button>
                </DialogActions>
            </Dialog>

            {openFile.length ?
                <Dialog
                    open={openDialogFile} onClose={() => setOpenDialogFile(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                        Anexo
                    </DialogTitle>
                    <DialogContent >
                        <DialogContentText id="alert-dialog-description">
                            <embed src={window.location.href = `${process.env.REACT_APP_DOMAIN_API}/api/arquivo/${openFile}`} ></embed>

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button >
                            OK
                        </Button>
                    </DialogActions>


                </Dialog>
                :
                ''
            }

            <Dialog
                open={modalSave}
                onClose={() => setOpenDialogFile(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: {
                        padding: 24,
                        borderRadius: 12,
                        backgroundColor: '#f9f9f9',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                        maxWidth: 500,
                        width: '100%',
                    },
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <TextField
                        size="small"
                        fullWidth
                        multiline
                        rows={3}
                        label="Análise desta nota"
                        variant="outlined"
                        value={informacoes}
                        onChange={e => setInformacoes(e.target.value)}
                        InputLabelProps={{ style: { color: '#666' } }}
                        InputProps={{
                            style: {
                                backgroundColor: '#fff',
                                borderRadius: 6,
                                color: '#333',
                            },
                        }}
                    />


                    {status === 'Enviado para análise fiscal, pagamento direto pela unidade' ?
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => onSaveStatus('para pagamento direto')}
                            style={{
                                alignSelf: 'flex-end',
                                borderRadius: 6,
                                padding: '6px 16px',
                                textTransform: 'none',
                                fontWeight: 'bold',
                            }}
                        >
                            Enviar Análise da Nota
                        </Button>

                        :

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => onSaveStatus('Carteira Enviada para lançar pagamento GLC')}
                            style={{
                                alignSelf: 'flex-end',
                                borderRadius: 6,
                                padding: '6px 16px',
                                textTransform: 'none',
                                fontWeight: 'bold',
                            }}
                        >
                            Enviar Análise
                        </Button>

                    }


                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setModalSave(false)}
                        style={{
                            alignSelf: 'flex-end',
                            borderRadius: 6,
                            padding: '6px 16px',
                            textTransform: 'none',
                            fontWeight: 'bold',
                        }}
                    >
                        Fechar
                    </Button>


                </div>
            </Dialog>



            <Dialog open={openStatus}  >

                <DialogContent>
                    <DialogContentText>
                        Atenção, o Status é configurado para mudar automaticamente em cada passo da NF, só altere manualmente caso algum erro
                        ocorra no processo.

                    </DialogContentText>



                    <p></p>

                    <FormControl labelId="demo-simple-select-label" id="demo-simple-select" style={{ width: 250 }}>
                        <InputLabel id="demo-simple-select-label">{status}</InputLabel>


                        <Select style={{ fontSize: 20 }} onChange={e => setNewStatus(e.target.value)}>
                            {/* <option>{status}</option> */}


                            {
                                alterarStatus.filter(status => status.descricao != null)
                                    .filter(status =>
                                        status.descricao != null &&
                                        status.nome !== 'Nota Cadastrada - Aguardando aprovação do gestor'
                                    ).map((status, key) => <MenuItem name={status.nome} value={status.id} >
                                        {status.nome}</MenuItem>)
                            }
                        </Select>



                    </FormControl>


                    <p></p>

                </DialogContent>
                <DialogActions>
                    {newStatus != '' ?
                        <div>
                            <DialogActions>
                                <Button onClick={() => setOpenStatus(false)}>Cancelar</Button>
                                <Button onClick={() => { onSaveStatus() }} >Alterar</Button>
                            </DialogActions>

                        </div>
                        : ''}
                </DialogActions>
            </Dialog>








            <hr></hr>


            <Dialog open={open} >
                <DialogTitle style={{ color: '#1E90FF' }} ></DialogTitle>
                <DialogContent>
                    <DialogContentText>


                    </DialogContentText>

                    <InputLabel id="demo-select-small"><b>Nota:</b></InputLabel>
                    {title}
                    <br></br>
                    <InputLabel id="demo-select-small"><b>Unidade</b></InputLabel>
                    {valueUnidade}

                    <hr></hr>

                    <p></p>

                    <FormControl fullWidth labelId="demo-simple-select-label" id="demo-simple-select">




                        <hr></hr>




                        <select style={{ fontSize: 14 }} onChange={e => setFKUsuarioExecutor(e.target.value)}>

                            <option >SELECIONE  O EXECUTOR</option>
                            {
                                usuarioExecutor
                                    .filter(user => user.usuarioPagamento === true)
                                    .map((user, key) => (
                                        <option key={key} name={user.nome} value={user.id}>
                                            {user.nome}
                                        </option>
                                    ))
                            }


                        </select>









                    </FormControl>
                </DialogContent>
                {fkUsuarioExecutor ?
                    <div>
                        <DialogActions>
                            <Button onClick={() => setOpen(false)}>Cancelar</Button>
                            <Button onClick={() => { criarExecucao() }} >Selecionar Usuario</Button>
                        </DialogActions>

                    </div>
                    : ''}

            </Dialog>







            <Dialog open={openMsg2}>
                <DialogContent>
                    <hr style={{ margin: '20px 0', borderColor: '#ddd' }} />

                    <div style={{ color: 'red' }}>

                    </div>
                    <p></p>
                    <div>
                        <h2>Selecione o arquivo e clique em enviar</h2>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                marginBottom: '20px',
                                width: '100%',
                                fontSize: '16px'
                            }}
                        />
                        <button
                            onClick={handleUpload}
                            style={{
                                backgroundColor: '#108cdd',
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                transition: 'red'
                            }}
                            onMouseEnter={e => e.target.style.backgroundColor = 'red'}
                            onMouseLeave={e => e.target.style.backgroundColor = '#108cdd'}
                        >
                            Enviar
                        </button>

                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            onClick={() => setOpenMsg2(false)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#555',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                textDecoration: 'underline'
                            }}
                        >
                            Voltar para o chamado
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>


            <Dialog open={openMsg4}>
                <DialogContent>
                    <hr style={{ margin: '20px 0', borderColor: '#ddd' }} />

                    <div style={{ color: 'red' }}>

                    </div>
                    <div>
                        {timelineStatus.length ? (
                            <div><b>

                                Atendimento do Pagamento:
                            </b>
                                {timelineStatus.map((item, index) => (
                                    <div key={index} style={{ fontSize: '9px' }}>
                                        {item.Usuario?.nome}-{item.Status?.nome}- {moment(item.createdAt).format('DD/MM/YYYY HH:mm:ss')}
                                        <hr></hr></div>
                                ))}
                            </div>
                        ) : (
                            'x'
                        )}
                    </div>
                    <p></p>


                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            onClick={() => setOpenMsg4(false)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#555',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                textDecoration: 'underline'
                            }}
                        >
                            Voltar para o chamado
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>


            <Dialog open={openMsg3}>
                <DialogContent>


                    {status != "Pago"
                        ?
                        <>
                            <div style={{ padding: '20px' }}>
                                <ReactQuill
                                    theme="snow"
                                    value={conteudo}
                                    onChange={setConteudo}
                                    style={{
                                        minHeight: '200px',
                                        maxHeight: '400px',
                                        overflowY: 'auto',
                                        backgroundColor: '#fff',
                                    }}
                                    modules={{
                                        toolbar: [
                                            ['bold', 'italic', 'underline'],
                                            [{ list: 'ordered' }, { list: 'bullet' }],
                                            ['clean'],
                                        ],
                                    }}
                                    formats={['bold', 'italic', 'underline', 'list', 'bullet']}
                                />

                            </div>
                            <div style={{ padding: '20px' }}>



                            </div>
                            <div style={{ marginBottom: 24 }}>

                            </div>
                            <Button variant="contained" color="primary" onClick={novaInteracao} >
                                Enviar
                            </Button>
                        </>
                        : ''}

                    <p></p>


                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            onClick={() => setOpenMsg3(false)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#555',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                textDecoration: 'underline'
                            }}
                        >
                            Voltar para o chamado
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>


            <Dialog open={openMsg5}>
                <DialogContent>



                    <div>
                        <h2>Insira o PDF MXM</h2>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                marginBottom: '20px',
                                width: '100%',
                                fontSize: '16px'
                            }}
                        />
                        <form>
                            <button
                                onClick={() => {
                                    handleUpload();




                                    // novaInteracao();



                                }}
                                type="button"

                                style={{
                                    backgroundColor: '#108cdd',
                                    color: 'white',
                                    padding: '10px 20px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    transition: 'red'
                                }}
                                onMouseEnter={e => e.target.style.backgroundColor = 'red'}
                                onMouseLeave={e => e.target.style.backgroundColor = '#108cdd'}
                            >
                                Enviar
                            </button>

                        </form>


                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                    </div>
                    <div style={{ marginBottom: 24 }}>

                    </div>


                    {arquivoEnviado && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                onSaveStatus('Mxm cadastrado, segue para validação da carteira fiscal');
                            }}
                        >
                            enviar para carteira fiscal
                        </Button>
                    )}




                    <p></p>


                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            onClick={() => setOpenMsg5(false)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#555',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                textDecoration: 'underline'
                            }}
                        >
                            Voltar para o chamado
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>







            <Dialog open={openMensagens}  >

                <DialogContent>


                    {mensagemAlert}


                    <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>

                        <div style={{ flex: 1 }}></div>

                        <Button onClick={() => window.location.reload()}>Sair</Button>



                    </div>
                </DialogContent>

            </Dialog>








        </PageContainer>
    );
};

export default NfForm;