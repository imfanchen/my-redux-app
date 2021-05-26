import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = []

// const initialState = [
//     { id: '0', name: 'Andrew Clark'},
//     { id: '1', name: 'Dan Abramov'},
//     { id: '2', name: 'Fan Chen'},
// ]

export const fetchUsers = createAsyncThunk('users/fetchUsers', async() => {
    const response = await client.get('/fakeApi/users')
    return response.users
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUsers.fulfilled]: (state, action) => {
            return action.payload
        }
    }
})

export default usersSlice.reducer