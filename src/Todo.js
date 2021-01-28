import React, { useState } from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CreateIcon from '@material-ui/icons/Create';
import { List, ListItem, ListItemAvatar, ListItemText, Button, Modal, makeStyles } from '@material-ui/core';
import db from "./firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    alignItems: 'center'
  },
}));

function Todo({ todo: { todo, id } }) {
  const [open, setOpen] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const classes = useStyles();

  const handleTodoChange = (e) => {
    setNewTodo(e.target.value);
  }
  const updateTodo = () => {
    db.collection('todos').doc(id).update({
      todo: newTodo,
      // timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setOpen(false);
  }
  return (
    <>
      <Modal
        open={open}
        onClose={() => { setOpen(false) }}
      >
        <div className={classes.paper}>
          {/* <form> */}
          <input placeholder={todo} value={newTodo} onChange={handleTodoChange} />
          <Button onClick={updateTodo}>Update Todo</Button>
          {/* </form> */}
        </div>

      </Modal>
      <List>
        <ListItem>
          <ListItemAvatar>
            {/* <Avatar>
            <BeachAccessIcon />
          </Avatar> */}
          </ListItemAvatar>
          <ListItemText primary={todo} secondary="somthing next line" />
          <DeleteForeverIcon onClick={() => db.collection('todos').doc(id).delete()} />
          {/* <Button>EDIT ME</Button> */}
          <CreateIcon onClick={() => { setOpen(true) }} />
          {/* DELETE ME
          </Button> */}
        </ListItem>
      </List >
    </>
  )
}

export default Todo
