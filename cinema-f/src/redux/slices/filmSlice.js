import { createSlice } from "@reduxjs/toolkit";


const filmSlice = createSlice({
name: "film",
initialState: {
 films: [],
 filmsCount: null,
//  filmsCate: [],
},
reducers: {
setFilms(state, action){
    state.films = action.payload;
},
setFilms(state, action){
    state.filmsCount = action.payload;
},
},
});

const filmReducer = filmSlice.reducer;
const filmActions = filmSlice.actions;
export { filmActions, filmReducer };