import React from 'react'
// import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {Navbar} from './components'
// import Routes from './routes'

const testArrayOfObjects = [
  {
    name: 'strawberryShortCake',
    price: 10,
    image:
      'https://image.shutterstock.com/image-vector/strawberry-iconvector-illustration-flat-design-260nw-1371070088.jpg',
    id: 1,
    description: 'oasjfo askdjf lj woij ls;adf laskdf ;askdj ;lasdfj '
  },
  {
    name: 'strawberry',
    price: 2,
    image:
      ' https://image.shutterstock.com/image-vector/strawberry-iconvector-illustration-flat-design-260nw-1371070088.jpg',
    id: 2,
    description: 'oasjfo askdjf lj woij ls;adf laskdf ;askdj ;lasdfj '
  },

  {
    name: 'strawberryJam',
    price: 30,
    image:
      'https://image.shutterstock.com/image-vector/strawberry-iconvector-illustration-flat-design-260nw-1371070088.jpg',
    id: 3,
    description: 'oasjfo askdjf lj woij ls;adf laskdf ;askdj ;lasdfj '
  }
]

class AllProducts extends React.Component {
  render() {
    return (
      <div className="all-products">
        <div className="all-products-container">
          {testArrayOfObjects.map(product => {
            return (
              <div className="single-product" key={product.id}>
                <Link to={`/singleproduct/${product.id}`}>{product.name}</Link>
                <Link to="/singleproduct/id">
                  <img src={product.image} alt="" />
                </Link>
                <p>Price: ${product.price}</p>
                <button className="btn">Add</button>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default AllProducts
