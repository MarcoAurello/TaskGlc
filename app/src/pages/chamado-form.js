import React, { useEffect, useState, useRef } from "react";
import styled from 'styled-components'
import {
  Alert, Avatar, Box, Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel,
  FormGroup, FormLabel, Hidden,Grid, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, Switch, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination,
  TableRow, TextField, Tooltip
} from "@mui/material";

import TaskItemDoChamadoFornecedor from "../components/task-item-do-chamadoFornecedor";

import TaskItemDoChamado from "../components/task-item-do-chamado";
import TaskItemDoChamadoProjeto from "../components/task-item-do-chamadoProjeto";
import PerfilUtils from "../utils/perfil.utils";
import MessageIcon from '@mui/icons-material/Message';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';








import PersonIcon from '@mui/icons-material/Person';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import UploadButton from "../components/UploadButton";
import { color } from "@mui/system";
import TaskFilter from "../components/task-filter";
import FileViewer from '../components/fileViewer';


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
  const ImageLogo = require('../assets/coment.png')
  const ImagePlan = require('../assets/plan.png')
  const [openImg, setOpenImg] = useState(false);
  const [openMsg, setOpenMsg] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [boleanDimensao, setBoleanDimensao] = useState(false);
  const [dimensao, setDimensao] = useState("");

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
  const [usuarioSolicitante, setUsuarioSolicitante] = useState('')
  const [emailUsuarioSolicitante, setEmailUsuarioSolicitante] = useState('')
  const [telefoneSolicitante, setTelefoneSolicitante] = useState('')
  const [setorSolicitante, setSetorSolicitante] = useState('')
  const [categoriaChamado, setCategoriaChamado] = useState('')
  const [btnMsg, setBtnMsg] = useState(false);

  const [tempoEstimado, setTempoEstimado] = useState('')
  const [createdAt, setCreatedAt] = useState('')
  const [title, setTitle] = useState('')
  const [gAnoMr, getAnoMr] = useState('')
  const [gSegmentoMr, getSegmentoMr] = useState('')
  const [botaoDesabilitado, setBotaoDesabilitado] = useState(false);
  const [gti, setGti] = useState('')
  const fileInputRef = useRef(null);


  const [titulo, setTitulo] = useState('')
  const [centroCusto, setCentroCusto] = useState('')
  const [timelineStatus, setTimelineStatus] = useState([])
  const anexo = require('../assets/anexo.jpg')
  const anexo2 = require('../assets/ane.png')


  const [centroCusto1, getCentroCusto] = useState('')
  const [openMsg2, setOpenMsg2] = useState(false);
  const [conteudo, setConteudo] = useState('')
  const [forma, setForma] = useState('')
  const [material, setMaterial] = useState('')
  const [cor, setCor] = useState('')
  const [indicacao, setIndicacao] = useState('')
  const [boleanIndicacao, setBoleanIndicacao] = useState(false)
  const [informacoes, setInformacoes] = useState('')
  const [boleanInformacoes, setBoleanInformacoes] = useState(false)
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
  const [boleanEletro, setBoleanEletro] = useState(false)
  const [area, setArea] = useState([])
  const [subArea, setSubArea] = useState([])
  const [atividade, setAtividade] = useState(null)
  const [mensagens, setMensagens] = useState([])
  const [classificarChamado, setClassificarChamado] = useState([])
  const [alterarStatus, setAltararStatus] = useState([])
  const [fkUnidadeExecutor, getFkUnidadeExecutor] = useState('')
  const [meuSetor, setMeuSetor] = useState([]);
  const [meuSetorCount, setMeuSetorCount] = useState([]);
  const [boleanMedida, setBoleanMedida] = useState(false)
  const [medida, setMedida] = useState('')
  const [editar, setEditar] = useState(false)
  const [animate, setAnimate] = useState(false);
  const [cnpj, setCnpj] = useState('');
  const [gparametrizacao, getParametrizacao] = useState('');
  const [nomeDoProjeto, getNomeProjeto] = useState('');



  const [cor1, getCor] = useState('')

  const [nomeProjeto, setNomeProjeto] = useState('')
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
  const [boleanForma, setBoleanForma] = useState(false)
  const [openFile, setOpenFile] = useState('')
  const [parametrizacao, setParametrizacao] = useState('')
  const [sub, setSub] = useState('')
  const [cpfTermo, setCpfTermo] = useState('')
  const [mensagemAlert, setMensagemAlert] = useState('')
  const [openMensagens, setOpenMensagens] = useState(false)
  const [boleanCor, setBoleanCor] = useState(false)
  const [boleanMaterial, setBoleanMaterial] = useState(false)
  const [modalSave, setModalSave] = useState(false)
  const [modalSaveProjeto, setModalSaveProjeto] = useState(false)
  const [modalSaveMR, setModalSaveMR] = useState(false)
  const [allAtividade, setAllAtividade] = useState([])


  const [medida1, getMedida] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const [forma1, getForma] = useState('')
  const [indicacao1, getIndicacao] = useState('')
  const [informacoes1, getInformacoes] = useState('')
  const [material1, getMaterial] = useState('')
  const [eletro1, getEletro] = useState('')
  const [dimencao1, getDimencao] = useState('')
  const [categoria1, getCategoria] = useState('')
  const [razaoSocial, setRazaoSocial] = useState('')
  const [telefoneEmpresa, setTelefoneEmpresa] = useState('')
  const [emailEmpresa, setEmailEmpresa] = useState('')
  const [gPagamento, setGPagamento] = useState('')
  const [filial, setFilial] = useState('')
  const [qtdItems, setQtdItems] = useState('')
  const [dataInicio, setDataInicio] = useState(null)
  const [gCotacao, setGCotacao] = useState('')
  const [qtdProjeto, getQtdProjeto] = useState('')
  const [anoMR, setAnoMR] = useState('')
  const [prazoInicioAtividades, getPrazoInicioAtividades] = useState('')
  const [uploadResult, setUploadResult] = useState(null);
  const [segmentoMR, setSegmentoMR] = useState('')





  const [cnpj1, getCnpj] = useState('')
  const [razao1, getRazao] = useState('')
  const [email1, getEmail] = useState('')
  const [fone1, getFone] = useState('')
  const [GPagamento1, getGPagamento] = useState('')
  const [filial1, getFilial] = useState('')
  const [gCotacao1, getGCotacao] = useState('')
  const [hash, setHash] = useState('')




  const [idChamado, setIdChamado] = useState('')

  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };



  useEffect(() => {
    if (mensagens && mensagens.length > 0) {
      setAnimate(true);
      const timer = setTimeout(() => {
        setAnimate(false);
      }, 5000);
      return () => clearTimeout(timer);
    }



  }, [mensagens,]);
  const handleDataChange = (event) => {
    const selectedDate = event.target.value;
    const currentDate = new Date();
    const [year, month, day] = selectedDate.split('-');
    const newDate = new Date(year, month - 1, day, currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds());
    setDataInicio(newDate.toISOString());

  }


  


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
            window.location.reload()

          }
        }).catch(err => setOpenLoadingDialog(true))
      })
  }









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
              setClassificacao(data.data.Classificacao.nome)
              setProtocolo(data.data.protocolo)
              setStatus(data.data.Status.nome)
              getGPagamento(data.data.gPagamento)
              setStatusId(data.data.Status.id)
              getForma(data.data.forma)
              getMedida(data.data.medida)
              getCor(data.data.cor)
              getDimencao(data.data.dimensao)
              getIndicacao(data.data.indicacao)
              getInformacoes(data.data.informacoes)
              getMaterial(data.data.material)
              getEletro(data.data.eletro)
              getCnpj(data.data.cnpj)
              getRazao(data.data.razao)
              getEmail(data.data.email)
              getFone(data.data.fone)
              getNomeProjeto(data.data.nomeProjeto)
              getQtdProjeto(data.data.qtdPlanilha)
              getPrazoInicioAtividades(data.data.prazoInicioAtividades)
              getParametrizacao(data.data.parametrizacaoCadastro)

              getFilial(data.data.filial)
              getGCotacao(data.data.gCotacao)

              getCategoria(data.data.categoria)
              getCentroCusto(data.data.centroCusto)


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
              getAnoMr(data.data.anoMr)
              getSegmentoMr(data.data.segmentoMr)
              setEditar(data.data.editar)
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

    // if(gCotacao1){
    //   alert(gCotacao1)
    // }






    if (!boleanCor) {
      setCor("")
    }

    if (!boleanIndicacao) {
      setIndicacao("")
    }

    if (!boleanInformacoes) {
      setInformacoes("")
    }

    if (!boleanMaterial) {
      setMaterial("")
    }


    if (!boleanMedida) {
      setMedida("")
    }

    if (!boleanForma) {
      setForma("")
    }

    if (!boleanEletro) {
      setEletro("")
    }

    if (!boleanDimensao) {
      setDimensao("")
    }








  }, [boleanDimensao, boleanEletro, boleanForma, boleanMedida, boleanMaterial, boleanInformacoes, boleanCor, boleanIndicacao])



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
        idAtividade: id,
        logged: props.logged.id
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

  const onSaveFornecvedor = () => {


    if (cnpj && razaoSocial && emailEmpresa && telefoneEmpresa &&
      gPagamento && filial && gCotacao) {
      setOpenLoadingDialog(true)

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

          cnpj,
          razaoSocial,
          emailEmpresa,
          telefoneEmpresa,
          gPagamento,
          filial,
          gCotacao,

          titulo: 'Cadastro de Fornecedor',

          conteudo: 'Cadastro de Fornecedor',

          tipoCadastro,

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
              setModalSave(false)
              window.location.href = `${process.env.REACT_APP_DOMAIN}/chamadosAbertos/`


              // setArea(data.data)
            }
          }).catch(err => setOpenLoadingDialog(true))
        })

    } else {
      alert('Preencha todos os dados')
    }


    // setSetorSolicitante(props.logged.Area.Unidade.nome)


  }

  const handleButtonClick = (valor) => {
    setTipoCadastro(valor);
    setSelectedButton(valor); // Define o botão selecionado
  };


  const buttonData = [
    { label: "Cadastro de Serviço", value: "Cadastro de serviço" },
    { label: "Cadastro Produto Consumo", value: "Cadastro Produto Consumo" },
    { label: "Cadastro de Produto Patrimônio", value: "Cadastro de Produto Patrimônio" },
    { label: "Cadastro de Fornecedor", value: "Cadastro de Fornecedor" },
    { label: "Cadastro de Projeto até 10 itens", value: "Cadastro de Projeto até 10 itens" },
    { label: "Cadastro de MR a partir de 30 itens", value: "Cadastro de MR a partir de 30 itens" },
    { label: "Ajuste de parametrização de cadastro", value: "Ajuste de parametrização de cadastro" }
  ];

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


  const onSaveProjeto = () => {

    setOpenLoadingDialog(true)


    // setSetorSolicitante(props.logged.Area.Unidade.nome)

    const token = getCookie('_token_task_manager')
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },

      body: JSON.stringify({
        hash,
        setorSolicitante: props.logged.Area.Unidade.nome,
        listaDeArquivosEnviados,
        caminho,
        fkUnidade,
        fkArea,
        categoria,

        titulo,
        nomeProjeto,
        qtdItems,
        dataInicio,

        conteudo: nomeProjeto,
        tipoCadastro,
        informacoes,
        arquivado: false
      })

    }


    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/atividade/createProjeto`, params)
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
            setModalSave(false)
            window.location.href = `${process.env.REACT_APP_DOMAIN}/chamadosAbertos/`


            // setArea(data.data)
          }
        }).catch(err => setOpenLoadingDialog(true))
      })
  }

  const onSaveMr = () => {
    // alert(parametrizacao)

    setOpenLoadingDialog(true)


    // setSetorSolicitante(props.logged.Area.Unidade.nome)

    const token = getCookie('_token_task_manager')
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },

      body: JSON.stringify({
        hash,
        setorSolicitante: props.logged.Area.Unidade.nome,
        listaDeArquivosEnviados,
        caminho,
        fkUnidade,
        fkArea,
        categoria,
        parametrizacao,

        titulo,
        anoMr: anoMR,

        segmentoMr: segmentoMR,

        conteudo: segmentoMR,
        tipoCadastro,
        informacoes,
        arquivado: false
      })

    }


    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/atividade/createMr`, params)
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
            setModalSave(false)
            window.location.href = `${process.env.REACT_APP_DOMAIN}/chamadosAbertos/`


            // setArea(data.data)
          }
        }).catch(err => setOpenLoadingDialog(true))
      })
  }

  const onSaveAjuste = () => {
    // alert(parametrizacao)

    setOpenLoadingDialog(true)


    // setSetorSolicitante(props.logged.Area.Unidade.nome)

    const token = getCookie('_token_task_manager')
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },

      body: JSON.stringify({
        hash,
        setorSolicitante: props.logged.Area.Unidade.nome,
        listaDeArquivosEnviados,
        caminho,
        fkUnidade,
        fkArea,
        categoria,
        parametrizacao,

        titulo,
        anoMr: anoMR,

        segmentoMr: segmentoMR,

        conteudo: segmentoMR,
        tipoCadastro,
        informacoes,
        arquivado: false
      })

    }


    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/atividade/createAjuste`, params)
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
            setModalSave(false)
            window.location.href = `${process.env.REACT_APP_DOMAIN}/chamadosAbertos/`


            // setArea(data.data)
          }
        }).catch(err => setOpenLoadingDialog(true))
      })
  }




  const onSave = () => {
    setOpenLoadingDialog(true)


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
        nomeProjeto,
        qtdItems,
        dataInicio,
        centroCusto,
        conteudo,
        dimensao,
        tipoCadastro,
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
            setModalSave(false)
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
    if (uploadResult) {
      setHash(uploadResult.data.hash)
      salvarArquivo()

    }

    // Verifique se há um item com nome "GLC" e defina o valor selecionado
    const glcItem = unidade.find(item => item.nome === 'GLC' && item.receber === true);
    if (glcItem) {
      setFkUnidade(glcItem.id);
    }
  }, [unidade,uploadResult]);




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

  const Change7 = (event) => {
    setBoleanInformacoes(event.target.checked);
  };

  const handleToggle = () => {
    setOpen(true);
  };


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
        {(logged && logged.fkArea === fkAreaDemandada && logged.Perfil.nome === PerfilUtils.Coordenador) ||
          (logged && logged.Perfil.nome === PerfilUtils.Gerente && logged.Area.fkUnidade === fkUnidadeExecutor) ?
          <Button variant="contained" size="small" color="error" onClick={() => setOpen(true)} style={{ marginRight: 10 }}>
            Selecionar funcionário para atender<PersonIcon />
          </Button>
          : ''
        }

        {(logged && props.logged.id === fkExecutor) || (logged && logged.Perfil.nome === PerfilUtils.Coordenador && props.logged.fkArea === fkAreaDemandada) ?
          <Button variant="contained" size="small" color="error" onClick={() => setOpenStatus(true)} style={{ marginRight: 10 }}>
            Alterar Status da Atividade
          </Button>
          : ''
        }


        {logged && status !='Concluido' && (logged.id === fkUsuarioSolicitante || logged.id === fkExecutor)
          ?

          <div>
            <Button size="large" onClick={() => setOpenMsg(true)}>
              <b
                style={{
                  fontSize: '30px',

                  marginLeft: '80px',
                  marginRight: '-10px',
                  animation: animate ? 'pulse 1s infinite' : 'none',
                }}
              >
                {mensagens ? mensagens.length : ''}
                <img src={ImageLogo} height={64} />
              </b>
            </Button>

            <style>
              {`
            @keyframes pulse {
              0% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.2);
              }
              100% {
                transform: scale(1);
              }
            }
            `}
            </style>
          </div>





          :
          ''

        }
      </div>
      {status === 'Concluido' ?
            <div>
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
                    <p style={{ wordBreak: "break-all" }}>{item.conteudo}</p>
                  </div>
                </div>
              ))}

            </div> : ''}





      {id && (categoria1 === 'Cadastro de Projeto até 10 itens' ||
        categoria1 === 'Cadastro de MR a partir de 30 itens' ||
        categoria1 === 'Ajuste de parametrização de cadastro'
      )

        ? <div >



          <TaskItemDoChamadoProjeto

            protocolo={protocolo}
            unidade={valueUnidade}
            categoria={categoria1}
            anoMr={gAnoMr}
            segmentoMr={gSegmentoMr}
            area={valueArea}
            nomeP={nomeDoProjeto ? nomeDoProjeto : ''}
            classificacao={classificacao}
            solicitante={usuarioSolicitante}
            status={status}
            gparametrizacao={gparametrizacao}
            titulo={title}
            emailUsuarioSolicitante={emailUsuarioSolicitante}
            telefoneSolicitante={telefoneSolicitante}
            setorSol={valueUnidade}
            nomeExecutor={nomeExecutor}
            emailExecutor={emailExecutor}
            telefoneExecutor={telefoneExecutor}
            setorSolicitante={setorSolicitante}
            forma={forma1}
            medida={medida1}
            prazoInicioAtividades={prazoInicioAtividades}
            qtdPlanilha={qtdProjeto}
            cor={cor1}
            indicacao={indicacao1}
            informacoes={informacoes1}
            material={material1}
            eletro={eletro1}
            dimensao={dimencao1}
            centroCusto={centroCusto1}
            id={id}
            logged={logged ? logged.nome : ''}
            loggedEmail={logged ? logged.email : ''}
            editar={editar}
            onToggle={handleToggle}
           />
          {categoria1 && categoria1 ==='Cadastro de Projeto até 10 itens'?
      
          
            <div style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                      <a>
                        <img
                          src={anexo}
                          height={70}
                          onClick={() => setOpenMsg2(true)}
                          style={{ cursor: 'pointer', border: '2px solid #ddd', borderRadius: '8px', transition: 'transform 0.3s ease' }}
                          onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                        />
                      </a>
               </div>


             



              
          
          :''}

          


          {arquivoDoChamado.length > 0 && (
            <div
              style={{
                borderTop: '1px solid #e0e0e0',
                padding: 10,

                borderRadius: 10,
                marginBottom: 10,
                border: '2px solid #e0e0e0',
              }}
            >

              <div

              >
                {arquivoDoChamado
                  .filter(item => !item.hash) // Filtra para mostrar apenas itens sem 'hash' e com 'uploads' no caminho
                  .map((item, index) => (
                    <Button
                      key={index}
                      size="small"
                      style={{
                        display: 'inline-flex',
                        margin: '5px',
                        fontSize: '12px',

                        border: '1px solid #e0e0e0',
                        borderRadius: '5px',
                        textTransform: 'none',
                      }}
                      onClick={() => baixar(item.id)}
                    >
                      <AttachFileIcon style={{ marginRight: 2 }} />

                      {item.nomeApresentacao}
                    </Button>
                  ))}

              </div>
              <FileViewer arquivoDoChamado={arquivoDoChamado ? arquivoDoChamado : ''} />
            </div>
          )}
        </div>
        : ''}



      {id && (categoria1 === 'Cadastro de serviço' ||
        categoria1 === 'Cadastro Produto Consumo' ||
        categoria1 === 'Cadastro de Produto Patrimônio'
      )
        ? <div >



          <TaskItemDoChamado
            protocolo={protocolo}
            unidade={valueUnidade}
            categoria={categoria1}
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
            forma={forma1}
            medida={medida1}
            cor={cor1}
            indicacao={indicacao1}
            informacoes={informacoes1}
            material={material1}
            eletro={eletro1}
            dimensao={dimencao1}
            centroCusto={centroCusto1}
            id={id}
            logged={logged ? logged.nome : ''}
            loggedEmail={logged ? logged.email : ''}
            editar={editar}
            onToggle={handleToggle}





          />
        </div> : ''}


      {id && categoria1 === 'Cadastro de Fornecedor'
        ? <div >



          <TaskItemDoChamadoFornecedor

            protocolo={protocolo}
            unidade={valueUnidade}
            categoria={categoria1}
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
            forma={forma1}
            medida={medida1}
            cor={cor1}
            indicacao={indicacao1}
            informacoes={informacoes1}
            material={material1}
            eletro={eletro1}
            dimensao={dimencao1}
            centroCusto={centroCusto1}
            id={id}
            logged={logged ? logged.nome : ''}
            loggedEmail={logged ? logged.email : ''}
            editar={editar}
            onToggle={handleToggle}
            cnpj={cnpj1}

            razao={razao1}
            email={email1}
            fone={fone1}
            GPagamento={GPagamento1}
            filial={filial1}
            gCotacao={gCotacao1}





          />
        </div> : ''}
      {/* <center>
        {(logged && logged.fkArea === fkAreaDemandada && logged.Perfil.nome === PerfilUtils.Coordenador) ||
          (logged && logged.Perfil.nome === PerfilUtils.Gerente && logged.Area.fkUnidade === fkUnidadeExecutor)

          ?
          <div style={{ flex: 1, marginBottom: 16, marginLeft: 5 }}>
            <Button variant="contained" size='small' color="error" onClick={() => setOpen(true)}>Selecionar funcionário para atender<PersonIcon></PersonIcon></Button>
          </div> : ''

        }

        {(logged && props.logged.id === fkExecutor) || logged && logged.Perfil.nome === PerfilUtils.Coordenador && props.logged.fkArea === fkAreaDemandada ?
          <div style={{ flex: 1, marginBottom: 16, marginLeft: 5 }}>
            <Button variant="contained" size='small' color="error" onClick={() => setOpenStatus(true)}>Alterar Status da Atividade</Button>
          </div> : ''

        }
      </center> */}

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
          {logged ? (
            <div
              style={{
                backgroundColor: '#f7f7f7',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '20px',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                color: '#333',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                lineHeight: '1.6',
              }}
            >
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#333',
                }}
              >
               Ola {props.logged.nome},{' '}<br></br>
                <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                  solicite cadastro de:
                </span>{' '}
                <span style={{ fontWeight: '500' }}>produto</span>,{' '}
                <span style={{ fontWeight: '500' }}>serviço</span>,{' '}
                <span style={{ fontWeight: '500' }}>bem patrimonial</span>,{' '}
                <span style={{ fontWeight: '500' }}>MR</span>,{' '}
                <span style={{ fontWeight: '500' }}>ajustes de cadastro</span> e{' '}
                <span style={{ fontWeight: '500' }}>fornecedores</span>.
              </div>
              <div>
      <div>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ marginBottom: '16px' }}>
          <h3>Tipo de Cadastro Selecionado: {tipoCadastro}</h3>
        </Grid>

        {buttonData.map((button) => (
          <Grid item xs={4} key={button.value}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleButtonClick(button.value)}
              style={{
                backgroundColor: selectedButton === button.value ? '#FFD700' : '#1976D2', // Amarelo se selecionado, azul se não
                color: selectedButton === button.value ? '#333' : '#fff' // Texto mais escuro se selecionado, branco se não
              }}
            >
              {button.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
    </div>
              {/* <div
      style={{
        fontSize: '15px',
        fontStyle: 'italic',
        color: '#555',
        marginTop: '8px',
      }}
    >
      Setor solicitante: {props.logged.Area?.Unidade.nome}
    </div> */}
            </div>
          ) : ''}

          <FormGroup>
            <div style={{
              flex: 1,
              marginBottom: 16,
              padding: 16,
              border: '1px solid #ccc',
              borderRadius: 8,
              backgroundColor: '#cfdff4',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ flex: 1, marginBottom: 16, wordBreak: 'break-all' }}
              >






                Solicitar serviço a:<FormControl
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
              {/* <div style={{ flex: 1, marginBottom: 16, wordBreak: "break-all" }}>
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
              </div> */}

              {/* <div>
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

                    <MenuItem value={"Cadastro de serviço"} onClick={() => [setTipoCadastro("Cadastro de serviço")]}>Cadastro de Serviço</MenuItem>
                    <MenuItem value={"Cadastro Produto Consumo"} onClick={() => [setTipoCadastro("Cadastro Produto Consumo")]}>Cadastro Produto Consumo</MenuItem>
                    <MenuItem value={"Cadastro de Produto Patrimônio"} onClick={() => [setTipoCadastro("Cadastro de Produto Patrimônio")]}>Cadastro de Produto Patrimônio</MenuItem>
                    <MenuItem value={"Cadastro de Fornecedor"} onClick={() => [setTipoCadastro("Cadastro de Fornecedor")]}>Cadastro de Fornecedor</MenuItem>
                    <MenuItem value={"Cadastro de Projeto até 10 items"} onClick={() => [setTipoCadastro("Cadastro de Projeto até 10 items")]}>Cadastro de Projeto até 10 items</MenuItem>
                    <MenuItem value={"Cadastro de MR a partir de 30 items"} onClick={() => [setTipoCadastro("Cadastro de MR a partir de 30 items")]}>Cadastro de MR a partir de 30 items</MenuItem>
                    <MenuItem value={"Ajuste de parametrização de cadastro"} onClick={() => [setTipoCadastro("Ajuste de parametrização de cadastro")]}>Ajuste de parametrização de cadastro</MenuItem>

                  </Select>
                </FormControl>
              </div> */}
              <p></p>

              {tipoCadastro === "Ajuste de parametrização de cadastro" ?
                <div>

                  <div>

                    <TextField
                      size="small"
                      fullWidth
                      label="DESCREVA QUAL ALTERAÇÃO OU PARAMETRIZAÇÃO QUE DESEJA FAZER NO CADASTRO"
                      variant="outlined"
                      value={parametrizacao}
                      onChange={e => setParametrizacao(e.target.value)}
                      multiline
                      rows={4}  // Define o número de linhas do campo de texto
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

                  </div><p></p>

                  <div>

                    {/* <TextField
                      size="small"

                      label="Segmento MR"
                      variant="outlined"
                      value={segmentoMR}

                      onChange={e => setSegmentoMR(e.target.value)}
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
                    /> */}
                   <b
                   style={{color:'red'}}>
                     CASO NÃO CONSIGA DESCREVER, ENVIE UM PRINT DA TELA DE ERRO
                    </b>
                    <div style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
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
                    </div>
                  </div>
                  <p></p>

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
                  {tipoCadastro === 'Ajuste de parametrização de cadastro'
                    ?
                    <Button variant="contained"
                      disabled={botaoDesabilitado}
                      onClick={() => { setModalSaveMR(true) }}>{'Solicitar ajuste'}</Button>

                    :

                    ''
                  }

                </div>
                :

                ''
              }



              {tipoCadastro === "Cadastro de MR a partir de 30 itens" ?
                <div>

                  <div>

                    <TextField
                      size="small"

                      label="Ano MR"
                      variant="outlined"
                      value={anoMR}

                      onChange={e => setAnoMR(e.target.value)}
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
                  </div><p></p>

                  <div>

                    <TextField
                      size="small"

                      label="Segmento MR"
                      variant="outlined"
                      value={segmentoMR}

                      onChange={e => setSegmentoMR(e.target.value)}
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
                    <div style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                      <a>
                        <img
                          src={anexo}
                          height={70}
                          onClick={() => setOpenMsg2(true)}
                          style={{ cursor: 'pointer', border: '2px solid #ddd', borderRadius: '8px', transition: 'transform 0.3s ease' }}
                          onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                        />
                      </a>
                    </div>
                  </div>
                  <p></p>

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
                  {tipoCadastro === 'Cadastro de MR a partir de 30 itens'
                    ?
                    <Button variant="contained"
                      disabled={botaoDesabilitado}
                      onClick={() => { setModalSaveMR(true) }}>{'Solicitar cadastro  MR a partir de 30 itens'}</Button>

                    :

                    ''
                  }

                </div>
                :

                ''
              }






              {tipoCadastro === "Cadastro de Projeto até 10 itens" ?
                <div>

                  <div>

                    <TextField
                      size="small"
                      fullWidth
                      label=" Nome do Projeto"
                      variant="outlined"
                      value={nomeProjeto}

                      onChange={e => setNomeProjeto(e.target.value)}
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
                  </div><p></p>

                  <div>

                    <TextField
                      size="small"

                      label="Quantidade de Itens"
                      variant="outlined"
                      value={qtdItems}

                      onChange={e => setQtdItems(e.target.value)}
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
                    <p></p>

                    <form >
                      <TextField
                        id="date"
                        label="Data Inicio Atividades"
                        type="date"
                        size="small"
                        defaultValue={new Date()}
                        onChange={handleDataChange}

                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{
                          backgroundColor: '#fff',
                          borderRadius: 4
                        }}
                      />
                    </form><p></p>

                    <div style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                      <a>
                        <img
                          src={anexo}
                          height={70}
                          onClick={() => setOpenMsg2(true)}
                          style={{ cursor: 'pointer', border: '2px solid #ddd', borderRadius: '8px', transition: 'transform 0.3s ease' }}
                          onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                        />
                      </a>
                    </div>
                  </div>
                  <p></p>

                  <div>

                    {/* <TextField
                      size="small"
                      fullWidth
                      label="Previsão inicio das atividades"
                      variant="outlined"
                      value={dataInicio}

                      onChange={e => setDataInicio(e.target.value)}
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
                    /> */}





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
                  {tipoCadastro === 'Cadastro de Projeto até 10 itens'
                    ?
                    <Button variant="contained"
                      disabled={botaoDesabilitado}
                      onClick={() => { setModalSaveProjeto(true) }}>{'Solicitar cadastro de projeto '}</Button>

                    :

                    ''
                  }

                </div>
                : ''}





              {tipoCadastro === "Cadastro de Fornecedor" ?
                <div>

                  <hr></hr>
                  <div style={{ flex: 1, marginBottom: 16 }}>




                    
                    <div>

                    <TextField
  size="small"
  fullWidth
  label="CNPJ"
  variant="outlined"
  value={cnpj}
  onChange={e => {
    const newValue = e.target.value.replace(/\D/g, ''); // Remove qualquer caractere que não seja um número
    setCnpj(newValue);
  }}
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

                  </div>

                  <div style={{ flex: 1, marginBottom: 16 }}>




                    
                    <div>

                      <TextField
                        size="small"
                        fullWidth
                        label="Razão Social"
                        variant="outlined"
                        value={razaoSocial}

                        onChange={e => setRazaoSocial(e.target.value)}
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

                  </div>

                  <div style={{ flex: 1, marginBottom: 16 }}>




                   
                    <div>

                      <TextField
                        size="small"
                        fullWidth
                        label="Email"
                        variant="outlined"
                        value={emailEmpresa}

                        onChange={e => setEmailEmpresa(e.target.value)}
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

                  </div>

                  <div style={{ flex: 1, marginBottom: 16 }}>




                   
                    <div>

                      <TextField
                        size="small"
                        fullWidth
                        label="Telefone"
                        variant="outlined"
                        value={telefoneEmpresa}

                        onChange={e => setTelefoneEmpresa(e.target.value)}
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

                  </div>

                  <div style={{ flex: 1, marginBottom: 16 }}>




                    
                    <div>

                      <TextField
                        size="small"
                        fullWidth
                        label="Grupo de Pagamento"
                        variant="outlined"
                        value={gPagamento}

                        onChange={e => setGPagamento(e.target.value)}
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

                  </div>

                  <div style={{ flex: 1, marginBottom: 16 }}>




                   
                    <div>

                      <TextField
                        size="small"
                        fullWidth
                        label="Filial"
                        variant="outlined"
                        value={filial}

                        onChange={e => setFilial(e.target.value)}
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

                  </div>

                  <div style={{ flex: 1, marginBottom: 16 }}>




                  
                    <div>

                      <TextField
                        size="small"
                        fullWidth
                        label="Grupo de Cotação"
                        variant="outlined"
                        value={gCotacao}

                        onChange={e => setGCotacao(e.target.value)}
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

                  </div>










                </div>
                : ""}



              {tipoCadastro === "Cadastro Produto Consumo" ||
                tipoCadastro === "Cadastro de Produto Patrimônio" ?
                <div>
                  <p></p>
                  <div style={{ flex: 1, marginBottom: 16, marginTop: 20 }}>
                    <b>
                      Definir um título para o produto
                    </b><br></br>
                    <div style={{ color: 'red' }}>

                    </div>
                    Defina um título simples e de fácil entendimento
                    <TextField size="small" fullWidth label="Nome do produto" variant="outlined" value={titulo} onChange={e => setTitulo(e.target.value)}
                      style={{
                        backgroundColor: '#fff',
                        borderRadius: 4
                      }} />
                  </div>

                  <div style={{ flex: 1, marginBottom: 16 }}>
                    <b>
                      Defina onde será usado o produto
                    </b>
                    <TextField size="small" fullWidth label="Ex: o material será usado em aulas práticas no laboratório de gastronomia" multiline rows={2} variant="outlined" value={conteudo} onChange={e => setConteudo(e.target.value)}
                      style={{
                        backgroundColor: '#fff',
                        borderRadius: 4
                      }} />
                  </div>






                  <div style={{ flex: 1, marginBottom: 16, marginTop: 20 }}>
                    <b>
                      Definir o Grupo de Pagamento
                    </b><br></br>

                    <TextField size="small" fullWidth label="Ex: 331110105 - Material para curso" variant="outlined" value={centroCusto} onChange={e => setCentroCusto(e.target.value)}
                      style={{
                        backgroundColor: '#fff',
                        borderRadius: 4
                      }} />
                  </div>



                  <hr></hr>
                  <div >

                    <b>
                      Definir a Forma:
                    </b>
                    <label style={{
                      display: 'block',
                      marginBottom: 8,
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: '#333'
                    }}>
                      Informe a forma do item. As formas podem variar amplamente e incluem, mas não se limitam a, retangular, quadrado, oval, espiral, circular, cilíndrico, triangular, hexagonal, pentagonal, esférico, elíptico,
                      cônico, e piramidal. Especifique a forma que melhor descreve o item </label>


                    <Checkbox

                      boleanForma={boleanForma}
                      onChange={Change3}
                      color="primary"
                      inputProps={{ "aria-label": "checkbox example" }}
                      checked={boleanForma}
                    />
                    <label style={{ color: 'blue' }} >
                      Quero Definir a forma
                    </label>


                    {boleanForma ?
                      <div>


                        <TextField
                          size="small"
                          fullWidth
                          label="Ex: Retangular com cantos arredondados"
                          variant="outlined"
                          value={forma}
                          multiline
                          minRows={2}
                          maxRows={4}
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
                      :
                      ''


                    }

                    <hr></hr>





                  </div>
                  <p></p>
                  <div >

                    <b>
                      Definir Dimensão:
                    </b>
                    <label style={{
                      display: 'block',
                      marginBottom: 8,
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: '#333'
                    }}>
                      Informe as dimensões do item, como largura, comprimento, altura, espessura, diâmetro, polegadas, litros,
                      metros cúbicos, milímetros, centímetros, volume, capacidade, profundidade, e perímetro.
                    </label>


                    <Checkbox

                      boleanDimensao={boleanDimensao}
                      onChange={Change4}
                      color="primary"
                      inputProps={{ "aria-label": "checkbox example" }}
                      checked={boleanDimensao}
                    />
                    <label style={{ color: 'blue' }} >
                      Quero definir a dimensão
                    </label>




                    {!boleanDimensao ?
                      '' :
                      <div>

                        <TextField
                          size="small"
                          fullWidth
                          label="Ex: 45 cm altura x 45 cm largura x 90 cm profundidade, deve suportar 80kg"
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
                        />
                      </div>


                    }





                  </div>
                  <hr></hr>
                  <div >

                    <b>
                      Definir Tipo de material:
                    </b>
                    <label style={{
                      display: 'block',
                      marginBottom: 8,
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: '#333',

                    }}>
                      Informe os materiais do item, exemplos incluem plástico (como polietileno, polipropileno, nylon, ABS),
                      madeira (pinho, carvalho, mogno), alumínio, aço (galvanizado,
                      inox 304 ou 404), tecido (seda, algodão, nylon, poliéster),
                      ferro, cobre, vidro (temperado, laminado), papel (cartão, kraft,
                      reciclado), cerâmica, borracha, couro, e materiais compostos
                    </label>

                    <Checkbox

                      boleanMaterial={boleanMaterial}
                      onChange={Change1}
                      color="primary"
                      inputProps={{ "aria-label": "checkbox example" }}
                      checked={boleanMaterial}
                    />
                    <label style={{ color: 'blue' }} >
                      Quero definir o material
                    </label>
                    {!boleanMaterial ?
                      "" : <div>

                        <TextField
                          size="small"
                          fullWidth
                          label="Ex: Estrutura de metal tubular com assento e encosto em couro"
                          variant="outlined"
                          value={material}
                          multiline
                          minRows={2}
                          maxRows={4}
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
                      Definir Características Elétricas, Potência ou Velocidade:

                    </b>
                    <label style={{
                      display: 'block',
                      marginBottom: 8,
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: '#333',

                    }}>
                      Informe as características técnicas do item, como tensão elétrica em volts,
                      corrente em ampères, potência em watts, temperatura em graus Celsius,
                      capacidade de refrigeração em BTUs, velocidade de rotação em RPM,
                      frequência em hertz, energia em joules,
                      e eficiência energética conforme padrões vigentes.
                    </label>

                    <Checkbox
                      boleanEletro={boleanEletro}
                      onChange={Change5}
                      color="primary"
                      inputProps={{ "aria-label": "checkbox example" }}
                      checked={boleanEletro}
                    />
                    <label style={{ color: 'blue' }}>
                      Quero definir Características Elétricas, Potência ou Velocidade
                    </label>
                    {!boleanEletro ?
                      "" : <div>

                        <TextField
                          size="small"
                          fullWidth
                          label="Ex: Potência: 650 W
Tensão de Entrada: 100-240 V AC
Eficiência: 80 PLUS Bronze
"
                          variant="outlined"
                          value={eletro}
                          multiline
                          minRows={2}
                          maxRows={4}
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
                      Definir Unidade de Medida:

                    </b>
                    <label style={{
                      display: 'block',
                      marginBottom: 8,
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: '#333',

                    }}>
                      Informe as unidades de medida para quantificar o item.
                      Exemplos incluem metragem (metros, metros quadrados, metros cúbicos, metros lineares, centímetros, milímetros),
                      peso (quilogramas, gramas), volume (litros, mililitros),
                      e outras formas de embalagem ou contagem (rolo, bombona, balde, pacote especificando o número de unidades).
                    </label>

                    <Checkbox
                      boleanMedida={boleanMedida}
                      onChange={Change2}
                      color="primary"
                      inputProps={{ "aria-label": "checkbox example" }}
                      checked={boleanMedida}
                    />
                    <label style={{ color: 'blue' }}>
                      Quero definir Unidade de Medida
                    </label>
                    {!boleanMedida ?
                      "" : <div>

                        <TextField
                          size="small"
                          fullWidth
                          label="Ex: Comprimento: 50 metros (m)"
                          variant="outlined"
                          value={medida}
                          multiline
                          minRows={2}
                          maxRows={4}
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
                      Definir a Cor:

                    </b>
                    <label style={{
                      display: 'block',
                      marginBottom: 8,
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: '#333',

                    }}>
                      Informar cor, se for importante
                    </label>


                    <Checkbox
                      id="meu"
                      boleanCor={boleanCor}
                      onChange={Change}
                      color="primary"
                      inputProps={{ "aria-label": "checkbox example" }}
                      checked={boleanCor}
                    />
                    <label style={{ color: 'blue' }}>
                      Quero definir a Cor
                    </label>

                    {!boleanCor ?
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
                      Definir Indicações de marca ou modelo:

                    </b>
                    <label style={{
                      display: 'block',
                      marginBottom: 8,
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: '#333',

                    }}>
                      Existe alguma marca ou modelo já testada ou validada? informe e justifique
                    </label>

                    <Checkbox
                      boleanIndicacao={boleanIndicacao}
                      onChange={Change6}
                      color="primary"
                      inputProps={{ "aria-label": "checkbox example" }}
                      checked={boleanIndicacao}
                    />
                    <label style={{ color: 'blue' }}>
                      Quero definir Indicações
                    </label>
                    {!boleanIndicacao ?
                      "" : <div>

                        <TextField
                          size="small"
                          fullWidth
                          label="Indicação"
                          variant="outlined"
                          value={indicacao}
                          multiline
                          minRows={2}
                          maxRows={4}
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
                      Quero definir Informações:

                    </b>
                    <label style={{
                      display: 'block',
                      marginBottom: 8,
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: '#333',

                    }}>
                      Cite Informações Complementares
                    </label>

                    <Checkbox
                      boleanInformacoes={boleanInformacoes}
                      onChange={Change7}
                      color="primary"
                      inputProps={{ "aria-label": "checkbox example" }}
                      checked={boleanInformacoes}
                    />
                    <label style={{ color: 'blue' }}>
                      Definir Informações do item
                    </label>
                    {!boleanInformacoes ?
                      "" : <div>

                        <TextField
                          size="small"
                          fullWidth
                          label="Informações"
                          variant="outlined"
                          value={informacoes}
                          multiline
                          minRows={2}
                          maxRows={4}
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

              {
                tipoCadastro === "Cadastro de serviço" ?
                  <div>
                    <p></p>
                    <div style={{ flex: 1, marginBottom: 16, marginTop: 20 }}>
                      <b>
                        Definir um título para o Serviço
                      </b><br></br>
                      Defina um título simples e de fácil entendimento
                      <TextField size="small" fullWidth label="Ex: Instalação de Stand com capacidade para 50 pessoas" variant="outlined" value={titulo} onChange={e => setTitulo(e.target.value)}
                        style={{
                          backgroundColor: '#fff',
                          borderRadius: 4
                        }} />
                    </div>

                    <div style={{ flex: 1, marginBottom: 16 }}>
                      <b>
                        Defina como será usado o serviço
                      </b>
                      <TextField size="small" fullWidth label="Ex:Sera usado para divulgar cursos do Senac em diversas feiras na RMR  " multiline rows={2} variant="outlined" value={conteudo} onChange={e => setConteudo(e.target.value)}
                        style={{
                          backgroundColor: '#fff',
                          borderRadius: 4
                        }} />
                    </div>

                    <div style={{ flex: 1, marginBottom: 16, marginTop: 20 }}>
                      <b>
                        Definir o Grupo de Pagamento
                      </b><br></br>
                      Em caso de duvida entre em contato com a Contabilidade
                      <TextField size="small" fullWidth label="Ex: 332310119M - Locação de Bem móvel - PJ" variant="outlined" value={centroCusto} onChange={e => setCentroCusto(e.target.value)}
                        style={{
                          backgroundColor: '#fff',
                          borderRadius: 4
                        }} />
                    </div>



                    <hr></hr>
                    <div >

                      <b>
                        Definir a Forma:
                      </b>
                      <label style={{
                        display: 'block',
                        marginBottom: 8,
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: '#333'
                      }}>
                        Informe a forma como o serviço será prestado, entrega unica, em etapas, por diária, por empreitada </label>


                      <Checkbox

                        boleanForma={boleanForma}
                        onChange={Change3}
                        color="primary"
                        inputProps={{ "aria-label": "checkbox example" }}
                        checked={boleanForma}
                      />
                      <label style={{ color: 'blue' }} >
                        Quero Definir a forma
                      </label>


                      {boleanForma ?
                        <div>


                          <TextField
                            size="small"
                            fullWidth
                            label="Ex: Serviço de montagem e desmontagem de acordo com projeto apresentado em 3D"
                            variant="outlined"
                            value={forma}
                            multiline
                            minRows={2}
                            maxRows={4}
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
                        :
                        ''


                      }

                      <hr></hr>





                    </div>
                    <p></p>
                    <div >

                      <b>
                        Definir Dimensão:
                      </b>
                      <label style={{
                        display: 'block',
                        marginBottom: 8,
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: '#333'
                      }}>
                        Informe as dimensões do serviço, como largura, comprimento, altura, espessura, diâmetro, polegadas, litros,
                        metros cúbicos, milímetros, centímetros, volume, capacidade, profundidade, e perímetro.
                      </label>


                      <Checkbox

                        boleanDimensao={boleanDimensao}
                        onChange={Change4}
                        color="primary"
                        inputProps={{ "aria-label": "checkbox example" }}
                        checked={boleanDimensao}
                      />
                      <label style={{ color: 'blue' }} >
                        Quero definir a dimensão
                      </label>




                      {!boleanDimensao ?
                        '' :
                        <div>

                          <TextField
                            size="small"
                            fullWidth
                            label="Ex: Produção de Impresso gráfico 45 cm altura x 45 cm largura x 90"
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
                          />
                        </div>


                      }





                    </div>
                    <hr></hr>
                    <div >

                      <b>
                        Definir Tipo de material:
                      </b>
                      <label style={{
                        display: 'block',
                        marginBottom: 8,
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: '#333',

                      }}>
                        Informe os materiais do item, exemplos incluem plástico (como polietileno, polipropileno, nylon, ABS),
                        madeira (pinho, carvalho, mogno), alumínio, aço (galvanizado,
                        inox 304 ou 404), tecido (seda, algodão, nylon, poliéster),
                        ferro, cobre, vidro (temperado, laminado), papel (cartão, kraft,
                        reciclado), cerâmica, borracha, couro, e materiais compostos
                      </label>

                      <Checkbox

                        boleanMaterial={boleanMaterial}
                        onChange={Change1}
                        color="primary"
                        inputProps={{ "aria-label": "checkbox example" }}
                        checked={boleanMaterial}
                      />
                      <label style={{ color: 'blue' }} >
                        Quero definir o material
                      </label>
                      {!boleanMaterial ?
                        "" : <div>

                          <TextField
                            size="small"
                            fullWidth
                            label="Ex: Para o serviço deverá ser usado estrutura em aço"
                            variant="outlined"
                            value={material}
                            multiline
                            minRows={2}
                            maxRows={4}
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
                        Definir Características Elétricas, Potência ou Velocidade:

                      </b>
                      <label style={{
                        display: 'block',
                        marginBottom: 8,
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: '#333',

                      }}>
                        Informe as características técnicas do item, como tensão elétrica em volts,
                        corrente em ampères, potência em watts, temperatura em graus Celsius,
                        capacidade de refrigeração em BTUs, velocidade de rotação em RPM,
                        frequência em hertz, energia em joules,
                        e eficiência energética conforme padrões vigentes.
                      </label>

                      <Checkbox
                        boleanEletro={boleanEletro}
                        onChange={Change5}
                        color="primary"
                        inputProps={{ "aria-label": "checkbox example" }}
                        checked={boleanEletro}
                      />
                      <label style={{ color: 'blue' }}>
                        Quero definir Características Elétricas, Potência ou Velocidade
                      </label>
                      {!boleanEletro ?
                        "" : <div>

                          <TextField
                            size="small"
                            fullWidth
                            label="Ex: Potência: 650 W
Tensão de Entrada: 100-240 V AC
Eficiência: 80 PLUS Bronze
"
                            variant="outlined"
                            value={eletro}
                            multiline
                            minRows={2}
                            maxRows={4}
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
                        Definir Unidade de Medida:

                      </b>
                      <label style={{
                        display: 'block',
                        marginBottom: 8,
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: '#333',

                      }}>
                        Informe as unidades de medida para quantificar o item.
                        Exemplos incluem metragem (metros, metros quadrados, metros cúbicos, metros lineares, centímetros, milímetros),
                        peso (quilogramas, gramas), volume (litros, mililitros),
                        e outras formas de embalagem ou contagem (rolo, bombona, balde, pacote especificando o número de unidades).
                      </label>

                      <Checkbox
                        boleanMedida={boleanMedida}
                        onChange={Change2}
                        color="primary"
                        inputProps={{ "aria-label": "checkbox example" }}
                        checked={boleanMedida}
                      />
                      <label style={{ color: 'blue' }}>
                        Quero definir Unidade de Medida
                      </label>
                      {!boleanMedida ?
                        "" : <div>

                          <TextField
                            size="small"
                            fullWidth
                            label="Ex: Comprimento: 50 metros (m)"
                            variant="outlined"
                            value={medida}
                            multiline
                            minRows={2}
                            maxRows={4}
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
                    {/* <div style={{ flex: 1, marginBottom: 16 }}>
                      <b>
                        Definir a Cor:

                      </b>
                      <label style={{
                        display: 'block',
                        marginBottom: 8,
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: '#333',

                      }}>
                        Informar cor, se for importante
                      </label>


                      <Checkbox
                        id="meu"
                        boleanCor={boleanCor}
                        onChange={Change}
                        color="primary"
                        inputProps={{ "aria-label": "checkbox example" }}
                        checked={boleanCor}
                      />
                      <label style={{ color: 'blue' }}>
                        Quero definir a Cor
                      </label>

                      {!boleanCor ?
                        "" :
                        <TextField size="small" fullWidth label="Cor" variant="outlined" value={cor} onChange={e => setCor(e.target.value)}
                          style={{
                            backgroundColor: '#fff',
                            borderRadius: 4
                          }} />
                      }

                    </div> */}

                    <p></p>
                    <hr></hr>
                    <div style={{ flex: 1, marginBottom: 16 }}>
                      <b>
                        Definir Indicações de marca ou modelo:

                      </b>
                      <label style={{
                        display: 'block',
                        marginBottom: 8,
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: '#333',

                      }}>
                        Existe alguma marca ou modelo já testada ou validada? informe e justifique
                      </label>

                      <Checkbox
                        boleanIndicacao={boleanIndicacao}
                        onChange={Change6}
                        color="primary"
                        inputProps={{ "aria-label": "checkbox example" }}
                        checked={boleanIndicacao}
                      />
                      <label style={{ color: 'blue' }}>
                        Quero definir Indicações
                      </label>
                      {!boleanIndicacao ?
                        "" : <div>

                          <TextField
                            size="small"
                            fullWidth
                            label="Indicação"
                            variant="outlined"
                            value={indicacao}
                            multiline
                            minRows={2}
                            maxRows={4}
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
                        Quero definir Informações:

                      </b>
                      <label style={{
                        display: 'block',
                        marginBottom: 8,
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: '#333',

                      }}>
                        Cite Informações Complementares
                      </label>

                      <Checkbox
                        boleanInformacoes={boleanInformacoes}
                        onChange={Change7}
                        color="primary"
                        inputProps={{ "aria-label": "checkbox example" }}
                        checked={boleanInformacoes}
                      />
                      <label style={{ color: 'blue' }}>
                        Definir Informações do item
                      </label>
                      {!boleanInformacoes ?
                        "" : <div>

                          <TextField
                            size="small"
                            fullWidth
                            label="Informações"
                            variant="outlined"
                            value={informacoes}
                            multiline
                            minRows={2}
                            maxRows={4}
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
            {/* <input type={"file"} accept="image/*, video/*" enctype="multipart/form-data" onChange={(e) => enviarArquivo(e.target.files[0])} /> */}

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

              {tipoCadastro === 'Cadastro de Fornecedor'
                ?
                <Button variant="contained"
                  disabled={botaoDesabilitado}
                  onClick={() => { tipoCadastro === 'Cadastro de Fornecedor' ? onSaveFornecvedor(true) : setModalSave(true) }}>{'Solicitar cadastro'}</Button>


                :
                ''

              }

              {tipoCadastro === 'Cadastro de Fornecedor' ||
                tipoCadastro === 'Cadastro de Projeto até 10 itens' ||
                tipoCadastro === 'Cadastro de MR a partir de 30 itens' ||
                tipoCadastro === 'Ajuste de parametrização de cadastro'
                ?
                ''
                :
                <Button variant="contained"
                  disabled={botaoDesabilitado}
                  onClick={() => { setModalSave(true) }}>{'Solicitar cadastro'}</Button>


              }



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
        open={modalSave} onClose={() => setOpenDialogFile(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">


        <Dialog open={modalSave} onClose={() => setOpenDialogFile(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">

          <DialogContent>
            {
              (
                forma === "" ||
                dimensao === "" ||
                material === "" ||
                eletro === "" ||
                medida === "" ||
                indicacao === "" ||
                informacoes === "") ?

                <div>
                  <DialogTitle id="alert-dialog-title">Campos não preenchidos</DialogTitle>


                  {forma === "" &&
                    <div style={{ color: "red" }}>
                      Forma do item<br />
                    </div>
                  }

                  {dimensao === "" &&
                    <div style={{ color: "red" }}>
                      Dimensão do item<br />
                    </div>
                  }

                  {material === "" &&
                    <div style={{ color: "red" }}>
                      Material do item<br />
                    </div>
                  }

                  {eletro === "" &&
                    <div style={{ color: "red" }}>
                      Características elétricas do item<br />
                    </div>
                  }

                  {medida === "" &&
                    <div style={{ color: "red" }}>
                      Unidade de medida do item<br />
                    </div>
                  }

                  {indicacao === "" &&
                    <div style={{ color: "red" }}>
                      Indicações de marca ou modelo do item<br />
                    </div>
                  }

                  {informacoes === "" &&
                    <div style={{ color: "red" }}>
                      Informações do item<br />

                    </div>
                  }

                  <DialogTitle id="alert-dialog-title">
                    A falta destas informações pode acarretar uma compra que não supra as necessidades da unidade.
                    <b style={{ color: 'red' }}>
                      Deseja cadastrar mesmo assim?
                    </b>
                  </DialogTitle>

                  <div>
                    <Button variant="contained" onClick={() => onSave()}>Solicitar cadastro do item mesmo assim</Button>
                    <p></p>



                    <Button variant="contained" color="error" onClick={() => setModalSave(false)}>Quero completar o cadastro</Button>

                  </div>
                </div>


                : <div>
                  <Button variant="contained" onClick={() => onSave()}>Solicitar cadastro do item </Button>
                  <p></p>



                  <Button variant="contained" color="error" onClick={() => setModalSave(false)}>Voltar</Button>

                </div>
            }
          </DialogContent>
        </Dialog>











        <p></p>








      </Dialog>

      <Dialog open={modalSaveProjeto} onClose={() => setOpenDialogFile(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">

        <DialogContent>
          {
            (
              qtdItems === "" ||
              dataInicio === '' ||
              nomeProjeto === '') ?

              <div>
                <DialogTitle id="alert-dialog-title">Campos não preenchidos</DialogTitle>
                {qtdItems === "" &&
                  <div style={{ color: "red" }}>
                    Quantidade de itens<br />
                  </div>
                }

                {dataInicio === "" &&
                  <div style={{ color: "red" }}>
                    Data de inicio<br />
                  </div>
                }

                {nomeProjeto === "" &&
                  <div style={{ color: "red" }}>
                    Nome do Projeto<br />
                  </div>
                }




                <div>
                  <Button variant="contained" onClick={() => onSaveProjeto()}>Solicitar cadastro mesmo assim</Button>
                  <p></p>



                  <Button variant="contained" color="error" onClick={() => setModalSaveProjeto(false)}>Quero completar o cadastro</Button>

                </div>
              </div>


              : <div>
                <Button variant="contained" onClick={() => onSaveProjeto()}>Solicitar cadastro do Projeto </Button>
                <p></p>



                <Button variant="contained" color="error" onClick={() => setModalSaveProjeto(false)}>Voltar</Button>

              </div>
          }
        </DialogContent>
      </Dialog>

      <Dialog open={modalSaveMR} onClose={() => setOpenDialogFile(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">

        <DialogContent>
          {
            <div>
              {tipoCadastro === 'Cadastro de MR a partir de 30 itens' ?

                <Button variant="contained" onClick={() => onSaveMr()}>Enviar </Button>
                : ''}

              {tipoCadastro === 'Ajuste de parametrização de cadastro' ?

                <Button variant="contained" onClick={() => onSaveAjuste()}>Enviar</Button>

                : ''}




              <p></p>



              <Button variant="contained" color="error" onClick={() => setModalSaveMR(false)}>Voltar</Button>

            </div>
          }
        </DialogContent>
      </Dialog>




      <hr></hr>

      <Dialog open={open} >
        <DialogTitle style={{ color: '#1E90FF' }} >Encaminhar Tarefa</DialogTitle>
        <DialogContent>
          <DialogContentText>


          </DialogContentText>

          <InputLabel id="demo-select-small"><b>Titulo :</b></InputLabel>
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
              <option >CLASSIFIQUE A ATIVIDADE</option>

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




      <Dialog open={openMsg}>
        <DialogContent
          style={{ width: '600px', padding: '16px' }}
        >
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
                <p style={{ wordBreak: "break-all" }}>{item.conteudo}</p>
              </div>
            </div>
          ))}

          <hr />

          {openStatus === false ? <h2>Enviar mensagem</h2> : <h4>Informe o motivo da alteração do Status</h4>}

          <div style={{ marginBottom: 16 }}>
            <TextField
              fullWidth
              label='Digite sua mensagem...'
              multiline
              rows={8}
              variant="outlined"
              value={conteudo}
              onChange={e => setConteudo(e.target.value)}
              sx={{ margin: 1 }}
            />
          </div>

          <hr />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <Button variant="contained" color="primary" onClick={novaInteracao} >
              Enviar
            </Button>
            <Button variant="outlined" onClick={() => setOpenMsg(false)}>
              Cancelar
            </Button>
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