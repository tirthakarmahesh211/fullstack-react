import React from 'react';
import Relay from 'react-relay';
import FancyBook from './FancyBook';

const BookItem = (props) => {
  const a = 1;
  return (
    <div className='bookItem'>
      <FancyBook book={props.book} />
      <div className='bookMeta'>
        <div className='authors'>
          {props.book.authors.count}
          {props.book.authors.count > 1 ? ' Authors' : 'Author'}
        </div>
        <h2>{props.book.name}</h2>
        <div className='tagline'>{props.book.tagline}</div>
        <div className='description'>{props.book.description}</div>
      </div>
    </div>
  );
};

export default Relay.createContainer(BookItem, {
  fragments: {
    book: () => Relay.QL`
    fragment on Book {
      name
      slug
      tagline
      coverUrl
      pages
      description
      authors {
        count
      }
    }
    `,
  },
});
