/* global React, helpers, ReactDOM */
class TimersDashboard extends React.Component {
  state = {
    timers: [
      {
        title: 'Practice squat',
        project: 'Gym Chores',
        id: uuid.v4(),
        elapsed: 5456099,
        runningSince: Date.now()
      },
      {
        title: 'Bake squash',
        project: 'Kitchen Chores',
        id: uuid.v4(),
        elapsed: 1273998,
        runningSince: null
      }
    ]
  }

  render() {
    return (
      <div className='ui three column centered grid'>
        <div className='column'>
          <EditableTimerList
            timers={this.state.timers} />
          <ToggleableTimerForm />
        </div>
      </div>
    )
  }
}

class EditableTimerList extends React.Component {
  render() {
    const timers = this.props.timers.map((timer) => (
      <EditableTimer
        title={timer.title}
        project={timer.project}
        elapsed={timer.elapsed}
        runningSince={timer.runningSince}
        id={timer.id}
        key={timer.id}
      />
    ))
    return (
      <div id='timers'>
        {timers}
      </div>
    )
  }
}

class EditableTimer extends React.Component {
  state = {
    editFormOpen: false
  }
  render() {
    if (this.state.editFormOpen) {
      return (
        <TimerForm
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
        />
      )
    } else {
      return (
        <Timer
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
          elapsed={this.props.elapsed}
          runningSince={this.props.runningSince}
        />
      )
    }
  }
}

class TimerForm extends React.Component {
  render() {
    const submitText = this.props.title ? 'Update' : 'Create'
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='ui form'>
            <div className='field'>
              <label htmlFor=''>Title</label>
              <input type='text' defaultValue={this.props.title} />
            </div>
            <div className='field'>
              <label htmlFor=''>Project</label>
              <input type='text' defaultValue={this.props.project} />
            </div>
            <div className='ui two bottom attached buttons'>
              <button className='ui basic blue button'>{submitText}</button>
              <button className='basic ui red button'>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class ToggleableTimerForm extends React.Component {
  state = {
    isOpen: false
  }
  handleFormOpen = () => {
    this.setState({ isOpen: true })
  }
  render() {
    if (this.props.isOpen) {
      return (
        <TimerForm />
      )
    } else {
      return (
        <div className='ui basic content center aligned element'>
          <button
            className='ui basic button icon'
            onClick={this.handleFormOpen} >
            <i className='plus icon' />
          </button>
        </div>
      )
    }
  }
}

class Timer extends React.Component {
  render() {
    const elaspedString = helpers.renderElapsedString(this.props.elapsed)
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='header'>{this.props.title}</div>
          <div className='meta'>{this.props.object}</div>
          <div className='center aligned description'>
            <h2>{elaspedString}</h2>
          </div>
          <div className='extra content'>
            <span className='right floated edit icon'>
              <i className='edit icon' />
            </span>
            <span className='right floated trash icon'>
              <i className='trash icon' />
            </span>
          </div>
        </div>
        <div className='ui bottom attached blue basic button'>
          Start
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <TimersDashboard />,
  document.getElementById('content')
)
