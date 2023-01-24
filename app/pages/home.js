import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '../components/toolbar';
import Content from '../components/content';
import { Badge, IconButton, LinearProgress, Menu, MenuItem, SpeedDial } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';

import TaskItem from '@/components/task-item';
import TaskFilter from '@/components/task-filter';

const Template = (props) => {
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}>
      <MenuItem>Profile</MenuItem>
      <MenuItem>My account</MenuItem>
    </Menu>
  );

  const actions = [
    <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
      <Badge badgeContent={17} color="error">
        <NotificationsIcon />
      </Badge>
    </IconButton>,
    <IconButton size="large" edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true"color="inherit">
      <AccountCircle />
    </IconButton>
  ]

  const menu = <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
      <MenuIcon />
    </IconButton>

  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: '#F5F5F5', overflow: 'none', color: '#424242'}}>      
      <CssBaseline />
      <Toolbar 
        menu={menu}
        title='SENAC - Task Manager'
        actions={actions}
      />
      
      <Content>
        <TaskFilter />
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
      </Content>

      <SpeedDial
        ariaLabel="Nova Tarefa"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<EditIcon />} />
    </div>
  );
}


export default Template;








