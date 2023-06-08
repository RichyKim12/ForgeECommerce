import "./Login.css";
// assets
import googleLogo from "../../assets/google_logo.png";
// navigation
import { useNavigate } from "react-router-dom";
import { RouteLocations } from "../../RouteLocations";
// authenticatoin
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// axios
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  // const signInWithGoogle = () => {
  //   const provider = new GoogleAuthProvider();
  //   auth
  //     .signInWithPopup(provider)
  //     .then((result) => {
  //       console.log(result);
  //       // hit backend to create a new user
  //       try {
  //         const response = axios.post(
  //           "https://week3-team4-ecommerce-backend.onrender.com/firestore/add-user",
  //           {
  //             uid: result.user.uid,
  //             email: result.user.email,
  //             displayName: result.user.displayName,
  //             photoURL: result.user.photoURL,
  //           }
  //         );
  //       } catch (error) {
  //         console.log(error);
  //       }

  //       navigate(RouteLocations.browse);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);

      // check if a user exists
      try {
        console.log('user uid is', result.user.uid.toString());
        const response = await axios.get(`https://week3-team4-ecommerce-backend.onrender.com/firestore/user-exists/${result.user.uid.toString()}`);
        console.log(response);
        if (response.data) { // user exists, returned true
          navigate(RouteLocations.browse);
          return ;
        }
      } catch (error) {
        console.log(error);
      }


      // hit backend to create a new user
      try {
        const response = await axios.post(
          "https://week3-team4-ecommerce-backend.onrender.com/firestore/add-user",
          {
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
          }
        );
      } catch (error) {
        console.log(error);
      } finally {
        navigate(RouteLocations.browse);
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="login">
      <div className="login-center">
        <h1 className="login-center-header">Welcome back!</h1>
        <div className="login-center-main">
          <div>
            {/* <p className="login-center-main-text">Welcome back to Ecommerce!</p> */}
            <p className="login-center-main-text">Please login to continue.</p>
            <div className="login-center-main-buttonWrapper" onClick={signInWithGoogle}>
              <img
                className="login-center-main-buttonWrapper-img"
                src={googleLogo}
                alt="google logo"
              />
              <p className="login-center-main-buttonWrapper-text">
                Login with Google
              </p>
            </div>
          </div>
        </div>
        <div className="login-center-bottom">
          <p
            className="login-center-bottom-text"
            onClick={() => {
              navigate(RouteLocations.signup);
            }}
          >
            Create an account
          </p>
          <p className="login-center-bottom-text">|</p>
          <p
            className="login-center-bottom-text"
            onClick={() => {
              navigate(RouteLocations.browse);
            }}
          >
            Go home
          </p>
        </div>
      </div>
    </div>
  );
}
