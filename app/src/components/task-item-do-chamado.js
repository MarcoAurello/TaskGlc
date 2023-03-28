import React, { useEffect, useState } from 'react'
import { Button, Chip, IconButton, LinearProgress } from '@mui/material'
import MoreIcon from '@mui/icons-material/MoreVert'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'

const getCookie = require('../utils/getCookie')

const TaskItemDoChamado = (props) => {
    const { nome } = props;
    const { protocolo, unidade, area, classificacao, solicitante,
        status, titulo, emailUsuarioSolicitante, telefoneSolicitante, setorSol,
        nomeExecutor, emailExecutor, telefoneExecutor, categoria,
        setorSolicitante } = props

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


                {/* <div style={{ fontSize: 13, color: '#424242', marginTop: 16 }}>
          
        <div style={{ flex: 1, fontSize: 15, fontWeight: 'bold', color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          Chamado : {props.area}</div>
         
        
        </div> */}
                <div style={{ fontSize: 13, color: '#424242', marginTop: 16 }}>
                    <div style={{ flex: 1, fontSize: 16, color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <b>Assunto:{props.titulo}</b> </div>

                    {props.categoria != '' ?
                        <div style={{ flex: 1, fontSize: 12, color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <b>Categoria:{props.categoria}</b> </div>
                        : ''

                    }



                    <div style={{ flex: 1, fontSize: 12, color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <b>Status:{props.status}</b> </div>

                    {/* <div style={{ flex: 1, fontSize: 15, fontWeight: 'bold', color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
Unidade: {props.unidade}</div> */}
                    <div style={{ flex: 1, fontSize: 12, color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <b>Classificação:</b> {props.classificacao}</div>




                    <hr></hr>

                    <div ><b>Solicitante</b></div>
                    {/* <div style={{ flex: 1, fontSize: 12, color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <b>Unidade :</b>xxxxxxxxxxx</div> */}
                    {/* <div style={{ flex: 1, fontSize: 12, color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <b>Setor :</b>  {props.setorSolicitante}</div> */}

                    <div style={{ flex: 1, fontSize: 12, color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <b>Nome :</b>  {props.solicitante}</div>

                    <div style={{ flex: 1, fontSize: 12, color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <b>Setor :</b>  {props.setorSolicitante}</div>

                    <div style={{ flex: 1, fontSize: 12, color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <b>Email:</b> {props.emailUsuarioSolicitante}</div>
                    <div style={{ flex: 1, fontSize: 12, color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <b>Telefone:</b> {props.telefoneSolicitante}</div>

                    <hr></hr>
                    <div ><b>Unidade Responsável</b></div>
                    <div style={{ flex: 1, fontSize: 12, color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <b> Unidade: </b>{props.setorSol}</div>

                    {props.nomeExecutor === '' ? <div style={{ color: 'red' }}>Aguardando Responsável pela Atividade</div>
                        :
                        <div style={{ flex: 1, fontSize: 12, color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <b> Nome:</b>{props.nomeExecutor}</div>
                    }

                    {props.nomeExecutor === '' ? ''
                        :
                        <div style={{ flex: 1, fontSize: 12, color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <b> Email: </b>{props.emailExecutor}</div>
                    }

                    {props.nomeExecutor === '' ? ''
                        :
                        <div style={{ flex: 1, fontSize: 12, color: '#424242', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <b> Telefone: </b>{props.telefoneExecutor}</div>

                    }


















                </div>





            </div>
        </div>
    )
}

export default TaskItemDoChamado