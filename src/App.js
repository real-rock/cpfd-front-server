import MiniDrawer from './Components/Drawer/Drawer';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';

const App = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MiniDrawer />
        </LocalizationProvider>
    );
};

export default App;
