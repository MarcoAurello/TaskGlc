import React, { useState } from 'react';
import Button from '@mui/material/Button';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

const FileViewer = ({ arquivoDoChamado }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [fileUrl, setFileUrl] = useState('');

  const handleOpenDialog = (url) => {
    setFileUrl(url);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFileUrl('');
  };

  

    


   
 

  return (
    <div
     
    >
      <div style={{ marginLeft: '20px', marginBottom: '10px' }}>
       
      </div>
      <div
      
      >
        {arquivoDoChamado.filter(item => item.hash).map((item, index) => (
          <Button
            key={index}
            size="small"
            style={{
              fontSize: '12px',
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              borderRadius: '5px',
              backgroundColor: '#176DD3',
              color: '#fff',
              marginBottom:'5px',
              boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
            }}
            onClick={() =>
              handleOpenDialog(
                `https://www7.pe.senac.br/storage/api/arquivo/${item.hash}/view/`
              )
            }
          >
            <AttachFileIcon style={{ fontSize: '25px' }} />
            {item.nomeApresentacao}
          </Button>
        ))}
      </div>

      {/* Dialog to view the file */}
      <Dialog 
  open={openDialog} 
  onClose={handleCloseDialog} 
  maxWidth={false} // Remove o limite de largura padrão
  fullWidth={false} // Não usar a largura padrão cheia
  PaperProps={{
    style: {
      width: '80vw', // 80% da largura da viewport
      height: '80vh', // 80% da altura da viewport
      borderRadius: '0', // Remove o arredondamento dos cantos para um visual mais quadrado
    }
  }}
>
  <DialogContent
    style={{
      padding: '0',
      margin: '0',
      height: '100%', // Para garantir que o conteúdo preencha toda a altura do Dialog
    }}
  >
    <iframe
      src={fileUrl}
      style={{
        width: '100%',
        height: '100%',
        border: 'none',
      }}
      title="File Viewer"
    />
  </DialogContent>
</Dialog>

    </div>
  );
};

export default FileViewer;