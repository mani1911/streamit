import { RootState } from "../context/store";
import { useDispatch, useSelector } from "react-redux";
// import { styled } from '@mui/material/styles';
import { IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { removePeersConnection } from "../context/actions/peerActions";

const ConnectedPage = () => {

  const dispatch = useDispatch();
  const connected = useSelector((state: RootState) => state.peer.peersConnected);
  return (
<div style = {{display: 'flex', flexDirection: 'column', height: '90vh', justifyContent: 'center',alignItems: 'center'}}>
        <Typography
        variant="h6"
        gutterBottom
        sx={{ mt: 1, textAlign: "center" }}
      >
        Connected Peers
      </Typography>
        <List 
        sx={{
                // width: '80vw',
                // height: '60vh',
                // backgroundColor: "rgba(255, 255, 255, 0.01)", // 50% transparency
                // backdropFilter: "blur(10px)", // Optional: adds a blur effect to enhance transparency
                // borderRadius: 2,
                // // display: "flex",
                // alignItems: "center",
                // justifyContent: "center",
                // boxShadow: 3,
            }}>

        {connected.map(id => (

                          <ListItem
                            key={id}
                            secondaryAction={
                              <IconButton onClick = {() => dispatch(removePeersConnection(id))} edge="end" aria-label="delete">
                                <DeleteIcon sx = {{fill : 'white'}}/>
                              </IconButton>
                            }
                          >
                            <ListItemText primary={id} />
                          </ListItem>

            // <p key={id}>
            //     {id}
            // </p>
        ))}
        </List>
    </div>
  )
}

export default ConnectedPage