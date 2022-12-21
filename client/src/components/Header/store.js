import {configureStore,createSlice} from '@reduxjs/toolkit'


let account = createSlice({
    name:'account',
    initialState:{account:''},
    reducers : {
      changeAccount(state,set){
        state.account = set.payload
      }
    }
})

export let {changeAccount} = account.actions  //변경함수

//index.js 파일확인
export default configureStore({
    reducer: {
    account:account.reducer
     }
})




/* index.js 확인필요
import { Provider } from "react-redux"; // index.js
import store from './components/Header/store'; //index.js

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Browser Rouer>
    <App />
      </Browser Rouer>
    </Provider>
  </React.StrictMode>
);
*/