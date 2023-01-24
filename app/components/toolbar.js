import React from 'react';

const Toolbar = (props) => {
  const { menu, title, actions } = props;

  return (
    <div style={{
      position: 'absolute', 
      left: 0, 
      right: 0, 
      top: 0, 
      height: 64, 
      backgroundColor: '#ffffff',
      paddingLeft: 16, 
      paddingRight: 16,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      boxShadow: '0px 0px 20px -15px #424242',
      zIndex: 10}}>
      <div>{menu}</div>
      <div style={{marginRight: 16, marginLeft: 16, fontWeight: 'bold', flex: 1}}>{title}</div>
      <div>{actions}</div>
    </div>
  )
}

export default Toolbar;