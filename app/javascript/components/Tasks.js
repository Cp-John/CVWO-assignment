import React, { useState } from "react"
import styled from 'styled-components'
import TaskList from './TaskList'
import NewTaskInfo from "./NewTaskInfo"

const Home = styled.div`
  text-align: center;
  max-width: 1200px;
  margin: auto;
`
const Header = styled.div`
  padding: 10px 100px 0px 100px;
  h1 {
    font-size: 42px;
  }
`
const Subheader = styled.div`
  font-weight: 300;
  font-size: 20px;
`

const Form = styled.div`
  padding: 20px;

  input[type=text], select {
    width: 40%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  input[type=submit] {
    width: 12%;
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  input[type=submit]:hover {
    background-color: #45a049;
  }
`

const Tasks = () => {
  const [title, setTitle] = useState("")
  const [addNewTask, setAddNewTask] = useState(false)
  
  const handleSubmission = (e) => {
    e.preventDefault()
    setTitle(e.target.firstChild.value)
    setAddNewTask(true)
  }

  const FormCom = () => {
    return (
      <form onSubmit={handleSubmission}>
        <input type="text" id="title" name="title" placeholder="Title of your new task"></input>
        <input type="submit" value="Submit"></input>
      </form>
    )
  }

  const Body = () => {
    if (addNewTask) {
      return <NewTaskInfo title={title}/>
    } else {
      return (
        <div>
            <Form>
              <FormCom />
            </Form>
            <TaskList />
          </div>
      )
    }
  }

  return (
    <React.Fragment>
      <Home>
        <Header>
          <h1>Todo Manager</h1>
          <Subheader>Make your life more organized!</Subheader>
        </Header>

        <Body />
      </Home>
    </React.Fragment>
  );
}

export default Tasks
