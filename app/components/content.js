import React from 'react';

const Content = (props) => {
  const { children } = props;

  return (
    <div style={{
      position: 'absolute', 
      left: 0, 
      right: 0, 
      top: 64, 
      bottom: 0, 
      // padding: 16,
      overflowX: 'none',
      overflowY: 'scroll',
      // display: 'flex',
      // alignItems: 'center',
      // flexDirection: 'column'
    }}>
      {children}
    </div>
  );
}

export default Content;