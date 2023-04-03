import { Button, Chip, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';

const AtividadeRecebidaNotificationItem = (props) => {
    const { item } = props
    const [selecionar, setselecionar] = useState([])



    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name) {
        let wordNumber = name.split(' ')
        let text = ''
        if (wordNumber.length > 1) {
            text = `${name.split(' ')[0][0].toUpperCase()}${name.split(' ')[1][0].toUpperCase()}`
        } else {
            text = `${name.split(' ')[0][0].toUpperCase()}${name.split(' ')[0][1].toUpperCase()}`
        }

        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: text,
        };
    }

    function corCriticidade(selecionar) {
        var cor = selecionar


        if (cor === 'Não Definido') {
            var color = "#32CD32"
        } if (cor === 'Circunstancial') {
            var color = "#f2921d"
        } if (cor === 'Importante') {
            var color = "#FFA500"
        } if (cor === 'Urgente') {
            var color = "#FF4040"
        } if (cor === ' Execução Imediata') {
            var color = "#FF4040"
        }
        return color
    }

    return (
        <MenuItem style={{ display: 'flex', marginBottom: 5, flexDirection: 'row', borderBottom: '1px solid #EEEEEE', minWidth: 350 }}
            onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/${item.id}/edit`}>

            <div style={{ marginLeft: 16, marginBottom: 5, color: 'red' }}><b>Nova Atividade para você &#9997; </b>

                <div style={{ width: '100%', fontSize: 12, color: '#424242' }}>{'Chamado: ' + item.titulo}</div>
                <div style={{ width: '100%', fontSize: 12, color: '#424242' }}>{'Solicitante: ' + item.Usuario.nome}</div>
                <div style={{ width: '100%', fontSize: 12, color: '#424242' }}>{'Unidade: ' + item.Usuario.Area.Unidade.nome}</div>

                {item.categoria === '' ? '' :
                    <div style={{ width: '100%', fontSize: 12, color: '#424242' }}>{'Categoria: ' + item.categoria}</div>}

                <div style={{ width: '100%', fontSize: 12, color: corCriticidade(item.Classificacao.nome) }}>{'Clasificação: ' + item.Classificacao.nome}</div>
                {/* <div style={{ width: '100%', 
                fontSize: 12, color: '#424242' }}>{'Problema: ' + item.titulo}</div> */}

                <div style={{ width: '70%', marginTop: 4 }}>
                    <Button variant="contained" size="small" >Ver Atividade</Button>
                </div>
            </div>
        </MenuItem>
    )
}


export default AtividadeRecebidaNotificationItem