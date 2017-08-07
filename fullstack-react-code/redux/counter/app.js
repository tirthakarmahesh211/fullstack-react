const store = createStore(reducer)

function reducer(state, action) {
  if (action.type === 'INCREMENT') {
    return state + action.amount
  } else if (action.type === 'DECREMENT') {
    return state - action.amount 
  }  else {
    return state
  }
}

function createStore (reducer) {
  let state = 0
  const getState = () => (state)
  const dispatch = (action) => {
    state = reducer(state, action)
  }
  return {
    getState,
    dispatch
  }
}

const incrementAction = { type: 'INCREMENT', amount: 5 }

store.dispatch(incrementAction)
console.log(store.getState())

const unknownAction = { type: 'UNKNOWN' }

store.dispatch(unknownAction)
console.log(store.getState())

const decrementAction = { type: 'DECREMENT', amount: 11 }

store.dispatch(decrementAction)
console.log(store.getState())