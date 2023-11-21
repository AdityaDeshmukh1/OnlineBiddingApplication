import { useState } from 'react';
import { loginFields } from "./formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import axios from 'axios';

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser();
    }

    //Handle Login API Integration here
    const authenticateUser = async (username, password) =>{
        try {
          const response = await axios.post('http://localhost:3000/api/users/login', {
            username,
            password,
          });
      
          // Assuming the server sends a token upon successful authentication
          const { token, user } = response.data;
      
          // You can store the token and user data in the client's state, localStorage, or cookies
          console.log('User authenticated:', user);
          console.log('Token:', token);
      
          // Redirect to the dashboard or perform other actions as needed
        } catch (error) {
          console.error('Authentication error:', error.message);
          throw error; // Propagate the error for handling in the login component
        }
      };

    return(
        <form className="mt-3 space-y-6 min-w-[270px] w-[50vw] max-w-[500px]" onSubmit={handleSubmit}>
        <div className="-space-y-px">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
        </div>

        <FormExtra/>
        <FormAction handleSubmit={handleSubmit} text="Login"/>

      </form>
    )
}