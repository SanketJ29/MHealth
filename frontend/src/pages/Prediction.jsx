import React, { useState } from 'react';
import axios from 'axios';
import Input from '../components/Input';

const Prediction = () => {
  const [tweets, setTweets] = useState(['', '', '', '', '']);
  const [prediction, setPrediction] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/prediction', {
        Data1: tweets[0],
        Data2: tweets[1],
        Data3: tweets[2],
        Data4: tweets[3],
        Data5: tweets[4]
      });
      console.log('Response:', response);
      if (response.status === 200) {
        // set the prediction state with the response data
        const predictions = response.data;
  if (predictions && predictions.length > 0) {
    setPrediction(predictions[0]);
    } else {
      console.error('Prediction array is empty or undefined');
    }
      } else {
        console.error(`Response error: ${response.status}`);
      }
    } catch (error) {
      console.error(`Fetch error: ${error}`);
    }
  };

  const handleTweetChange = (index, value) => {
    const newTweets = [...tweets];
    newTweets[index] = value;
    setTweets(newTweets);
  };

  return (
    <section className="text-gray-400 body-font bg-gray-900 min-h-screen">
      <div className="container px-5 py-24 mx-auto flex flex-col items-center justify-center">
        <h1 className="text-white text-2xl font-bold mb-6">Enter 5 Tweets</h1>
        <form className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism mx-auto">
          <Input
            label="Tweet 1"
            value={tweets[0]}
            onChange={(event) => handleTweetChange(0, event.target.value)}
          />
          <Input
            label="Tweet 2"
            value={tweets[1]}
            onChange={(event) => handleTweetChange(1, event.target.value)}
          />
          <Input
            label="Tweet 3"
            value={tweets[2]}
            onChange={(event) => handleTweetChange(2, event.target.value)}
          />
          <Input
            label="Tweet 4"
            value={tweets[3]}
            onChange={(event) => handleTweetChange(3, event.target.value)}
          />
          <Input
            label="Tweet 5"
            value={tweets[4]}
            onChange={(event) => handleTweetChange(4, event.target.value)}
          />
          <div className="mt-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleSubmit}>
                Predict
            </button>
          </div>
        </form>
        {prediction && (
        <div className="mt-4 text-white text-3xl font-bold mb-6">
          Your mental health is {prediction}.
        </div>
      )}
      </div>
    </section>
  );
};

export default Prediction;
