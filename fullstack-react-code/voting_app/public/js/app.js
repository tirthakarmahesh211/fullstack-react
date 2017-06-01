class Product extends React.Component {
  handleUpvote = () => {
    this.props.onVote(this.props.id)
  }
  render() {
    return (
      <div className='item'>
        <div className='image'>
          <img src={this.props.productImageUrl} alt='Aqua Product' />
        </div>
        <div className='middle aligned content'>
          <div className='header'>
            <a onClick={this.handleUpvote}>
              <i className='large caret up icon' />
            </a>
            {this.props.votes}
          </div>
          <div className='description'>
            <a href={this.props.url}>
              {this.props.title}
            </a>
            <p>{this.props.description}</p>
          </div>
          <div className='extra'>
            <span>Submitted by:</span>
            <img src={this.props.submitterAvatarUrl} alt='' className='ui avatar image' />
          </div>
        </div>
      </div>
    )
  }
}

class ProductList extends React.Component {
  state = {
    products: []
  }

  componentDidMount() {
    this.setState({ products: Seed.products })
  }

  handleProductUpvote = (productId) => {
    const nextProducts = this.state.products.map((product) => {
      if (product.id === productId) {
        return Object.assign({}, product, {
          votes: product.votes + 1
        })
      } else {
        return product
      }
    })
    this.setState({
      products: nextProducts
    })
  }

  render() {
    const products = this.state.products.slice().sort((a, b) => (b.votes - a.votes))
    const productComponents = products.map((product) => (
      <Product
        key={'product-' + product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        onVote={this.handleProductUpvote}
      />
    ))
    return (
      <div className='ui unstackable items'>
        {productComponents}
      </div>
    )
  }
}

ReactDOM.render(
  <ProductList />,
  document.getElementById('content')
)
