import React from 'react';
import GoogleLogin from 'react-google-login';

const GoogleSignIn = () => {
    const responseGoogle = (response) => {
        // Get the user's ID token and other data that you need to authenticate
        const { tokenId } = response;
        // ...
      };
      const onFailure = (error) => {
        console.log(error);
      };
      return (
        <GoogleLogin
          clientId="YOUR_CLIENT_ID"
          buttonText="Sign in with Google"
          onSuccess={responseGoogle}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
        />
      );
    
};

export default Login;