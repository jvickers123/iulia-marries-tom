import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import { toggleDrawer } from '@/utilities/drawer';
import { Dispatch, SetStateAction } from 'react';
import { ShowPanels } from '@/types/guest-page-types';

const MenuList = ({
  setIsDrawerOpen,
  setShowPanels,
}: {
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
  setShowPanels: Dispatch<SetStateAction<ShowPanels>>;
}) => {
  return (
    <Box
      role="presentation"
      onClick={toggleDrawer({ open: false, setIsDrawerOpen })}
      className="drawer-menu__list"
      onKeyDown={toggleDrawer({ open: false, setIsDrawerOpen })}>
      <h2 className="drawer-menu__list-heading">Menu</h2>
      <List>
        <ListItem className="drawer-menu__list-item">
          <ListItemButton
            onClick={() =>
              setShowPanels(prev => ({ ...prev, generalInfo: true }))
            }>
            <ListItemText primary="General Info" />
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem className="drawer-menu__list-item">
          <ListItemButton>
            <ListItemText
              primary="Accomodation Info"
              onClick={() =>
                setShowPanels(prev => ({ ...prev, accomodationInfo: true }))
              }
            />
          </ListItemButton>
        </ListItem>

        <ListItem className="drawer-menu__list-item">
          <ListItemButton
            onClick={() =>
              setShowPanels(prev => ({ ...prev, bookAccomodation: true }))
            }>
            <ListItemText primary="Book Accomodation" />
          </ListItemButton>
        </ListItem>

        <ListItem className="drawer-menu__list-item">
          <ListItemButton
            onClick={() =>
              setShowPanels(prev => ({ ...prev, foodInfo: true }))
            }>
            <ListItemText primary="Food Info" />
          </ListItemButton>
        </ListItem>

        <ListItem className="drawer-menu__list-item">
          <ListItemButton
            onClick={() =>
              setShowPanels(prev => ({ ...prev, orderFood: true }))
            }>
            <ListItemText primary="Order Food" />
          </ListItemButton>
        </ListItem>

        <ListItem className="drawer-menu__list-item">
          <ListItemButton
            onClick={() => setShowPanels(prev => ({ ...prev, rsvp: true }))}>
            <ListItemText primary="RSVP" />
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem className="drawer-menu__list-item">
          <ListItemButton
            onClick={() => setShowPanels(prev => ({ ...prev, notices: true }))}>
            <ListItemText primary="Notices" />
          </ListItemButton>
        </ListItem>

        <ListItem className="drawer-menu__list-item">
          <ListItemButton
            onClick={() => setShowPanels(prev => ({ ...prev, timings: true }))}>
            <ListItemText primary="Timings" />
          </ListItemButton>
        </ListItem>

        <ListItem className="drawer-menu__list-item">
          <ListItemButton
            onClick={() => setShowPanels(prev => ({ ...prev, gift: true }))}>
            <ListItemText primary="Gifts" />
          </ListItemButton>
        </ListItem>

        <ListItem className="drawer-menu__list-item">
          <ListItemButton
            onClick={() => setShowPanels(prev => ({ ...prev, contact: true }))}>
            <ListItemText primary="Contact" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default MenuList;
