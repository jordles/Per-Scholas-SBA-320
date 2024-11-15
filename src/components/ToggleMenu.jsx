import React from 'react'
import { useState } from 'react'
import Favorite from './Favorite'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';

function ToggleMenu({favorites, toggleFavorite}) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  }

  const DrawerList = (
    <Box sx={{ width: 500 }} role="presentation" onClick={toggleDrawer(false)}>
      <Favorite favorites={favorites} toggleFavorite={toggleFavorite}/>
    </Box>
  )

  return (
    <div>
      <Button onClick={toggleDrawer(true)}><span className="material-symbols-rounded menu">menu</span></Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  )
}

export default ToggleMenu