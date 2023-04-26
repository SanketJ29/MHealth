import React, { useContext } from "react";
import { Link } from 'react-router-dom';

const Welcome = () => {
    return (
        <section class="text-gray-400 bg-gray-900 body-font min-h-screen">
  <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">Mental Health Prediction
        <br class="hidden lg:inline-block" />with Prescription audit
      </h1>
      <p class="mb-8 leading-relaxed">Mental disorders are growing very rapidy and a lot of people are affected due to this. This website deals with the user's social media chats to predict their mental health and also provide prescription audit</p>
      <div class="flex justify-center">
       <Link to="/prediction"><button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Predict</button> </Link>
        <Link to="/audit"> <button class="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">Audit</button> </Link>
      </div>
    </div>
    <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
      <img class="object-cover object-center rounded" alt="hero" src="https://www.linkpicture.com/q/istockphoto-1294477039-612x612.jpg" />
    </div>
  </div>
</section>
    )
}
export default Welcome;