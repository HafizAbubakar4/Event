import { auth } from 'config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import React , { useReducer, createContext, useEffect} from 'react'
export const AuthContext = createContext();

const initialState = {isAuth:false}
const reducer = ((state,action) =>{

switch(action.type)
{

    case "LOGIN":
        return {isAuth:true , user:action.payload.user}

    case "LOGOUT":
        return {isAuth:false}
    default:
        return state
}


})

export default function AuthContextProvider(props) {
const [state,dispatch] = useReducer(reducer,initialState);

useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
        //   const uid = user.uid;
        console.log("user" , user);
        console.log("user is Sign In");
        dispatch({type:"LOGIN" , payload:{user}})
          // ...
        } else {
          console.log("user is Signout");
          // ...
        }
      });
},[])

  return (
   <AuthContext.Provider value={{authentication:state , dispatch}}>
    {props.children}
   </AuthContext.Provider>
  )
}
