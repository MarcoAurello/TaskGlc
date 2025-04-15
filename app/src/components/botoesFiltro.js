import React, { useState } from 'react';
import { Button } from '@mui/material';

export default function MeuComponente({ meuSetorTotal, logged }) {
  const [filtroStatus, setFiltroStatus] = useState(null);

  const itensFiltrados = filtroStatus
    ? meuSetorTotal.filter(item => item.Status.nome === filtroStatus)
    : meuSetorTotal;

  return (
    <div>
      {/* Botões de filtro */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <div
          onClick={() => setFiltroStatus('Aberto')}
          style={{
            backgroundColor: '#f2f2f2',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '12px 16px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)'
          }}
        >
          Aguardando aprovação do gestor:
          <span style={{ fontSize: '20px', color: 'red' }}>
            {meuSetorTotal && logged ? meuSetorTotal.filter(item => item.Status.nome === 'Aberto').length : ''}
          </span>
        </div>
        <div
          onClick={() => setFiltroStatus('Iniciado')}
          style={{
            backgroundColor: '#f2f2f2',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '12px 16px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)'
          }}
        >
          Aguardando Análise Fiscal:
          <span style={{ fontSize: '20px', color: 'red' }}>
            {meuSetorTotal && logged ? meuSetorTotal.filter(item => item.Status.nome === 'Iniciado').length : ''}
          </span>
        </div>
        <div
          onClick={() => setFiltroStatus('Pendênte')}
          style={{
            backgroundColor: '#f2f2f2',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '12px 16px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)'
          }}
        >
          Aguardando Pagamento GLC:
          <span style={{ fontSize: '20px', color: 'red' }}>
            {meuSetorTotal && logged ? meuSetorTotal.filter(item => item.Status.nome === 'Pendênte').length : ''}
          </span>
        </div>
      </div>

      {/* Tabela de resultados filtrados */}
      <table>
        <tbody>
          {itensFiltrados.map((item, index) => (
            <tr key={index} style={{ fontSize: '16px' }}>
              <th scope="row" style={{ wordBreak: "break-word" }}>
                <b style={{ color: 'black', marginRight: '8px' }}>Nota Fiscal:</b>
                {item.titulo}
                <br />
                <b style={{ color: 'black', marginRight: '8px' }}>Cadastrado por:</b>
                {item?.Usuario?.nome}
                <br />
                <b style={{ color: 'black', marginRight: '8px' }}>Data envio para pagamento:</b>
                {new Date(item.createdAt).toLocaleDateString()}
                <br />
                <div style={{ color: "#9ad1f4", display: 'flex', alignItems: 'center' }}>
                  <b style={{ color: 'black', marginRight: '8px' }}>Empresa:</b>
                  <span style={{ color: '#f4a261' }}>{item.Contrato?.nomeEmpresa}</span> &#128590;
                </div>
                <div style={{ color: "red", display: 'flex', alignItems: 'center' }}>
                  <b style={{ color: 'black', marginRight: '8px' }}>Status:</b>
                  {item.Status.nome === 'Aberto' && 'Aguardando Aprovação do gestor'}
                  {item.Status.nome === 'Iniciado' && 'Nota em análise fiscal'}
                  {item.Status.nome === 'Pendênte' && 'Nota aguardando pagamento na GLC'}
                  {item.Status.nome === 'Concluido' && 'Nota Fiscal paga'}
                  {item.Status.nome === 'Planejado para Iniciar' && 'Lançamento direto pelo setor'}
                </div>
              </th>
              <th>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() =>
                    (window.location.href = `${process.env.REACT_APP_DOMAIN}/nfCadastro/${item.id}/edit`)
                  }
                >
                  Ver
                </Button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
