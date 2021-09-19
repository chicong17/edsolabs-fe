import React, { useState, useEffect } from 'react';
import SideNavBar from '../components/SideNarbar';
import { makeStyles } from '@material-ui/core/styles';
import { drawerWidth } from '../components/SideNarbar';
import action from '../services/action';
import AddTask from '../components/TimerHeader';
import { Container } from '@material-ui/core';
import ListTask from '../components/ListTask';
import image from '../public/assest/paper.jpg';
const useStyles = makeStyles((theme) => ({
  content: {
    // padding: theme.spacing(2),
    position: 'relative',
    flexGrow: 1,
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    backgroundImage: `url(${image})`,
  },
}));
export default function Timer() {
  const classes = useStyles();
  const [task, setTask] = useState([]);
  const [tags, setTags] = useState([]);
  useEffect(() => {
    async function getTask() {
      const res = await action.getTasks();
      setTask(res.data);
    }
    getTask();
  }, [task]);
  useEffect(() => {
    async function getTag() {
      const res = await action.getTags();
      const arr = res.data.map((e) => e.name);
      setTags(arr);
    }
    getTag();
  }, []);

  return (
    <>
      <SideNavBar />
      <main className={classes.content}>
        <AddTask tags={tags} />
        <Container maxWidth="md">
          <ListTask task={task} tags={tags} />
        </Container>
      </main>
    </>
  );
}
