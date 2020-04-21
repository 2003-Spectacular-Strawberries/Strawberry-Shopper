import React from 'react'
// import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {Navbar} from './components'
// import Routes from './routes'

const product = {
  name: 'strawberryShortCake',
  price: 10,
  image:
    'https://image.shutterstock.com/image-vector/strawberry-iconvector-illustration-flat-design-260nw-1371070088.jpg',
  id: 1,
  description: 'oasjfo askdjf lj woij ls;adf laskdf ;askdj ;lasdfj '
}

class SingleProduct extends React.Component {
  render() {
    return (
      <div className="single-product" key={product.id}>
        <h1>{product.name}</h1>
        <img src={product.image} alt="" />
        <p>{product.price}</p>
        <button>Add</button>
      </div>
    )
  }
}

export default SingleProduct
