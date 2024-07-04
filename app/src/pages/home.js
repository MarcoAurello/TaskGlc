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

const Home = (props) => {
  const { logged } = props;
  const [pesquisa, setPesquisa] = useState("");
  const [respostas, setrespostas] = useState([]);
  const [setor, setSetor] = useState([]);
  // alert(JSON.stringify(props.logged))
  const [openLoadingDialog, setOpenLoadingDialog] = useState(false);
  const [openMessageDialog, setOpenMessageDialog] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm1, setSearchTerm1] = useState("");
  const [fkArea, setfkArea] = useState("");
  const [subarea, setSubArea] = useState([]);
  const [meuSetor, setMeuSetor] = useState([]);
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
    carregarAtividadesDoSetor();
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

          <Button
            size="large"
            variant="contained"
            style={{ marginRight: 20, marginTop: 20 }}
            onClick={() =>
              (window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/cadastro`)
            }
          >
            {/* <img src={ImageLogo} height={64} />   */}

            Solicitar cadastro de item / serviço

          </Button>
          <br></br>
          <p></p>
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
        {!checked ? (
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
            }}
          >
            <TextField
              fullWidth
              id="filled-basic"
              variant="filled"
              label="Pesquise por Protocolo"
              name="pesquisa"
              value={pesquisa}
              type="number"

              focused
              onChange={(e) => setPesquisa(e.target.value)}
            />


            {/* <Button type="button" className="btn btn-primary" onClick={(e) => { pesquisar() }}>Buscar </Button> */}
          </Box>
        ) : (
          ""
        )}
        {checked ? (
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
            }}
          >
            <div style={{ flex: 1, marginBottom: 16 }}>
              <FormControl size="small" fullWidth>
                <InputLabel id="demo-select-small">Área</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-select-small"
                  id="demo-select-small"
                  label="pesquisa"
                  style={{ backgroundColor: "#fff3d1" }}
                  value={pesquisa}
                >
                  {setor.map((item, index) => (
                    <MenuItem
                      key={index}
                      value={item.nome}
                      onClick={() => [
                        setPesquisa(item.nome),
                        setfkArea(item.id),
                      ]}
                    >
                      {item.nome}
                    </MenuItem>
                  ))}
                </Select>
                <p></p>
              </FormControl>
              {subarea ? (
                <FormControl size="small" fullWidth>
                  <InputLabel id="demo-select-small">Sub Área </InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-select-small"
                    id="demo-select-small"
                    label="pesquisa"
                    style={{ backgroundColor: "#fff3d1" }}
                    value={pesquisa}
                  >
                    {subarea.map((item, index) => (
                      <MenuItem
                        key={index}
                        value={item.nome}
                        onClick={() => setPesquisa(item.nome)}
                      >
                        {item.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                ""
              )}
            </div>
          </Box>
        ) : (
          ""
        )}
        {respostas ? (
          <center>
            <table
              className="table table-striped"
              style={{
                fontFamily: "arial",
                fontSize: "12px",
                marginLeft: 10,
                marginRight: 10,
                width: "100%",
              }}
            >
              <tbody>
                {respostas.map((item, index) => (
                  <tr key={index}>
                    <th scope="row" style={{ wordBreak: "break-all" }}>
                      {!item.fkUsuarioExecutor ? (
                        <div style={{ color: "red", size: 28 }}>
                          {" "}
                          Executor: &#10067;{" "}
                        </div>
                      ) : (
                        <div style={{ color: "Blue" }}>
                          {" "}
                          Executor: {item.UsuarioExecutor.nome}&#128587;{" "}
                        </div>
                      )}
                      {"Item para cadastrar: " + item.titulo}
                      <br></br>
                      {"Status : " + item.Status.nome}
                      {item.Status.nome == "Concluido" ? (
                        <a>&#9989;</a>
                      ) : (
                        <a> &#128341;</a>
                      )}
                      <br></br>
                      {item.categoria === ""
                        ? ""
                        : "Categoria : " + item.categoria}
                      <br></br>
                    </th>
                    <br></br>

                    <th>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() =>
                          (window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/${item.id}/edit`)
                        }
                      >
                        abrir atividade
                      </Button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </center>
        ) : (
          ""
        )}
      </center>
      <SpeedDial
        ariaLabel="Nova Tarefa"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<EditIcon />}
        onClick={() =>
          (window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/cadastro`)
        }
      />

      <hr></hr>



      {logged && logged.Area && logged.Area.Unidade &&
        logged.Area.Unidade.nome === 'GLC' ?

        <div
        >


          <div style={{

            justifyContent: 'space-between',
            alignItems: 'flex-start', // Alinha os componentes ao topo
            padding: '20px',
            // backgroundColor: '#f4f4f9',
            flexDirection: 'column',
          }}>

            <Accordion>
              <AccordionSummary
                // expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography style={{ marginLeft: '10px', fontSize: '30px' }}>
                  <div>
                    <b>Minhas Pendências</b>: 
                    
                    <b style={{fontSize:'20', color:'red'}}>
                      {meuSetor && logged? meuSetor.filter(item => item.fkUsuarioExecutor === logged.id
                    ).length :''}
                      </b>
                      

                  </div>
                </Typography>
              </AccordionSummary>


              <AccordionDetails>





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

                    <input

                      type="text"
                      placeholder="Pesquise o Setor demandante "
                      value={searchTerm1}
                      onChange={(e) => setSearchTerm1(e.target.value)}
                      style={{ marginBottom: "20px", padding: "10px", width: "80%", borderRadius: '5px', marginLeft: '20px', marginTop: '20px' }}
                    />

                    {minhas === false ? (
                      <div>

                        <table className="table table-striped table-dark">

                          ''
                        </table>
                      </div>
                    ) : (
                      <tbody>
                        {meuSetor
                          .filter((item) => {
                            const isStatusValid = item.Status.nome !== "Concluido" &&
                              item.fkUsuarioExecutor === logged.id &&
                              item.Status.nome !== "Cancelado";
                            const isSearchTermMatched =
                              item.Usuario.Area.Unidade.nome.toLowerCase().includes(searchTerm1.toLowerCase());
                            return isStatusValid && isSearchTermMatched;
                          })
                          .map((item, index) => (
                            <tr key={index} style={{ fontSize: '16px' }}>
                              <th scope="row" style={{ wordBreak: "break-all" }}>
                                <b style={{ color: 'black', marginRight: '8px' }}>Atividade:</b>
                              
                                  {item.titulo}
                                  
                                <br></br>
                                <b style={{ color: 'black', marginRight: '8px' }}>Data de solicitação:</b>
                                {new Date(item.createdAt).toLocaleDateString()}
                                <br></br>
                                <b style={{ color: 'black', marginRight: '8px' }}>Unidade Demandante:</b>
                                {item.Usuario ? item.Usuario.Area.Unidade.nome : ""}
                                <br></br>
                                {item.fkUsuarioExecutor ? (
                                  <div style={{ color: "#9ad1f4", display: 'flex', alignItems: 'center' }}>
                                    <b style={{ color: 'black', marginRight: '8px' }}>Executor:</b>
                                    <span style={{ color: '#f4a261' }}>{item.UsuarioExecutor.nome}</span> &#128590;
                                  </div>
                                ) : (
                                  <div style={{ color: "red" }}>
                                    <b style={{ color: 'black' }}>Executor:</b> Execultor não selecionado &#10067;
                                  </div>
                                )}
                                {item.Status.nome === "Concluido" ? (
                                  <div style={{ color: "#9ad1f4", display: 'flex', alignItems: 'center' }}>
                                    <b style={{ color: 'black', marginRight: '8px' }}>Status:</b>
                                    <span style={{ color: '#f4a261' }}>{item.Status.nome}</span> &#x23F3;
                                  </div>
                                ) : (
                                  <div style={{ color: "#9ad1f4", display: 'flex', alignItems: 'center' }}>
                                    <b style={{ color: 'black', marginRight: '8px' }}>Status:</b>
                                    <span style={{ color: 'red' }}>{item.Status.nome}</span> &#x23F3;
                                  </div>
                                )}
                              </th>
                              <th>
                                <Button
                                  variant="contained"
                                  size="small"
                                  onClick={() =>
                                    (window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/${item.id}/edit`)
                                  }
                                >
                                  ver
                                </Button>
                              </th>
                            </tr>
                          ))}
                        <p></p>
                      </tbody>
                    )}
                  </table>
                </div>






              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                // expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography  style={{ marginLeft: '10px', fontSize: '30px' }}>
                <div>
                <b>Pendências do Setor:</b>
                <b style={{fontSize:'20', color:'red'}}>
                      {meuSetor && logged? meuSetor.length :''}
                      </b>

              </div>
                </Typography>
              </AccordionSummary>


              <AccordionDetails>
              <div style={{
              flex: 1,
              margin: '0 10px',
              padding: '20px',

              transition: 'transform 0.2s',
              cursor: 'pointer'
            }}>
           
              <table
                className="table table-striped table-dark "
                style={{
                  fontFamily: "arial",
                  fontSize: "12px",
                  marginLeft: 10,
                  marginRight: 20,
                  marginRight: 20,
                  borderCollapse: "collapse",
                  boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                  borderRadius: "3px",
                }}
              ><p></p>
                {todasSetor === false ? (
                  <div>
                    <input
                      type="text"
                      placeholder="Pesquise o Setor demandante ou usuario executor"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ marginBottom: "20px", padding: "10px", width: "80%", borderRadius: '5px', marginLeft: '20px' }}
                    />
                    <table className="table table-striped table-dark">
                      <tbody>
                        {meuSetor
                          .filter((item) => {
                            const isStatusValid = item.Status?.nome !== "Concluido" && item.Status.nome !== "Cancelado";
                            const isSearchTermMatched = item.UsuarioExecutor?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              item.Usuario?.Area?.Unidade?.nome.toLowerCase().includes(searchTerm.toLowerCase());
                            return isStatusValid && isSearchTermMatched;
                          })
                          .map((item, index) => (
                            <tr key={index} style={{ fontSize: "16px" }}>
                              <th scope="row" style={{ wordBreak: "break-all" }}>

                              <b style={{color:'yellow'}}>

                                Atividade: {item.titulo}
                                </b>
                                <br />
                                Data da solicitação: {new Date(item.createdAt).toLocaleDateString()}
                                <br />
                                Unidade Demandante: {item.Usuario ? item.Usuario.Area.Unidade.nome : ""}
                                <br />
                                {item.fkUsuarioExecutor ? (
                                  <div style={{ color: "#9ad1f4", display: 'flex', alignItems: 'center' }}>
                                    <b style={{ color: '#dadada', marginRight: '8px' }}>Executor:</b>
                                    <span style={{ color: '#f4a261' }}>{item.UsuarioExecutor.nome}</span> &#128590;
                                  </div>
                                ) : (
                                  <div style={{ color: "red" }}>
                                    <b style={{ color: '#dadada' }}>Executor:</b> Execultor não selecionado &#10067;
                                  </div>
                                )}
                                {item.Status.nome === "Concluido" ? (
                                  <div style={{ color: "blue" }}>
                                    Status: {item.Status.nome} &#9989;
                                  </div>
                                ) : (
                                  <div style={{ color: "#9ad1f4", display: 'flex', alignItems: 'center' }}>
                                    <b style={{ color: '#dadada', marginRight: '8px' }}>Status:</b>
                                    <span style={{ color: '#f4a261' }}>{item.Status.nome}</span> &#x23F3;
                                  </div>
                                )}
                              </th>
                              <th>
                                <Button
                                  variant="contained"
                                  size="small"
                                  onClick={() =>
                                    (window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/${item.id}/edit`)
                                  }
                                >
                                  ver
                                </Button>
                              </th>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  ''
                )}
              </table>
            </div>



              </AccordionDetails>
              </Accordion>






           



          </div>






        </div>

        :
        'Solicitação de serviços para GLC'}

      {/* <Dialog open={emailNaoEncontrado}>
        <DialogContent>
          <hr></hr>
          <h4>Questionário de Satisfação do Usuário de TI</h4>
          Agradecemos por dedicar um tempo para nos fornecer feedback valioso
          sobre os serviços de Tecnologia da Informação (TI) da nossa
          organização. Sua opinião é importante para melhorarmos continuamente
          nossos serviços. Este questionário levará apenas alguns minutos para
          ser concluído.
          <center>
            <Button
              variant="contained"
              onClick={() =>
                (window.location.href = `${process.env.REACT_APP_DOMAIN}/pesquisa/`)
              }
            >
              Responder
            </Button>
            <p></p>
            <Button
              variant="contained"
              onClick={() => [setEmailNaoEncontrado(false), setFechar(true)]}
            >
              Sair
            </Button>
          </center>
         
        </DialogContent>
      </Dialog> */}

    </div>
  );
};

export default Home;
