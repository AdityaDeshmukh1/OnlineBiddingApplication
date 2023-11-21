import { useState } from 'react';
import axios from 'axios';
import { signupFields } from "./formFields"
import FormAction from "./FormAction";
import Input from "./Input";

const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
  const [signupState,setSignupState]=useState(fieldsState);

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(signupState)
    createAccount()
  }

  // handle Signup API Integration here
  const createAccount = async () => {
    try {
      // Make a POST request to your backend API endpoint
      const response = await axios.post('http://localhost:3000/api/auth/signup', signupState);

      // Handle success (you can redirect, show a success message, etc.)
      console.log('Signup successful:', response.data);

    } catch (error) {
      // Handle errors (you can show an error message, log the error, etc.)
      console.error('Signup error:', error.response.data.message);
    }
  };

    return(
        <form className="mt-3 space-y-6 min-w-[270px] w-[50vw] max-w-[500px]" onSubmit={handleSubmit}>
        <div className="">
        {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
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
          <FormAction handleSubmit={handleSubmit} text="Signup" />
        </div>

         

      </form>
    )
}