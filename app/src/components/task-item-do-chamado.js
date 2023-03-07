import React, { useEffect, useState } from 'react'
import { Button, Chip, IconButton, LinearProgress } from '@mui/material'
import MoreIcon from '@mui/icons-material/MoreVert'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'

const getCookie = require('../utils/getCookie')

const TaskItemDoChamado = (props) => {
    const { nome } = props;
    const { protocolo, unidade, area, classificacao, solicitante,
        status, titulo, setorSolicitante, emailUsuarioSolicitante, telefoneSolicitante, setorSol,
        nomeExecutor, emailExecutor, telefoneExecutor } = props

    const [mensagem, setMensagem] = useState([])




    const data = new Date(props.criacaoChamado)
    function formDate(data) {
        var day = data.getDate();
        var month = data.getMonth() + 1;
        var year = data.getFullYear();
        var dateFormatted = day + '/' + (month) + '/' + year;
        return dateFormatted
    }
    var date = formDate(data)








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
                backgroundColor: '#ffffff',
                marginLeft: 5,
                padding: 16,
                flex: 1,
                borderRadius: 45,
                boxShadow: '0px 0px 20px -10px #424242',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #e0e0e0'
            }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>

                </div>
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: 8 }}>


                    {/* <div style={{ fontSize: 12, marginLeft: 8, marginRight: 8, position: 'relative' }}>
                        <Chip size="small" label={"Protocolo: " + props.protocolo} style={{ background: '#FFF8DC' }} />
                    </div> */}




                    {/* <div style={{ marginLeft: 15, marginRight: 8, position: 'relative' }}>
            <Chip size="small" label={"Chamado aberto em: " + date} />
          </div> */}
                    {/* <div style={{ fontSize: 12, marginLeft: 8, marginRight: 8, position: 'relative' }}>
            <Chip size="small" label={"Classificação: " + props.classificacao} />
          </div> */}

                    {/* <div style={{ fontSize: 12, marginLeft: 8, marginRight: 8, position: 'relative' }}>
            <Chip size="small" label={"Unidade: " + props.unidade} />
          </div> */}
                    {/* <div style={{ fontSize: 12, marginLeft: 8, marginRight: 8, position: 'relative' }}>
            <Chip size="small" label={"Status: " + props.status} />
          </div> */}



                </div>
                {/* <div style={{ fontSize: 13, color: '#424242', marginTop: 16 }}>
          
        <div style={{ flex: 1, fontSize: 15, fontWeight: 'bold', color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          Chamado : {props.area}</div>
         
        
        </div> */}
                <div style={{ fontSize: 13, color: '#424242', marginTop: 16 }}>

                    <div style={{ color: '#00BFFF' }}><b>Solicitante</b></div>
                    {/* <div style={{ flex: 1, fontSize: 12, color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <b>Unidade :</b>xxxxxxxxxxx</div> */}
                    <div style={{ flex: 1, fontSize: 12, color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <b>Nome :</b>  {props.solicitante}</div>

                    <div style={{ flex: 1, fontSize: 12, color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <b>Email:</b> {props.emailUsuarioSolicitante}</div>
                    <div style={{ flex: 1, fontSize: 12, color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <b>Telefone:</b> {props.telefoneSolicitante}</div>

                    <hr></hr>
                    <div style={{ color: '#00BFFF' }}><b>Unidade Responsável</b></div>
                    <div style={{ flex: 1, fontSize: 12, color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <b> Unidade: </b>{props.setorSol}</div>

                    {props.nomeExecutor == '' ? <div style={{color:'red'}}>Aguardando Responsável pelo chamado</div>
                        :
                        <div style={{ flex: 1, fontSize: 12, color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <b> Nome:</b>{props.nomeExecutor}</div>
                    }

                    {props.nomeExecutor == '' ? ''
                        :
                        <div style={{ flex: 1, fontSize: 12, color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <b> Email: </b>{props.emailExecutor}</div>
                    }

                    {props.nomeExecutor == '' ? ''
                        :
                        <div style={{ flex: 1, fontSize: 12, color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <b> Telefone: </b>{props.telefoneExecutor}</div>

                    }











                    



                    <hr></hr>

                    <div style={{ flex: 1, fontSize: 12, color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <b>Status:</b> {props.status}</div>

                    {/* <div style={{ flex: 1, fontSize: 15, fontWeight: 'bold', color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            Unidade: {props.unidade}</div> */}
                    <div style={{ flex: 1, fontSize: 12, color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <b>Classificação:</b> {props.classificacao}</div>



                    <div style={{ flex: 1, fontSize: 12, color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <b>Assunto:</b> {props.titulo}</div>


                </div>





            </div>
        </div>
    )
}

export default TaskItemDoChamado