import React, { useEffect, useState } from "react";

import jwt_decode from "jwt-decode";

function App() {
  const [user, setUser] = useState({});

  const handleCallBackResponse = (response) => {
    console.log("Encoded JWT ID token" + response.credential);
    const userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  };

  const handleSignOut = () => {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "301545129602-0a99teq9n8nnqh17mk0v1q2ktkq2pphs.apps.googleusercontent.com",
      callback: handleCallBackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  }, []);

  return (
    <div>
      <div id="signInDiv"></div>
      {Object.keys(user).length !== 0 && (
        <div>
          <img src={user.picture} alt="Person"></img>
          <h3>{user.name}</h3>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
}

export default App;

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGoogle } from "@fortawesome/free-brands-svg-icons";

// import { useGoogleLogin } from "@react-oauth/google";

// import { GoogleLogin } from "@react-oauth/google";
// import jwt_decode from "jwt-decode";
// import { useEffect, useState } from "react";
// import "./App.css";

// function App() {
//   const [userDetails, setUserDetails] = useState({
//     firstName: "",
//     surname: "",
//     email: "",
//   });

//   // const googleOAuth = (credentialResponse) => {
//   //   console.log(credentialResponse);
//   //   const decoded = jwt_decode(credentialResponse.credential);
//   //   setUserDetails({
//   //     surname: decoded.family_name,
//   //     firstName: decoded.given_name,
//   //     email: decoded.email,
//   //   });
//   // };

//   const googleOAuth = useGoogleLogin({
//     onSuccess: async (response) => {
//       try {
//         const data = await fetch(
//           "https://www.googleapis.com/oauth2/v3/userinfo",
//           {
//             headers: {
//               Authorization: `Bearer ${response.access_token}`,
//             },
//           }
//         );
//         console.log(data);
//       } catch (error) {
//         console.log(error);
//       }
//     },
//   });

//   useEffect(() => {
//     console.log(userDetails);
//   });
//   return (
//     <div className="App">
//       <h1>Google Authentication</h1>
//       <div className="button" onClick={googleOAuth}>
//         <div className="icon-wrapper">
//           <FontAwesomeIcon className="icon" icon={faGoogle} />
//         </div>
//         <div className="text">Sign up with Google</div>
//       </div>
//       {/* <GoogleLogin
//         theme="filled_blue"
//         login_uri="http://localhost:3000"
//         onSuccess={googleOAuth}
//         onError={() => {
//           console.log("Login Failed");
//         }}
//       /> */}
//     </div>
//   );
// }

// export default App;
