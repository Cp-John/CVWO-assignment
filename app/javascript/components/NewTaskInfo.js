import React, { useState, useEffect } from "react"
import axios from 'axios'
import styled from 'styled-components'
import TaskList from './TaskList'

const Textarea = styled.div`
  textarea {
      font-size: 13px;
      letter-spacing: 1px;
  }
  textarea {
      padding: 10px;
      line-height: 1.5;
      border-radius: 5px;
      border: 1px solid #ccc;
      box-shadow: 1px 1px 1px #999;
  }
`

const Card = styled.div`
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px #999;
  width: 60%;
  margin: 10px auto;
  padding: 10px;

  input[type=submit] {
    width: 12%;
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 40px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button {
    width: 12%;
    background-color: red;
    color: white;
    padding: 14px 20px;
    margin: 8px 40px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`

const Date = styled.div`
  input {
    margin: 10px;
  }
`

const Select = styled.div`
  select {
    margin: 10px;
    padding: 5px;
  }
`

const NewTaskInfo = (props) => {
    const [newTask, setNewTask] = useState({})
    const [ifSubmit, setIfSubmit] = useState(false)

    useEffect(() => {
        if (ifSubmit)
            axios.post('/api/tasks', { task: newTask }).then(resp => {
                window.location.href = '/'
            }).catch(resp => console.log(resp))
    }, [newTask])

    const cancel = (e) => {
        e.preventDefault()
        window.location.href = '/'
    }

    const handleAddNewTask = (e) => {
        e.preventDefault()
        const description = e.target.children[0].firstChild.value
        const due_date = e.target.children[1].lastChild.value
        const priority = e.target.children[2].lastChild.value
        setNewTask(
            Object.assign({}, newTask, { title: props.title, description: description, due_date: due_date, priority: priority }))
        setIfSubmit(true)
    }

    return (
        <React.Fragment>
            <Card>
                <h3>Title: {props.title}</h3>
                <form onSubmit={handleAddNewTask}>
                    <Textarea>
                        <textarea id="description" name="description"
                            rows="5" cols="60" placeholder="Description...">
                        </textarea>
                    </Textarea>
                    <Date>
                        <label>Due date:</label>
                        <input type="date" id="due_date" name="due_date"></input>
                    </Date>

                    <Select>
                        <label>Priority:</label>
                        <select name="priority">
                            <option value="medium">medium</option>
                            <option value="high">high</option>
                            <option value="low">low</option>
                        </select>
                    </Select>

                    <button onClick={cancel}>Cancel</button>
                    <input type="submit" value="Add task"></input>
                </form>
            </Card>
        </React.Fragment>
    );
}

export default NewTaskInfo
