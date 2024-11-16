import React from 'react'
import { useState } from 'react'
import Favorite from './Favorite'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';

function ToggleMenu({favorites, downloadGif, toggleFavorite}) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  }

  const DrawerList = (
    <Box className="box"sx={{ width: 500 }} role="presentation">
      <Favorite favorites={favorites} downloadGif={downloadGif} toggleFavorite={toggleFavorite}/>
    </Box>
  )

  return (
    <div>
      <Button className="menu-button" onClick={toggleDrawer(true)}><span className="material-symbols-rounded menu">menu</span></Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  )
}

export default ToggleMenu