import React, { useState, useEffect } from 'react'

const ToDoItem = ({ toDoItems, handleDeleteToDoItem }) => {

    const [toDoItem, setToDoItem] = useState(toDoItems)
    const [isModified, setIsModified] = useState(false)

    console.log("To Do Item Single =", toDoItems);



    useEffect(() => {


        if (isModified) {

            fetch(`http://localhost:9999/api/v1/toDoItem/${toDoItem.id}`, {
                method: 'PUT',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(toDoItem)
            })
            .then((response) => response.json())
            .then((data) => {

                setIsModified(false)
                setToDoItem(data)
            });

            console.log("To Do Item Just changed")

        }



    }, [toDoItem, isModified])



    const delteToDoItem = ()=>{

        fetch(`http://localhost:9999/api/v1/toDoItem/${toDoItem.id}`, {
            method: 'DELETE',
            headers: {
                "content-type": "application/json"
            }
        })
        .then((response) => handleDeleteToDoItem(toDoItem));

    }

    return (
        <div>

            <input type="checkbox" checked={toDoItem.isDone}
                onChange={() => {
                    setIsModified(true)
                    setToDoItem({ ...toDoItem, isDone: !toDoItem.isDone })
                }} />

            {
                toDoItem.isDone ?
                    (
                        <span style={{textDecoration : 'line-through'}}>{toDoItem.task}</span>
                    )
                    :
                    (

                        // <span >{toDoItem.task}</span>
                        <input type="text" value={toDoItem.task} onChange={ (e) => { 
                            setIsModified(true)
                            setToDoItem({...toDoItem, task : e.target.value})
                         } }/>
                    )

                    

            }

            <span style={{cursor: "pointer"}} onClick={delteToDoItem}>🚮</span>
            
        </div>
    )
}

export default ToDoItem
