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

            <input type="checkbox" checked={toDoItem.isDone} style={{  marginRight: '1rem'}}
                onChange={() => {
                    setIsModified(true)
                    setToDoItem({ ...toDoItem, isDone: !toDoItem.isDone })
                }} />

            {
                toDoItem.isDone ?
                    (
                        <span style={{textDecoration : 'line-through', fontSize: "20px"}}>{toDoItem.task}</span>
                    )
                    :
                    (

                        <span style={{marginRight: '1rem', fontSize: "20px"}}>{toDoItem.task}</span>
                        // <input type="text" value={toDoItem.task} onChange={ (e) => { 
                        //     setIsModified(true)
                        //     setToDoItem({...toDoItem, task : e.target.value})
                        //  } }/>
                    )

                    

            }

            <span style={{cursor: "pointer", marginLeft: "1rem"}} onClick={delteToDoItem}>????</span>
            
        </div>
    )
}

export default ToDoItem
