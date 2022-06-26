import React, { Fragment, useEffect, useState } from "react"

const serverApiUrl = 'https://server-tutorial-pern.lnds.repl.co/todos'

const ListTodos = () => {
    const [todos, setTodos] = useState([])
    
    const getTodos = async () => {
      console.log(serverApiUrl)
          try {
              const response = await fetch(serverApiUrl,
                                          )
              const jsonData = await response.json()
  
              setTodos(jsonData)
              console.log(jsonData)
          } catch (err) {
              console.error(err.message)
          }
      }
      useEffect(() => {
          getTodos()
      }, [])
     console.log(todos)

    return (
        <Fragment>
            <table className="table  mt-5 text-center">
                <thead>
                    <tr>
                        <th scope="col">Descripción</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </Fragment>
    )
}

export default ListTodos