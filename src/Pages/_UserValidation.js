import axios from 'axios'
import React, { Children, useEffect, useState } from 'react'
import _InterCon  from '../api/_InterCon'
import { useDispatch, useSelector } from 'react-redux';
import { SelUsers, _GetUser, _LoadUsers, _UserErr, } from '../Redux/Reducer/_Users';
import LoadingPage from './LoadingPage';
import { Navigate,redirect } from "react-router-dom";
import { useAuth } from '../context/_userContext';
import PageLoading from './_LoadingPages';
function _UserValidation({children}) {

   const [isReady, setIsReady] = useState(false);
   const user = useSelector(SelUsers);
   
   useEffect(() => {
     const timer = setTimeout(() => {
       setIsReady(true);
     }, 2000); 
     document.title = "Galuh Dental | Redirect..."
     return () => clearTimeout(timer);
   }, []);

   return isReady ? (
    <>
      {user.length !== 0 ? children :  <Navigate to='/login'/>}
    </>
  ) : (
    <LoadingPage/> 
  );
};       




export default _UserValidation