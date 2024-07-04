import React, { useEffect, useState } from 'react'
import { Button, Chip, IconButton, LinearProgress } from '@mui/material'
import MoreIcon from '@mui/icons-material/MoreVert'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
const ab = require('../assets/ab.png')
const fec = require('../assets/fec.png')

const getCookie = require('../utils/getCookie')

const TaskItemDoChamado = (props) => {
    const { nome, logged } = props;

    const { protocolo, unidade, area, classificacao, solicitante,
        status, titulo, emailUsuarioSolicitante, telefoneSolicitante, setorSol,
        nomeExecutor, emailExecutor, telefoneExecutor, categoria,
        setorSolicitante, forma, medida, cor, loggedEmail,
        indicacao, informacoes, material, eletro, dimensao, editar, centroCusto, id } = props

    const [verificar, setVerificar] = useState([])
    const [menssege, setMenssage] = useState('')
    const [openLoadingDialog, setOpenLoadingDialog] = useState(false)




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




{props.logged === props.solicitante &&
                        <div style={{ flex: 1, marginBottom: 16, marginLeft: 5 }}>
                            <Button
                                variant="contained"
                                size="small"
                                color="error"
                                disabled={!props.editar}
                                onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/${id}/editar`}
                            >
                                O executor abriu a edição para ajuestes
                            </Button>
                        </div>
                    }


                    {
                    emailExecutor=== loggedEmail
                    &&props.editar === false

                        ?
                        <div style={{ flex: 1, marginBottom: 16, marginLeft: 5 }}>
                            <Button size='small' color="error"
                                onClick={() => onSaveStatus()}
                            >Liberar edição para o usuário
                            <img src={ab} height={34} /> 
                            </Button>
                        </div> : ''

                    }

                    {
                     emailExecutor=== loggedEmail
                    && props.editar === true

                        ?
                        <div style={{ flex: 1, marginBottom: 16, marginLeft: 5 }}>
                            <Button  size='small' color="error"
                                onClick={() => onSaveStatus()}
                            >Bloquear edição para o usuário
                                 <img src={fec} height={34} />  
                            </Button>
                        </div> : ''

                    }

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
                        </tr>
                    </tbody>
                </table>


                <div style={{ fontSize: 13, color: '#424242', marginTop: 16, wordBreak: "break-all" }}>

                  <div style={{fontSize:'18px'}}>
                Dados do Item
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

                            

                        <b>Centro de Custo:</b><br></br>
                        {props.centroCusto ?
                            <div style={{ color: '#2E7D32', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>

                                {props.centroCusto}
                            </div>
                            :

                            <div style={{ marginLeft: '3px', color: '#D32F2F' }}>

                                Centro de custo não cadastrado
                            </div>}

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

                        <b>Informações Gerais:</b> {props.informacoes ?
                            <div style={{ color: '#2E7D32', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>

                                {props.informacoes}
                            </div>
                            :

                            <div style={{ marginLeft: '3px', color: '#D32F2F' }}>

                                Informações não cadastrada
                            </div>}

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

                        <b>Forma:</b><br></br>
                        {props.forma ?
                            <div style={{ color: '#2E7D32' , wordBreak: 'break-word', whiteSpace: 'pre-wrap'}}>

                                {props.forma}
                            </div>
                            :

                            <div style={{ marginLeft: '3px', color: '#D32F2F' }}>

                                Forma não cadastrada
                            </div>}

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

                        <b>Medida:</b> {props.medida ?
                            <div style={{ color: '#2E7D32', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>

                                {props.medida}
                            </div>
                            :

                            <div style={{ marginLeft: '3px', color: '#D32F2F' }}>

                                Medida não cadastrada
                            </div>}

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

                        <b>Cor:</b> {props.cor ?
                            <div style={{ color: '#2E7D32', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>

                                {props.cor}
                            </div>
                            :

                            <div style={{ marginLeft: '3px', color: '#D32F2F' }}>

                                Cor não cadastrada
                            </div>}

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

                        <b>Material:</b> {props.material ?
                            <div style={{ color: '#2E7D32', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>

                                {props.material}
                            </div>
                            :

                            <div style={{ marginLeft: '3px', color: '#D32F2F' }}>

                                Material não cadastrada
                            </div>}

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
                        <b style={{ marginRight: '8px' }}>Configurações de potência:</b>
                        {props.eletro ? (
                            <div style={{ color: '#2E7D32' , wordBreak: 'break-word', whiteSpace: 'pre-wrap'}}>
                                {props.eletro}
                            </div>
                        ) : (
                            <div style={{ marginLeft: '3px', color: '#D32F2F' }}>
                                Configurações de potência não cadastrada
                            </div>
                        )}
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

                        <b>Dimenções:</b> {props.dimensao ?
                            <div style={{ color: '#2E7D32', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>

                                {props.dimensao}
                            </div>
                            :

                            <div style={{ marginLeft: '3px', color: '#D32F2F' }}>

                                Dimenções não cadastrada
                            </div>}

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

                        <b>Indicação:</b> {props.indicacao ?
                            <div style={{ color: '#2E7D32', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>

                                {props.indicacao}
                            </div>
                            :

                            <div style={{ marginLeft: '3px', color: '#D32F2F' }}>

                                Indicação não cadastrada
                            </div>}

                    </div>


                    <br></br>

                   








                </div>





            </div>
        </div>
    )
}

export default TaskItemDoChamado