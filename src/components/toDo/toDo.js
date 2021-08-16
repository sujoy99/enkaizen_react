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

    const createItem = {id:null, task : item, isDone : false}

    fetch("http://localhost:9999/api/v1/toDoItem", {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body : JSON.stringify(createItem)

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
  const handleDeleteToDoItem = (item)=>{
    const updatedToDoItems = toDoItems.filter( (curELem) => curELem.id !== item.id)

    setToDoItems([...updatedToDoItems])
  }


  return (
    <>


      <div>

        <input type="text" value={item} onChange={ (e) => { setItem(e.target.value) } }/>
        <button onClick={addNewToDoItem}>Add New Item</button>
      </div>
      {
        toDoItems ?
          toDoItems.map((curElem) => {

            return (

              <>


                <ToDoItem toDoItems={curElem} key={curElem.id} handleDeleteToDoItem={handleDeleteToDoItem} />
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

