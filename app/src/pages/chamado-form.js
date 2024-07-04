import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import {
  Alert, Avatar, Box, Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel,
  FormGroup, FormLabel, Hidden, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, Switch, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination,
  TableRow, TextField, Tooltip
} from "@mui/material";

import TaskItemDoChamado from "../components/task-item-do-chamado";
import PerfilUtils from "../utils/perfil.utils";
import MessageIcon from '@mui/icons-material/Message';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';


import PersonIcon from '@mui/icons-material/Person';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import UploadButton from "../components/UploadButton";
import { color } from "@mui/system";
import TaskFilter from "../components/task-filter";


const getCookie = require('../utils/getCookie')

const PageContainer = styled.div`
  margin: 16px;
  padding: 32px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-shadow: 0px 0px 20px -18px #424242;
`

const AtividadeForm = (props) => {
  const { logged } = props

  const [checked, setChecked] = React.useState(false);
  // alert(JSON.stringify(logged.nome))
  const [arquivado, setArquivado] = useState(true)

  const [open, setOpen] = useState(false);
  const [openImg, setOpenImg] = useState(false);
  const [openMsg, setOpenMsg] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [boleanDimensao, setBoleanDimensao] = useState(true);
  const [dimensao, setDimensao] = useState("");

  const { id } = props.match.params;
  const [openLoadingDialog, setOpenLoadingDialog] = useState(false)
  const [openMessageDialog, setOpenMessageDialog] = useState(false)
  const [message, setMessage] = useState('')

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
  const [usuarioSolicitante, setUsuarioSolicitante] = useState('')
  const [emailUsuarioSolicitante, setEmailUsuarioSolicitante] = useState('')
  const [telefoneSolicitante, setTelefoneSolicitante] = useState('')
  const [setorSolicitante, setSetorSolicitante] = useState('')
  const [categoriaChamado, setCategoriaChamado] = useState('')
  const [btnMsg, setBtnMsg] = useState(false);

  const [tempoEstimado, setTempoEstimado] = useState('')
  const [createdAt, setCreatedAt] = useState('')
  const [title, setTitle] = useState('')
  const [botaoDesabilitado, setBotaoDesabilitado] = useState(false);
  const [gti, setGti] = useState('')


  const [titulo, setTitulo] = useState('')
  const [conteudo, setConteudo] = useState('')
  const [forma, setForma] = useState('')
  const [material, setMaterial] = useState('')
  const [cor, setCor] = useState('')
  const [indicacao, setIndicacao] = useState ('')
  const [boleanIndicacao, setBoleanIndicacao] = useState(true)
  const [informacoes, setInformacoes] = useState ('')
  const [boleanInformacoes, setBoleanInformacoes] = useState(true)
  const [fkUnidade, setFkUnidade] = useState('')
  const [fkUnidadeDrop, setFkUnidadeDrop] = useState('')
  const [dep, setDep] = useState('')
  const [fkArea, setFkArea] = useState('')
  const [tipoCadastro, setTipoCadastro] = useState('')
  const [fkCategoria, setFkCategoria] = useState('')
  const [unidade, setUnidade] = useState([])
  const [arquivoDoChamado, setArquivoDoChamado] = useState([])
  const [unidadeTrue, setUnidadeTrue] = useState([])
  const [eletro, setEletro] = useState('')
  const [boleanEletro, setBoleanEletro] = useState(true)
  const [area, setArea] = useState([])
  const [subArea, setSubArea] = useState([])
  const [atividade, setAtividade] = useState(null)
  const [mensagens, setMensagens] = useState([])
  const [classificarChamado, setClassificarChamado] = useState([])
  const [alterarStatus, setAltararStatus] = useState([])
  const [fkUnidadeExecutor, getFkUnidadeExecutor] = useState('')
  const [meuSetor, setMeuSetor] = useState([]);
  const [meuSetorCount, setMeuSetorCount] = useState([]);
  const [boleanMedida, setBoleanMedida] = useState(true)
  const [medida, setMedida] = useState('')


  const [usuarioExecutor, setusuarioExecutor] = useState([])
  const [fkUsuarioExecutor, setFKUsuarioExecutor] = useState('')
  const [fkAreaDemandada, setFkAreaDemandada] = useState('')
  const [nomeExecutor, getNomeExecutor] = useState('')
  const [emailExecutor, getEmailExecutor] = useState('')
  const [telefoneExecutor, getTelefoneExecutor] = useState('')
  const [fkDemandante, setFkDemandante] = useState('')
  const [fkUsuarioSolicitante, setFkUsuarioSolicitante] = useState('')
  const [fkExecutor, getFkExecutor] = useState('')
  const [categoria, setCategoria] = useState('')
  const [arquivo, setArquivo] = useState(null)
  const [listaDeArquivosEnviados, setListaDeArquivosEnviados] = useState([])
  const [caminho, setCaminho] = useState()
  const [openDialogFile, setOpenDialogFile] = useState(false)
  const [termo, setTermo] = useState(false)
  const [boleanForma, setBoleanForma] = useState(true)
  const [openFile, setOpenFile] = useState('')
  const [sub, setSub] = useState('')
  const [cpfTermo, setCpfTermo] = useState('')
  const [mensagemAlert, setMensagemAlert] = useState('')
  const [openMensagens, setOpenMensagens] = useState(false)
  const [boleanCor, setBoleanCor] = useState(true)
  const [boleanMaterial, setBoleanMaterial] = useState(true)




  const [idChamado, setIdChamado] = useState('')

  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };






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
              setClassificacao(data.data.Classificacao.nome)
              setProtocolo(data.data.protocolo)
              setStatus(data.data.Status.nome)
              setStatusId(data.data.Status.id)
              setValueArea(data.data.Area.nome)
              setSetorSolicitante(data.data.Usuario.Area.Unidade.nome)
              setValueUnidade(data.data.Area.Unidade.nome)
              getFkUnidadeExecutor(data.data.Area.fkUnidade)
              setUsuarioSolicitante(data.data.Usuario.nome)
              setEmailUsuarioSolicitante(data.data.Usuario.email)
              setTelefoneSolicitante(data.data.Usuario.telefone)
              setFkDemandante(data.data.fkDemandante)
              setCategoriaChamado(data.data.categoria)
              setTitle(data.data.titulo)
              setFkAreaDemandada(data.data.fkArea)
              setIdChamado(data.data.id)
              setFkUsuarioSolicitante(data.data.fkUsuarioSolicitante)
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



    if (boleanCor) {
      setCor("Não se aplica")
    } else {
      setCor("")

    }

    if (boleanIndicacao) {
      setIndicacao("Não se aplica") 
    } else {
        setIndicacao("")
  
    }

    if (boleanInformacoes) {
      setInformacoes("Não se aplica") 
    } else {
        setInformacoes("")
  
    }

    if (boleanMaterial) {
      setMaterial("Não se aplica")
    } else  {
      setMaterial("")

    }


    if (boleanMedida) {
      setMedida("Não se aplica")
    } else {
      setMedida(medida)

    }

    if (boleanForma) {
      setForma("Não se aplica")
    } else {
      setForma(forma)

    }

    if (boleanEletro) {
      setEletro("Não se aplica")
    } else {
      setEletro(eletro)

    }

    if (boleanDimensao) {
      setDimensao("Não se aplica")
    } else {
      setDimensao(dimensao)

    }








  }, [boleanDimensao,boleanEletro, boleanForma,boleanMedida, boleanMaterial, boleanInformacoes, boleanCor, boleanIndicacao])



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


  const onSaveStatus = () => {
    // alert(newStatus)


    const token = getCookie('_token_task_manager')
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        fkStatus: newStatus,
        tempoEstimado,
        // email: emailUsuarioSolicitante,
        // titulo: title,


      })

    }

    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/atividade/${id}/edit`, params)
      .then(response => {
        const { status } = response
        response.json().then(data => {
          setOpenLoadingDialog(false)
          if (status === 401) {
            setMessage(data.message)
            setOpenMessageDialog(true)
          } else if (status === 200) {
            setMessage(data.message)
            setOpenMessageDialog(true)
            setOpenMsg(true)
            //  window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/${idChamado}/edit`


            // setArea(data.data)
          }
        }).catch(err => setOpenLoadingDialog(true))
      })
  }


  const onSave = () => {
    setOpenLoadingDialog(true)
    alert(indicacao + informacoes)

  
    // setSetorSolicitante(props.logged.Area.Unidade.nome)

    const token = getCookie('_token_task_manager')
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },

      body: JSON.stringify({
        setorSolicitante: props.logged.Area.Unidade.nome,
        listaDeArquivosEnviados,
        caminho,
        fkUnidade,
        fkArea,
        categoria,
        medida,
        titulo,
        conteudo,
        dimensao,
        eletro,
        forma,
        material,
        cor,
        indicacao,
        informacoes,
        arquivado: false
      })

    }


    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/atividade/`, params)
      .then(response => {
        const { status } = response
        response.json().then(data => {
          setOpenLoadingDialog(false)
          if (status === 401) {
            setMessage(data.message)
            setOpenMessageDialog(true)
          } else if (status === 200) {
            setAtividade(data.data)
            setOpenLoadingDialog(false)
            setMessage(data.message)
            setOpenMessageDialog(true)
            window.location.href = `${process.env.REACT_APP_DOMAIN}/chamadosAbertos/`


            // setArea(data.data)
          }
        }).catch(err => setOpenLoadingDialog(true))
      })
  }

  // const onSaveMeu = () => {
  //   const token = getCookie('_token_task_manager')
  //   const params = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`
  //     },
  //     body: JSON.stringify({
  //       fkUnidade: logged.Area.fkUnidade,
  //       fkArea : logged.fkArea,
  //       titulo,
  //       conteudo,
  //       arquivado: false,
  //       pessoal: true,
  //       fkUsuarioExecutor : logged.id
  //     })
  //   }

  //   fetch(`${process.env.REACT_APP_DOMAIN_API}/api/atividade/`, params)
  //     .then(response => {
  //       const { status } = response
  //       response.json().then(data => {
  //         setOpenLoadingDialog(false)
  //         if (status === 401) {
  //           setMessage(data.message)
  //           setOpenMessageDialog(true)
  //         } else if (status === 200) {
  //           setAtividade(data.data)
  //           setMessage(data.message)
  //           setOpenMessageDialog(true)
  //           window.location.href = `${process.env.REACT_APP_DOMAIN}/home/`


  //           // setArea(data.data)
  //         }
  //       }).catch(err => setOpenLoadingDialog(true))
  //     })
  // }

  const novaInteracao = () => {

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
        email: emailUsuarioSolicitante,
        emailExecutor: emailExecutor,
        caminho,
        listaDeArquivosEnviados



      })
    }

    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/mensagem/`, params)
      .then(response => {
        const { status } = response
        response.json().then(data => {
          setOpenLoadingDialog(false)
          if (status === 401) {
            setMessage(data.message)
            setOpenMessageDialog(true)
          } else if (status === 200) {
            // alert(JSON.stringify(data.data))
            // alert(JSON.stringify(arquivoDoChamado))
            setAtividade(data.data)
            setMessage(data.message)
            setOpenMessageDialog(true)

            window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/${idChamado}/edit`


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
        email: emailExecutor



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
            window.location.href = `${process.env.REACT_APP_DOMAIN}/home`

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

  function baixar(item) {
    window.location.href = `${process.env.REACT_APP_DOMAIN_API}/api/arquivo/${item}`

    // window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/${idChamado}/edit`

  }


  const enviarArquivo = (e) => {
    setArquivo(e)
    // alert(JSON.stringify(e))
    const form = new FormData()
    form.append('arquivo', e)

    sendFile("POST", `${process.env.REACT_APP_DOMAIN_API}/api/arquivo`, form)
      .then(response => {
        const { data } = response
        setOpenLoadingDialog(true)

        setListaDeArquivosEnviados([...listaDeArquivosEnviados, data])
        setCaminho(data.caminho)
        setOpenLoadingDialog(false)
        // alert(JSON.stringify(listaDeArquivosEnviados))

        // alert(JSON.stringify(response))
      })
      .catch(err => {
        alert(JSON.stringify(err))
      })
  }

  const enviarVideoMp4 = (e) => {
    const video = e.target.files[0]; // Obtém o arquivo de vídeo selecionado
    const form = new FormData();
    form.append('video', video); // Adiciona o arquivo de vídeo ao FormData

    sendVideoFile("POST", `${process.env.REACT_APP_DOMAIN_API}/api/arquivo/mp4`, form)
      .then(response => {
        const { data } = response;
        setOpenLoadingDialog(true);
        setListaDeArquivosEnviados([...listaDeArquivosEnviados, data]);
        setCaminho(data.caminho);
        setOpenLoadingDialog(false);
      })
      .catch(err => {
        alert('Ocorreu um problema ao enviar o vídeo. Por favor, tente novamente.');
        console.error('Erro:', err);
      });
  }


  const sendVideoFile = (method, url, formData) => {
    const token = getCookie('_token_task_manager');

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

      req.send(formData);
    });
  };

  useEffect(() => {
    // Verifique se há um item com nome "GLC" e defina o valor selecionado
    const glcItem = unidade.find(item => item.nome === 'GLC' && item.receber === true);
    if (glcItem) {
      setFkUnidade(glcItem.id);
    }
  }, [unidade]);




  const Change = (event) => {
    setBoleanCor(event.target.checked);
  };
  const Change1 = (event) => {
    setBoleanMaterial(event.target.checked);
  };

  const Change2 = (event) => {
    setBoleanMedida(event.target.checked);
  };

  const Change3 = (event) => {
    setBoleanForma(event.target.checked);
  };

  const Change4 = (event) => {
    setBoleanDimensao(event.target.checked);
  };

  const Change5 = (event) => {
    setBoleanEletro(event.target.checked);
  };

  const Change6 = (event) => {
    setBoleanIndicacao(event.target.checked);
  };

  const Change7 =  (event) => {
    setBoleanInformacoes(event.target.checked);
  };

  return (

    <PageContainer>


      {id ? <div style={{ flex: 1, marginBottom: 16, marginLeft: 25 }}>
        <TextField size="small" fullWidth label="Protocolo" disabled variant="outlined" value={protocolo} />
      </div> : ''}





      {id ? <div >
        <TaskItemDoChamado

          protocolo={protocolo}
          unidade={valueUnidade}
          categoria={categoriaChamado}
          area={valueArea}
          classificacao={classificacao}
          solicitante={usuarioSolicitante}
          status={status}
          titulo={title}
          emailUsuarioSolicitante={emailUsuarioSolicitante}
          telefoneSolicitante={telefoneSolicitante}
          setorSol={valueUnidade}
          nomeExecutor={nomeExecutor}
          emailExecutor={emailExecutor}
          telefoneExecutor={telefoneExecutor}
          setorSolicitante={setorSolicitante}


        />
      </div> : ''}
      <center>
        {(logged && logged.fkArea === fkAreaDemandada && logged.Perfil.nome === PerfilUtils.Coordenador) ||
          (logged && logged.Perfil.nome === PerfilUtils.Gerente && logged.Area.fkUnidade === fkUnidadeExecutor)

          ?
          <div style={{ flex: 1, marginBottom: 16, marginLeft: 5 }}>
            <Button variant="contained" size='small' color="error" onClick={() => setOpen(true)}>Selecionar Funcionario<PersonIcon></PersonIcon></Button>
          </div> : ''

        }

        {(logged && props.logged.id === fkExecutor) || logged && logged.Perfil.nome === PerfilUtils.Coordenador && props.logged.fkArea === fkAreaDemandada ?
          <div style={{ flex: 1, marginBottom: 16, marginLeft: 5 }}>
            <Button variant="contained" size='small' color="error" onClick={() => setOpenStatus(true)}>Alterar Status da Atividade</Button>
          </div> : ''

        }
      </center>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 16, marginRight: 3 }}>







        <div style={{ flex: 1 }}></div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* {id ? <div style={{ flex: 1, marginBottom: 16 }}>
          <TextField size="small" fullWidth label="Unidade" disabled variant="outlined" value={valueUnidade} />
        </div> : ''}
        {id ? <div style={{ flex: 1, marginBottom: 16 }}>
          <TextField size="small" fullWidth label="Área" disabled variant="outlined" value={valueArea} />
        </div> : ''}

        {id ? <div style={{ flex: 1, marginBottom: 16 }}>
          <TextField size="small" fullWidth label="Classificacao" disabled variant="outlined" value={classificacao} />
        </div> : ''} */}
        {/* {id ? <div style={{ flex: 1, marginBottom: 16 }}>
          <TextField size="small" fullWidth label="Status" disabled variant="outlined" value={status} />
        </div> : ''}
        {id ? <div style={{ flex: 1, marginBottom: 16 }}>
          <TextField size="small" fullWidth label="Solicitante" disabled variant="outlined" value={usuarioSolicitante} />
        </div> : ''} */}
        {/* {id ? <div style={{ flex: 1, marginBottom: 16 }}>
          <TextField size="small" fullWidth label="Chamado" disabled variant="outlined" value={title} />
        </div> : ''} */}
        {!id ? <>
          {logged ? <TaskFilter nome={props.logged.nome + ', solicite cadastro de material'} setSetorSolicitante={props.logged.Area?.Unidade.nome} />
            :
            ''
          }
          <FormGroup>
            <div style={{
              flex: 1,
              marginBottom: 16,
              padding: 16,
              border: '1px solid #ccc',
              borderRadius: 8,
              backgroundColor: '#F9C98C',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ flex: 1, marginBottom: 16, wordBreak: 'break-all' }}
              >
                Solicitar cadastro de item :





                <FormControl
                  disabled
                  size="small">

                  <InputLabel id="demo-select-small"></InputLabel>
                  <Select value={fkUnidade} onChange={(e) => setFkUnidade(e.target.value)} style={{
                    backgroundColor: '#fff',
                    borderRadius: 4
                  }}>
                    {unidade.map((item, index) => {
                      if (item.receber === true) {
                        return (
                          <MenuItem key={index} value={item.id} onClick={() => setFkUnidade(item.id)}>
                            {item.nome}
                          </MenuItem>
                        );
                      }
                      return null;
                    })}
                  </Select>
                </FormControl>
              </div>
              <div style={{ flex: 1, marginBottom: 16, wordBreak: "break-all" }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-select-small">Área</InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-select-small"
                    id="demo-select-small"
                    label="Area"
                    value={fkArea}
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: 4
                    }}>
                    <MenuItem value="" onClick={() => setFkUnidade("")}>
                      <em>Nenhum</em>
                    </MenuItem>
                    {area.map((item, index) => <MenuItem key={index} value={item.id} onClick={() => [setFkArea(item.id), setGti(item.nome)]}>{item.nome}</MenuItem>)}
                  </Select>
                </FormControl>
              </div>

              <div>
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-select-small">Tipo de cadastro</InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-select-small"
                    id="demo-select-small"
                    label="Tipo de cadastro"
                    value={tipoCadastro}
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: 4
                    }}>

                    <MenuItem value={"Cadastro de serviço"} onClick={() => [setTipoCadastro("Cadastro de serviço")]}>Cadastro de serviço</MenuItem>
                    <MenuItem value={"Cadastro Produto Consumo"} onClick={() => [setTipoCadastro("Cadastro Produto Consumo")]}>Cadastro Produto Consumo</MenuItem>
                    <MenuItem value={"Cadastro de Produto Patrimônio"} onClick={() => [setTipoCadastro("Cadastro de Produto Patrimônio")]}>Cadastro de Produto Patrimônio</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <p></p>
              {tipoCadastro === "Cadastro Produto Consumo" ||
                tipoCadastro === "Cadastro de Produto Patrimônio" ?
                <div>
                  <p></p>
                  <div style={{ flex: 1, marginBottom: 16, marginTop: 20 }}>
                    <b>
                      Informar um título para o produto
                      </b><br></br>
                      Que seja de fácil a busca. Exemplos: buffet, software, TV, etc.
                    <TextField size="small" fullWidth label="Nome do produto" variant="outlined" value={titulo} onChange={e => setTitulo(e.target.value)}
                      style={{
                        backgroundColor: '#fff',
                        borderRadius: 4
                      }} />
                  </div>
                  <div style={{ flex: 1, marginBottom: 16 }}>
                    <TextField size="small" fullWidth label="Descrição" multiline rows={2} variant="outlined" value={conteudo} onChange={e => setConteudo(e.target.value)}
                      style={{
                        backgroundColor: '#fff',
                        borderRadius: 4
                      }} />
                  </div>



                  <hr></hr>
                  <div >

                    <b>
                      Forma
                    </b>


                    <Checkbox

                      boleanForma={boleanForma}
                      onChange={Change3}
                      color="primary"
                      inputProps={{ "aria-label": "checkbox example" }}
                      checked={boleanForma}
                    />
                    <label style={{ color: 'blue' }} >
                      Não se aplica
                    </label>


                    {boleanForma ?
                      '' :
                      <div>
                        <label style={{
                          display: 'block',
                          marginBottom: 8,
                          fontSize: '1rem',
                          fontWeight: 500,
                          color: '#333'
                        }}>
                          Informar se o item é: retangular ou quadrado ou oval ou espiral ou circular ou cilíndrico etc.
                        </label>

                        <TextField
                          size="small"
                          fullWidth
                          label="Ex: Retangular com cantos arredondados"
                          variant="outlined"
                          value={forma}
                          onChange={e => setForma(e.target.value)}
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
                        />
                      </div>


                    }

                    <hr></hr>





                  </div>
                  <p></p>
                  <div >

                    <b>
                      Dimensão
                    </b>


                    <Checkbox

                      boleanDimensao={boleanDimensao}
                      onChange={Change4}
                      color="primary"
                      inputProps={{ "aria-label": "checkbox example" }}
                      checked={boleanDimensao}
                    />
                    <label style={{ color: 'blue' }} >
                      Não se aplica
                    </label>




                    {boleanDimensao ?
                      '' :
                      <div>
                        <label style={{
                          display: 'block',
                          marginBottom: 8,
                          fontSize: '1rem',
                          fontWeight: 500,
                          color: '#333'
                        }}>
                          Informe a largura, comprimento, altura, espessura, diâmetro, polegada, litros etc.
                        </label>
                        <TextField
                          size="small"
                          fullWidth
                          label="Ex: 45 cm altura x 45 cm largura x 90 cm profundidade, deve suportar 80kg"
                          variant="outlined"
                          value={dimensao}
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
                        />
                      </div>


                    }





                  </div>
                  <hr></hr>
                  <div >

                    <b>
                      Tipo de material:
                    </b>

                    <Checkbox

                      boleanMaterial={boleanMaterial}
                      onChange={Change1}
                      color="primary"
                      inputProps={{ "aria-label": "checkbox example" }}
                      checked={boleanMaterial}
                    />
                    <label style={{ color: 'blue' }} >
                      Não se aplica
                    </label>
                    {boleanMaterial ?
                      "" : <div>
                        <label style={{
                          display: 'block',
                          marginBottom: 8,
                          fontSize: '1rem',
                          fontWeight: 500,
                          color: '#333',

                        }}>
                          Plástico (polietileno ou polipropileno ou nylon  etc.), madeira, alumínio, aço (galvanizado ou inox (304 ou 404)), tecido (seda ou algodão ou nylon  etc.), ferro, cobre, vidro, papel etc.
                          Obs.: poderá ser composto por mais de um material.
                        </label>
                        <TextField
                          size="small"
                          fullWidth
                          label="Ex: Estrutura de metal com assento de tecido"
                          variant="outlined"
                          value={material}
                          onChange={e => setMaterial(e.target.value)}
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
                        />
                      </div>



                    }

                  </div>
                  <p></p>
                  <hr></hr>
                  <div >

<b>
Características Elétricas, Potência E Velocidade

</b>

<Checkbox
  boleanEletro={boleanEletro}
  onChange={Change5}
  color="primary"
  inputProps={{ "aria-label": "checkbox example" }}
  checked={boleanEletro}
/>
<label style={{ color: 'blue' }}>
  Não se aplica
</label>
{boleanEletro ?
  "" : <div>
    <label style={{
      display: 'block',
      marginBottom: 8,
      fontSize: '1rem',
      fontWeight: 500,
      color: '#333',

    }}>
      Tensão Elétrica (volts, ampere, watts), graus celsius, BTUs, RPM, etc.
    </label>
    <TextField
      size="small"
      fullWidth
      label="Ex: Potência: 650 W
Tensão de Entrada: 100-240 V AC
Eficiência: 80 PLUS Bronze
"
      variant="outlined"
      value={eletro}
      onChange={e => setEletro(e.target.value)}
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
    />
  </div>



}













</div>
                  <hr></hr>

                  <div >

                    <b>
                      Unidade de Medida:

                    </b>

                    <Checkbox
                      boleanMedida={boleanMedida}
                      onChange={Change2}
                      color="primary"
                      inputProps={{ "aria-label": "checkbox example" }}
                      checked={boleanMedida}
                    />
                    <label style={{ color: 'blue' }}>
                      Não se aplica
                    </label>
                    {boleanMedida ?
                      "" : <div>
                        <label style={{
                          display: 'block',
                          marginBottom: 8,
                          fontSize: '1rem',
                          fontWeight: 500,
                          color: '#333',

                        }}>
                          Metragem (metro ou metro quadrado ou metro cúbico ou metro linear ou centímetro ou milímetro),
                          quilograma ou grama ou  litro ou mililitro, rolo, bombona, balde, pacote (com quantas unidades)
                        </label>
                        <TextField
                          size="small"
                          fullWidth
                          label="Ex: Comprimento: 50 metros (m)"
                          variant="outlined"
                          value={medida}
                          onChange={e => setMedida(e.target.value)}
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
                        />
                      </div>



                    }



                  </div>



                  <p></p>
                  <hr></hr>
                  <div style={{ flex: 1, marginBottom: 16 }}>
                    <b>
                      Cor:

                    </b>

                    <Checkbox
                      id="meu"
                      boleanCor={boleanCor}
                      onChange={Change}
                      color="primary"
                      inputProps={{ "aria-label": "checkbox example" }}
                      checked={boleanCor}
                    />
                    <label style={{ color: 'blue' }}>
                      Não se aplica
                    </label>
                    {boleanCor ?
                      "" :
                      <TextField size="small" fullWidth label="Cor" variant="outlined" value={cor} onChange={e => setCor(e.target.value)}
                        style={{
                          backgroundColor: '#fff',
                          borderRadius: 4
                        }} />
                    }

                  </div>

                   <p></p>
                   <hr></hr>
                  <div style={{ flex: 1, marginBottom: 16 }}>
                    <b>
                      Indicações:

                    </b>

                    <Checkbox
                      boleanIndicacao={boleanIndicacao}
                      onChange={Change6}
                      color="primary"
                      inputProps={{ "aria-label": "checkbox example" }}
                      checked={boleanIndicacao}
                      />
                      <label style={{ color: 'blue' }}>
                        Não se aplica
                      </label>
                      {boleanIndicacao ?
                        "" : <div>
                          <label style={{
                            display: 'block',
                            marginBottom: 8,
                            fontSize: '1rem',
                            fontWeight: 500,
                            color: '#333',
  
                          }}>
                            Existe alguma marca ou modelo já validada? informe e justifique
                          </label>
                          <TextField
                            size="small"
                            fullWidth
                            label="Indicacao"
                            variant="outlined"
                            value={indicacao}
                            onChange={e => setIndicacao(e.target.value)}
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
                          />
                        </div>
  
  
  
                      }
  
  

                  </div>


                
                  
                  <p></p>
                  <hr></hr>
                  <div style={{ flex: 1, marginBottom: 16 }}>
                    <b>
                      Informações:

                    </b>

                    <Checkbox
                      boleanInformacoes={boleanInformacoes}
                      onChange={Change7}
                      color="primary"
                      inputProps={{ "aria-label": "checkbox example" }}
                      checked={boleanInformacoes}
                      />
                      <label style={{ color: 'blue' }}>
                        Não se aplica
                      </label>
                      {boleanInformacoes ?
                        "" : <div>
                          <label style={{
                            display: 'block',
                            marginBottom: 8,
                            fontSize: '1rem',
                            fontWeight: 500,
                            color: '#333',
  
                          }}>
                            Cite Informações Complementares
                          </label>
                          <TextField
                            size="small"
                            fullWidth
                            label="Informacoes"
                            variant="outlined"
                            value={informacoes}
                            onChange={e => setInformacoes(e.target.value)}
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
                          />
                        </div>
  
  
  
                      }

                  </div>







                </div>
                : ""}

                

            </div>

















            {/* <div style={{ flex: 1, marginBottom: 16 }}>
              <TextField size="small" fullWidth label="Descrição" multiline rows={2} variant="outlined" value={conteudo} onChange={e => setConteudo(e.target.value)} />
              <Button color="success" variant="contained" onClick={() => setOpenImg(true)}>{'Anexar'}<AttachFileSharpIcon></AttachFileSharpIcon></Button>
            </div> */}

            {/* <div style={{ flex: 1, marginBottom: 16 }}>
              <File size="small" fullWidth label="Descrição" multiline rows={2} variant="outlined" value={conteudo} onChange={e => setConteudo(e.target.value)} />
            </div> */}
            {/* <UploadButton></UploadButton> */}
            <input type={"file"} accept="image/*, video/*" enctype="multipart/form-data" onChange={(e) => enviarArquivo(e.target.files[0])} />

            <p></p>
            {/* <input type="file" accept="video/mp4" onChange={(e) => enviarVideoMp4(e)} /> */}



            {listaDeArquivosEnviados.map((item, key) => <b style={{ color: 'blue', fontSize: 11 }}>{item.nomeApresentacao + ' Adicionado'}</b>)}
            <hr></hr>
            {/* Enviar video<OndemandVideoIcon/> */}

            {/* 
            classificarChamado.map((classificacao, key) => <option name={classificacao.nome} value={classificacao.id} >
                  {classificacao.nome}</option>) */}

            <div style={{ flex: 1, display: 'flex', flexDirection: 'row', alignSelf: "self-start" }}>
              {/* <Button variant="outlined" onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/area/`}>Voltar</Button> */}
              <div style={{ flex: 1 }}></div>
              <Button variant="contained"
                disabled={botaoDesabilitado}
                onClick={onSave}>{'Criar'}</Button>
            </div>
            {/* <TextField
              type="hidden"
              value={setorSolicitante}
              onChange={(event) => setSetorSolicitante(logged.Area.Unidade.nome)}
            /> */}
          </FormGroup>



        </> : ''}


        {/* {envioFuncionario ? <div style={{flex: 1, marginBottom: 16}}>
          <TextField size="small" fullWidth label="Solicitante" disabled variant="outlined" value='ssssssssddfdfssfgd' />
        </div> : 'dddddd'} */}
        {/* {mensagens =! null ? <div>{
          mensagens[0].id}  </div>: '' } */}

        {/* {area.map((item, index) => <b key={index} value={item.id} >{item.nome}</b>)} */}


        {id ? <>

          {/* {arquivoDoChamado.length
            ?
            <div style={{ borderTop: '1px solid #e0e0e0', 
            padding: 2, background: '#FFEEE0', borderRadius: 10, marginBottom: 1,
             border: '2px solid #e0e0e0' }}>
              <div style={{fontSize:15}}>Anexos</div>
              {

                <table>
                  <tr>
                    <td>Arquivo</td>
                    <td></td>
                  </tr>
                  {arquivoDoChamado.map((item, index) => <tr>
                    <td >{item.nomeApresentacao}</td>
                    <td>{<button onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN_API}/api/arquivo/${item.id}`}>Abrir</button>}</td>
                  </tr>)}
                </table>
              
              }
            </div>

            :
            ''
          } */}

          {arquivoDoChamado.length
            ?
            <div style={{
              borderTop: '1px solid #e0e0e0',
              padding: 2, background: '#F5FFFA', borderRadius: 10, marginBottom: 1,
              border: '2px solid #e0e0e0'
            }}><div style={{ marginLeft: 20 }}><b>Anexos</b></div>
              <div style={{ flex: 1, marginBottom: 16, marginLeft: 5 }}>


              </div>

              {

                <ol>

                  {arquivoDoChamado.map((item, index) =>
                    <li>

                      {<Button size="small" style={{ marginLeft: 5, marginBottom: 5, fontSize: 10 }} onClick={(e) => {
                        baixar(item.id)
                      }}><AttachFileIcon></AttachFileIcon>{item.nomeApresentacao} </Button>}
                    </li>)}

                </ol>


              }
            </div>

            :
            ''

          }

          {/* 
{
                alterarStatus.map((status, key) => <MenuItem name={status.nome} value={status.id} >
                  {status.nome}</MenuItem>)
              } */}





          {logged && (props.logged.id != fkUsuarioExecutor && props.logged.id != fkDemandante)
            ?

            <div style={{ flex: 1, marginBottom: 16, marginLeft: 5 }}>
              <h4>Histórico da Atividade</h4>
              <Button size="small" variant="contained" onClick={() => [setOpenMsg(true)]}><MessageIcon />Comentar ou anexar </Button>
            </div>

            :
            <h4>Atividade Concluida
            </h4>


          }





          {mensagens.map((item, index) =>


            <div style={{
              borderTop: '1px solid #e0e0e0',
              padding: 2, background: '#FFFFE0', borderRadius: 10, marginBottom: 1,
              border: '2px solid #e0e0e0'
            }}>

              <div style={{ display: 'flex', flexDirection: 'colrowumn' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  {
                    item.Usuario ?
                      <b style={{ fontSize: 10, marginRight: 5 }}>{item.Usuario.nome}</b>
                      :
                      ''
                  }
                  <div style={{ flex: 1 }}></div>
                  <b style={{ fontSize: 10 }}>{new Date(item.createdAt).toLocaleString()}</b>
                </div>
              </div>
              <div >
                <p style={{ wordBreak: "break-all" }}>{item.conteudo}</p>
              </div>
            </div>)}
        </> : ''}

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



      <hr></hr>

      <Dialog open={open} >
        <DialogTitle style={{ color: '#1E90FF' }} >Encaminhar Atividade</DialogTitle>
        <DialogContent>
          <DialogContentText>


          </DialogContentText>

          <InputLabel id="demo-select-small"><b>Titulo Atividade:</b></InputLabel>
          {title}
          <br></br>
          <InputLabel id="demo-select-small"><b>Unidade</b></InputLabel>
          {valueUnidade}
          <InputLabel id="demo-select-small"><b>Solicitante</b></InputLabel>
          {usuarioSolicitante}

          <hr></hr>

          <p></p>

          <FormControl fullWidth labelId="demo-simple-select-label" id="demo-simple-select">


            <select style={{ fontSize: 14 }} onChange={e => setNewClassificacao(e.target.value)}>
              <option >CLASSIFIQUE A ATIVIDADE</option>)

              {
                classificarChamado.map((classificacao, key) => <option name={classificacao.nome} value={classificacao.id} >
                  {classificacao.nome}</option>)
              }
            </select>

            <hr></hr>


            {valueUnidade === 'GTI' ?
              <div>


                <select style={{ fontSize: 14 }} onChange={e => setFKUsuarioExecutor(e.target.value)}>

                  <option style={{ fontWeight: 'bold', fontSize: '16px' }}>Sistemas - Desenvolvimento</option>
                  {
                    usuarioExecutor
                      .filter(user => user.Area.nome === 'Sistemas - Desenvolvimento')
                      .map((user, key) => (
                        <option name={user.nome} value={user.id}>
                          {user.nome}-{meuSetorCount.map(i => i.fkUsuarioExecutor).filter(i => user.id === i).length}  Chamados
                        </option>
                      ))
                  }
                  <option style={{ fontWeight: 'bold', fontSize: '16px' }}>Suporte e Infraestrutura</option>
                  {
                    usuarioExecutor
                      .filter(user => user.Area.nome === 'Suporte e Infraestrutura')
                      .map((user, key) => (
                        <option name={user.nome} value={user.id}>
                          {user.nome}-{meuSetorCount.map(i => i.fkUsuarioExecutor).filter(i => user.id === i).length} Chamados
                        </option>
                      ))
                  }


                </select>





              </div>





              :

              <select style={{ fontSize: 14 }} onChange={e => setFKUsuarioExecutor(e.target.value)}>

                <option >SELECIONE  O EXECUTOR</option>)
                {
                  usuarioExecutor.map((user, key) => <option name={user.nome} value={user.id} >
                    {user.nome}</option>)
                }

              </select>

            }







          </FormControl>
        </DialogContent>
        {fkUsuarioExecutor != '' && newClassificacao != '' ?
          <div>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancelar</Button>
              <Button onClick={() => { criarExecucao() }} >Enviar</Button>
            </DialogActions>

          </div>
          : ''}

      </Dialog>






      <Dialog open={openStatus}  >

        <DialogContent>
          <DialogContentText>

          </DialogContentText>



          <p></p>

          <FormControl labelId="demo-simple-select-label" id="demo-simple-select" style={{ width: 250 }}>
            <InputLabel id="demo-simple-select-label">{status}</InputLabel>


            <Select style={{ fontSize: 20 }} onChange={e => setNewStatus(e.target.value)}>
              {/* <option>{status}</option> */}


              {
                alterarStatus.map((status, key) => <MenuItem name={status.nome} value={status.id} >
                  {status.nome}</MenuItem>)
              }
            </Select>



          </FormControl>


          <p></p>
          <FormControl labelId="demo-simple-select-label" id="demo-simple-select" style={{ width: 250 }}>

            <InputLabel id="demo-simple-select-label"> Tempo para concluir</InputLabel>


            <Select style={{ fontSize: 20 }} onChange={e => setTempoEstimado(e.target.value)}>


              <MenuItem value={1} >0 hora</MenuItem>
              <MenuItem value={1} >1 hora</MenuItem>
              <MenuItem value={2} >2 horas</MenuItem>
              <MenuItem value={3} >3 horas</MenuItem>
              <MenuItem value={4} >4 horas</MenuItem>
              <MenuItem value={5} >5 horas</MenuItem>
              <MenuItem value={6} >6 horas</MenuItem>
              <MenuItem value={7} >7 horas</MenuItem>
              <MenuItem value={8} >8 horas</MenuItem>
              <MenuItem value={8} >2 dias</MenuItem>
              <MenuItem value={8} >3 dias</MenuItem>
              <MenuItem value={8} >4 dias</MenuItem>
              <MenuItem value={8} >5 dias</MenuItem>




            </Select>


            <hr></hr>


          </FormControl>
        </DialogContent>
        <DialogActions>
          {tempoEstimado != '' && newStatus != '' ?
            <div>
              <DialogActions>
                <Button onClick={() => setOpenStatus(false)}>Cancelar</Button>
                <Button onClick={() => { onSaveStatus() }} >Alterar</Button>
              </DialogActions>

            </div>
            : ''}
        </DialogActions>
      </Dialog>




      <Dialog open={openMsg}  >

        <DialogContent>

          {openStatus === false ?
            <h2>Deixe uma mensagem</h2>
            : <h4>Informe o motivo da alteração do Status</h4>}

          <div style={{ flex: 1, marginBottom: 2 }}>
            <TextField fullWidth sx={{ m: 1 }} size='200px' label='Digite sua mensagem...' multiline rows={8} variant="outlined" value={conteudo} onChange={e => setConteudo(e.target.value)} />
          </div>
          <hr></hr>
          <h4>Anexar arquivo</h4>

          <input type={"file"} style={{
            border: '2px solid #ccc',
            padding: '10px',
            fontSize: '16px',
            color: '#fff',
            borderRadius: '5px',
            backgroundColor: '#176DD3'
          }} onChange={(e) => enviarArquivo(e.target.files[0])} /><br></br>

          {/* <input type="file" accept="video/mp4" onChange={(e) => enviarVideoMp4(e)} /> */}

          {listaDeArquivosEnviados.map((item, key) => <b style={{ color: 'blue', fontSize: 11 }}>{item.nomeApresentacao + ' Adicionado'}</b>)}
          <hr></hr>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
            {/* <Button variant="outlined" onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/area/`}>Voltar</Button> */}
            <div style={{ flex: 1 }}></div>
            <Button variant="contained" onClick={novaInteracao}>{'Enviar'}</Button>


            <Button onClick={() => setOpenMsg(false)}>Cancelar</Button>


          </div>
        </DialogContent>

      </Dialog>


      <Dialog open={termo}  >

        <DialogContent>

          {openStatus === false ?
            <h2>Informe o cpf do funcionário</h2>
            : <h4></h4>}

          <div style={{ flex: 1, marginBottom: 2 }}>
            <TextField fullWidth sx={{ m: 1 }} size='200px' label='Digite o CPF' variant="outlined" value={cpfTermo} onChange={e => setCpfTermo(e.target.value)} />
          </div>
          <hr></hr>


          <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
            {/* <Button variant="outlined" onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/area/`}>Voltar</Button> */}
            <div style={{ flex: 1 }}></div>
            <Button variant="contained" onClick={checarTermo}>{'Checar termo de compromisso'}</Button>


            <Button onClick={() => setTermo(false)}>sair</Button>


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

export default AtividadeForm;