import {
    Button,
    FormControl,
    InputAdornment,
    Dialog,
    DialogContent,
    InputLabel,
    MenuItem,
    Select,
    DialogTitle,
    DialogActions,
    SpeedDial,
    TextField,
    Accordion,
    Typography,
    AccordionSummary,
    AccordionDetails,
    FormControlLabel,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import TaskFilter from "../components/task-filter";
import Switch from "@mui/material/Switch";
import Checkbox from "@mui/material/Checkbox";
import Modal from '../components/modal'
import StatusFiltro from '../components/botoesFiltro'; // ajuste o caminho conforme sua estrutura
import ArticleIcon from '@mui/icons-material/Article';
import PersonAddIcon from '@mui/icons-material/PersonAdd';



import { Box } from "@mui/system";
const ImageLogo = require('../assets/cad.jpeg')

const getCookie = require("../utils/getCookie");

const Pagamentos = (props) => {
    const { logged } = props;
    const [pesquisa, setPesquisa] = useState("");
    const [respostas, setrespostas] = useState([]);
    const [setor, setSetor] = useState([]);
    // alert(JSON.stringify(props.logged))
    const [openLoadingDialog, setOpenLoadingDialog] = useState(false);
    const [openMessageDialog, setOpenMessageDialog] = useState(false);
    const [checked, setChecked] = React.useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const ImageProd = require('../assets/searchNf.png')
    const ImageUser = require('../assets/user.png')
    const [searchTerm1, setSearchTerm1] = useState("");
    const anexo2 = require('../assets/ane.png')
    const [openMsg2, setOpenMsg2] = useState(false);

    const [fkArea, setfkArea] = useState("");
    const [subarea, setSubArea] = useState([]);
    const [meuSetor, setMeuSetor] = useState([]);
    const [todasSetor, setTodasSetor] = useState([]);
    const [meuSetorTotal, setMeuSetorTotal] = useState([]);

    const [setorTotal, setSetorTotal] = useState([]);
    const [setorTotalGLC, setSetorTotalGLC] = useState([]);
    const [todosEmails, setEmails] = useState([]);
    const [fechar, setFechar] = useState(false);
    const [emailNaoEncontrado, setEmailNaoEncontrado] = useState(false);

    //  const nome = Logged.Perfil.nome;
    const [minhasAtividades, setMinhasAtividades] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [solicitacaoAtividades, setSolicitacaoAtividades] = useState([]);
    const [nomeUsuario, setNomeUsuario] = useState("");
    const [minhas, setMinhas] = useState(true);
    const [btn1, setBtn1] = useState(false);
    const [modalContratos, setModalContratos] = useState(false);
    const [modalDireto, setModalDireto] = useState(false);
    const [modalConsumo, setModalConsumo] = useState(false);
    const [modalPatrimonio, setModalPatrimonio] = useState(false);
    const [modalServco, setModalServico] = useState(false);
    const [btn2, setBtn2] = useState(false);
    const [fornecedor, setFornecedor] = useState("");
    const [codigoMira, setCodigoMira] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [numeroContrato, setNumeroContrato] = useState("");
    const [numeroNota, setNumeroNota] = useState("");
    const [centroCusto, setCentroCusto] = useState("");
    const [localPatrimonio, setLocalPatrimonio] = useState("");
    const [rateio, setRateio] = useState("");
    const [atesto, setAtesto] = useState("");
    const [numeroSerie, setNumeroSerie] = useState("");
    const [numeroPedido, setNumeroPedido] = useState("");
    const [mira, setMira] = useState("");
    const [inCompany, setInCompany] = useState(false); // estado booleano
    const fileInputRef = useRef(null);
    const [caminho, setCaminho] = useState()
    const [setorCarteitra, setSetorCarteitra] = useState([]);
    const [todasPatrimonio, setTodasPatrimonio] = useState([]);
    const [listaDeArquivosEnviados, setListaDeArquivosEnviados] = useState([]);
    // const [fkUnidade, setFkUnidade]= useState(props.logged.Area.fkUnidade)
    const [modalOpen, setModalOpen] = useState(false);
    const [atividadesExecutor, setAtividadesExecutor] = useState([]);
    const [executorSelecionado, setExecutorSelecionado] = useState('');
    // const [openLoadingDialog, setOpenLoadingDialog] = useState(false);
    const [uploadResult, setUploadResult] = useState([]);
    const [hash, setHash] = useState('')
    const [statusFiltrado, setStatusFiltrado] = useState(null);
    const handleFiltroClick = (statusDesejado) => {
        setStatusFiltrado(statusDesejado);
    };

    const listaFiltrada = statusFiltrado
        ? meuSetorTotal.filter(item => item.Status.nome === statusFiltrado)
        : meuSetorTotal;
    const listaFiltradaGLC = statusFiltrado
        ? setorTotalGLC.filter(item => item.Status.nome === statusFiltrado)
        : setorTotal;
    const listaFiltradaCarteira = statusFiltrado
        ? setorCarteitra.filter(item => item.Status.nome === statusFiltrado)
        : setorTotal;


    function carregarSolicitacaoAtividades() {
        const token = getCookie("_token_task_manager");
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        fetch(
            `${process.env.REACT_APP_DOMAIN_API}/api/atividade/chamadosAbertos/`,
            params
        ).then((response) => {
            const { status } = response;
            response.json().then((data) => {
                if (status === 401) {
                } else if (status === 200) {
                    // alert(JSON.stringify(data.data))

                    setSolicitacaoAtividades(data.data);

                    // alert('oi ' +JSON.stringify( minhasAtividades))
                    // setUsuariosNaoValidados(data.data)
                }
            });
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Dados enviados:");
        // Aqui você pode fazer o POST para sua API
        // setModalContratos(false);
    };

    const handleCheckboxChange = (event) => {
        setInCompany(event.target.checked); // atualiza o estado com true/false
    };

    const handleUpload = () => {
        const files = fileInputRef.current.files;

        if (!files.length) {
            setErrorMessage('Por favor, selecione pelo menos um arquivo.');
            return;
        }


        const myHeaders = new Headers();
        myHeaders.append("keyapi", "99bd4c69-322d-424d-8b9c-4622fdd997ab");

        const uploads = [];

        Array.from(files).forEach(file => {
            const formData = new FormData();
            formData.append("arquivo", file, file.name);

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formData,
                redirect: "follow"
            };
            uploads.push(
                fetch("https://www7.pe.senac.br/storage/api/arquivo", requestOptions)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Erro no upload: ${response.status}`);
                        }
                        return response.text();
                    })
                    .then(result => JSON.parse(result))
            );
        });

        Promise.all(uploads)
            .then(results => {
                const arquivos = results.map(res => res.data);
                setUploadResult(arquivos);
                setListaDeArquivosEnviados(prev => [...prev, ...arquivos]); // adiciona todos corretamente
                setErrorMessage('');
            })
            .catch(err => {
                console.error(err);
                setErrorMessage('Erro ao enviar um ou mais arquivos.');
            });
    };
    function carregarNotasParaParovar() {

        setOpenLoadingDialog(true);
        const token = getCookie("_token_task_manager");
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        fetch(
            `${process.env.REACT_APP_DOMAIN_API}/api/atividade/recebidasSetorNFAtestar/`,
            params
        ).then((response) => {
            const { status } = response;
            response.json().then((data) => {
                setOpenLoadingDialog(false);
                if (status === 401) {
                } else if (status === 200) {
                    setOpenLoadingDialog(false);

                    // alert(JSON.stringify(data.data))

                    setMeuSetorTotal(data.data);
                }
            });
        });
    }
    function carregarNotasParaParovarCarteira() {

        setOpenLoadingDialog(true);
        const token = getCookie("_token_task_manager");
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        fetch(
            `${process.env.REACT_APP_DOMAIN_API}/api/atividade/recebidasSetorNFCarteira/`,
            params
        ).then((response) => {
            const { status } = response;
            response.json().then((data) => {
                setOpenLoadingDialog(false);
                if (status === 401) {
                } else if (status === 200) {
                    setOpenLoadingDialog(false);

                    // alert(JSON.stringify(data.data))

                    setSetorCarteitra(data.data);
                }
            });
        });
    }

    function carregarNotasParaPagar() {

        setOpenLoadingDialog(true);
        const token = getCookie("_token_task_manager");
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        fetch(
            `${process.env.REACT_APP_DOMAIN_API}/api/atividade/recebidasSetorNFPagar/`,
            params
        ).then((response) => {
            const { status } = response;
            response.json().then((data) => {
                setOpenLoadingDialog(false);
                if (status === 401) {
                } else if (status === 200) {
                    setOpenLoadingDialog(false);

                    // alert(JSON.stringify(data.data))

                    setSetorTotalGLC(data.data);
                }
            });
        });
    }
    function carregartodaspatrimonio() {

        setOpenLoadingDialog(true);
        const token = getCookie("_token_task_manager");
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        fetch(
            `${process.env.REACT_APP_DOMAIN_API}/api/atividade/todasPatrimonio/`,
            params
        ).then((response) => {
            const { status } = response;
            response.json().then((data) => {
                setOpenLoadingDialog(false);
                if (status === 401) {
                } else if (status === 200) {
                    setOpenLoadingDialog(false);

                    // alert(JSON.stringify(data.data))

                    setTodasPatrimonio(data.data);
                }
            });
        });
    }

    const statusList = [
        // {
        //     status: 'Nota Cadastrada - Aguardando aprovação do gestor',
        //     label: 'NF Aguardando Aprovação Gestor',
        // },
        { status: 'Enviada para Análise Fiscal', label: 'NF em Análise Fiscal' },
        { status: 'Enviada para lançar pagamento GLC', label: 'NF na GLC' },

        { status: 'Enviado para Contas a Pagar', label: 'NF em Contas a Pagar' },
        {
            status: 'Enviado para análise fiscal, pagamento direto pela unidade',
            label: 'NF em Analise Fiscal - Pagamento na Unidade',
        },
        {
            status: 'Analisado pela carteira fiscal pagamento direto pela unidade',
            label: ' Lançar nota no MXM- Pagamento na Unidade',
        },
        { status: 'Pago', label: 'Pago' },
    ];

    const statusCarteira = [
        {
            status: 'Enviada para Análise Fiscal',
            label: 'Análise Fiscal para GLC',
        },
        {
            status: 'Mxm cadastrado, segue para validação da carteira fiscal',
            label: 'Para validação do MXM e envio a Contas a pagar',
        },
        {
            status: 'Enviado para análise fiscal, pagamento direto pela unidade',
            label: 'Análise Fiscal para Unidade',
        },
        {
            status: 'Enviado para Contas a Pagar',
            label: 'Enviado para Contas a Pagar',
        },

    ];

    const statusGLC = [
        {
            status: 'Enviada para lançar pagamento GLC',
            label: 'Pagamento GLC',
        },
        {
            status: 'Enviada para Análise Fiscal',
            label: 'Análise Fiscal analisando',
        },
        {
            status: 'Mxm cadastrado, segue para validação da carteira fiscal',
            label: 'Análise Fiscal para pagamento',
        },
        {
            status: 'Enviado para Contas a Pagar',
            label: 'Contas a Pagar'
        },
    ];



    function carregarEmails() {
        setOpenLoadingDialog(true);
        const token = getCookie("_token_task_manager");
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        fetch(`${process.env.REACT_APP_DOMAIN_API}/api/email/`, params).then(
            (response) => {
                const { status } = response;
                response.json().then((data) => {
                    setOpenLoadingDialog(false);
                    if (status === 401) {
                    } else if (status === 200) {
                        setOpenLoadingDialog(false);

                        // alert(JSON.stringify(data.data))

                        setEmails(data.data);
                    }
                });
            }
        );
    }

    function carregarMinhasAtividades() {
        const token = getCookie("_token_task_manager");
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        fetch(
            `${process.env.REACT_APP_DOMAIN_API}/api/atividade/minhasAtividades/`,
            params
        ).then((response) => {
            const { status } = response;
            response.json().then((data) => {
                if (status === 401) {
                } else if (status === 200) {
                    // alert(JSON.stringify(data.data))

                    setMinhasAtividades(data.data);

                    // alert('oi ' +JSON.stringify( minhasAtividades))
                    // setUsuariosNaoValidados(data.data)
                }
            });
        });
    }
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const Change = (event) => {
        setMinhas(event.target.checked);
    };

    const Change1 = (event) => {
        setTodasSetor(event.target.checked);
    };

    useEffect(() => {
        carregarMinhasAtividades();
        carregarSolicitacaoAtividades();

        carregarNotasParaPagar()

        carregarNotasParaParovarCarteira()

        carregarNotasParaParovar()
        carregartodaspatrimonio()
        // carregarEmails();method

        if (todosEmails && logged) {
            let encontrado = false;
            todosEmails.forEach((emailObj) => {
                if (emailObj.email === props.logged.email) {
                    encontrado = true;
                }
            });

            if (!encontrado && !fechar) {
                setEmailNaoEncontrado(true);
            }


        }



    }, [todosEmails, emailNaoEncontrado, logged]);

    useEffect(() => {
        if (pesquisa) {
            pesquisar();
        }

        // if(setorTotalGLC){
        //     alert(JSON.stringify(setorTotalGLC))
        // }



    }, [pesquisa]);


    const onSaveContrato = (tipo) => {

        // alert(newContrato);
        // alert(valorNota)
        setOpenLoadingDialog(true);

        const token = getCookie('_token_task_manager');
        const payload = {
            setorSolicitante: props.logged.Area.Unidade.nome,
            // listaDeArquivosEnviados,
            caminho,
            hash,
            // fkUnidade,
            fkArea,
            titulo: fornecedor,
            // dataInicio,
            //conteudo: mira,
            detalhes: tipo,

            tipoCadastro: 'notaFiscal',
            informacoes: tipo,
            arquivado: false,
            fornecedor,
            cnpj,
            numeroContrato,
            numeroNota,
            centroCusto,
            rateio,
            codigoMira,
            listaDeArquivosEnviados,
            atesto,
            numeroSerie,
            numeroPedido,
            localPatrimonio




        };



        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        };

        const url = `${process.env.REACT_APP_DOMAIN_API}/api/atividade/contrato`;


        fetch(url, params)
            .then(response => {
                const { status } = response;


                response.json().then(data => {
                    setOpenLoadingDialog(false);



                    if (status === 401) {
                        alert(data.message);
                        setOpenMessageDialog(true);
                    } else if (status === 200) {
                        //setAtividade(data.data);
                        alert(data.message);
                        setOpenMessageDialog(true);


                        window.location.href = `${process.env.REACT_APP_DOMAIN}/pagamentos/`;
                    }
                }).catch(err => {
                    alert(err.message);
                    setOpenLoadingDialog(false);
                    alert('Erro ao processar a resposta do servidor.');
                    setOpenMessageDialog(true);
                });
            })
            .catch(err => {
                alert("🚨 Erro na requisição fetch:\n" + err.message);
                setOpenLoadingDialog(false);
                alert('Erro na conexão com o servidor.');
                setOpenMessageDialog(true);
            });
    };

    // useEffect(() => {
    //   pesquisa()
    // }, [pesquisa])

    function pesquisar() {
        const token = getCookie("_token_task_manager");
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        // fetch(`${process.env.REACT_APP_DOMAIN_API}/api/atividade${pesquisa?`/search?&pesquisa=${pesquisa}` : ''
        fetch(
            `${process.env.REACT_APP_DOMAIN_API}/api/atividade/search?pesquisa=${pesquisa}`,
            params
        ).then((response) => {
            const { status } = response;
            response
                .json()
                .then((data) => {
                    // setOpenLoadingDialog(false)

                    if (status === 401) {
                        // alert(status)
                    } else if (status === 200) {
                        // alert(pesquisa)
                        // alert(JSON.stringify(data.data))
                        setrespostas(data.data);
                        // alert(JSON.stringify(respostas))
                        // filtrarUsuariosDemandados()
                    }
                })
                .catch((err) => console.log(err));
        });
    }

    useEffect(() => {
        function carregarSetor() {
            // setOpenLoadingDialog(true)
            const token = getCookie("_token_task_manager");
            const params = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            fetch(
                `${process.env.REACT_APP_DOMAIN_API}/api/area/?fkUnidade=${logged ? logged.Area.fkUnidade : ""
                }`,
                params
            ).then((response) => {
                const { status } = response;
                response
                    .json()
                    .then((data) => {
                        setOpenLoadingDialog(false);
                        if (status === 401) {
                        } else if (status === 200) {
                            setSetor(data.data);
                            setOpenLoadingDialog(false);
                        }
                    })
                    .catch((err) => setOpenLoadingDialog(true));
            });
        }

        if (checked) {
            carregarSetor();
        }
    }, [checked]);

    useEffect(() => {
        function carregarSubArea() {
            // setOpenLoadingDialog(true)
            const token = getCookie("_token_task_manager");
            const params = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            fetch(
                `${process.env.REACT_APP_DOMAIN_API}/api/subarea/?fkArea=${fkArea}`,
                params
            ).then((response) => {
                const { status } = response;
                response
                    .json()
                    .then((data) => {
                        setOpenLoadingDialog(false);
                        if (status === 401) {
                        } else if (status === 200) {
                            setSubArea(data.data);
                            setOpenLoadingDialog(false);
                        }
                    })
                    .catch((err) => setOpenLoadingDialog(true));
            });
        }

        if (fkArea) {
            carregarSubArea();
        }
    }, [fkArea]);

    return (
        <div>
            <link
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                type="text/css"
                rel="stylesheet"
            />
            <link
                rel="stylesheet"
                href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
                crossorigin="anonymous"
            />

            {/* {logged ? <TaskFilter nome={props.logged.email} />
            :
            ''
          } */}
            <center>
                <div>
                    {/* <Button size="large" variant="contained" style={{ marginRight: 20, marginTop: 20 }}
                onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/minhasAtividades/`} >
                Atividades Recebidas<KeyboardDoubleArrowLeftIcon /><div style={{ color: '#FFA500', fontWeight: 'bold', fontSize: 24 }}>{minhasAtividades.length}</div></Button><br></br>
    
              <Button size="large" variant="contained" style={{ marginRight: 20, marginTop: 20 }}
                onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/chamadosAbertos/`} >
                Atividades Solicitadas<KeyboardDoubleArrowRightIcon /><div style={{ color: '#FFA500', fontWeight: 'bold', fontSize: 24 }}>{solicitacaoAtividades.length}</div></Button><br></br> */}


                    <br></br>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '16px',
                            marginTop: '20px' // ou use height: '100vh' se quiser centralizar na tela inteira
                        }}
                    >
                        <div
                            style={{
                                width: '120px',
                                height: '100px',
                                textAlign: 'center',
                                padding: '10px',
                                border: '2px solid #ccc',

                                borderRadius: '12px',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                cursor: 'pointer',
                            }}
                        >
                            <img
                                src={ImageProd}
                                style={{ width: '80px', borderRadius: '8px' }}
                                onClick={() =>
                                    (window.location.href = `${process.env.REACT_APP_DOMAIN}/pesquisarNotas`)
                                }
                            />
                        </div>

                        {logged && logged.usuarioPagamento === true && (
                            <div
                                style={{
                                    width: '120px',
                                    height: '100px',
                                    textAlign: 'center',
                                    padding: '10px',
                                    border: '2px solid #ccc',
                                    borderRadius: '12px',
                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                    cursor: 'pointer',
                                }}
                            >
                                <img
                                    src={ImageUser}
                                    style={{ width: '80px', borderRadius: '8px' }}
                                    onClick={() =>
                                        (window.location.href = `${process.env.REACT_APP_DOMAIN}/cadastroUsuarioNF`)
                                    }
                                />
                            </div>
                        )}
                    </div>






                    {logged && (logged.usuarioAtesto === true
                        || logged.usuarioSolicitante === true)
                        ?
                        <div>

                            <Box
                                display="flex"
                                justifyContent="center"
                                flexWrap="wrap"
                                gap={2}
                                mt={4}
                            >
                                <Button
                                    variant="contained"
                                    size="large"
                                    startIcon={<ArticleIcon />}
                                    sx={{
                                        backgroundColor: '#1e88e5',
                                        borderRadius: '30px',
                                        paddingX: 4,
                                        paddingY: 1.5,
                                        textTransform: 'none',
                                        fontSize: '16px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                        '&:hover': {
                                            backgroundColor: '#1565c0',
                                            boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                                        },
                                    }}
                                    onClick={() =>
                                        setModalContratos(true)

                                    }
                                >
                                    Pagamento de Contrato
                                </Button>

                                <Button
                                    variant="contained"
                                    size="large"
                                    startIcon={<ArticleIcon />}
                                    sx={{
                                        backgroundColor: '#1e88e5',
                                        borderRadius: '30px',
                                        paddingX: 4,
                                        paddingY: 1.5,
                                        textTransform: 'none',
                                        fontSize: '16px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                        '&:hover': {
                                            backgroundColor: '#1565c0',
                                            boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                                        },
                                    }}
                                    onClick={() =>
                                        setBtn2(true)
                                    }
                                >
                                    Pagamento de Pedido
                                </Button>


                                <Button
                                    variant="contained"
                                    size="large"
                                    startIcon={<ArticleIcon />}
                                    sx={{
                                        backgroundColor: '#1e88e5',
                                        borderRadius: '30px',
                                        paddingX: 4,
                                        paddingY: 1.5,
                                        textTransform: 'none',
                                        fontSize: '16px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                        '&:hover': {
                                            backgroundColor: '#1565c0',
                                            boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                                        },
                                    }}
                                    onClick={() =>
                                        setModalDireto(true)
                                    }
                                >
                                    Pagamento Direto - Analise Fiscal
                                </Button>
                            </Box>
                            <p></p>
                            {btn2 ?
                                <div

                                >

                                    <Button
                                        variant="contained"
                                        size="small"
                                        sx={{
                                            backgroundColor: '#1e88e5',
                                            borderRadius: '30px',
                                            paddingX: 4,
                                            paddingY: 1.5,

                                            textTransform: 'none',
                                            fontSize: '16px',
                                        }}
                                        onClick={() =>
                                            setModalConsumo(true)

                                        }
                                    >
                                        Consumo
                                    </Button>

                                    <Button
                                        variant="contained"
                                        size="small"
                                        sx={{
                                            backgroundColor: '#1e88e5',
                                            borderRadius: '30px',
                                            paddingX: 4,
                                            marginLeft: '5px',
                                            paddingY: 1.5,
                                            textTransform: 'none',
                                            fontSize: '16px',
                                        }}
                                        onClick={() =>
                                            setModalPatrimonio(true)

                                        }
                                    >
                                        Patrimônio
                                    </Button>

                                    <Button
                                        variant="contained"
                                        size="small"
                                        sx={{
                                            backgroundColor: '#1e88e5',
                                            borderRadius: '30px',
                                            paddingX: 4,
                                            paddingY: 1.5,
                                            marginLeft: '5px',
                                            textTransform: 'none',
                                            fontSize: '16px',
                                        }}
                                        onClick={() =>
                                            setModalServico(true)

                                        }
                                    >
                                        Serviço
                                    </Button>
                                </div>

                                : ''}




                            <Typography style={{ marginRight: '20px', fontSize: '15px' }}>

                                <div style={{ padding: '24px' }}>
                                    <h1>Acompanhamento de Notas</h1>

                                    {logged && (
                                        logged.usuarioSolicitante === true ||
                                        logged.usuarioAtesto === true

                                    ) ?
                                        <div>

                                            {/* Botão com contador e clique para filtrar */}
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    justifyContent: 'center',
                                                    gap: '12px',
                                                    padding: '16px',
                                                    boxSizing: 'border-box',
                                                    marginBottom: '24px',
                                                    width: '100%',
                                                    backgroundColor: '#fdfdfd',
                                                }}
                                            >
                                                {statusList.map(({ status, label }) => {
                                                    const isAtesto =
                                                        logged &&
                                                        logged.usuarioAtesto === true &&
                                                        status === 'Nota Cadastrada - Aguardando aprovação do gestor';

                                                    const total = meuSetorTotal?.filter(
                                                        (item) => item.Status.nome === status
                                                    ).length || '';

                                                    return (
                                                        <div
                                                            key={status}
                                                            onClick={() => handleFiltroClick(status)}
                                                            style={{
                                                                backgroundColor: isAtesto ? 'yellow' : '#f0f0f0',
                                                                border: '1px solid #ccc',
                                                                borderRadius: '8px',
                                                                padding: '10px 16px',
                                                                fontWeight: 600,
                                                                fontSize: '14px',
                                                                color: '#333',
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '8px',
                                                                transition: 'background-color 0.3s ease',
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                e.currentTarget.style.backgroundColor = isAtesto
                                                                    ? 'yellow'
                                                                    : '#d6eaff';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.currentTarget.style.backgroundColor = isAtesto
                                                                    ? 'yellow'
                                                                    : '#f0f0f0';
                                                            }}
                                                        >
                                                            {label}:{' '}
                                                            <span style={{ fontSize: '16px', color: '#e76f51' }}>{total}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {/* Tabela filtrada */}
                                            <table
                                                style={{
                                                    fontFamily: "Arial, sans-serif",
                                                    fontSize: "13px",
                                                    width: "95%",
                                                    margin: "20px auto",
                                                    borderCollapse: "collapse",
                                                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                                    borderRadius: "8px",
                                                    overflow: "hidden",
                                                    backgroundColor: "#fff"
                                                }}
                                            >
                                                <tbody>
                                                    {listaFiltrada.map((item, index) => (
                                                        <tr
                                                            key={index}
                                                            style={{
                                                                borderBottom: "1px solid #ddd",
                                                                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                                                                transition: "background 0.3s",
                                                                cursor: "default"
                                                            }}
                                                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#eef6ff")}
                                                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#f9f9f9" : "#ffffff")}
                                                        >
                                                            <th
                                                                scope="row"
                                                                style={{
                                                                    padding: "16px",
                                                                    textAlign: "left",
                                                                    verticalAlign: "top",
                                                                    wordBreak: "break-word",
                                                                    fontWeight: "normal",
                                                                    color: "#333"
                                                                }}
                                                            >
                                                                {item.informacoes ?
                                                                    <div>
                                                                        <b style={{ color: '#444', marginRight: '8px', color: 'red' }}>Analise Fiscal feita pela GCF</b>

                                                                        <br />
                                                                    </div>

                                                                    : ''}

                                                                <b style={{ color: '#444', marginRight: '8px' }}>Fornecedor:</b>
                                                                {item.titulo}
                                                                <br />

                                                                <b style={{ color: '#444', marginRight: '8px' }}>Nota:</b>
                                                                {item.numeroNota}
                                                                <br />

                                                                <b style={{ color: '#444', marginRight: '8px' }}>Tipo:</b>
                                                                {item.detalhes}
                                                                <br />

                                                                {/* <b style={{ color: '#333' }}>Valor:</b> R${item.valorNota.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} */}

                                                                <b style={{ color: '#444', marginRight: '8px' }}>Cadastrado por:</b>
                                                                {item?.Usuario?.nome}
                                                                <br />
                                                                <b style={{ color: '#444', marginRight: '8px' }}>Responsável:</b>
                                                                {item?.UsuarioExecutor?.nome}
                                                                <br />
                                                                <b style={{ color: '#444', marginRight: '8px' }}>Setor:</b>
                                                                {item?.Usuario?.Area?.Unidade?.nome}
                                                                <br />
                                                                <b style={{ color: '#444', marginRight: '8px' }}>Data envio para pagamento:</b>
                                                                {new Date(item.createdAt).toLocaleDateString()}
                                                                <br />
                                                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                                                    <b style={{ color: '#444', marginRight: '8px' }}>Status:</b>{item.Status.nome}

                                                                </div>
                                                            </th>
                                                            <th style={{ padding: "16px", verticalAlign: "top" }}>
                                                                <button
                                                                    style={{
                                                                        padding: "8px 12px",
                                                                        backgroundColor: "#1976d2",
                                                                        color: "#fff",
                                                                        border: "none",
                                                                        borderRadius: "4px",
                                                                        fontWeight: "bold",
                                                                        cursor: "pointer",
                                                                        transition: "background 0.3s"
                                                                    }}
                                                                    onClick={() =>
                                                                        (window.location.href = `${process.env.REACT_APP_DOMAIN}/nfCadastro/${item.id}/edit`)
                                                                    }
                                                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#145ea8"}
                                                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#1976d2"}
                                                                >
                                                                    ver
                                                                </button>
                                                            </th>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                        </div>


                                        : ''}

                                </div>

                            </Typography>

                            <div style={{
                                flex: 1,
                                margin: '0 10px',
                                padding: '20px',
                                // borderRadius: '8px',
                                // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                // backgroundColor: '#fff',
                                transition: 'transform 0.2s',
                                cursor: 'pointer',

                            }}>

                                <table
                                    className="table table-striped "
                                    style={{
                                        fontFamily: "arial",
                                        fontSize: "12px",
                                        marginLeft: 10,
                                        marginRight: 20,
                                        borderCollapse: "collapse",
                                        boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                                        borderRadius: "3px",
                                    }}
                                >

                                </table>
                            </div>


                        </div>
                        :
                        ''}

                    {logged && logged.usuarioCarteiraFiscal === true

                        ?
                        <div>

                            <Typography style={{ marginRight: '20px', fontSize: '15px' }}>

                                <div style={{ padding: '24px' }}>
                                    <h1>Analise Fiscal</h1>
                                    <div>
                                        {/* Botão com contador e clique para filtrar */}
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: '16px',
                                                marginBottom: '24px',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {/* Botão 1 */}


                                            {/* Botão 2 */}
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    justifyContent: 'center',
                                                    gap: '12px',
                                                    padding: '16px',
                                                    boxSizing: 'border-box',
                                                    marginBottom: '24px',
                                                    width: '100%',
                                                    backgroundColor: '#fdfdfd',
                                                }}
                                            >
                                                {statusCarteira.map(({ status, label }) => {
                                                    const total = setorCarteitra?.filter(
                                                        (item) => item.Status.nome === status
                                                    ).length || '';

                                                    return (
                                                        <div
                                                            key={status}
                                                            onClick={() => handleFiltroClick(status)}
                                                            style={{
                                                                backgroundColor: '#f0f0f0',
                                                                border: '1px solid #ccc',
                                                                borderRadius: '8px',
                                                                padding: '10px 16px',
                                                                fontWeight: 600,
                                                                fontSize: '14px',
                                                                color: '#333',
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '8px',
                                                                transition: 'background-color 0.3s ease',
                                                            }}
                                                            onMouseEnter={(e) =>
                                                                (e.currentTarget.style.backgroundColor = '#d6eaff')
                                                            }
                                                            onMouseLeave={(e) =>
                                                                (e.currentTarget.style.backgroundColor = '#f0f0f0')
                                                            }
                                                        >
                                                            {label}:{' '}
                                                            <span style={{ fontSize: '16px', color: '#e76f51' }}>{total}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {/* Botão 3 */}
                                        </div>

                                        {/* Tabela filtrada */}
                                        <table
                                            style={{
                                                fontFamily: "Arial, sans-serif",
                                                fontSize: "13px",
                                                width: "95%",
                                                margin: "20px auto",
                                                borderCollapse: "collapse",
                                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                                borderRadius: "8px",
                                                overflow: "hidden",
                                                backgroundColor: "#fff"
                                            }}
                                        >

                                            <tbody>
                                                {listaFiltradaCarteira.map((item, index) => (
                                                    <tr
                                                        key={index}
                                                        style={{
                                                            borderBottom: "1px solid #ddd",
                                                            backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                                                            transition: "background 0.3s",
                                                            cursor: "default"
                                                        }}
                                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#eef6ff")}
                                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#f9f9f9" : "#ffffff")}
                                                    >
                                                        <th
                                                            scope="row"
                                                            style={{
                                                                padding: "16px",
                                                                textAlign: "left",
                                                                verticalAlign: "top",
                                                                wordBreak: "break-word",
                                                                fontWeight: "normal",
                                                                color: "#333"
                                                            }}
                                                        >
                                                            {item.informacoes ?
                                                                <div>
                                                                    <b style={{ color: '#444', marginRight: '8px', color: 'red' }}>Analise Fiscal feita pela GCF</b>

                                                                    <br />

                                                                </div>

                                                                : ''}
                                                            <b style={{ color: '#444', marginRight: '8px' }}>Fornecedor:</b>
                                                            {item.titulo}
                                                            <br />

                                                            <b style={{ color: '#444', marginRight: '8px' }}>Nota:</b>
                                                            {item.numeroNota}
                                                            <br />
                                                            <br />
                                                            {/* <b style={{ color: '#333' }}>Valor:</b> R${item.valorNota.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} */}

                                                            <br />
                                                            <b style={{ color: '#444', marginRight: '8px' }}>Cadastrado por:</b>
                                                            {item?.Usuario?.nome}
                                                            <br />
                                                            <b style={{ color: '#444', marginRight: '8px' }}>Responsável:</b>
                                                            {item?.UsuarioExecutor?.nome}
                                                            <br />
                                                            <b style={{ color: '#444', marginRight: '8px' }}>Setor:</b>
                                                            {item?.Usuario?.Area?.Unidade?.nome}
                                                            <br />
                                                            <b style={{ color: '#444', marginRight: '8px' }}>Data envio para pagamento:</b>
                                                            {new Date(item.createdAt).toLocaleDateString()}
                                                            <br />

                                                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                                                <b style={{ color: '#444', marginRight: '8px' }}>Status:</b>
                                                                <span style={{ color: item.Status.nome === 'Concluido' ? 'green' : 'red' }}>
                                                                    {item.Status.nome}
                                                                </span>
                                                            </div>
                                                        </th>
                                                        <th style={{ padding: "16px", verticalAlign: "top" }}>
                                                            <button
                                                                style={{
                                                                    padding: "8px 12px",
                                                                    backgroundColor: "#1976d2",
                                                                    color: "#fff",
                                                                    border: "none",
                                                                    borderRadius: "4px",
                                                                    fontWeight: "bold",
                                                                    cursor: "pointer",
                                                                    transition: "background 0.3s"
                                                                }}
                                                                onClick={() =>
                                                                    (window.location.href = `${process.env.REACT_APP_DOMAIN}/nfCadastro/${item.id}/edit`)
                                                                }
                                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#145ea8"}
                                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#1976d2"}
                                                            >
                                                                ver
                                                            </button>
                                                        </th>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                    </div>
                                </div>

                            </Typography>
                            <div style={{
                                flex: 1,
                                margin: '0 10px',
                                padding: '20px',
                                // borderRadius: '8px',
                                // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                // backgroundColor: '#fff',
                                transition: 'transform 0.2s',
                                cursor: 'pointer',

                            }}>

                                <table
                                    className="table table-striped "
                                    style={{
                                        fontFamily: "arial",
                                        fontSize: "12px",
                                        marginLeft: 10,
                                        marginRight: 20,
                                        borderCollapse: "collapse",
                                        boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                                        borderRadius: "3px",
                                    }}
                                >

                                </table>
                            </div>


                        </div>
                        :
                        ''}
                    {logged && logged.usuarioPagamento === true

                        ?
                        <div>
                            <Typography style={{ marginRight: '20px', fontSize: '15px' }}>

                                <div style={{ padding: '24px' }}>
                                    <h1>GLC- Acompanhamento de notas</h1>
                                    <div>
                                        {/* Botão com contador e clique para filtrar */}
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: '16px',
                                                marginBottom: '24px',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {/* Botão 1 */}


                                            {/* Botão 2 */}

                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    justifyContent: 'center',
                                                    gap: '12px',
                                                    padding: '16px',
                                                    boxSizing: 'border-box',
                                                    marginBottom: '24px',
                                                    width: '100%',
                                                    backgroundColor: '#fdfdfd',
                                                }}
                                            >
                                                {statusGLC.map(({ status, label }) => {
                                                    const total = setorTotalGLC?.filter(
                                                        (item) => item.Status.nome === status
                                                    ).length || '';
                                                    return (
                                                        <div
                                                            key={status}
                                                            onClick={() => handleFiltroClick(status)}
                                                            style={{
                                                                backgroundColor: '#f0f0f0',
                                                                border: '1px solid #ccc',
                                                                borderRadius: '8px',
                                                                padding: '10px 16px',
                                                                fontWeight: 600,
                                                                fontSize: '14px',
                                                                color: '#333',
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '8px',
                                                                transition: 'background-color 0.3s ease',
                                                            }}
                                                            onMouseEnter={(e) =>
                                                                (e.currentTarget.style.backgroundColor = '#d6eaff')
                                                            }
                                                            onMouseLeave={(e) =>
                                                                (e.currentTarget.style.backgroundColor = '#f0f0f0')
                                                            }
                                                        >
                                                            {label}:{' '}
                                                            <span style={{ fontSize: '16px', color: '#e76f51' }}>{total}</span>
                                                        </div>
                                                    );
                                                })}


                                            </div>


                                            {/* Botão 3 */}

                                        </div>
                                        {/* Tabela filtrada */}
                                        <table
                                            style={{
                                                fontFamily: "Arial, sans-serif",
                                                fontSize: "13px",
                                                width: "95%",
                                                margin: "20px auto",
                                                borderCollapse: "collapse",
                                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                                borderRadius: "8px",
                                                overflow: "hidden",
                                                backgroundColor: "#fff"
                                            }}
                                        >
                                            <tbody>


                                                {statusFiltrado === 'Enviada para Análise Fiscal' ||
                                                    statusFiltrado === 'Enviado para Contas a Pagar' ||
                                                    statusFiltrado === 'Mxm cadastrado, segue para validação da carteira fiscal'

                                                    ?
                                                    <div>

                                                        {listaFiltradaGLC.map((item, index) => (
                                                            <tr
                                                                key={index}
                                                                style={{
                                                                    borderBottom: "1px solid #ddd",
                                                                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                                                                    transition: "background 0.3s",
                                                                    cursor: "default"
                                                                }}
                                                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#eef6ff")}
                                                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#f9f9f9" : "#ffffff")}
                                                            >
                                                                <th
                                                                    scope="row"
                                                                    style={{
                                                                        padding: "16px",
                                                                        textAlign: "left",
                                                                        verticalAlign: "top",
                                                                        wordBreak: "break-word",
                                                                        fontWeight: "normal",
                                                                        color: "#333"
                                                                    }}
                                                                >
                                                                    {item.informacoes ?
                                                                        <div>
                                                                            <b style={{ color: '#444', marginRight: '8px', color: 'red' }}>Analise Fiscal feita pela GCF</b>

                                                                            <br />
                                                                        </div>

                                                                        : ''}
                                                                    <b style={{ color: '#444', marginRight: '8px' }}>Fornecedor:</b>
                                                                    {item.titulo}
                                                                    <br />

                                                                    <b style={{ color: '#444', marginRight: '8px' }}>Nota:</b>
                                                                    {item.numeroNota}
                                                                    <br />
                                                                    <b style={{ color: '#444', marginRight: '8px' }}>Detalhes:</b>
                                                                    {item.detalhes}
                                                                    <br />
                                                                    <b style={{ color: '#444', marginRight: '8px' }}>Cadastrado por:</b>
                                                                    {item?.Usuario?.nome}
                                                                    <br />
                                                                    <b style={{ color: '#444', marginRight: '8px' }}>Responsável:</b>
                                                                    {item?.UsuarioExecutor?.nome}
                                                                    <br />
                                                                    <b style={{ color: '#444', marginRight: '8px' }}>Responsável:</b>
                                                                    {item?.UsuarioExecutor?.nome}
                                                                    <br />
                                                                    <b style={{ color: '#444', marginRight: '8px' }}>Setor:</b>
                                                                    {item?.Usuario?.Area?.Unidade?.nome}
                                                                    <br />
                                                                    <b style={{ color: '#444', marginRight: '8px' }}>Data envio para pagamento:</b>
                                                                    {new Date(item.createdAt).toLocaleDateString()}
                                                                    <br />

                                                                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                                                        <b style={{ color: '#444', marginRight: '8px' }}>Status:</b>
                                                                        <span style={{ color: item.Status.nome === 'Concluido' ? 'green' : 'red' }}>
                                                                            {item.Status.nome}
                                                                        </span>
                                                                    </div>

                                                                </th>
                                                                <th style={{ padding: "16px", verticalAlign: "top" }}>
                                                                    <button
                                                                        style={{
                                                                            padding: "8px 12px",
                                                                            backgroundColor: "#1976d2",
                                                                            color: "#fff",
                                                                            border: "none",
                                                                            borderRadius: "4px",
                                                                            fontWeight: "bold",
                                                                            cursor: "pointer",
                                                                            transition: "background 0.3s"
                                                                        }}
                                                                        onClick={() =>
                                                                            (window.location.href = `${process.env.REACT_APP_DOMAIN}/nfCadastro/${item.id}/edit`)
                                                                        }
                                                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#145ea8"}
                                                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#1976d2"}
                                                                    >
                                                                        ver
                                                                    </button>
                                                                </th>
                                                            </tr>
                                                        ))}


                                                    </div>
                                                    :
                                                    ''
                                                }





                                                {statusFiltrado === 'Enviada para lançar pagamento GLC' ?
                                                    <div>
                                                        {(() => {
                                                            const lista1 = listaFiltradaGLC.filter(
                                                                (item) =>
                                                                    (item.detalhes === "patrimonio" ||
                                                                        item.detalhes === "servico" ||
                                                                        item.detalhes === "consumo") &&
                                                                    item.Status?.nome === "Enviada para lançar pagamento GLC"
                                                            );

                                                            /* Filtrar a segunda lista: itens com detalhes "contrato" 
                                                               e Status.nome "Enviada para lançar pagamento GLC" */
                                                            const lista2 = listaFiltradaGLC.filter(
                                                                (item) =>
                                                                    item.detalhes === "contrato" &&
                                                                    item.Status?.nome === "Enviada para lançar pagamento GLC"
                                                            );

                                                            return (
                                                                <div style={{ display: 'flex', width: '100%', gap: '20px' }}>
                                                                    {/* Primeira lista */}
                                                                    <div style={{ flex: 1 }}>
                                                                        <h3>Patrimônio, Serviço e Consumo</h3>
                                                                        {setorTotalGLC ? (
                                                                            <>
                                                                                {
                                                                                    setorTotalGLC.filter(item =>
                                                                                        ["patrimonio", "servico", "consumo"].includes(item.detalhes)
                                                                                        &&
                                                                                        item.Status?.nome === "Enviada para lançar pagamento GLC").length
                                                                                }
                                                                            </>
                                                                        ) : ''}
                                                                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                                            <tbody>
                                                                                {lista1.length > 0 ? (
                                                                                    lista1.map((item, index) => (
                                                                                        <tr
                                                                                            key={index}
                                                                                            style={{
                                                                                                borderBottom: "1px solid #ddd",
                                                                                                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                                                                                                transition: "background 0.3s",
                                                                                                cursor: "default"
                                                                                            }}
                                                                                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#eef6ff")}
                                                                                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#f9f9f9" : "#ffffff")}
                                                                                        >
                                                                                            <th
                                                                                                scope="row"
                                                                                                style={{
                                                                                                    padding: "16px",
                                                                                                    textAlign: "left",
                                                                                                    verticalAlign: "top",
                                                                                                    wordBreak: "break-word",
                                                                                                    fontWeight: "normal",
                                                                                                    color: "#333"
                                                                                                }}
                                                                                            >
                                                                                                {item.informacoes ?
                                                                                                    <div>
                                                                                                        <b style={{ color: '#444', marginRight: '8px', color: 'red' }}>Analise Fiscal feita pela GCF</b>

                                                                                                        <br />
                                                                                                    </div>

                                                                                                    : ''}
                                                                                                <b style={{ color: '#444', marginRight: '8px' }}>Fornecedor:</b>
                                                                                                {item.titulo}
                                                                                                <br />

                                                                                                <b style={{ color: '#444', marginRight: '8px' }}>Nota:</b>
                                                                                                {item.numeroNota}
                                                                                                <br />
                                                                                                <b style={{ color: '#444', marginRight: '8px' }}>Detalhes:</b>
                                                                                                {item.detalhes}
                                                                                                <br />
                                                                                                <b style={{ color: '#444', marginRight: '8px' }}>Cadastrado por:</b>
                                                                                                {item?.Usuario?.nome}
                                                                                                <br />
                                                                                                <b style={{ color: '#444', marginRight: '8px' }}>Responsável:</b>
                                                                                                {item?.UsuarioExecutor?.nome}
                                                                                                <br />
                                                                                                <b style={{ color: '#444', marginRight: '8px' }}>Setor:</b>
                                                                                                {item?.Usuario?.Area?.Unidade?.nome}
                                                                                                <br />
                                                                                                <b style={{ color: '#444', marginRight: '8px' }}>Data envio para pagamento:</b>
                                                                                                {new Date(item.createdAt).toLocaleDateString()}
                                                                                                <br />

                                                                                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                                                                                    <b style={{ color: '#444', marginRight: '8px' }}>Status:</b>
                                                                                                    <span style={{ color: item.Status.nome === 'Concluido' ? 'green' : 'red' }}>
                                                                                                        {item.Status.nome}
                                                                                                    </span>
                                                                                                </div>

                                                                                            </th>
                                                                                            <th style={{ padding: "16px", verticalAlign: "top" }}>
                                                                                                <button
                                                                                                    style={{
                                                                                                        padding: "8px 12px",
                                                                                                        backgroundColor: "#1976d2",
                                                                                                        color: "#fff",
                                                                                                        border: "none",
                                                                                                        borderRadius: "4px",
                                                                                                        fontWeight: "bold",
                                                                                                        cursor: "pointer",
                                                                                                        transition: "background 0.3s"
                                                                                                    }}
                                                                                                    onClick={() =>
                                                                                                        (window.location.href = `${process.env.REACT_APP_DOMAIN}/nfCadastro/${item.id}/edit`)
                                                                                                    }
                                                                                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#145ea8"}
                                                                                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#1976d2"}
                                                                                                >
                                                                                                    ver
                                                                                                </button>
                                                                                            </th>
                                                                                        </tr>
                                                                                    ))
                                                                                ) : (
                                                                                    <tr>
                                                                                        <td style={{ padding: '16px', textAlign: 'center' }}>
                                                                                            Nenhum item encontrado
                                                                                        </td>
                                                                                    </tr>
                                                                                )}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>

                                                                    {/* Segunda lista */}
                                                                    <div style={{ flex: 1 }}>
                                                                        <h3>Contratos</h3>
                                                                        {setorTotalGLC ? (
                                                                            <div >
                                                                                {
                                                                                    setorTotalGLC.filter(item =>
                                                                                        ["contrato"].includes(item.detalhes)
                                                                                        &&
                                                                                        item.Status?.nome === "Enviada para lançar pagamento GLC"
                                                                                    ).length
                                                                                }
                                                                            </div>
                                                                        ) : ''}
                                                                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                                            <tbody>
                                                                                {lista2.length > 0 ? (
                                                                                    lista2.map((item, index) => (
                                                                                        <tr
                                                                                            key={index}
                                                                                            style={{
                                                                                                borderBottom: "1px solid #ddd",
                                                                                                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                                                                                                transition: "background 0.3s",
                                                                                                cursor: "default"
                                                                                            }}
                                                                                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#eef6ff")}
                                                                                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#f9f9f9" : "#ffffff")}
                                                                                        >
                                                                                            <th
                                                                                                scope="row"
                                                                                                style={{
                                                                                                    padding: "16px",
                                                                                                    textAlign: "left",
                                                                                                    verticalAlign: "top",
                                                                                                    wordBreak: "break-word",
                                                                                                    fontWeight: "normal",
                                                                                                    color: "#333"
                                                                                                }}
                                                                                            >
                                                                                                {item.informacoes ?
                                                                                                    <div>
                                                                                                        <b style={{ color: '#444', marginRight: '8px', color: 'red' }}>Analise Fiscal feita pela GCF</b>

                                                                                                        <br />
                                                                                                    </div>

                                                                                                    : ''}
                                                                                                <b style={{ color: '#444', marginRight: '8px' }}>Fornecedor:</b>
                                                                                                {item.titulo}
                                                                                                <br />

                                                                                                <b style={{ color: '#444', marginRight: '8px' }}>Nota:</b>
                                                                                                {item.numeroNota}
                                                                                                <br />
                                                                                                <b style={{ color: '#444', marginRight: '8px' }}>Detalhes:</b>
                                                                                                {item.detalhes}
                                                                                                <br />
                                                                                                <b style={{ color: '#444', marginRight: '8px' }}>Cadastrado por:</b>
                                                                                                {item?.Usuario?.nome}
                                                                                                <br />
                                                                                                <b style={{ color: '#444', marginRight: '8px' }}>Responsável:</b>
                                                                                                {item?.UsuarioExecutor?.nome}
                                                                                                <br />
                                                                                                <b style={{ color: '#444', marginRight: '8px' }}>Setor:</b>
                                                                                                {item?.Usuario?.Area?.Unidade?.nome}
                                                                                                <br />
                                                                                                <b style={{ color: '#444', marginRight: '8px' }}>Data envio para pagamento:</b>
                                                                                                {new Date(item.createdAt).toLocaleDateString()}
                                                                                                <br />

                                                                                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                                                                                    <b style={{ color: '#444', marginRight: '8px' }}>Status:</b>
                                                                                                    <span style={{ color: item.Status.nome === 'Concluido' ? 'green' : 'red' }}>
                                                                                                        {item.Status.nome}
                                                                                                    </span>
                                                                                                </div>

                                                                                            </th>
                                                                                            <th style={{ padding: "16px", verticalAlign: "top" }}>
                                                                                                <button
                                                                                                    style={{
                                                                                                        padding: "8px 12px",
                                                                                                        backgroundColor: "#1976d2",
                                                                                                        color: "#fff",
                                                                                                        border: "none",
                                                                                                        borderRadius: "4px",
                                                                                                        fontWeight: "bold",
                                                                                                        cursor: "pointer",
                                                                                                        transition: "background 0.3s"
                                                                                                    }}
                                                                                                    onClick={() =>
                                                                                                        (window.location.href = `${process.env.REACT_APP_DOMAIN}/nfCadastro/${item.id}/edit`)
                                                                                                    }
                                                                                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#145ea8"}
                                                                                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#1976d2"}
                                                                                                >
                                                                                                    ver
                                                                                                </button>
                                                                                            </th>
                                                                                        </tr>
                                                                                    ))
                                                                                ) : (
                                                                                    <tr>
                                                                                        <td style={{ padding: '16px', textAlign: 'center' }}>
                                                                                            Nenhum item encontrado
                                                                                        </td>
                                                                                    </tr>
                                                                                )}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })()}
                                                    </div> : ''}
                                            </tbody>
                                        </table>

                                    </div>
                                </div>

                            </Typography>

                            <div style={{
                                flex: 1,
                                margin: '0 10px',
                                padding: '20px',
                                // borderRadius: '8px',
                                // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                // backgroundColor: '#fff',
                                transition: 'transform 0.2s',
                                cursor: 'pointer',

                            }}>

                                <table
                                    className="table table-striped "
                                    style={{
                                        fontFamily: "arial",
                                        fontSize: "12px",
                                        marginLeft: 10,
                                        marginRight: 20,
                                        borderCollapse: "collapse",
                                        boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                                        borderRadius: "3px",
                                    }}
                                >

                                </table>
                            </div>

                        </div>
                        :
                        ''}

                    {logged && logged.usuarioFinanceiro === true

                        ?
                        <div>

                            <Typography style={{ marginRight: '20px', fontSize: '15px' }}>

                                <div style={{ padding: '24px' }}>
                                    <h1>Contas a pagar</h1>
                                    <div>
                                        {/* Botão com contador e clique para filtrar */}
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: '16px',
                                                marginBottom: '24px',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {/* Botão 1 */}


                                            {/* Botão 2 */}
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    gap: '16px',
                                                    marginBottom: '24px',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <div style={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    gap: '10px',
                                                    marginBottom: '20px',
                                                }}>

                                                    {[
                                                        'Enviado para Contas a Pagar'



                                                    ].map(status => (
                                                        <div
                                                            key={status}
                                                            onClick={() => handleFiltroClick(status)}
                                                            style={{
                                                                backgroundColor: '#f9f9f9',
                                                                border: '1px solid #ddd',
                                                                borderRadius: '10px',
                                                                padding: '6px 10px', // menor espaçamento vertical
                                                                fontWeight: 'bold',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '10px',
                                                                cursor: 'pointer',
                                                                transition: 'all 0.3s ease',
                                                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                                                                color: '#333',
                                                            }}
                                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0f0ff'}
                                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                                                        >
                                                            {status}:
                                                            <span style={{ fontSize: '20px', color: '#e76f51' }}>
                                                                {setorCarteitra && logged
                                                                    ? setorCarteitra.filter(item => item.Status.nome === status).length
                                                                    : ''}
                                                            </span>
                                                        </div>
                                                    ))}

                                                </div>

                                            </div>
                                            {/* Botão 3 */}

                                        </div>

                                        {/* Tabela filtrada */}
                                        <table
                                            style={{
                                                fontFamily: "Arial, sans-serif",
                                                fontSize: "13px",
                                                width: "95%",
                                                margin: "20px auto",
                                                borderCollapse: "collapse",
                                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                                borderRadius: "8px",
                                                overflow: "hidden",
                                                backgroundColor: "#fff"
                                            }}
                                        >
                                            <tbody>
                                                {listaFiltradaCarteira.map((item, index) => (
                                                    <tr
                                                        key={index}
                                                        style={{
                                                            borderBottom: "1px solid #ddd",
                                                            backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                                                            transition: "background 0.3s",
                                                            cursor: "default"
                                                        }}
                                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#eef6ff")}
                                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#f9f9f9" : "#ffffff")}
                                                    >
                                                        <th
                                                            scope="row"
                                                            style={{
                                                                padding: "16px",
                                                                textAlign: "left",
                                                                verticalAlign: "top",
                                                                wordBreak: "break-word",
                                                                fontWeight: "normal",
                                                                color: "#333"
                                                            }}
                                                        >

                                                            {item.informacoes ?
                                                                <div>
                                                                    <b style={{ color: '#444', marginRight: '8px', color: 'red' }}>Analise Fiscal feita pela GCF</b>

                                                                    <br />

                                                                </div>

                                                                : ''}

                                                             <b style={{ color: '#444', marginRight: '8px' }}>Fornecedor:</b>
                                                                {item.titulo}
                                                                <br />

                                                                <b style={{ color: '#444', marginRight: '8px' }}>Nota:</b>
                                                                {item.numeroNota}
                                                                <br />
                                                            {/* <b style={{ color: '#333' }}>Valor:</b> R${item.valorNota.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} */}

                                                            <br />
                                                            <b style={{ color: '#444', marginRight: '8px' }}>Cadastrado por:</b>
                                                            {item?.Usuario?.nome}
                                                            <br />
                                                            <b style={{ color: '#444', marginRight: '8px' }}>Responsável:</b>
                                                            {item?.UsuarioExecutor?.nome}
                                                            <br />
                                                            <b style={{ color: '#444', marginRight: '8px' }}>Setor:</b>
                                                            {item?.Usuario?.Area?.Unidade?.nome}
                                                            <br />
                                                            <b style={{ color: '#444', marginRight: '8px' }}>Data envio para pagamento:</b>
                                                            {new Date(item.createdAt).toLocaleDateString()}
                                                            <br />



                                                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                                                <b style={{ color: '#444', marginRight: '8px' }}>Status:</b>
                                                                <span style={{ color: item.Status.nome === 'Concluido' ? 'green' : 'red' }}>
                                                                    {item.Status.nome}
                                                                </span>
                                                            </div>
                                                        </th>
                                                        <th style={{ padding: "16px", verticalAlign: "top" }}>
                                                            <button
                                                                style={{
                                                                    padding: "8px 12px",
                                                                    backgroundColor: "#1976d2",
                                                                    color: "#fff",
                                                                    border: "none",
                                                                    borderRadius: "4px",
                                                                    fontWeight: "bold",
                                                                    cursor: "pointer",
                                                                    transition: "background 0.3s"
                                                                }}
                                                                onClick={() =>
                                                                    (window.location.href = `${process.env.REACT_APP_DOMAIN}/nfCadastro/${item.id}/edit`)
                                                                }
                                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#145ea8"}
                                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#1976d2"}
                                                            >
                                                                ver
                                                            </button>
                                                        </th>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                    </div>
                                </div>


                            </Typography>

                            <div style={{
                                flex: 1,
                                margin: '0 10px',
                                padding: '20px',
                                // borderRadius: '8px',
                                // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                // backgroundColor: '#fff',
                                transition: 'transform 0.2s',
                                cursor: 'pointer',

                            }}>

                                <table
                                    className="table table-striped "
                                    style={{
                                        fontFamily: "arial",
                                        fontSize: "12px",
                                        marginLeft: 10,
                                        marginRight: 20,
                                        borderCollapse: "collapse",
                                        boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                                        borderRadius: "3px",
                                    }}
                                >
                                </table>
                            </div>

                        </div>

                        :

                        ''}


                    {logged && logged.usuarioPatrimonio === true

                        ?
                        <div>

                            <Typography style={{ marginRight: '20px', fontSize: '15px' }}>

                                <div style={{ padding: '24px' }}>
                                    <h1>Patrimônio- acompanhamento de notas</h1>
                                    <div>
                                        {/* Botão com contador e clique para filtrar */}
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: '16px',
                                                marginBottom: '24px',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {/* Botão 1 */}


                                            {/* Botão 2 */}
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    gap: '16px',
                                                    marginBottom: '24px',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                            </div>
                                            {/* Botão 3 */}

                                        </div>

                                        {/* Tabela filtrada */}
                                        <table
                                            style={{
                                                fontFamily: "Arial, sans-serif",
                                                fontSize: "13px",
                                                width: "95%",
                                                margin: "20px auto",
                                                borderCollapse: "collapse",
                                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                                borderRadius: "8px",
                                                overflow: "hidden",
                                                backgroundColor: "#fff"
                                            }}
                                        >
                                            <tbody>
                                                {todasPatrimonio.map((item, index) => (
                                                    <tr
                                                        key={index}
                                                        style={{
                                                            borderBottom: "1px solid #ddd",
                                                            backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                                                            transition: "background 0.3s",
                                                            cursor: "default"
                                                        }}
                                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#eef6ff")}
                                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#f9f9f9" : "#ffffff")}
                                                    >
                                                        <th
                                                            scope="row"
                                                            style={{
                                                                padding: "16px",
                                                                textAlign: "left",
                                                                verticalAlign: "top",
                                                                wordBreak: "break-word",
                                                                fontWeight: "normal",
                                                                color: "#333"
                                                            }}
                                                        >
                                                            {item.informacoes ?
                                                                <div>
                                                                    <b style={{ color: '#444', marginRight: '8px', color: 'red' }}>Analise Fiscal feita pela GCF</b>
                                                                    <br />
                                                                </div>

                                                                : ''}

                                                             <b style={{ color: '#444', marginRight: '8px' }}>Fornecedor:</b>
                                                                {item.titulo}
                                                                <br />

                                                                <b style={{ color: '#444', marginRight: '8px' }}>Nota:</b>
                                                                {item.numeroNota}
                                                                <br />
                                                            <b style={{ color: '#444', marginRight: '8px' }}>Detalhes:</b>
                                                            {item.detalhes}
                                                            <br />
                                                            {/* <b style={{ color: '#333' }}>Valor:</b> R${item.valorNota.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} */}

                                                            <b style={{ color: '#444', marginRight: '8px' }}>Cadastrado por:</b>
                                                            {item?.Usuario?.nome}
                                                            <br />
                                                            <b style={{ color: '#444', marginRight: '8px' }}>Responsável:</b>
                                                            {item?.UsuarioExecutor?.nome}
                                                            <br />
                                                            <b style={{ color: '#444', marginRight: '8px' }}>Setor:</b>
                                                            {item?.Usuario?.Area?.Unidade?.nome}
                                                            <br />
                                                            <b style={{ color: '#444', marginRight: '8px' }}>Data envio para pagamento:</b>
                                                            {new Date(item.createdAt).toLocaleDateString()}
                                                            <br />



                                                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                                                <b style={{ color: '#444', marginRight: '8px' }}>Status:</b>
                                                                <span style={{ color: item.Status.nome === 'Concluido' ? 'green' : 'red' }}>
                                                                    {item.Status.nome}
                                                                </span>
                                                            </div>
                                                        </th>
                                                        <th style={{ padding: "16px", verticalAlign: "top" }}>
                                                            <button
                                                                style={{
                                                                    padding: "8px 12px",
                                                                    backgroundColor: "#1976d2",
                                                                    color: "#fff",
                                                                    border: "none",
                                                                    borderRadius: "4px",
                                                                    fontWeight: "bold",
                                                                    cursor: "pointer",
                                                                    transition: "background 0.3s"
                                                                }}
                                                                onClick={() =>
                                                                    (window.location.href = `${process.env.REACT_APP_DOMAIN}/nfCadastro/${item.id}/edit`)
                                                                }
                                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#145ea8"}
                                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#1976d2"}
                                                            >
                                                                ver
                                                            </button>
                                                        </th>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                    </div>
                                </div>


                            </Typography>

                            <div style={{
                                flex: 1,
                                margin: '0 10px',
                                padding: '20px',
                                // borderRadius: '8px',
                                // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                // backgroundColor: '#fff',
                                transition: 'transform 0.2s',
                                cursor: 'pointer',


                            }}>


                                <table
                                    className="table table-striped "
                                    style={{
                                        fontFamily: "arial",
                                        fontSize: "12px",
                                        marginLeft: 10,
                                        marginRight: 20,
                                        borderCollapse: "collapse",
                                        boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                                        borderRadius: "3px",
                                    }}
                                >



                                </table>
                            </div>


                        </div>


                        :

                        ''}







                </div>
            </center>



            <hr></hr>

            <Dialog open={modalContratos} onClose={() => setModalContratos(false)} fullWidth maxWidth="sm">

                <DialogTitle>Cadastre uma Nota de contrato para pagamento</DialogTitle>

                <DialogContent dividers>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={inCompany}             // valor do checkbox
                                onChange={handleCheckboxChange} // função que atualiza o estado
                            />
                        }
                        label="Contratos in company ou ações abertas"
                    />




                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Fornecedor"
                            name="fornecedor"
                            value={fornecedor}
                            onChange={e => setFornecedor(e.target.value)}
                        />


                        {inCompany ?
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Codigo SIG"
                                name="Codigo Mira"
                                value={codigoMira}
                                onChange={e => setCodigoMira(e.target.value)}
                            /> :
                            ''}


                        <TextField
                            fullWidth
                            margin="normal"
                            label="CNPJ"
                            name="cnpj"
                            value={cnpj}
                            onChange={(e) => {
                                const onlyNumbers = e.target.value.replace(/\D/g, "").slice(0, 14);
                                setCnpj(onlyNumbers);
                            }}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Número do Contrato - Ano"
                            name="contratoAno"
                            value={numeroContrato}
                            onChange={e => setNumeroContrato(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Número da Nota Fiscal- com zeros a esquerda se houver"
                            name="notaFiscal"
                            value={numeroNota}
                            onChange={e => setNumeroNota(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Centro de Custo"
                            name="centroCusto"
                            value={centroCusto}
                            onChange={e => setCentroCusto(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Rateio"
                            name="rateio"
                            value={rateio}
                            onChange={e => setRateio(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Atesto"
                            name="Atesto"
                            value={atesto}
                            onChange={e => setAtesto(e.target.value)}
                        />

                        <button
                            onClick={() => setOpenMsg2(true)}
                        >
                            Anexar nota fiscal
                        </button>
                        <hr></hr>




                        <button
                            onClick={() => setOpenMsg2(true)}
                        >
                            Atesto da Nota, anexar ou email com ciência de quem atestou ou a nota carimbada e assinada
                        </button>
                        <hr></hr>


                        <button
                            onClick={() => setOpenMsg2(true)}
                        >
                            Anexar Boleto - caso tenha

                        </button>
                        <hr></hr>

                        <button
                            onClick={() => setOpenMsg2(true)}
                        >
                            Anexar Certidões

                        </button>
                        <hr></hr>
                        <hr></hr>

                        <h4 style={{ fontSize: '12px', color: 'red' }}>
                            Documentos anexados: {listaDeArquivosEnviados.length}
                        </h4>




                        {/* <Button
                            onClick={() => setOpenMsg2(true)}
                            variant="contained" color="error">
                            clique aqui para Inserir a nota, as certidões, o print da analise fiscal e todos os documentos necessários para o pagamento
                        </Button> */}




                        <DialogActions>
                            {/* <Button onClick={() => setModalContratos(false)} color="secondary">
                                Cancelar
                            </Button> */}

                            {fornecedor &&
                                cnpj &&
                                numeroContrato &&
                                numeroNota &&

                                centroCusto &&
                                rateio &&
                                atesto &&
                                listaDeArquivosEnviados.length > 2

                                ?
                                <Button
                                    onClick={() => onSaveContrato('contrato')}
                                    variant="contained" color="primary">
                                    Salvar
                                </Button>

                                : ''
                            }

                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>


            <Dialog open={modalDireto} onClose={() => setModalDireto(false)} fullWidth maxWidth="sm">
                <DialogTitle>Cadastre sua Nota para pagamento Direto</DialogTitle>

                <DialogContent dividers>




                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Fornecedor"
                            name="fornecedor"
                            value={fornecedor}
                            onChange={e => setFornecedor(e.target.value)}
                        />


                        {inCompany ?
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Codigo Mira"
                                name="Codigo Mira"
                                value={codigoMira}
                                onChange={e => setCodigoMira(e.target.value)}
                            /> :
                            ''}


                        <TextField
                            fullWidth
                            margin="normal"
                            label="CNPJ"
                            name="cnpj"
                            value={cnpj}
                            onChange={(e) => {
                                const onlyNumbers = e.target.value.replace(/\D/g, "").slice(0, 14);
                                setCnpj(onlyNumbers);
                            }}
                        />
                        {/* <TextField
                            fullWidth
                            margin="normal"
                            label="Número do Contrato - Ano"
                            name="contratoAno"
                            value={numeroContrato}
                            onChange={e => setNumeroContrato(e.target.value)}
                        /> */}
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Número da Nota Fiscal- com zeros a esquerda se houver"
                            name="notaFiscal"
                            value={numeroNota}
                            onChange={e => setNumeroNota(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Centro de Custo"
                            name="centroCusto"
                            value={centroCusto}
                            onChange={e => setCentroCusto(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Rateio"
                            name="rateio"
                            value={rateio}
                            onChange={e => setRateio(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Atesto"
                            name="Atesto"
                            value={atesto}
                            onChange={e => setAtesto(e.target.value)}
                        />

                        <button
                            onClick={() => setOpenMsg2(true)}
                        >
                            Anexar nota fiscal
                        </button>
                        <hr></hr>




                        <button
                            onClick={() => setOpenMsg2(true)}
                        >
                            Atesto da Nota, anexar ou email com ciência de quem atestou ou a nota carimbada e assinada
                        </button>
                        <hr></hr>


                        <button
                            onClick={() => setOpenMsg2(true)}
                        >
                            Anexar Boleto - caso tenha

                        </button>
                        <hr></hr>

                        <button
                            onClick={() => setOpenMsg2(true)}
                        >
                            Anexar Certidões

                        </button>
                        <hr></hr>

                        <h4 style={{ fontSize: '12px', color: 'red' }}>
                            Documentos anexados: {listaDeArquivosEnviados.length}
                        </h4>



                        {/* 
                        <Button
                            onClick={() => setOpenMsg2(true)}
                            variant="contained" color="error">
                            clique aqui para Inserir a nota, as certidões, o print da analise fiscal e todos os documentos necessários para o pagamento
                        </Button> */}




                        <DialogActions>
                            {/* <Button onClick={() => setModalContratos(false)} color="secondary">
                                Cancelar
                            </Button> */}

                            {fornecedor &&
                                cnpj &&

                                numeroNota &&

                                centroCusto &&
                                rateio &&
                                atesto &&
                                listaDeArquivosEnviados.length > 2

                                ?
                                <Button
                                    onClick={() => onSaveContrato('Enviado para análise fiscal, pagamento direto pela unidade')}
                                    variant="contained" color="primary">
                                    Salvar
                                </Button>

                                : ''
                            }

                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={modalConsumo} onClose={() => setModalConsumo(false)} fullWidth maxWidth="sm">
                <DialogTitle>Cadastre uma Nota para pagamento de consumo</DialogTitle>

                <DialogContent dividers>




                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Fornecedor"
                            name="fornecedor"
                            value={fornecedor}
                            onChange={e => setFornecedor(e.target.value)}
                        />





                        <TextField
                            fullWidth
                            margin="normal"
                            label="CNPJ"
                            name="cnpj"
                            value={cnpj}
                            onChange={(e) => {
                                const onlyNumbers = e.target.value.replace(/\D/g, "").slice(0, 14);
                                setCnpj(onlyNumbers);
                            }}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Número da Nota Fiscal- com zeros a esquerda se houver"
                            name="notaFiscal"
                            value={numeroNota}
                            onChange={e => setNumeroNota(e.target.value)}
                        />


                        <TextField
                            fullWidth
                            margin="normal"
                            label="Número da série"
                            name="numero serie"
                            value={numeroSerie}
                            onChange={e => setNumeroSerie(e.target.value)}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Número Pedido"
                            name="numeroPedido"
                            value={numeroPedido}
                            onChange={e => setNumeroPedido(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Informe quem recebeu o material de consumo"
                            name="informe quem recebeu o material de consumo"
                            value={rateio}
                            onChange={e => setRateio(e.target.value)}
                        />
                        {/* <Button
                            onClick={() => setOpenMsg2(true)}
                            variant="contained"

                            color="error">

                           </Button> */}

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Informaçlõe do atesto de recebimento"
                            name="Informaçlõe do atesto de recebimento"
                            value={atesto}
                            onChange={e => setAtesto(e.target.value)}
                        />

                        <button
                            onClick={() => setOpenMsg2(true)}
                        >
                            Anexar nota fiscal
                        </button>
                        <hr></hr>




                        <button
                            onClick={() => setOpenMsg2(true)}
                        >
                            Atesto da Nota, anexar ou email com ciência de quem atestou ou a nota carimbada e assinada
                        </button>
                        <hr></hr>


                        <button
                            onClick={() => setOpenMsg2(true)}
                        >
                            Anexar Boleto - caso tenha

                        </button>
                        <hr></hr>

                        <button
                            onClick={() => setOpenMsg2(true)}
                        >
                            Anexar Certidões

                        </button>
                        <hr></hr>

                        <h4 style={{ fontSize: '12px', color: 'red' }}>
                            Documentos anexados: {listaDeArquivosEnviados.length}
                        </h4>









                        <DialogActions>
                            {/* <Button onClick={() => setModalConsumo(false)} color="secondary">
                                Cancelar
                            </Button> */}


                            {
                                fornecedor &&
                                    cnpj &&
                                    numeroNota &&
                                    numeroSerie &&
                                    numeroPedido &&
                                    rateio &&
                                    atesto &&
                                    listaDeArquivosEnviados.length > 2

                                    ?

                                    <Button
                                        onClick={() => onSaveContrato('consumo')}
                                        variant="contained" color="primary">
                                        Salvar
                                    </Button>

                                    :
                                    ''
                            }

                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={modalPatrimonio} onClose={() => setModalPatrimonio(false)} fullWidth maxWidth="sm">
                <DialogTitle>Cadastre uma Nota para pagamento de patrimônio</DialogTitle>

                <DialogContent dividers>





                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Fornecedor"
                            name="fornecedor"
                            value={fornecedor}
                            onChange={e => setFornecedor(e.target.value)}
                        />




                        <TextField
                            fullWidth
                            margin="normal"
                            label="CNPJ"
                            name="cnpj"
                            value={cnpj}
                            onChange={(e) => {
                                const onlyNumbers = e.target.value.replace(/\D/g, "").slice(0, 14);
                                setCnpj(onlyNumbers);
                            }}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Número da Nota Fiscal- com zeros a esquerda se houver"
                            name="notaFiscal"
                            value={numeroNota}
                            onChange={e => setNumeroNota(e.target.value)}
                        />


                        <TextField
                            fullWidth
                            margin="normal"
                            label="Número da série"
                            name="numero serie"
                            value={numeroSerie}
                            onChange={e => setNumeroSerie(e.target.value)}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Número Pedido"
                            name="numeroPedido"
                            value={numeroPedido}
                            onChange={e => setNumeroPedido(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Informe quem recebeu o material de consumo"
                            name="informe quem recebeu o material de consumo"
                            value={rateio}
                            onChange={e => setRateio(e.target.value)}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Atesto "
                            name="Atesto"
                            value={atesto}
                            onChange={e => setAtesto(e.target.value)}
                        />


                        <TextField
                            fullWidth
                            margin="normal"
                            label="Informe o local aonde o patrimonio ficará"
                            name="local"
                            value={localPatrimonio}
                            onChange={e => setLocalPatrimonio(e.target.value)}
                        />

                        <button
                            onClick={() => setOpenMsg2(true)}
                        >
                            Anexar nota fiscal
                        </button>
                        <hr></hr>




                        <button
                            onClick={() => setOpenMsg2(true)}
                        >
                            Atesto da Nota, anexar ou email com ciência de quem atestou ou a nota carimbada e assinada
                        </button>
                        <hr></hr>


                        <button
                            onClick={() => setOpenMsg2(true)}
                        >
                            Anexar Boleto - caso tenha

                        </button>
                        <hr></hr>

                        <button
                            onClick={() => setOpenMsg2(true)}
                        >
                            Anexar Certidões

                        </button>
                        <hr></hr>






                        <h4 style={{ fontSize: '12px', color: 'red' }}>
                            Documentos anexados: {listaDeArquivosEnviados.length}
                        </h4>




                        {/* <Button
                            onClick={() => setOpenMsg2(true)}
                            variant="contained" color="error">
                            clique aqui para Inserir a nota, as certidões, o print da analise fiscal e todos os documentos necessários para o pagamento

                        </Button> */}




                        <DialogActions>
                            {/* <Button onClick={() => setModalPatrimonio(false)} color="secondary">
                                Cancelar
                            </Button> */}


                            {
                                fornecedor &&
                                    cnpj &&
                                    numeroNota &&
                                    numeroSerie &&
                                    numeroPedido &&
                                    rateio &&
                                    atesto &&
                                    localPatrimonio &&
                                    listaDeArquivosEnviados.length > 2

                                    ?



                                    <Button
                                        onClick={() => onSaveContrato('patrimonio')}
                                        variant="contained" color="primary">
                                        Salvar
                                    </Button>

                                    : ''}
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={modalServco} onClose={() => setModalServico(false)} fullWidth maxWidth="sm">
                <DialogTitle>Cadastre uma Nota para pagamento de Serviço</DialogTitle>

                <DialogContent dividers>





                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Fornecedor"
                            name="fornecedor"
                            value={fornecedor}
                            onChange={e => setFornecedor(e.target.value)}
                        />





                        <TextField
                            fullWidth
                            margin="normal"
                            label="CNPJ"
                            name="cnpj"
                            value={cnpj}
                            onChange={(e) => {
                                const onlyNumbers = e.target.value.replace(/\D/g, "").slice(0, 14);
                                setCnpj(onlyNumbers);
                            }}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Número da Nota Fiscal- com zeros a esquerda se houver"
                            name="notaFiscal"
                            value={numeroNota}
                            onChange={e => setNumeroNota(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Número da série"
                            name="numero serie"
                            value={numeroSerie}
                            onChange={e => setNumeroSerie(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Grupo de Pagamento"
                            name="grupoPagamento"
                            value={centroCusto}
                            onChange={e => setCentroCusto(e.target.value)}
                        />




                        <TextField
                            fullWidth
                            margin="normal"
                            label="Número Pedido"
                            name="numeroPedido"
                            value={numeroPedido}
                            onChange={e => setNumeroPedido(e.target.value)}
                        />

                        {/* <TextField
                            fullWidth
                            margin="normal"
                            label="Informe quem recebeu o material de consumo"
                            name="informe quem recebeu o material de consumo"
                            value={rateio}
                            onChange={e => setRateio(e.target.value)}
                        /> */}



                        <TextField
                            fullWidth
                            margin="normal"
                            label="Atestar o serviço"
                            name="Atesto"
                            value={atesto}
                            onChange={e => setAtesto(e.target.value)}
                        />

                        <button
                            onClick={() => setOpenMsg2(true)}
                        >
                            Anexar nota fiscal
                        </button>
                        <hr></hr>




                        <button
                            onClick={() => setOpenMsg2(true)}
                        >
                            Atesto da Nota, anexar ou email com ciência de quem atestou ou a nota carimbada e assinada
                        </button>
                        <hr></hr>


                        <button
                            onClick={() => setOpenMsg2(true)}
                        >
                            Anexar Boleto - caso tenha

                        </button>
                        <hr></hr>

                        <button
                            onClick={() => setOpenMsg2(true)}
                        >
                            Anexar Certidões

                        </button>
                        <hr></hr>

                        <h4 style={{ fontSize: '12px', color: 'red' }}>
                            Documentos anexados: {listaDeArquivosEnviados.length}
                        </h4>








                        <DialogActions>
                            {/* <Button onClick={() => setModalServico(false)} color="secondary">
                                Cancelar
                            </Button> */}


                            {
                                fornecedor &&
                                    cnpj &&
                                    numeroNota &&
                                    numeroSerie &&
                                    numeroPedido &&
                                    centroCusto &&
                                    atesto &&

                                    listaDeArquivosEnviados.length > 2

                                    ?
                                    <Button
                                        onClick={() => onSaveContrato('servico')}
                                        variant="contained" color="primary">
                                        Salvar
                                    </Button>
                                    : ''}

                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={openMsg2}>
                <DialogContent
                    style={{
                        padding: '24px',
                        borderRadius: '10px',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                        fontFamily: 'Arial, sans-serif',
                    }}
                >
                    <hr style={{ margin: '20px 0', borderColor: '#e0e0e0' }} />

                    <div style={{ color: 'red', fontWeight: 'bold', marginBottom: '10px' }}>
                        {/* Aqui você pode exibir algum aviso se necessário */}
                    </div>

                    <h5 style={{ marginBottom: '15px', fontSize: '18px', color: '#333' }}>
                        Enviar PDF
                    </h5>

                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{
                            padding: '12px',
                            borderRadius: '6px',
                            border: '1px solid #ccc',
                            marginBottom: '20px',
                            width: '100%',
                            fontSize: '15px',
                            backgroundColor: '#f9f9f9',
                            cursor: 'pointer',
                        }}
                    />

                    <button
                        onClick={handleUpload}
                        style={{
                            backgroundColor: '#108cdd',
                            color: 'danger',
                            padding: '12px 24px',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            marginBottom: '20px',
                            transition: 'background-color 0.3s ease',
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = '#d93025')}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = '#108cdd')}
                    >
                        Escolha o arquivo e clique aqui
                    </button>

                    {errorMessage && (
                        <p style={{ color: '#d93025', marginBottom: '15px' }}>{errorMessage}</p>
                    )}

                    {listaDeArquivosEnviados.length > 0 && (
                        <div style={{ marginBottom: '20px' }}>
                            <h4 style={{ marginBottom: '10px', color: '#333' }}>
                                Arquivos enviados: {listaDeArquivosEnviados.length}
                            </h4>
                            {listaDeArquivosEnviados.map((file, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        background: '#f4f4f4',
                                        padding: '10px',
                                        borderRadius: '6px',
                                        marginBottom: '10px',
                                    }}
                                >
                                    <p style={{ margin: '5px 0' }}>
                                        <strong>Nome:</strong> {file.nome}
                                    </p>
                                    <p style={{ margin: '5px 0' }}>
                                        <strong>Tamanho:</strong> {file.tamanho}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            onClick={() => setOpenMsg2(false)}
                            style={{

                                fontWeight: 'bold',
                                textDecoration: 'underline',
                                fontSize: '15px',
                            }}
                        >
                            Após inserir os anexos, clique aqui para voltar ao cadastro
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>






        </div>
    );
};

export default Pagamentos;
