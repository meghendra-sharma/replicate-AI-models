import React, { useState } from 'react';
import axios from 'axios'
import { BACKEND_BASE_URL } from '../config/config';
import {toast} from 'react-toastify'
// import './FormComponent.css';

const Form = () => {
  const [token, setToken] = useState('');
  const [prompt, setPrompt] = useState('');
  const [modelResponse , setModelResponse] = useState('Your response will be displayed here..')
  const [gotResponse , setGotResponse] = useState(false)

  const handleTokenChange = (e) => {
    setToken(e.target.value);
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = (e) => {
    
    e.preventDefault();
    // You can handle form submission logic here
    console.log('Token:', token);
    console.log('Prompt:', prompt);

    if(!prompt || !token){
        toast.error('Fields cannot be empty')
        return
    }
    const inputData = {
        token,
        prompt
    }
    setGotResponse(false)
    setModelResponse('Running AI model....Your response will be generated soon..Please wait..')
    handlePostRequest(inputData).then(res => {
        if(res){
            setGotResponse(true)
            setModelResponse(res)
        }
    }).catch(err => {
        console.log(err.message , ' ghjkl')
        setGotResponse(false)
        setModelResponse('Something went wrong...')
    })


  };


  const handlePostRequest = async (inputData) => {
    debugger
    try {
      const response = await axios.post(BACKEND_BASE_URL + 'replicate/text-to-image', inputData);
      console.log('Response:', response.data);
      return response.data
    } catch (error) {
      console.error('Error:', error);
      throw Error(error)
    }
  };


  const handleClear = () => {
    setGotResponse(false)
    setModelResponse('Your response will be displayed here..')
    setToken('')
    setPrompt('')
  }

  return (
    <div>
      <header className="app-header">
        <h1>Run AI Model through replicate.com</h1>
        <h3 style={{marginTop : '0px'}}>--Text to Image--</h3>
      </header>

      <form className="token-form" onSubmit={handleSubmit}>
        <label htmlFor="token">Token:</label>
        <input
          type="text"
          id="token"
          name="token"
          value={token}
          onChange={handleTokenChange}
        />

        <label htmlFor="prompt">Prompt:</label>
        <input
          type="text"
          id="prompt"
          name="prompt"
          value={prompt}
          onChange={handlePromptChange}
        />

        <button type="submit">Submit</button>
        <button type='button' onClick={handleClear} style={{marginLeft : '5px' , backgroundColor : 'red'}}>Clear</button>
      </form>

      <div className="output">
        {!gotResponse ? <p><strong>{modelResponse}</strong></p>  :
         <div style={{height : '100px' , width : '500px' , margin : 'auto'}}>
            <img src={modelResponse} alt="" />
         </div> }
      </div>


      <footer className="app-footer">
        <p>&copy; 2023 Meghendra Sharma</p>
      </footer>
    </div>
  );
};

export default Form;
