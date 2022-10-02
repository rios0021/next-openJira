import { useContext } from "react";

import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import InboxIcon from '@mui/icons-material/Inbox';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { UIContext } from "../../context/ui";

const menuItems: string[]= ['Inbox', 'Starred', 'Send Email', 'Drafts']

export const Sidebar = () => {

    const {sidebarOpen, closeSidebar} = useContext(UIContext)

    return (
        <Drawer
            anchor="left"
            open={sidebarOpen}
            onClose={closeSidebar}
        >
            <Box sx={{ width: 250}}>
                <Box sx={{padding: '5px 10px'}}>
                    <Typography variant="h4">Menu</Typography>
                </Box>
                <List>
                    {
                        menuItems.map((item,index) => (
                            <ListItem button key={item}>
                                <ListItemIcon>
                                    {index % 2 ? <InboxIcon/> : <MailOutlineIcon/>}
                                </ListItemIcon>
                                <ListItemText primary={item} />
                            </ListItem>
                        ))
                    }
                </List>
                <Divider/>
                <List>
                    {
                        menuItems.map((item,index) => (
                            <ListItem button key={item}>
                                <ListItemIcon>
                                    {index % 2 ? <InboxIcon/> : <MailOutlineIcon/>}
                                </ListItemIcon>
                                <ListItemText primary={item} />
                            </ListItem>
                        ))
                    }
                </List>
            </Box>
        </Drawer>
    )
}