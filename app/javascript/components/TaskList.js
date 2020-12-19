import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
import styled from 'styled-components'

const Table = styled.div`
  table {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 80%;
    margin: auto;
    border: 1px solid #ccc;
  }

  table td, table th {
    padding: 12px;
  }

  table tr:nth-child(even){background-color: #f2f2f2;}
  table tr:nth-child(odd){background-color: #f7ce46;}

  table tr:hover {font-size: large}

  table th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #4CAF50;
    color: white;
  }
`
const Toggle = styled.div`
  .switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
  }

  .switch input { 
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: #2196F3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`
const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [showAll, setShowAll] = useState(false)

  const [list, setList] = useState([])

  // fetch data
  useEffect(() => {
    axios.get('/api/tasks').then(resp => {
      console.log(resp.data.data)
      setTasks(resp.data.data)
    }).catch(resp => {
      console.log(resp)
    })
  }, [])

  useEffect(() => {
    let tasksShown = showAll ? tasks : tasks.filter(task => task.attributes.status != "completed")
    setList(tasksShown.map(item => {
      return (
        <tr key={item.attributes.id} id={item.attributes.id}>
          <td>{item.attributes.title}</td>
          <td><Link to={`/tasks/${item.attributes.id}`}>View Task</Link></td>
          <td><button onClick={handleDelete}>Delete</button></td>
          <td><button onClick={handleDone} disabled={item.attributes.status == 'completed'}>Done</button></td>
        </tr>
      )
    }))
  }, [showAll, tasks])

  function handleDelete(e) {
    const id = e.target.parentNode.parentNode.getAttribute('id')
    axios.delete(`/api/tasks/${id}`).then(resp => {
      setTasks(tasks.filter(task => task.id != id))
    }).catch(resp => {
      console.log(resp)
    })
  }

  const handleDone = (e) => {
    const id = e.target.parentNode.parentNode.getAttribute('id')
    axios.put(`/api/tasks/${id}`, { task: { status: 'completed' } }).then(resp => {
      setTasks(tasks.map(task => task.id == id ? resp.data.data : task))
    }).catch(resp => {
      console.log(resp)
    })
  }

  const TableCom = () => {
    return (
      <table>
        <tbody>
          {list}
        </tbody>
      </table>
    )
  }

  const handleToggle = () => {
    setShowAll(!showAll)
  }
  return (
    <React.Fragment>
          <div>
            <span>Show All</span>
            <Toggle>
              <label className="switch">
                <input type="checkbox" onChange={handleToggle}></input>
                <span className="slider round"></span>
              </label>
            </Toggle>
            <br></br>
            <Table>
              <TableCom />
            </Table>
          </div>
    </React.Fragment>
  );
}

export default TaskList
