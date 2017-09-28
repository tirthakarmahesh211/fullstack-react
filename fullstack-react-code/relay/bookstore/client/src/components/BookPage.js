import React, { Component } from 'react'
import Link from 'react-router/lib/Link'
import Relay from 'react-relay'
import BookItem from './BookItem'
import FancyBook from './FancyBook'
import { RIEInput, RIETextArea } from 'riek'

class BookPage extends Component {
  handleBookChange (newState) {
    console.log('bookChanged', newState)
  }
  renderAuthor (authorEdge) {
    return (
      <Link
        key={authorEdge.node._id}
        to={`/authors/${authorEdge.node._id}`}
        className='column'
      >
        <div className='ui fluid card'>
          <div className='image'>
            <img src={authorEdge.node.avatarUrl} alt={authorEdge.node.name} />
          </div>
          <div className='content'>
            <div className='header'>{authorEdge.node.name}</div>
          </div>
        </div>
      </Link>
    )
  }

  render () {
    const book = this.props.book
    const authors = book.authors.edges.map(this.renderAuthor)

    return (
      <div className='bookpage sixteen wide column'>
        <div className='spacer row' />
        <div className='ui grid row'>
          <div className='six wide column'>
            <FancyBook book={book} />
          </div>
          <div className='ten wide column'>
            <div className='content ui form'>
              <h2>
                <RIEInput value={book.name} propName={'name'} change={this.handleBookChange} />
              </h2>
              <div className='tagline hr'>
                <RIEInput value={book.tagline} propName={'tagline'} change={this.handleBookChange} />
              </div>
              <div className='description'>
                <p>
                  <RIETextArea value={book.description} propName={'description'} change={this.handleBookChange} />
                </p>
              </div>
            </div>
            <div className='ten wide column authorsSection'>
              <h2 className='hr'>Authors</h2>
              <div className='ui three column grid link cards'>{authors}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Relay.createContainer(BookPage, {
  fragments: {
    book: () => Relay.QL`
    fragment on Book {
      id
      name
      tagline
      coverUrl
      description
      pages
      authors(first: 100) {
        edges {
          node {
            id
            name
            avatarUrl
            bio
          }
        }
      }
    }
    `
  }
})
