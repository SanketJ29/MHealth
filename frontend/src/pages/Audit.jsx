import React, { useState } from "react";
import Input from "../components/Input";
import axios from 'axios';

const Audit = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [text, setText] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', name);
    formData.append('email', email);

    try {
      const response = await axios.post('/api/audit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'arraybuffer' // set response type to arraybuffer
      });
      if (response.status === 200) {
        const blob = new Blob([response.data], {type: 'image/jpeg'});
        const url = URL.createObjectURL(blob);
        setFileUrl(url); // set fileUrl state to display the image
        const textResponse = await axios.get('/api/audit-text');
      if (textResponse.status === 200) {
        setText(textResponse.data); // Update state with OCR text
      } else {
        console.error(`Response error: ${textResponse.status}`);
      }
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
  <h1 className="text-white text-2xl font-bold mb-6">Enter Details</h1>
    <form action="/data" encType="multipart/form-data" className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism mx-auto">
      <Input placeholder="Enter Name" name="name" type="text" className="text-white-600" value={name} onChange={(event) => setName(event.target.value)} />
      <Input placeholder="Enter Email" name="email" type="email" className="text-white-600" value={email} onChange={(event) => setEmail(event.target.value)} />
      <div className="mt-4">
        <label className="block text-white-700 font-bold mb-2" htmlFor="file">
          Upload File
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline" id="file" type="file" onChange={handleFileChange} />
      </div>
      <div className="mt-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleSubmit}>
          Upload
        </button>
      </div>
    </form>
    {fileUrl && (
  <div className="max-w-full max-h-full mt-8 text-center">
    <img src={fileUrl} alt="OCR Output" className="mx-auto" />
    <p className="text-white mt-4">{JSON.stringify(text)}</p>
  </div>
)}
  </div>
</section>

  );
};

export default Audit;
