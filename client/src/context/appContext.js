import React, { useReducer, useContext } from 'react'
import reducer from "./reducer";
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR
} from "./action";
import axios from 'axios'
import error from "../pages/Error";

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

const initialState = {
  user: user ? JSON.parse(user) : null,
  token,
  userLocation: userLocation || '',
  jobLocation: userLocation || '',
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  showSidebar: false
};

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const authFetch = axios.create({
    baseURL: '/api/v1'
  })

  authFetch.interceptors.request.use((config) => {
    config.headers.common['Authorization'] = `Bearer ${state.token}`
    return config
  }, (error) => {
    return Promise.reject(error)
  })

  authFetch.interceptors.response.use(response => {
    return response
  }, error => {
    console.log(error.response)
    if (error.response.status === 401) {
      logoutUser()
    }
    return Promise.reject(error)
  })

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    localStorage.setItem('location', location)
  }

  const removeToLocalStorage = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('location')
  }

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)
      const { user, token, location } = data

      dispatch({ type: SETUP_USER_SUCCESS, payload: { user, token, location, alertText } })

      addUserToLocalStorage({ user, token, location })
    } catch (error) {
      dispatch({ type: SETUP_USER_ERROR, payload: { msg: error.response.data.msg } })

    }
    clearAlert()
  }

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR })
  }

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeToLocalStorage()
  }

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN })
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser)
      const { user, token, location } = data

      dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, token, location } })

      addUserToLocalStorage({ user, token, location })
    } catch (error) {
      dispatch({ type: UPDATE_USER_ERROR, payload: { msg: error.response.data.msg } })
    }
    clearAlert()
  }

  return (
     <AppContext.Provider value={{
       ...state,
       displayAlert,
       setupUser,
       toggleSidebar,
       logoutUser,
       updateUser
     }}>{children}</AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }

