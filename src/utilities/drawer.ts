import { Dispatch, SetStateAction } from 'react';

export const toggleDrawer =
  ({
    open,
    setIsDrawerOpen,
  }: {
    open: boolean;
    setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
  }) =>
  (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };
