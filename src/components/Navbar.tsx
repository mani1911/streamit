import { useState, FC } from "react";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import ArchiveIcon from '@mui/icons-material/Archive';
import { QrCode } from "@mui/icons-material";

import { updateApp } from "../context/actions/appActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const Navbar:FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [value, setValue] = useState("Recents");


    function changePage(page : string) {
        dispatch(updateApp({page : page}))
        navigate(page);
    }

    return <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
            console.log(newValue)
            setValue(newValue);
        }}
        >
        <BottomNavigationAction onClick={() => changePage('')} defaultChecked label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction onClick={() => changePage('connect')} label="Connect" icon={<QrCode />} />
        <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
        </BottomNavigation>
  </Paper>
}


export default Navbar;