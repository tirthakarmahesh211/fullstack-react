// @ts-check
import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux'
import uuid from 'uuid'

const reducer = combineReducers({
  activeThreadId: activeThreadIdReducer,
  threads: threadsReducer,
})

/**
 * 
 * @param {Array} state Threads Array
 * @param {Object} action Action Object 
 */
function threadsReducer(state = [ // Two threads in state
  {
    id: '1-fca2', // hardcoded pseudo-UUID
    title: 'Buzz Aldrin',
    messages: messagesReducer(undefined, {}),
  },
  {
    id: '2-be91',
    title: 'Michael Collins',
    messages: messagesReducer(undefined, {}),
  },
], action) {
  switch (action.type) {
    case 'ADD_MESSAGE':
    case 'DELETE_MESSAGE':
      const threadIndex = findThreadIndex(state, action)
      const oldThread = state[threadIndex]
      const newThread = {
        ...oldThread,
        messages: messagesReducer(oldThread.messages, action),
      }
      return [
        ...state.slice(0, threadIndex),
        newThread,
        ...state.slice(
          threadIndex + 1, state.length,
        ),
      ]
    default:
      return state;
  }
}

/**
 * 
 * @param {Array} threads Threads Array
 * @param {Object} action Action Object
 */
function findThreadIndex(threads, action) {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return threads.findIndex(
        (t) => t.id === action.threadId
      )
    case 'DELETE_MESSAGE':
      return threads.findIndex(
        (t) => t.messages.find((m) => (
          m.id === action.id
        ))
      )
    default:
      break;
  }
}

/**
 * 
 * @param {String} state ActiveThreadId String
 * @param {Object} action Action Object 
 */
function activeThreadIdReducer(state = '1-fca2', action) {
  if (action.type === 'OPEN_THREAD') {
    return action.id
  } else {
    return state
  }
}

/**
 * 
 * @param {Array} state Messages Array
 * @param {Object} action Action Object
 */
function messagesReducer(state = [], action) {
  if (action.type === 'ADD_MESSAGE') {
    const newMessage = {
      text: action.text,
      timestamp: Date.now(),
      id: uuid.v4(),
    }
    return state.concat(newMessage)
  } else if (action.type === 'DELETE_MESSAGE') {
    return state.filter((m) => m.id !== action.id)
  } else {
    return state
  }
}

const store = createStore(reducer);

const App = () => (
  <div className='ui segment'>
    <ThreadTabs />
    <ThreadDisplay />
  </div>
)

class TextFieldSubmit extends React.Component {
  state = {
    value: '',
  };

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state.value)
    this.setState({
      value: '',
    });
  };

  render() {
    return (
      <div className='ui input'>
        <input
          onChange={this.onChange}
          value={this.state.value}
          type='text'
        />
        <button
          onClick={this.handleSubmit}
          className='ui primary button'
          type='submit'
        >
          Submit
        </button>
      </div>
    );
  }
}


const MessageList = (props) => {
  return (
    <div className='ui comments'>
      {
        props.messages.map((m, index) => (
          <div
            className='comment'
            key={index}
            onClick={() => props.onClick(m.id)}
          >
            <div className='text'>
              {m.text}
              <span className='metadata'>
                @{m.timestamp}
              </span>
            </div>
          </div>
        ))
      }
    </div>
  );
};

const Thread = props => {
  return (
    <div className='ui center aligned basic segment'>
      <MessageList
        messages={props.thread.messages}
        onClick={props.onMessageClick}
      />
      <TextFieldSubmit
        onSubmit={props.onMessageSubmit}
      />
    </div>
  );
};

class ThreadDisplay extends React.Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate())
  }

  render() {
    const state = store.getState()
    const activeThreadId = state.activeThreadId
    const activeThread = state.threads.find(
      t => t.id === activeThreadId
    )
    return (
      <Thread
        thread={activeThread}
        onMessageClick={(id) => (
          store.dispatch({
            type: 'DELETE_MESSAGE',
            id: id,
          })
        )}
        onMessageSubmit={(text) => (
          store.dispatch({
            type: 'ADD_MESSAGE',
            text,
            threadId: activeThreadId,
          })
        )}
      />
    )
  }
}

const Tabs = (props) => (
  <div className='ui top attached tabular menu'>
    {
      props.tabs.map((tab, index) => (
        <div
          key={index}
          className={tab.active ? 'active item' : 'item'}
          onClick={() => props.onClick(tab.id)}
        >
          {tab.title}
        </div>
      ))
    }
  </div>
)

class ThreadTabs extends Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate())
  }

  render() {
    const state = store.getState()
    const tabs = state.threads.map(t => (
      {
        title: t.title,
        active: t.id === state.activeThreadId,
        id: t.id,
      }
    ))

    return (
      <Tabs
        tabs={tabs}
        onClick={(id) => (
          store.dispatch({
            type: 'OPEN_THREAD',
            id,
          })
        )}
      />
    )
  }
}


export default App;
