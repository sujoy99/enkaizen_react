import React, { useState, useEffect } from 'react'
import ToDoItem from "./toDoItem";


const getLocalData = ()=>{

  console.log("ok");

  const lists = JSON.parse( localStorage.getItem("toDo") );
      
  console.log(lists)
  if(lists){
      console.log("test")

      return lists ;
  }else{
      return [];
  }
}

const ToDo = () => {

  const [toDoItems, setToDoItems] = useState(null)

  useEffect(() => {

    // do something on load
    console.log("I have loaded up")

    if (!toDoItems) {

      fetch("http://localhost:9999/api/v1/toDoList")
        .then((response) => response.json())
        .then((data) => {
          console.log("To Do Item List ", data)

          localStorage.setItem("toDo", JSON.stringify(data))
          setToDoItems(data);

        })

    }



  }, [toDoItems]);



  // add item
  const addNewToDoItem = () => {

    fetch("http://localhost:9999/api/v1/toDoItem", {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      }

    })
      .then((response) => response.json())
      .then((data) => {

        localStorage.setItem("toDo", JSON.stringify(data))

        setToDoItems(data)
        console.log("Data with newly added :", toDoItems)
      })
  }


  return (
    <>


      <div>
        <button onClick={addNewToDoItem}>Add New Item</button>
      </div>
      {
        toDoItems ?
          toDoItems.map((curElem) => {

            return (

              <>


                <ToDoItem toDoItems={curElem} key={curElem.id} />
                {/* <input type="checkbox" checked={curElem.isDone} />
                          <span>{curElem.task}</span> */}
              </>

            )

          }) : "loading data"
      }
    </>
  )
}

export default ToDo

