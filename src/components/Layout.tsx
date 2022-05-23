import React, {ReactNode} from 'react';
import {format} from "date-fns";
import {useLocation, useNavigate} from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {AddCircleOutlineOutlined, SubjectOutlined} from "@mui/icons-material";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';


const drawerWidth: number = 240;

interface Props {
  children: ReactNode;
}

const useStyles = {
    drawerTitle: {
        marginTop: 2,
        marginBottom: 2,
    },
    page: {
        width: '100%'
    },
    drawer: {
        width: drawerWidth,
        ".MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: '#272727'
        },
        ".css-h4y409-MuiList-root": {
            padding: 0,
        },
    },
    root: {
        marginLeft: drawerWidth,
    },
    active: {
        background: '#403c3c'
    },
    appbar: {
        width: `calc(100% - ${drawerWidth}px)`,
    },
    date: {
        flexGrow: 1
    },
    avatar: {
        marginLeft: '24px'
    }
};

const Layout = ({children}: Props) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            text: 'My Notes',
            icon: <SubjectOutlined/>,
            path: '/'
        },
        {
            text: 'Create Note',
            icon: <AddCircleOutlineOutlined/>,
            path: '/create'
        },
    ]

    return (
        <div style={useStyles.root}>
            {/* app bar */}
            <AppBar
            sx={useStyles.appbar}
            >
                <Toolbar>
                    <Typography sx={useStyles.date}>
                        {format(new Date(), 'MMMM dd, yyyy')}
                    </Typography>
                    <Typography>
                        Einsight
                    </Typography>
                    <Avatar
                        alt="GK"
                        sx={useStyles.avatar}
                        src="https://cloudfront-us-east-2.images.arcpublishing.com/reuters/7GBCHQUCEROJDPEVYQW7XG7VAE.jpg"
                    />
                </Toolbar>
            </AppBar>

            {/* side drawer */}
            <Drawer
                sx={useStyles.drawer}
                variant="permanent"
                anchor="left"
            >
                <div>
                    <Typography variant="h5" align="center" sx={useStyles.drawerTitle}>
                        Notës
                    </Typography>
                </div>
                {/* list / links */}
                <List>
                    {menuItems.map(item => (
                        <ListItem
                            button
                            key={item.text}
                            onClick={() => navigate(item.path)}
                            sx={location.pathname === item.path ? useStyles.active : null}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Box style={{ marginTop: `calc(64px + 1%` }}>
                <div style={useStyles.page}>
                    {children}
                </div>
            </Box>
        </div>
    );
};
export default Layout;
