import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import ExpoFileSystemStorage from 'redux-persist-expo-filesystem'
import appReducer from './Reducer'

const rootReducer = combineReducers({
  app: appReducer,
  // add more reducers
})

const persistConfig = {
  key: 'root',
  storage: ExpoFileSystemStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)
