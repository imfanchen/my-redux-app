import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    { id: '0', name: 'Andrew Clark'},
    { id: '1', name: 'Dan Abramov'},
    { id: '2', name: 'Fan Chen'},
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export default usersSlice.reducer