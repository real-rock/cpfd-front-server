import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import { ToolBarHeader } from './ToolbarHeader';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ActivityManager from '../../Pages/ActivityManager';
import { ActivityLog } from '../../Pages/ActivityLog';
import { ParticleChart } from '../../Pages/ParticleChart';
import { ParticleLog } from '../../Pages/ParticleLog';

const drawerWidth = 240;

const openedMixin = theme => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = theme => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

const MiniDrawer = () => {
    const theme = useTheme();
    let navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);

    const itemsList = [
        {
            text: 'Activity',
            icon: <HomeRoundedIcon />,
            onClick: () => navigate('/'),
        },
        {
            text: 'Particle',
            icon: <SsidChartIcon />,
            onClick: () => navigate('/particle/chart'),
        },
    ];

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <ToolBarHeader open={open} handleDrawerOpen={handleDrawerOpen} />
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? (
                            <ChevronRightIcon />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {itemsList.map((item, index) => {
                        const { text, icon, onClick } = item;
                        return (
                            <ListItemButton
                                key={text}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                onClick={() => {
                                    setPage(index);
                                    onClick();
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                        color:
                                            index === page
                                                ? 'black'
                                                : '#CCCCCC',
                                    }}
                                >
                                    {icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={text}
                                    sx={{ opacity: open ? 1 : 0 }}
                                />
                            </ListItemButton>
                        );
                    })}
                </List>
                <Divider />
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Routes>
                    <Route path="/" exact element={<ActivityManager />} />
                    <Route path="/activity/log" element={<ActivityLog />} />
                    <Route path="/particle/chart" element={<ParticleChart />} />
                    <Route path="/particle/log" element={<ParticleLog />} />
                </Routes>
            </Box>
        </Box>
    );
};

export default MiniDrawer;
