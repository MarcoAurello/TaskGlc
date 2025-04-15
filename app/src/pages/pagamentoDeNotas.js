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
import StatusFiltro from '../components/botoesFiltro'; // ajuste o caminho conforme sua estrutura
import ArticleIcon from '@mui/icons-material/Article';
import PersonAddIcon from '@mui/icons-material/PersonAdd';



import { Box } from "@mui/system";
const ImageLogo = require('../assets/cad.jpeg')

const getCookie = require("../utils/getCookie");

const PagamentoDeNotas = (props) => {
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
  const [searchTerm1, setSearchTerm1] = useState("");
  const [fkArea, setfkArea] = useState("");
  const [subarea, setSubArea] = useState([]);
  const [meuSetor, setMeuSetor] = useState([]);
  const [meuSetorTotal, setMeuSetorTotal] = useState([]);

  const [setorTotal, setSetorTotal] = useState([]);
  const [setorTotalGLC, setSetorTotalGLC] = useState([]);
  const [todosEmails, setEmails] = useState([]);
  const [fechar, setFechar] = useState(false);
  const [emailNaoEncontrado, setEmailNaoEncontrado] = useState(false);

  //  const nome = Logged.Perfil.nome;
  const [minhasAtividades, setMinhasAtividades] = useState([]);
  const [solicitacaoAtividades, setSolicitacaoAtividades] = useState([]);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [minhas, setMinhas] = useState(true);
  const [todasSetor, setTodasSetor] = useState(false);
  // const [fkUnidade, setFkUnidade]= useState(props.logged.Area.fkUnidade)
  const [modalOpen, setModalOpen] = useState(false);
  const [atividadesExecutor, setAtividadesExecutor] = useState([]);
  const [executorSelecionado, setExecutorSelecionado] = useState('');
  // const [openLoadingDialog, setOpenLoadingDialog] = useState(false);

  const [statusFiltrado, setStatusFiltrado] = useState(null);

  const handleFiltroClick = (statusDesejado) => {
    setStatusFiltrado(statusDesejado);
  };

  const listaFiltrada = statusFiltrado
    ? meuSetorTotal.filter(item => item.Status.nome === statusFiltrado)
    : meuSetorTotal;


    const listaFiltradaCarteira = statusFiltrado
    ? meuSetorTotal.filter(item => item.Status.nome === statusFiltrado)
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

          setSetorTotal(data.data);
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
    carregarNotasParaParovarCarteira()
    carregarNotasParaPagar()

    carregarNotasParaParovar()
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
  }, [pesquisa]);

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
          
            <img src={ImageProd} style={{ width: '80px', borderRadius: '8px' }}
              onClick={() =>
                (window.location.href = `${process.env.REACT_APP_DOMAIN}/pesquisarNotas`)
              }
            />
          </div>
          <p></p>

          {logged && logged.usuarioPagamento === true
            ?
            <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 3,
              mt: 4,
              flexWrap: 'wrap',
            }}
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
                (window.location.href = `${process.env.REACT_APP_DOMAIN}/contratos`)
              }
            >
              Contratos
            </Button>
      
            <Button
              variant="contained"
              size="large"
              startIcon={<PersonAddIcon />}
              sx={{
                backgroundColor: '#43a047',
                borderRadius: '30px',
                paddingX: 4,
                paddingY: 1.5,
                textTransform: 'none',
                fontSize: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                '&:hover': {
                  backgroundColor: '#2e7d32',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                },
              }}
              onClick={() =>
                (window.location.href = `${process.env.REACT_APP_DOMAIN}/cadastroUsuarioNF`)
              }
            >
              Cadastrar Usuários NF
            </Button>
          </Box>
            :

            ''}

         




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
      (window.location.href = `${process.env.REACT_APP_DOMAIN}/nfCadastro/cadastro`)
    }
  >
    Cadastrar Nota Fiscal
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
      (window.location.href = `${process.env.REACT_APP_DOMAIN}/contratosSetor`)
    }
  >
    Contratos
  </Button>
