import React, { useState } from 'react';
import axios from 'axios';
import Input from '../components/Input';

const ChatGPT = () => {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/chatgpt', {
        data: {
          inputText: inputText
        }
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Input text:', inputText);
      console.log('Response:', response);
      if (response.status === 200) {
        // set the response state with the response data
        setResponseText(response.data);
      } else {
        console.error(`Response error: ${response.status}`);
      }
    } catch (error) {
      console.error(`Fetch error: ${error}`);
    }
  };

  return (
    <section className="text-gray-400 body-font bg-gray-900 min-h-screen">
      <div className="container px-5 py-24 mx-auto flex flex-col items-center justify-center">
        <h1 className="text-white text-2xl font-bold mb-6">Ask me something</h1>
        <form className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism mx-auto">
          <Input
            label="Input text"
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
          />
          <div className="mt-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleSubmit}>
                Submit
            </button>
          </div>
        </form>
        {responseText && (
        <div className="mt-4 text-white text-3xl font-bold mb-6">
          {responseText}
        </div>
      )}
      </div>
    </section>
  );
};

export default ChatGPT;
