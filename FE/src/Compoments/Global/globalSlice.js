import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
    name:'global',
    initialState:{
        theme: "",
        user: {},
        dataThiAll: [],
        dataHocAll: [],
        dataFile:[],
        rowObject:[{loai:1}]
    },
    reducers:{
        setTheme: (state,action) => {
            state.theme = action.payload;
        },
        setUser: (state,action) => {
            state.user = action.payload;
        },
        setdataThiAll: (state,action) => {
            state.dataThiAll = action.payload;
        },
        setdataHocAll: (state,action) => {
            state.dataHocAll = action.payload;
        },
        setdataDataFile: (state,action) => {
            state.dataFile = action.payload;
        },
        setdataRowObject: (state,action) => {
            state.rowObject = action.payload;
        },
    },
});

export const { setUser,setdataThiAll,setdataHocAll,setTheme,setdataDataFile,setdataRowObject } = globalSlice.actions;
export default globalSlice.reducer;