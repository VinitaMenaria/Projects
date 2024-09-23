//signup 
import { createSlice } from "@reduxjs/toolkit"
import {toast} from 'sonner'
import { createAsyncThunk
 } from "@reduxjs/toolkit"
import axios from "axios"

export const Register = createAsyncThunk('/user/register', async(data,{rejectWithValue})=>{
    try {
      const res = axios.post('http://localhost:3000/api/register',data)
      console.log(res.data)
      return res.data
  }
     catch (error) {
        rejectWithValue(error)
    }

} )

export const Login = createAsyncThunk('/user/login', async(data,{rejectWithValue})=>{
   try {
     const res = axios.post('http://localhost:3000/api/login',data)
     console.log(res.data)
     return res.data
 }
    catch (error) {
      console.log(rejectWithValue(error))
      return rejectWithValue(error)
   }

} )

const initialState = {
loading : false ,
error : null,
token:null,
name:null,
role:null
}

const userSlice = createSlice({
   name : "user",
   initialState,
   extraReducers : (builder) => {
   builder.addCase(Register.pending, (state)=>{
   state.loading = true ;
   state.error = null
}).addCase(Register.fulfilled , (state)=>{
   state.loading = false ;
   state.error = null
   toast.success('User registered successfully');
}).addCase(Register.rejected,(state,action)=>{
   state.loading = false ;
   state.error = action.payload
}).addCase(userLogin.pending, (state)=>{
   state.loading = true
}).addCase(userLogin.fulfilled,(state,action)=>{
   console.log(action.payload)
   state.loading = false,
   state.error=null;
   toast.success("User logged in successfully");
}).addCase(userLogin.rejected,(state,action)=>{
   console.log(action.payload)
   state.loading = false,
   state.error = action.payload
})
   }
})

export default userSlice.reducer

//async thunk => we can use this middleware to implement all the asynchronous logic in the redux like api calling and then handle the states of the api in the slice like pending , failed , or fulfilled

//NOTE using createAsyncThunk we can implement the api logic which returns a promise and handle the promise states(pending,fulfilled , failed) in userSlice.

//NOTE createAsyncThunk accpets a action type and a function in which we are going to call the api.