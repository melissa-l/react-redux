import { createStore } from 'redux'
import rootReducer from '../reducers/index.js'

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState,
        // 触发 redux-devtools
        window.devToolsExtension ? window.devToolsExtension() : undefined
    )
    // const store = createStore(rootReducer)
    return store
}
