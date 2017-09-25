import React, { Link, Component } from 'react';
import Relay from 'react-relay';
import BookItem from './BookItem';

class BooksPage extends Component {
  renderBook(bookEdge) {
    return (
      <Link
        to={`/books/${bookEdge.node.slug}`}
        key={bookEdge.node.slug}
        className='five wide column book'
      >
        <BookItem book={bookEdge.node} />
      </Link>
    );
  }

  render() {
    const books = this.props.viewer.books.edges.map(this.renderBook);
    return (
      <div className='sixteen wide column'>
        <h1>JavaScript Books</h1>
        <div className='ui grid centered'>{books}</div>
      </div>
    );
  }
}

export default Relay.createContainer(BooksPage, {
  initialVariables: {
    count: 100,
  },
  fragments: {
    viewer: () => Relay.QL`
    fragments on Viewer {
      books(first: $count) {
        count
        edges {
          node {
            slug
            ${BookItem.getFrament('book')}
          }
        }
      }
    }
    `,
  },
});
