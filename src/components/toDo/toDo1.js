import React, { useState, useEffect } from 'react'
import ToDoItem1 from "./toDoItem1";


const getLocalData = () => {

  console.log("ok");

  const lists = JSON.parse(localStorage.getItem("toDo"));

  console.log(lists)
  if (lists) {
    console.log("test")

    return lists;
  } else {
    return [];
  }
}

const ToDo1 = () => {

  const [toDoItems, setToDoItems] = useState(null)
  const [item, setItem] = useState(null)

  useEffect(() => {

    // do something on load
    console.log("I have loaded up")

    if (!toDoItems) {

      fetch("http://localhost:9999/api/v1/toDoList")
        .then((response) => response.json())
        .then((data) => {
          console.log("To Do Item List ", data)

          // localStorage.setItem("toDo", JSON.stringify(data))

          setItem("");
          setToDoItems(data);

        })

    }



  }, [toDoItems]);



  // add item
  const addNewToDoItem = () => {

    const createItem = { id: null, task: item, isDone: false }

    fetch("http://localhost:9999/api/v1/toDoItem", {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(createItem)

    })
      .then((response) => response.json())
      .then((data) => {

        // localStorage.setItem("toDo", JSON.stringify(data))

        setItem("");
        setToDoItems(data)
        console.log("Data with newly added :", toDoItems)
      })
  }



  // handle delete ToDoItem
  const handleDeleteToDoItem = (item) => {
    const updatedToDoItems = toDoItems.filter((curELem) => curELem.id !== item.id)

    setToDoItems([...updatedToDoItems])
  }


  return (
    <>

      <div className="container row mx-auto d-flex justify-content-center align-items-center mt-4 jumbotron">

        
        <div className="col-4">

          <h3>ToDo List</h3>
        {
          toDoItems ?
            toDoItems.map((curElem) => {

              return (

                <>


                  <ToDoItem1 toDoItems={curElem} key={curElem.id} handleDeleteToDoItem={handleDeleteToDoItem} />
                  {/* <input type="checkbox" checked={curElem.isDone} />
                          <span>{curElem.task}</span> */}
                </>

              )

            }) : "loading data"
        }

      </div>

      </div>
    </>
  )
}

export default ToDo1

