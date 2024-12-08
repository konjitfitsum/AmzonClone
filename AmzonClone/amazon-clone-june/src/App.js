import React, { useContext, useEffect } from 'react'
import Header from './Components/Header/Header'
import Routing from './Router'
import { auth } from './Utility/firebase'
import { Type } from './Utility/action.type'
import { DataContext } from './Components/DataProvider/DataProvider'
function App() {
  const [{user},dispatch] =useContext(DataContext)
    useEffect(()=>{
      auth.onAuthStateChanged((authUser) => {
        if(authUser){
          //console.log(authUser);
          dispatch({
            type:Type.SET_USER,
            user:authUser,
          });
        }else{
          dispatch({
            type:Type.SET_USER,
            user:null,
          })
        }
      })
    }, [])


  return <Routing/>

}

export default App