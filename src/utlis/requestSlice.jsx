

import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name : "requests",
    initialState : null,
    reducers:{
        addRequests : (state,action)=>{
           return action.payload;
        },
        removeRequest : (state,action)=>{
            const id=action.payload;
           const requestLeft = state.filter((request)=>{
                return (request._id!==id);
            })
            return requestLeft;
        }
    }

})

export const{addRequests,removeRequest} = requestSlice.actions;
export default requestSlice.reducer;