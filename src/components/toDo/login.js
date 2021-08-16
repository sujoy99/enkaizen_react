import React, {useState} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Login = () => {

    const history = useHistory();

    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    const basicAuth = ()=>{

        console.log(username);
        console.log(password);

        fetch("http://localhost:9999/login",{
            method : "POST",
            headers : {
                "Authorization" : 'Basic ' + window.btoa(username + ":" + password)
            }
        })

        .then((response) => response.json())
        .then((data) => {
          console.log("User Info ", data)

          if(data === 1){

              history.push("/admin");
          }
          else if(data === 2){
            history.push("/regular");
          }

        //   localStorage.setItem("uInfo", JSON.stringify(data))
         

        })
    }

    return (
        <>

            <div className="container  mx-auto">

                <h3 className="text-center">Login</h3>
            <div className="row jumbotron d-flex justify-conter-center align-items-center ">
                
            <span>Name</span>
            <input type="text" value={username} onChange={ (e)=>{ setUsername(e.target.value) }} className="form-control" />

            <span>Password</span>
            <input type="text" value={password} onChange={ (e)=>{ setPassword(e.target.value) }} className="form-control"/>

            <button onClick={basicAuth} className="btn btn-info mt-2">Login</button>

            </div>
            </div>
        </>
    )
}

export default Login