</Box>


              <Typography style={{ marginRight: '20px', fontSize: '15px' }}>

                <div style={{ padding: '24px' }}>
                  <h1>Acompanhamento de Notas</h1>
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
                      <div
                        onClick={() => handleFiltroClick('Aberto')}
                        style={{
                          backgroundColor: '#f9f9f9',
                          border: '1px solid #ddd',
                          borderRadius: '10px',
                          padding: '14px 20px',
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
                        Aguardando aprovação do gestor:
                        <span style={{ fontSize: '20px', color: '#e76f51' }}>
                          {meuSetorTotal && logged
                            ? meuSetorTotal.filter(item => item.Status.nome === 'Aberto').length
                            : ''}
                        </span>
                      </div>

                      {/* Botão 2 */}
                      <div
                        onClick={() => handleFiltroClick('Iniciado')}
                        style={{
                          backgroundColor: '#f9f9f9',
                          border: '1px solid #ddd',
                          borderRadius: '10px',
                          padding: '14px 20px',
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
                        Aguardando Análise Fiscal:
                        <span style={{ fontSize: '20px', color: '#e76f51' }}>
                          {meuSetorTotal && logged
                            ? meuSetorTotal.filter(item => item.Status.nome === 'Iniciado').length
                            : ''}
                        </span>
                      </div>

                      {/* Botão 3 */}
                      <div
                        onClick={() => handleFiltroClick('Pendênte')}
                        style={{
                          backgroundColor: '#f9f9f9',
                          border: '1px solid #ddd',
                          borderRadius: '10px',
                          padding: '14px 20px',
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
                        Aguardando Pagamento GLC:
                        <span style={{ fontSize: '20px', color: '#e76f51' }}>
                          {meuSetorTotal && logged
                            ? meuSetorTotal.filter(item => item.Status.nome === 'Pendênte').length
                            : ''}
                        </span>
                      </div>


                      <div
                        onClick={() => handleFiltroClick('Planejado para Iniciar')}
                        style={{
                          backgroundColor: '#f9f9f9',
                          border: '1px solid #ddd',
                          borderRadius: '10px',
                          padding: '14px 20px',
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
                        Pagamento Direto:
                        <span style={{ fontSize: '20px', color: '#e76f51' }}>
                          {meuSetorTotal && logged
                            ? meuSetorTotal.filter(item => item.Status.nome === 'Planejado para Iniciar').length
                            : ''}
                        </span>
                      </div>
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
                              <b style={{ color: '#444', marginRight: '8px' }}>Nota Fiscal:</b>
                              {item.titulo}
                              <br />

                                 <b style={{ color: '#333' }}>Valor:</b> R${item.valorNota.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                       
                              <br />
                              <b style={{ color: '#444', marginRight: '8px' }}>Cadastrado por:</b>
                              {item?.Usuario?.nome}
                              <br />
                              <b style={{ color: '#444', marginRight: '8px' }}>Setor:</b>
                              {item?.Usuario?.Area?.Unidade?.nome}
                              <br />
                              <b style={{ color: '#444', marginRight: '8px' }}>Data envio para pagamento:</b>
                              {new Date(item.createdAt).toLocaleDateString()}
                              <br />

                              <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                <b style={{ color: '#444', marginRight: '8px' }}>Empresa:</b>
                                <span style={{ color: '#f4a261' }}>{item.Contrato?.nomeEmpresa}</span> &#128590;
                              </div>

                              <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                <b style={{ color: '#444', marginRight: '8px' }}>Status:</b>
                                <span style={{ color: item.Status.nome === 'Concluido' ? 'green' : 'red' }}>
                                  {item.Status.nome === 'Aberto' && 'Aguardando Aprovação do gestor'}
                                  {item.Status.nome === 'Iniciado' && 'Nota em análise fiscal'}
                                  {item.Status.nome === 'Pendênte' && 'Nota aguardando pagamento na GLC'}
                                  {item.Status.nome === 'Concluido' && 'Nota Fiscal paga'}
                                  {item.Status.nome === 'Planejado para Iniciar' && 'Lançamento direto pelo setor'}
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
                        onClick={() => handleFiltroClick('Iniciado')}
                        style={{
                          backgroundColor: '#f9f9f9',
                          border: '1px solid #ddd',
                          borderRadius: '10px',
                          padding: '14px 20px',
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
                        Aguardando Análise Fiscal:
                        <span style={{ fontSize: '20px', color: '#e76f51' }}>
                          {setorTotal && logged
                            ? setorTotal.filter(item => item.Status.nome === 'Iniciado').length
                            : ''}
                        </span>
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
                        {setorTotal.map((item, index) => (
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
                              <b style={{ color: '#444', marginRight: '8px' }}>Nota Fiscal:</b>
                              {item.titulo}
                              <br />
                              <b style={{ color: '#333' }}>Valor:</b> R${item.valorNota.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                       
                                       <br />
                              <b style={{ color: '#444', marginRight: '8px' }}>Cadastrado por:</b>
                              {item?.Usuario?.nome}
                              <br />
                              <b style={{ color: '#444', marginRight: '8px' }}>Setor:</b>
                              {item?.Usuario?.Area?.Unidade?.nome}
                              <br />
                              <b style={{ color: '#444', marginRight: '8px' }}>Data envio para pagamento:</b>
                              {new Date(item.createdAt).toLocaleDateString()}
                              <br />

                              <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                <b style={{ color: '#444', marginRight: '8px' }}>Empresa:</b>
                                <span style={{ color: '#f4a261' }}>{item.Contrato?.nomeEmpresa}</span> &#128590;
                              </div>

                              <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                <b style={{ color: '#444', marginRight: '8px' }}>Status:</b>
                                <span style={{ color: item.Status.nome === 'Concluido' ? 'green' : 'red' }}>
                                  {item.Status.nome === 'Aberto' && 'Aguardando Aprovação do gestor'}
                                  {item.Status.nome === 'Iniciado' && 'Nota em análise fiscal'}
                                  {item.Status.nome === 'Pendênte' && 'Nota aguardando pagamento na GLC'}
                                  {item.Status.nome === 'Concluido' && 'Nota Fiscal paga'}
                                  {item.Status.nome === 'Planejado para Iniciar' && 'Lançamento direto pelo setor'}
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
                  <h1>GLC- Pagamento de Contratos</h1>
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
                        onClick={() => handleFiltroClick('Pendênte')}
                        style={{
                          backgroundColor: '#f9f9f9',
                          border: '1px solid #ddd',
                          borderRadius: '10px',
                          padding: '14px 20px',
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
                        Notas para lançar no MXM:
                        <span style={{ fontSize: '20px', color: '#e76f51' }}>
                          {setorTotalGLC && logged
                            ? setorTotalGLC.filter(item => item.Status.nome === 'Pendênte').length
                            : ''}
                        </span>
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
                        {setorTotalGLC.map((item, index) => (
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
                              <b style={{ color: '#444', marginRight: '8px' }}>Nota Fiscal:</b>
                              {item.titulo}
                              <br />
                              <b style={{ color: '#333' }}>Valor:</b> R${item.valorNota.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                       
                                       <br />
                              <b style={{ color: '#444', marginRight: '8px' }}>Cadastrado por:</b>
                              {item?.Usuario?.nome}
                              <br />
                              <b style={{ color: '#444', marginRight: '8px' }}>Unidade:</b>
                              {item?.Usuario?.Area?.Unidade?.nome}
                              <br />
                              <b style={{ color: '#444', marginRight: '8px' }}>Data envio para pagamento:</b>
                              {new Date(item.createdAt).toLocaleDateString()}
                              <br />

                              <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                <b style={{ color: '#444', marginRight: '8px' }}>Empresa:</b>
                                <span style={{ color: '#f4a261' }}>{item.Contrato?.nomeEmpresa}</span> &#128590;
                              </div>

                              <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}>
                                <b style={{ color: '#444', marginRight: '8px' }}>Status:</b>
                                <span style={{ color: item.Status.nome === 'Concluido' ? 'green' : 'red' }}>
                                  {item.Status.nome === 'Aberto' && 'Aguardando Aprovação do gestor'}
                                  {item.Status.nome === 'Iniciado' && 'Nota em análise fiscal'}
                                  {item.Status.nome === 'Pendênte' && 'Nota aguardando pagamento na GLC'}
                                  {item.Status.nome === 'Concluido' && 'Nota Fiscal paga'}
                                  {item.Status.nome === 'Planejado para Iniciar' && 'Lançamento direto pelo setor'}
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

      <hr></hr>







    </div>
  );
};

export default PagamentoDeNotas;
