import React, { Component } from 'react'
import thunkMiddleware from 'redux-thunk'
import { connect, Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { reducer } from './redux-reducer.js'
import { fetchPeople, savePeople } from './redux-actions'

const Form = require('./form')

const store = createStore(reducer, applyMiddleware(thunkMiddleware))

const ReduxForm = connect(mapStateToProps, mapDispatchToProps)(Form)

module.exports = class extends Component {
  static displayName = 'redux-app'


  componentWillMount() {
    store.dispatch(fetchPeople())
  }

  render() {
    return (
      <Provider store={store}>
        <ReduxForm />
      </Provider>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.isLoading,
    fields: state.person,
    people: state.people,
    saveStatus: state.saveStatus
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (people) => {
      dispatch(savePeople(people))
    }
  }
}