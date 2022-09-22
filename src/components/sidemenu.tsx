import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";

// const drawerWidth = 150;

export default function PermanentDrawerLeft() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <div style={{ display: "flex" }}>
      <AppBar
        position="fixed"
        // sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Typography variant="h6">
            <NavLink to="/actor">Cinema</NavLink>
          <div style={{ display: "flex" }}>
            <NavLink to="/actor">
              <ListItemText primary={"Actors"} />
            </NavLink>
            <NavLink to="/movie">
              <ListItemText primary={"Movies"} />
            </NavLink>
            <NavLink to="/login">
              <ListItemText primary={"Login"} />
            </NavLink>
            <NavLink to="/register">
              <ListItemText primary={"Register"} />
            </NavLink>
          </div>
        </Typography>
      </AppBar>
      </div>

      {/* <Drawer
        sx={{
            width: drawerWidth,
            flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem key={"Actors"} disablePadding>
            <NavLink to="/actor">
              <ListItemButton>
                <ListItemText primary={"Actors"} />
              </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem key={"Movies"} disablePadding>
            <NavLink to="/movie">
              <ListItemButton>
                <ListItemText primary={"Movies"} />
              </ListItemButton>
            </NavLink>
          </ListItem>
        </List>
        <Divider />
        <List>
          {["Login", "Register"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <NavLink to={text}>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Drawer> */}
      {/* <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
      </Box> */}
    </Box>
  );
}
