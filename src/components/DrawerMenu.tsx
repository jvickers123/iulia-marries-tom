import { Dispatch, SetStateAction, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { toggleDrawer } from '@/utilities/drawer';
import menuSVG from '../../public/assets/menu.svg';
import MenuList from './MenuList';
import Image from 'next/image';
import { ShowPanels } from '@/types/guest-page-types';

const DrawerMenu = ({
  setShowPanels,
  isDrawerOpen,
  setIsDrawerOpen,
}: {
  setShowPanels: Dispatch<SetStateAction<ShowPanels>>;
  isDrawerOpen: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="drawer-menu">
      <Button
        onClick={toggleDrawer({ open: true, setIsDrawerOpen })}
        className="drawer-menu__open-btn"
        variant="contained"
        aria-label="menu">
        <Image
          src={menuSVG}
          alt="menu"
          className="drawer-menu__open-btn-image"
        />
      </Button>
      <Drawer
        open={isDrawerOpen}
        onClose={toggleDrawer({ open: false, setIsDrawerOpen })}>
        <MenuList
          setIsDrawerOpen={setIsDrawerOpen}
          setShowPanels={setShowPanels}
        />
      </Drawer>
    </div>
  );
};

export default DrawerMenu;
