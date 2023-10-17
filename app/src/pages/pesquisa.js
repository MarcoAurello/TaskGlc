import { Button, RadioGroup, FormControl, FormControlLabel, Radio, InputAdornment, Dialog, DialogContent, InputLabel, MenuItem, Select, SpeedDial, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import TaskFilter from '../components/task-filter'
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';

import { Box } from "@mui/system";




const getCookie = require('../utils/getCookie')




const Pesquisa = (props) => {
    const { logged } = props
    const [pesquisa, setPesquisa] = useState('')
    const [respostas, setrespostas] = useState([])
    const [setor, setSetor] = useState([])
    // alert(JSON.stringify(props.logged))
    const [openLoadingDialog, setOpenLoadingDialog] = useState(false)
    const [openMessageDialog, setOpenMessageDialog] = useState(false)
    const [checked, setChecked] = React.useState(false);
    const [fkArea, setfkArea] = useState('')
    const [subarea, setSubArea] = useState([])
    const [meuSetor, setMeuSetor] = useState([])
    const [todosEmails, setEmails] = useState([])
    const [emailNaoEncontrado, setEmailNaoEncontrado] = useState(false)
    const [fkUsuario, setFkUsuario] = useState(logged ? props.logged.id : '')

    const [selectedValue1, setSelectedValue1] = useState(null);
    const [selectedValue2, setSelectedValue2] = useState("");
    const [selectedValue3, setSelectedValue3] = useState(null);
    const [selectedValue4, setSelectedValue4] = useState(null);
    const [selectedValue5, setSelectedValue5] = useState(null);
    const [selectedValue6, setSelectedValue6] = useState(null);
    const [selectedValue7, setSelectedValue7] = useState("");
    const [selectedValue8, setSelectedValue8] = useState("");
   
    const [score, setScore] = useState(null)

    const handleChange = (event) => {
        setSelectedValue1(event.target.value);
    };

    const handleChange2 = (event) => {
        setSelectedValue2(event.target.value);
    };
    const handleChange3 = (event) => {
        setSelectedValue3(event.target.value);
    };

    const handleChange4 = (event) => {
        setSelectedValue4(event.target.value);
    };

    const handleChange5 = (event) => {
        setSelectedValue5(event.target.value);
    };

    const handleChange6 = (event) => {
        setSelectedValue6(event.target.value);
    };

    const handleChange7 = (event) => {
        setSelectedValue7(event.target.value);
    };

    const handleChange8 = (event) => {
        setSelectedValue8(event.target.value);
    };


    useEffect(() => {
        carregarEmails()


        if (logged) {
            setFkUsuario(props.logged.id)
        }

        if (
            selectedValue1 !== undefined &&
            selectedValue3 !== undefined &&
            selectedValue4 !== undefined &&
            selectedValue5 !== undefined &&
            selectedValue6 !== undefined
        ) {
            // Converta os valores para números (se já não forem números)
            const num1 = parseFloat(selectedValue1);
            const num3 = parseFloat(selectedValue3);
            const num4 = parseFloat(selectedValue4);
            const num5 = parseFloat(selectedValue5);
            const num6 = parseFloat(selectedValue6);

            // Realize a soma dos valores
            const score = num1 + num3 + num4 + num5 + num6;

            // Atualize a variável de estado 'score' com o valor calculado
            setScore(score);
        }


    }, [selectedValue1, fkUsuario, selectedValue2,
        selectedValue3, selectedValue4, selectedValue5, selectedValue6])


    const novaInteracao = () => {

        const token = getCookie('_token_task_manager')
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                selectedValue1, selectedValue2, selectedValue3, selectedValue4, selectedValue5
                , selectedValue6, selectedValue7, selectedValue8, fkUsuario, score


            })
        }

        fetch(`${process.env.REACT_APP_DOMAIN_API}/api/questionario/`, params)
            .then(response => {
                const { status } = response
                response.json().then(data => {
                    setOpenLoadingDialog(false)
                    if (status === 401) {

                        setOpenMessageDialog(true)
                        alert(data.message)
                        window.location.href = `${process.env.REACT_APP_DOMAIN}/home`
                    } else if (status === 200) {

                        alert(data.message)


                        setOpenMessageDialog(true)

                        window.location.href = `${process.env.REACT_APP_DOMAIN}/home`


                        // setArea(data.data)

                    }
                }).catch(err => setOpenLoadingDialog(true))
            })

    }

    function carregarEmails() {
        setOpenLoadingDialog(true)
        const token = getCookie('_token_task_manager')
        const params = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
    
        fetch(`${process.env.REACT_APP_DOMAIN_API}/api/email/`, params)
          .then(response => {
            const { status } = response
            response.json().then(data => {
              setOpenLoadingDialog(false)
              if (status === 401) {
              } else if (status === 200) {
                setOpenLoadingDialog(false)
    
                // alert(JSON.stringify(data.data))
    
                setEmails(data.data)
    
              }
            })
          })
    
    
      }




    const style = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            margin: '40px'
        },
        label: {
            fontSize: '1.2rem',
            fontWeight: 'bold',
        },
        radioGroup: {
            display: 'flex',
            flexDirection: 'row',
        },
        radio: {
            // Adicione os estilos desejados para o Radio Button aqui
            color: 'blue', // Exemplo de estilo (cor azul)
        },
    };



    return (
        
        <div style={style.container}>
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

<div style={{
                backgroundColor: '#ffffff',
                marginLeft: 16,
                padding: 16,
                flex: 1,
                borderRadius: 45,
                boxShadow: '0px 0px 20px -10px #424242',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #e0e0e0'
            }}>
             < center><h1>Pesquisa de Satisfação GTI</h1>
            <div style={{color:'blue'}}>
            1 = Muito Insatisfeito / 2= Pouco Satisfeito / 3= Satisfeito / 4=Bem Satisfeito / 5 = Muito Satisfeito
                </div> 

             </center>


            </div><p></p>

            <div style={{
                backgroundColor: '#ffffff',
                marginLeft: 16,
                padding: 16,
                flex: 1,
                borderRadius: 45,
                boxShadow: '0px 0px 20px -10px #424242',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #e0e0e0'
            }}>


                <b>1- Em uma escala de 1 a 5, quão satisfeito você está com os serviços de TI oferecidos pela Gerência de Tecnologia da Informação? 
                </b>
                <RadioGroup value={selectedValue1} onChange={handleChange}
                    style={{ display: 'flex', flexDirection: 'row' }}
                >
                    <FormControlLabel value={1} control={<Radio />} label="1" />
                    <FormControlLabel value={2} control={<Radio />} label="2" />
                    <FormControlLabel value={3} control={<Radio />} label="3" />
                    <FormControlLabel value={4} control={<Radio />} label="4" />
                    <FormControlLabel value={5} control={<Radio />} label="5" />
                </RadioGroup>
            </div><p></p>



            <div style={{
                backgroundColor: '#ffffff',
                marginLeft: 16,
                padding: 16,
                flex: 1,
                borderRadius: 45,
                boxShadow: '0px 0px 20px -10px #424242',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #e0e0e0'
            }}>
                <b>2-Qual é o principal motivo da sua pontuação anterior? (Por favor, explique em detalhes.)</b>

                <div style={{ flex: 1, marginBottom: 2 }}>
                    <TextField fullWidth sx={{ m: 1 }} size='200px' label='mensagem...'
                        multiline rows={3} variant="outlined" value={selectedValue2} onChange={e => setSelectedValue2(e.target.value)} />
                </div>

            </div><p></p>


            <div style={{
                backgroundColor: '#ffffff',
                marginLeft: 16,
                padding: 16,
                flex: 1,
                borderRadius: 45,
                boxShadow: '0px 0px 20px -10px #424242',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #e0e0e0'
            }}>
                <b> 3-Como você avaliaria a confiabilidade e estabilidade dos sistemas e aplicativos de TI que utiliza? 
                </b>
                <RadioGroup value={selectedValue3} onChange={handleChange3}
                    style={{ display: 'flex', flexDirection: 'row' }}
                >
                    <FormControlLabel value={1} control={<Radio />} label="1" />
                    <FormControlLabel value={2} control={<Radio />} label="2" />
                    <FormControlLabel value={3} control={<Radio />} label="3" />
                    <FormControlLabel value={4} control={<Radio />} label="4" />
                    <FormControlLabel value={5} control={<Radio />} label="5" />
                </RadioGroup>
            </div><p></p>



            <div style={{
                backgroundColor: '#ffffff',
                marginLeft: 16,
                padding: 16,
                flex: 1,
                borderRadius: 45,
                boxShadow: '0px 0px 20px -10px #424242',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #e0e0e0'
            }}>
                <b> 4-A equipe de suporte de TI é responsiva e eficiente em resolver seus problemas e solicitações? 
                </b>
                <RadioGroup value={selectedValue4} onChange={handleChange4}
                    style={{ display: 'flex', flexDirection: 'row' }}
                >
                    <FormControlLabel value={1} control={<Radio />} label="1" />
                    <FormControlLabel value={2} control={<Radio />} label="2" />
                    <FormControlLabel value={3} control={<Radio />} label="3" />
                    <FormControlLabel value={4} control={<Radio />} label="4" />
                    <FormControlLabel value={5} control={<Radio />} label="5" />
                </RadioGroup>
            </div><p></p>

            <div style={{
                backgroundColor: '#ffffff',
                marginLeft: 16,
                padding: 16,
                flex: 1,
                borderRadius: 45,
                boxShadow: '0px 0px 20px -10px #424242',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #e0e0e0'
            }}>
                <b> 5-Como você classificaria a qualidade das comunicações da equipe de TI em relação a atualizações, interrupções programadas e mudanças nos sistemas? 
                </b><RadioGroup value={selectedValue5} onChange={handleChange5}
                    style={{ display: 'flex', flexDirection: 'row' }}
                >
                    <FormControlLabel value={1} control={<Radio />} label="1" />
                    <FormControlLabel value={2} control={<Radio />} label="2" />
                    <FormControlLabel value={3} control={<Radio />} label="3" />
                    <FormControlLabel value={4} control={<Radio />} label="4" />
                    <FormControlLabel value={5} control={<Radio />} label="5" />
                </RadioGroup>
            </div><p></p>

            <div style={{
                backgroundColor: '#ffffff',
                marginLeft: 16,
                padding: 16,
                flex: 1,
                borderRadius: 45,
                boxShadow: '0px 0px 20px -10px #424242',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #e0e0e0'
            }}>
                <b> 6-Você acha que a equipe de TI está atendendo efetivamente às suas necessidades de suporte e manutenção? 
                </b> <RadioGroup value={selectedValue6} onChange={handleChange6}
                    style={{ display: 'flex', flexDirection: 'row' }}
                >
                    <FormControlLabel value={1} control={<Radio />} label="1" />
                    <FormControlLabel value={2} control={<Radio />} label="2" />
                    <FormControlLabel value={3} control={<Radio />} label="3" />
                    <FormControlLabel value={4} control={<Radio />} label="4" />
                    <FormControlLabel value={5} control={<Radio />} label="5" />
                </RadioGroup>
            </div><p></p>


            <div style={{
                backgroundColor: '#ffffff',
                marginLeft: 16,
                padding: 16,
                flex: 1,
                borderRadius: 45,
                boxShadow: '0px 0px 20px -10px #424242',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #e0e0e0'
            }}>
                <b>7-Existem áreas específicas em que você acredita que podemos melhorar nossos serviços de TI? (Por favor, descreva.)</b>

                <div style={{ flex: 1, marginBottom: 2 }}>
                    <TextField fullWidth sx={{ m: 1 }} size='200px' label='mensagem...'
                        multiline rows={3} variant="outlined" value={selectedValue7} onChange={e => setSelectedValue7(e.target.value)} />
                </div>



            </div>
            <p></p>
            <div style={{
                backgroundColor: '#ffffff',
                marginLeft: 16,
                padding: 16,
                flex: 1,
                borderRadius: 45,
                boxShadow: '0px 0px 20px -10px #424242',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #e0e0e0'
            }}>
                <b>8-Há algum comentário adicional que você gostaria de compartilhar sobre os serviços de TI?</b>

                <div style={{ flex: 1, marginBottom: 2 }}>
                    <TextField fullWidth sx={{ m: 1 }} size='200px' label='mensagem...'
                        multiline rows={3} variant="outlined" value={selectedValue8} onChange={e => setSelectedValue8(e.target.value)} />
                </div>

            </div><p></p>

            {selectedValue1 &&
                selectedValue2 &&
                selectedValue3 &&
                selectedValue4 &&
                selectedValue5 &&
                selectedValue6 &&
                selectedValue7  ?
                <Button variant="contained" onClick={() => { novaInteracao() }} >Enviar</Button>



                : 'Preencha todos os campos'}









        </div>


    );
};

export default Pesquisa;