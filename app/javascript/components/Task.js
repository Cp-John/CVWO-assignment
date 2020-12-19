import React, { useState, useEffect } from "react"
import axios from 'axios'
import styled from 'styled-components'

const Card = styled.div`
  width: 80%;
  margin: 100px auto;
`

const Header = styled.div`
  width: 80%;
  padding: 20px 120px;
`

const Table = styled.table`
  width: 100%;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  border: 1px solid #ccc;

  thead {
    background-color: yellowgreen;
  }

  td {
    padding: 12px;
    border: 1px solid #ccc
  }
`

const Label = styled.div`
  padding: 5px;
  margin: 5px 0;
`

const Task = (props) => {
  const [task, setTask] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const id = props.match.params.id
    axios.get(`/api/tasks/${id}`).then(resp => {
      setTask(resp.data.data)
      setLoaded(true)
    }).catch(resp => {
      console.log(resp)
    })
  }, [])

  function getDateCreated () {
    return task.attributes.created_at.slice(0, 10)
  }
  
  function getDateUpdated () {
    return task.attributes.updated_at.slice(0, 10)
  }

  return (
    <React.Fragment>
      {
        loaded && (
          <Card>
            <Header>
              <h1>{task.attributes.title}</h1>
            </Header>
            <Table>
              <thead>
                <tr>
                  <td>Description</td>
                  <td>Priority</td>
                  <td>Status</td>
                  <td>Due Date</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{task.attributes.description}</td>
                  <td>{task.attributes.priority}</td>
                  <td>{task.attributes.status}</td>
                  <td>{task.attributes.due_date}</td>
                </tr>
              </tbody>
            </Table>
            <Label>
            <label>created on {getDateCreated()}</label>
            </Label>
            <Label>
            <label>last updated on {getDateUpdated()}</label>
            </Label>
          </Card>
        )
      }

    </React.Fragment>
  );
}

export default Task
