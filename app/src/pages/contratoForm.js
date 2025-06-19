import React, { useEffect, useState, useRef } from "react";
import styled from 'styled-components'
import {
  Alert, Avatar, Box, Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel,
  FormGroup, FormLabel, Hidden, Grid, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, Switch, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination,
  TableRow, TextField, Tooltip
} from "@mui/material";

import TaskItemDoChamadoFornecedor from "../components/task-item-do-chamadoFornecedor";

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
import moment from 'moment';


const getCookie = require('../utils/getCookie')


const PageContainer = styled.div`
  margin: 16px;
  padding: 32px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-shadow: 0px 0px 20px -18px #424242;
  
`

const ContratoForm = (props) => {
  const { logged } = props

  const [checked, setChecked] = React.useState(false);
  // alert(JSON.stringify(logged.nome))
  const [arquivado, setArquivado] = useState(true)

  const [open, setOpen] = useState(false);
  const ImageLogo = require('../assets/coment.png')
  const ImagePlan = require('../assets/zip.png')

  const { id } = props.match.params;
  const [openLoadingDialog, setOpenLoadingDialog] = useState(false)
  const [openMessageDialog, setOpenMessageDialog] = useState(false)
  const [message, setMessage] = useState('')

  const [title, setTitle] = useState('')
  const [valorNF, setValorNF] = useState('')
  const [numeroContrato, setNumeroContrato] = useState('')
  const [newContrato, setNewContrato] = useState('')





  const [fkUnidade, setFkUnidade] = useState('')

  const [unidade, setUnidade] = useState([])
  const [unidadeTrue, setUnidadeTrue] = useState([])
  const [area, setArea] = useState([])

  const [mensagens, setMensagens] = useState([])

  const [meuSetor, setMeuSetor] = useState([]);
  const [pagamentos, setPagamentos] = useState([]);

  const [mensagemAlert, setMensagemAlert] = useState('')
  const [openMensagens, setOpenMensagens] = useState(false)


  const [descricao, setDescricao] = useState('')
  const [nomeEmpresa, setNomeEmpresa] = useState('')
  const [parcelas, setParcelas] = useState('')
  const [valorContrato, setValorContrato] = useState('')
  const [inicioVigencia, setInicioVigencia] = useState()
  const [finalVigencia, setFinalVigencia] = useState()




  useEffect(() => {
    function carregarRegistro() {
      setOpenLoadingDialog(true)
      const token = getCookie('_token_task_manager')
      const params = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      fetch(`${process.env.REACT_APP_DOMAIN_API}/api/contrato/${id}`, params)
        .then(response => {
          const { status } = response
          response.json().then(data => {
            setOpenLoadingDialog(false)
            if (status === 401) {
              setMessage(data.message)
              setOpenMessageDialog(true)
            } else if (status === 200) {
              // alert(JSON.stringify(data.data.prazoInicioAtividades))
              setNomeEmpresa(data.data.nomeEmpresa)
              setDescricao(data.data.descricao)
              setParcelas(data.data.parcelas)
              setValorContrato(data.data.valorContrato)
              setInicioVigencia(data.data.inicioVigencia)
              setFinalVigencia(data.data.finalVigencia)
              setUnidade(data.data.Unidade.nome)


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
      fetch(`${process.env.REACT_APP_DOMAIN_API}/api/atividade/${id}`, params)
        .then(response => {
          const { status } = response
          response.json().then(data => {
            setOpenLoadingDialog(false)
            if (status === 401) {
              setMessage(data.message)
              setOpenMessageDialog(true)
            } else if (status === 200) {

              setOpenLoadingDialog(false)
              setPagamentos(data.data)
            }
          }).catch(err => setOpenLoadingDialog(false))
        })
    }




    if (id) {
      carregarRegistro()



      carregarMensagem()

    }

    // if(pagamentos){
    //     alert(JSON.stringify(pagamentos))

    // }

  }, [])

  function mensagens1(msg) {
    setMensagemAlert(msg)
    setOpenMensagens(true)
  }



  return (

    <PageContainer>


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
            {/* Botão voltar */}
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

            {/* Status da nota */}

            {/* Informações da nota */}
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ margin: '4px 0', color: '#1976d2' }}>Empresa: {nomeEmpresa}</h3>
              <h3 style={{ margin: '4px 0', color: '#1976d2' }}>Descrição: {descricao}</h3>
              <h3 style={{ margin: '4px 0', color: '#1976d2' }}>Parcelas: {parcelas}</h3>

              <h3 style={{ margin: '4px 0', color: '#1976d2' }}>InicioVigencia: {moment(inicioVigencia).format('DD/MM/YYYY')}</h3>
              <h3 style={{ margin: '4px 0', color: '#1976d2' }}>FinalVigencia:  {moment(finalVigencia).format('DD/MM/YYYY')}</h3>
              <h3 style={{ margin: '4px 0', color: '#1976d2' }}>Setor Responsavel: {unidade}</h3>
            </div>
            <div style={{
              border: '2px solid #1976d2',
              borderRadius: '8px',
              padding: '16px',
              backgroundColor: '#f0f8ff',
              margin: '16px 0'
            }}>
              <h3 style={{ margin: '4px 0', color: '#1976d2' }}>
                Valor total Contrato: R${valorContrato.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </h3>
              <h3 style={{ margin: '4px 0', color: 'f0f8ff' }}>
                Valor total pago neste contrato: R${pagamentos
                  .reduce((total, p) => total + p.valorNota, 0)
                  .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </h3>
            </div>

            {/* Documentos */}


            {/* Botão de ação do gestor */}



            {/* Campo para mensagem */}


            {/* Botão de enviar mensagem */}


            <hr style={{ borderTop: '1px solid #e0e0e0', marginBottom: 24 }} />

            {/* Mensagens anteriores */}
            <table
  style={{
    fontFamily: "'Segoe UI', Roboto, sans-serif",
    fontSize: "14px",
    width: "95%",
    margin: "24px auto",
    borderCollapse: "separate",
    borderSpacing: "0 12px"
  }}
>
  <tbody>
    {pagamentos.map((item, index) => (
      <tr
        key={index}
        style={{
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          borderLeft: `5px solid ${item.Status.nome === 'Concluido' ? '#4caf50' : '#f44336'}`,
          borderRadius: "8px",
          overflow: "hidden",
          transition: "background 0.3s",
          cursor: "default"
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#f0f8ff")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#ffffff")
        }
      >
        <td
          style={{
            padding: "20px",
            textAlign: "left",
            verticalAlign: "top",
            wordBreak: "break-word",
            color: "#333"
          }}
        >
          <div style={{ marginBottom: "8px" }}>
            <b style={{ color: '#333' }}>Nota Fiscal:</b> {item.titulo}
          </div>

          <div style={{ marginBottom: "8px" }}>
            <b style={{ color: '#333' }}>Valor:</b> R${item.valorNota.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>

          <div style={{ marginBottom: "8px" }}>
            <b style={{ color: '#333' }}>Cadastrado por:</b> {item?.Usuario?.nome}
          </div>

          <div style={{ marginBottom: "8px" }}>
            <b style={{ color: '#333' }}>Data envio:</b> {new Date(item.createdAt).toLocaleDateString()}
          </div>

          <div style={{ marginBottom: "8px" }}>
            <b style={{ color: '#333' }}>Empresa:</b>{" "}
            <span style={{ color: "#f4a261" }}>{item.Contrato?.nomeEmpresa}</span> 🧾
          </div>

          <div>
            <b style={{ color: '#333' }}>Status:</b>{" "}
            <span style={{ fontWeight: "bold", color: item.Status.nome === 'Concluido' ? '#4caf50' : '#e53935' }}>
              {item.Status.nome === 'Aberto' && 'Aguardando Aprovação do gestor'}
              {item.Status.nome === 'Iniciado' && 'Nota em análise fiscal'}
              {item.Status.nome === 'Pendênte' && 'Nota aguardando pagamento na GLC'}
              {item.Status.nome === 'Concluido' && 'Nota Fiscal paga'}
              {item.Status.nome === 'Planejado para Iniciar' && 'Lançamento direto pelo setor'}
            </span>
          </div>
        </td>

        <td style={{ padding: "20px", verticalAlign: "top", textAlign: "right" }}>
          <button
            style={{
              padding: "10px 16px",
              backgroundColor: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: 600,
              fontSize: "14px",
              cursor: "pointer",
              transition: "background 0.3s"
            }}
            onClick={() =>
              (window.location.href = `${process.env.REACT_APP_DOMAIN}/nfCadastro/${item.id}/edit`)
            }
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#1259a5"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#1976d2"}
          >
            Ver
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

          </div>



          :
          ''

        }







        <div>








        </div>

        <p></p>




      </div>























    </PageContainer>
  );
};

export default ContratoForm;