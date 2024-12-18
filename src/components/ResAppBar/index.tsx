import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface ResAppBarProps {
  navlist: { text: string; href: string }[];
  children: React.ReactNode; // Ensure children prop is defined for Outlet
  navTitle: string;
}

const drawerWidth = 240;

const ResAppBar: React.FC<ResAppBarProps> = ({ navlist, children, navTitle }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {navTitle} {/* Displaying navTitle from props */}
      </Typography>
      <Divider />
      <List>
        {navlist.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.href} sx={{ textAlign: "center" }}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {navTitle} {/* Displaying navTitle in the app bar */}
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navlist.map((item) => (
              <Button
                key={item.text}
                component={Link}
                to={item.href}
                sx={{ color: "#fff", textDecoration: "none", mr: 2 }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3, flexGrow: 1 }}>
        {children} {/* Rendering children (Outlet content) */}
      </Box>
    </Box>
  );
};

export default ResAppBar;