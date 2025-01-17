import { RootState } from "../context/store";
import { useSelector } from "react-redux";
// import { styled } from '@mui/material/styles';
import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const ConnectedPage = () => {

  const connected = useSelector((state: RootState) => state.peer.peersConnected);
  return (
    <>
        <p>Connected Peers</p>
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
                            secondaryAction={
                              <IconButton edge="end" aria-label="delete">
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
    </>
  )
}

export default ConnectedPage