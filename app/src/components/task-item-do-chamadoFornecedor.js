import React, { useEffect, useState } from 'react'
import { Button, Chip, IconButton, LinearProgress } from '@mui/material'
import MoreIcon from '@mui/icons-material/MoreVert'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import moment from 'moment';
const ab = require('../assets/ab.png')
const fec = require('../assets/fec.png')

const getCookie = require('../utils/getCookie')

const TaskItemDoChamadoFornecedor = (props) => {
    const { nome, logged } = props;

    const { protocolo, unidade, area, classificacao, solicitante,
        status, titulo, emailUsuarioSolicitante, telefoneSolicitante, setorSol,
        nomeExecutor, emailExecutor, telefoneExecutor, categoria,
        razao,email,fone,GPagamento,filial,gCotacao,
        setorSolicitante, forma, medida, cor, loggedEmail,
        indicacao, informacoes, material, eletro, dimensao, editar, centroCusto, id } = props

    const [verificar, setVerificar] = useState([])
    const [menssege, setMenssage] = useState('')
    const [openLoadingDialog, setOpenLoadingDialog] = useState(false)
    const [timelineStatus, setTimelineStatus] = useState([])






    const data = new Date(props.criacaoChamado)
    function formDate(data) {
        var day = data.getDate();
        var month = data.getMonth() + 1;
        var year = data.getFullYear();
        var dateFormatted = day + '/' + (month) + '/' + year;
        return dateFormatted
    }
    var date = formDate(data)

    useEffect(() => {
        verificarEditar(editar ?
            editar
            : "")

        function carregarStatus1(id) {
            const token = getCookie('_token_task_manager')
            const params = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }
            fetch(`${process.env.REACT_APP_DOMAIN_API}/api/timeLineStatus/${id?id:''}`, params)
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

        if(id){
        

            carregarStatus1(id)
        }



    }, [editar, verificar])




    function verificarEditar(editar) {
        if (editar) {
            setVerificar(false)
        } else if (!editar) {
            setVerificar(true)
        }

    }

    const onSaveStatus = () => {
        const token = getCookie('_token_task_manager')
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                editar: verificar


            })
        }

        fetch(`${process.env.REACT_APP_DOMAIN_API}/api/atividade/${id}/edit/`, params)
            .then(response => {
                const { status } = response
                response.json().then(data => {
                    setOpenLoadingDialog(false)
                    if (status === 401) {
                        // setMessage(data.message)
                        // setOpenMessageDialog(true)
                    } else if (status === 200) {

                        window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/${id}/edit`
                        // alert(JSON.stringify(data.data))
                        // setMessage(data.message)
                        // setOpenMessageDialog(true)
                        // setArea(data.data)

                    }
                }).catch(err =>
                    setOpenLoadingDialog(true))
            })
    }


  useEffect(() => {
        console.log('Estado atualizado:', timelineStatus); // Log do estado atualizado
    }, [timelineStatus]);








    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            minHeight: 100,
            color: '#424242',
            padding: 16
            // cursor: 'pointer'
        }}>
            {/* <div style={{ display: 'flex', flexDirection: 'column', paddingRight: 16, borderRight: '1px solid #E0E0E0' }}>
        <div style={{ fontSize: 13, fontWeight: 'bold', color: '#424242' }}>09:15</div>
        <div style={{ fontSize: 12, color: '#757575' }}>11:00</div>
      </div> */}
            <div style={{
                backgroundColor: '#cfdff4',
                marginLeft: 5,
                padding: 16,
                flex: 1,
                borderRadius: 45,
                boxShadow: '0px 0px 20px -10px #424242',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #e0e0e0'
            }}>




              



                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontFamily: 'Arial, sans-serif',
                    margin: '20px 0',
                    tableLayout: 'fixed',
                    borderSpacing: '20px'

                }}>
                    <tbody>

                        <tr style={{ textAlign: 'left' }}>
                            <td style={{
                                padding: '20px',
                                backgroundColor: '#fff3e0',
                                borderRadius: '8px',


                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                fontSize: '16px'
                            }}>

                                <div style={{
                                    flex: 1,
                                    fontSize: '16px',
                                    color: '#424242',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',


                                }}>
                                    <b style={{ fontWeight: '600' }}>Atividade: </b>
                                    <span style={{ marginLeft: '8px', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>{props.titulo}</span>
                                </div>

                                <div style={{
                                    flex: 1,
                                    fontSize: '14px',
                                    color: '#424242',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',


                                }}>
                                    <b style={{ fontWeight: '600' }}>Categoria: </b>
                                    <span style={{ marginLeft: '8px', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>{props.categoria}</span>
                                </div>

                                <div style={{
                                    flex: 1,
                                    fontSize: '14px',
                                    color: '#424242',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    padding: '10px 0',

                                }}>
                                    <b style={{ fontWeight: '600' }}>Status: </b>
                                    <span style={{ marginLeft: '8px' }}>{props.status}</span>
                                </div>

                                <div style={{
                                    flex: 1,
                                    fontSize: '14px',
                                    color: '#424242',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',


                                }}>
                                    <b style={{ fontWeight: '600' }}>Classificação: </b>
                                    <span style={{ marginLeft: '8px' }}>{props.classificacao}</span>
                                </div>
                            </td>
                            <td style={{
                                padding: '20px',
                                backgroundColor: '#fff3e0',
                                borderRadius: '8px',
                                margin: '10px',
                                padding: '20px',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                fontSize: '16px'
                            }}>
                                <div style={{
                                    flex: 1,
                                    fontSize: '14px',
                                    color: '#424242',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',


                                }}>
                                    <div style={{
                                        fontSize: '16px',
                                        fontWeight: '600',

                                    }}>
                                        Solicitante
                                    </div>

                                    <div style={{
                                        flex: 1,
                                        fontSize: '14px',
                                        color: '#424242',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',

                                    }}>
                                        <b style={{ fontWeight: '600', marginRight: '8px' }}>Nome:</b>
                                        <span>{props.solicitante}</span>
                                    </div>

                                    <div style={{
                                        flex: 1,
                                        fontSize: '14px',
                                        color: '#424242',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',

                                    }}>
                                        <b style={{ fontWeight: '600', marginRight: '8px' }}>Setor:</b>
                                        <span>{props.setorSolicitante}</span>
                                    </div>

                                    <div style={{
                                        flex: 1,
                                        fontSize: '14px',
                                        color: '#424242',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',

                                    }}>
                                        <b style={{ fontWeight: '600', marginRight: '8px' }}>Email:</b>
                                        <span>{props.emailUsuarioSolicitante}</span>
                                    </div>

                                    <div style={{
                                        flex: 1,
                                        fontSize: '14px',
                                        color: '#424242',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <b style={{ fontWeight: '600', marginRight: '8px' }}>Telefone:</b>
                                        <span>{props.telefoneSolicitante}</span>
                                    </div>

                                    <div style={{
                                        flex: 1,
                                        fontSize: '14px',
                                        color: '#424242',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <b style={{ fontWeight: '600', marginRight: '8px' }}>Protocolo:</b>
                                        <span>{props.protocolo}</span>
                                    </div>
                                </div>

                            </td>
                            <td style={{
                                padding: '20px',
                                padding: '20px',
                                backgroundColor: '#fff3e0',
                                borderRadius: '8px',
                                margin: '10px',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                fontSize: '16px'
                            }}>
                                <div style={{
                                    flex: 1,
                                    fontSize: '14px',
                                    color: '#424242',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    padding: '10px 0',

                                }}>
                                    <div style={{
                                        fontSize: '16px',
                                        fontWeight: '600',

                                    }}>
                                        Executor
                                    </div>

                                    {props.nomeExecutor === '' ? (
                                        <div style={{
                                            color: 'red',
                                            fontSize: '20px',

                                        }}>
                                            Atividade aguardando responsável
                                        </div>
                                    ) : (
                                        <>
                                            <div style={{
                                                flex: 1,
                                                fontSize: '14px',
                                                color: '#424242',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',

                                            }}>
                                                <b style={{ fontWeight: '600', marginRight: '8px' }}>Nome:</b>
                                                <span>{props.nomeExecutor}</span>
                                            </div>

                                            <div style={{
                                                flex: 1,
                                                fontSize: '14px',
                                                color: '#424242',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',

                                            }}>
                                                <b style={{ fontWeight: '600', marginRight: '8px' }}>Email:</b>
                                                <span>{props.emailExecutor}</span>
                                            </div>

                                            <div style={{
                                                flex: 1,
                                                fontSize: '14px',
                                                color: '#424242',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center'
                                            }}>
                                                <b style={{ fontWeight: '600', marginRight: '8px' }}>Telefone:</b>
                                                <span>{props.telefoneExecutor}</span>
                                            </div>
                                        </>
                                    )}
                                </div>

                            </td>


                            <td style={{
                                padding: '20px',
                                padding: '20px',
                                backgroundColor: '#fff3e0',
                                borderRadius: '8px',
                                margin: '10px',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                fontSize: '16px'
                            }}>
                                <div style={{
                                    flex: 1,
                                    fontSize: '14px',
                                    color: '#424242',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    padding: '10px 0',

                                }}>

                                    <div>
                                        {timelineStatus.length ? (
                                            <div><b>

                                                Historico do Atendimento:
                                            </b>
                                                {timelineStatus.map((item, index) => (
                                                    <div key={index} style={{fontSize:'9px'}}>
                                                        {item.Usuario?.nome}-{item.Status?.nome}- {moment(item.createdAt).format('DD/MM/YYYY HH:mm:ss')}
                                                    <hr></hr></div>
                                                ))}
                                            </div>
                                        ) : (
                                            'x'
                                        )}
                                    </div>





                                </div>

                            </td>
                        </tr>
                    </tbody>
                </table>


                <div style={{ fontSize: 13, color: '#424242', marginTop: 16, wordBreak: "break-all" }}>

                    
                    <div
                        style={{
                            flex: 1,
                            fontSize: '12px',
                            color: '#424242',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: '10px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            backgroundColor: '#f5f5f5',
                            margin: '10px 0'
                        }}>



                        <b>CNPJ:</b><br></br>
                        {props.cnpj}

                    </div>

                    <div style={{
                        flex: 1,
                        fontSize: '12px',
                        color: '#424242',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: '10px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#f5f5f5',
                        margin: '10px 0'
                    }}>

                        <b>Razão Social:</b> {props.razao}

                    </div>





                    <div
                        style={{
                            flex: 1,
                            fontSize: '12px',
                            color: '#424242',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: '10px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            backgroundColor: '#f5f5f5',
                            margin: '10px 0'
                        }}>

                        <b>Email:</b><br></br>
                        {props.email}

                    </div>

                    <div
                        style={{
                            flex: 1,
                            fontSize: '12px',
                            color: '#424242',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: '10px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            backgroundColor: '#f5f5f5',
                            margin: '10px 0'
                        }}>

                        <b>Fone:</b> {props.fone}

                    </div>

                    <div style={{
                        flex: 1,
                        fontSize: '12px',
                        color: '#424242',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: '10px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#f5f5f5',
                        margin: '10px 0'
                    }}>

                        <b>Grupo de Pagamento:</b> {props.GPagamento}

                    </div>








                    <div
                        style={{
                            flex: 1,
                            fontSize: '12px',
                            color: '#424242',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: '10px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            backgroundColor: '#f5f5f5',
                            margin: '10px 0'
                        }}>

                        <b>Filial:</b> {props.filial}

                    </div>


                   


                    <div style={{
                        flex: 1,
                        fontSize: '12px',
                        color: '#424242',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: '10px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#f5f5f5',
                        margin: '10px 0'
                    }}>

                        <b>Grupo de Cotação:</b> {props.gCotacao}

                    </div>

                   


                    <br></br>










                </div>





            </div>
        </div>
    )
}

export default TaskItemDoChamadoFornecedor