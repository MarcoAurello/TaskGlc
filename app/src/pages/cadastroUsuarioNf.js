import {
    Button,
    FormControl,
    InputAdornment,
    Dialog,
    DialogContent,
    InputLabel,
    MenuItem,
    Select,
    SpeedDial,
    TextField,
    Accordion,
    Typography,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import TaskFilter from "../components/task-filter";
import Switch from "@mui/material/Switch";
import Checkbox from "@mui/material/Checkbox";
import Modal from '../components/modal'


import { Box } from "@mui/system";
const ImageLogo = require('../assets/cad.jpeg')

const getCookie = require("../utils/getCookie");

const CadastrousuarioNf = (props) => {
    const { logged } = props;
    const [pesquisa, setPesquisa] = useState("");
    const [respostas, setrespostas] = useState([]);
    const [setor, setSetor] = useState([]);
    // alert(JSON.stringify(props.logged))
    const [openLoadingDialog, setOpenLoadingDialog] = useState(false);
    const [openMessageDialog, setOpenMessageDialog] = useState(false);
    const [checked, setChecked] = React.useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const ImageProd = require('../assets/nf.png')
    const [searchTerm1, setSearchTerm1] = useState("");
    const [fkArea, setfkArea] = useState("");
    const [subarea, setSubArea] = useState([]);
    const [meuSetor, setMeuSetor] = useState([]);
    const [todosEmails, setEmails] = useState([]);
    const [handleExcluir, setHandleExcluir] = useState('');

    const [todosEmailsNF, setTodosEmailsNF] = useState([]);


    const [fechar, setFechar] = useState(false);
    const [emailNaoEncontrado, setEmailNaoEncontrado] = useState(false);

    //  const nome = Logged.Perfil.nome;
    const [minhasAtividades, setMinhasAtividades] = useState([]);
    const [solicitacaoAtividades, setSolicitacaoAtividades] = useState([]);
    const [nomeUsuario, setNomeUsuario] = useState("");
    const [minhas, setMinhas] = useState(true);
    const [todasSetor, setTodasSetor] = useState(false);
    const [novoEmailNF, setNovoEmailNF] = useState('')
    const [novoPerfilNF, setNovoPerfilNF] = useState('')
    const [modalOpen, setModalOpen] = useState(false);
    const [atividadesExecutor, setAtividadesExecutor] = useState([]);
    const [executorSelecionado, setExecutorSelecionado] = useState('');
    // const [openLoadingDialog, setOpenLoadingDialog] = useState(false);

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

    function carregarEmailsNF() {
        setOpenLoadingDialog(true);
        const token = getCookie("_token_task_manager");
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        fetch(
            `${process.env.REACT_APP_DOMAIN_API}/api/usuario/emailNF/`,
            params
        ).then((response) => {
            const { status } = response;
            response.json().then((data) => {
                setOpenLoadingDialog(false);
                if (status === 401) {
                } else if (status === 200) {
                    setOpenLoadingDialog(false);

                    // alert(JSON.stringify(data.data))

                    setTodosEmailsNF(data.data);
                }
            });
        });
    }


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
        carregarEmailsNF()
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


        // if(novoPerfilNF){
        //     alert(JSON.stringify(novoPerfilNF))
        // }



    }, [todosEmails, emailNaoEncontrado, logged]);

    useEffect(() => {
        if (pesquisa) {
            pesquisar();
        }
    }, [pesquisa]);

    // useEffect(() => {
    //   pesquisa()
    // }, [pesquisa])



    const onSave = () => {

        const token = getCookie('_token_task_manager')
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                novoEmailNF,
                novoPerfilNF


            })
        }

        fetch(`${process.env.REACT_APP_DOMAIN_API}/api/usuario/${novoEmailNF}/editNf`, params)
            .then(response => {
                const { status } = response
                response.json().then(data => {
                    setOpenLoadingDialog(false)
                    if (status === 401) {
                        alert(data.message)
                        // setOpenMessageDialog(true)
                    } else if (status === 200) {
                        alert(data.message)

                        window.location.href = `${process.env.REACT_APP_DOMAIN}/cadastroUsuarioNF`
                        // alert(JSON.stringify(data.data))
                        // setMessage(data.message)
                        // setOpenMessageDialog(true)
                        // setArea(data.data)

                    }
                }).catch(err =>

                    setOpenLoadingDialog(true))
            })
    }


    function onsave2(idUser){

        const token = getCookie('_token_task_manager')
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                novoEmailNF,
                novoPerfilNF: 'excluir'


            })
        }

        fetch(`${process.env.REACT_APP_DOMAIN_API}/api/usuario/${idUser}/editNf`, params)
            .then(response => {
                const { status } = response
                response.json().then(data => {
                    setOpenLoadingDialog(false)
                    if (status === 401) {
                        alert(data.message)
                        // setOpenMessageDialog(true)
                    } else if (status === 200) {
                        alert(data.message)

                        window.location.href = `${process.env.REACT_APP_DOMAIN}/cadastroUsuarioNF`
                        // alert(JSON.stringify(data.data))
                        // setMessage(data.message)
                        // setOpenMessageDialog(true)
                        // setArea(data.data)

                    }
                }).catch(err =>

                    setOpenLoadingDialog(true))
            })
    }



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


                    <br></br>
                    <p></p>

                    {logged
                        && logged.usuarioPagamento === true 
                        ? (

                            <div>
                                <h1>Usuarios do modulo Nota fiscal</h1>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column', // agora é linha
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                                        padding: '20px',
                                        marginRight: 20,
                                        marginTop: 20,
                                        backgroundColor: '#fff',
                                        gap: '20px' // espaço entre colunas
                                    }}
                                >
                                    <b>
                                        Cadastre e exclua usuarios do modulo Nota Fiscal

                                    </b>



                                    <FormControl fullWidth size="small" sx={{ mt: 2 }}>
                                        <InputLabel id="select-email-label">Selecione um e-mail</InputLabel>
                                        <Select
                                            labelId="select-email-label"
                                            value={novoEmailNF}
                                            onChange={(e) => setNovoEmailNF(e.target.value)}
                                            label="Selecione um e-mail"
                                            sx={{
                                                backgroundColor: '#fafce5',
                                                borderRadius: '8px',
                                                boxShadow: 1,
                                                '& .MuiSelect-select': {

                                                }
                                            }}
                                        >
                                            {todosEmailsNF.map((item, index) => (
                                                <MenuItem key={index} value={item.id}>
                                                    {item.nome}
                                                </MenuItem>
                                            ))}
                                        </Select>


                                    </FormControl>
                                    <FormControl fullWidth size="small" sx={{ mt: 2 }}>
                                        <InputLabel id="select-email-label">Selecione tipo de perfil</InputLabel>
                                        <Select
                                            labelId="select-email-label"
                                            value={novoPerfilNF}
                                            onChange={(e) => setNovoPerfilNF(e.target.value)}
                                            label="Selecione um usuário"
                                            sx={{
                                                backgroundColor: '#fafce5',
                                                borderRadius: '8px',
                                                boxShadow: 1,
                                                '& .MuiSelect-select': {

                                                }
                                            }}
                                        >

                                            <MenuItem value="Cadastrante de Notas">
                                                Cadastrante de Notas- setor
                                            </MenuItem>

                                            <MenuItem value="Aprovador de pagamentos">
                                                Aprovador de pagamentos- setor
                                            </MenuItem>

                                            <MenuItem value="Cadastrante MXM">
                                                Cadastrante MXM- GLC
                                            </MenuItem>

                                            <MenuItem value="Analise Fiscal">
                                                Analise Fiscal- GCF
                                            </MenuItem>




                                        </Select>
                                    </FormControl>
                                    <br></br>


                                    {novoEmailNF && novoPerfilNF ?

                                        <Button size="large" variant="contained" style={{ marginRight: 20, marginTop: 20 }}
                                            onClick={() => onSave()} >
                                            cadastrar usuario no modulo de Nota Fiscal
                                        </Button>


                                        : ''}

                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row', // agora é linha
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                                        padding: '20px',
                                        marginRight: 20,
                                        marginTop: 20,
                                        backgroundColor: '#fff',
                                        gap: '20px' // espaço entre colunas
                                    }}
                                >

                                    <div style={{ flex: 1, padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                                        Cadastrante de Notas- setor

                                        <div style={{ marginTop: '16px' }}>
                                            {todosEmailsNF
                                                .filter(item => item.Usuario === true)
                                                .map((item, index) => (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            padding: '10px',
                                                            marginBottom: '8px',
                                                            backgroundColor: '#f9f9f9',
                                                            borderRadius: '8px',
                                                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                                        }}
                                                    >
                                                        <span>{item.nome}</span>
                                                        <button
                                                           onClick={() => onsave2(item.id)}
                                                            style={{
                                                                backgroundColor: '#e53935',
                                                                color: '#fff',
                                                                border: 'none',
                                                                padding: '6px 12px',
                                                                borderRadius: '6px',
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            Excluir
                                                        </button>
                                                    </div>
                                                ))}
                                        </div>



                                    </div>

                                    <div style={{ flex: 1, padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>Aprovador de pagamentos- setor

                                        <div style={{ marginTop: '16px' }}>
                                            {todosEmailsNF
                                                .filter(item => item.usuarioAtesto === true)
                                                .map((item, index) => (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            padding: '10px',
                                                            marginBottom: '8px',
                                                            backgroundColor: '#f9f9f9',
                                                            borderRadius: '8px',
                                                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                                        }}
                                                    >
                                                        <span>{item.nome}</span>
                                                        <button
                                                           onClick={() => onsave2(item.id)}
                                                            style={{
                                                                backgroundColor: '#e53935',
                                                                color: '#fff',
                                                                border: 'none',
                                                                padding: '6px 12px',
                                                                borderRadius: '6px',
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            Excluir
                                                        </button>
                                                    </div>
                                                ))}
                                        </div>

                                    </div>

                                    <div style={{ flex: 1, padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>Cadastrante MXM- GLC
                                        <div style={{ marginTop: '16px' }}>
                                            {todosEmailsNF
                                                .filter(item => item.usuarioPagamento === true)
                                                .map((item, index) => (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            padding: '10px',
                                                            marginBottom: '8px',
                                                            backgroundColor: '#f9f9f9',
                                                            borderRadius: '8px',
                                                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                                        }}
                                                    >
                                                        <span>{item.nome}</span>
                                                        <button
                                                            onClick={() => onsave2(item.id)}
                                                            style={{
                                                                backgroundColor: '#e53935',
                                                                color: '#fff',
                                                                border: 'none',
                                                                padding: '6px 12px',
                                                                borderRadius: '6px',
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            Excluir
                                                        </button>
                                                    </div>
                                                ))}
                                        </div>


                                    </div>

                                    <div style={{ flex: 1, padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>Analise Fiscal- GCF
                                        <div style={{ marginTop: '16px' }}>
                                            {todosEmailsNF
                                                .filter(item => item.usuarioCarteiraFiscal === true)
                                                .map((item, index) => (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            padding: '10px',
                                                            marginBottom: '8px',
                                                            backgroundColor: '#f9f9f9',
                                                            borderRadius: '8px',
                                                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                                        }}
                                                    >
                                                        <span>{item.nome}</span>
                                                        <button
                                                            onClick={() => onsave2(item.id)}
                                                            style={{
                                                                backgroundColor: '#e53935',
                                                                color: '#fff',
                                                                border: 'none',
                                                                padding: '6px 12px',
                                                                borderRadius: '6px',
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            Excluir
                                                        </button>
                                                    </div>
                                                ))}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ) : ''}









                </div>
            </center>
            <center>
                {/* <div style={{ fontSize: 20, color: "#5499FA" }}>
            Recebidas por área
            <Switch
              label="Selecionar por Area"
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>{" "} */}
                <hr></hr>



            </center>
            {/* <SpeedDial
          ariaLabel="Nova Tarefa"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          icon={<EditIcon />}
          onClick={() =>
            (window.location.href = `${process.env.REACT_APP_DOMAIN}/nfCadastro/cadastro`)
          }
        /> */}









        </div>
    );
};

export default CadastrousuarioNf;
