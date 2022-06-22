import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";


const rootReduser = combineReducers({

})

export const store = createStore(rootReduser, applyMiddleware(thunk))
