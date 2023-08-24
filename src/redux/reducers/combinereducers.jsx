import {combineReducers} from "redux";
import productreducer from './reducers';

const reducers = combineReducers({
    Allproduct : productreducer
})

export default reducers