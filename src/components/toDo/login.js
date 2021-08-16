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

          if(data === 2){

              history.push("/admin");
          }

        //   localStorage.setItem("uInfo", JSON.stringify(data))
         

        })
    }

    return (
        <>
            <span>Name</span>
            <input type="text" value={username} onChange={ (e)=>{ setUsername(e.target.value) }} />

            <span>Password</span>
            <input type="text" value={password} onChange={ (e)=>{ setPassword(e.target.value) }} />

            <button onClick={basicAuth}>Login</button>
        </>
    )
}

export default Login
