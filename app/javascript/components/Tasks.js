import React, { useState } from "react"
import styled from 'styled-components'
import TaskList from './TaskList'
import NewTaskInfo from "./NewTaskInfo"
import TitleInputField from './TitleInputField'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import axios from 'axios'

const Home = styled.div`
  text-align: center;
  max-width: 1200px;
  margin: auto;
`
const Header = styled.div`
  margin: 20px auto 40px;
`

const Tasks = () => {
  const [title, setTitle] = useState("")
  const [addNewTask, setAddNewTask] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setAddNewTask(true)
  }

  const handleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleCancel = () => {
    setAddNewTask(false)
  }

  return (
    <React.Fragment>
      <Home>
        <Header>
          <Typography variant="h3" gutterBottom>Todo Manager</Typography>
          <Typography variant="h6" gutterBottom>Make your life more organized!</Typography>
        </Header>
        {
          addNewTask &&
          <NewTaskInfo task={{ title: title }} handleCancel={handleCancel} requestType={"post"}/>
        }
        {
          !addNewTask &&
          <div>
            <TitleInputField handleSubmit={handleSubmit} handleChange={handleChange} />
            <Divider />
            <TaskList />
          </div>
        }
      </Home>

    </React.Fragment>
  );
}

export default Tasks
