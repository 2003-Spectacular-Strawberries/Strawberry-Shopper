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
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.thermofisher.com%2Fblog%2Ffood%2Fwhat-rot-strawberry-proteomics-and-the-art-of-staying-fresh%2F&psig=AOvVaw0K2IvM2nm1-Cba6oqAbHK_&ust=1587568995809000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPiylsPp-egCFQAAAAAdAAAAABAF'
  },
  {
    name: 'strawberry',
    price: 2,
    image:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.thermofisher.com%2Fblog%2Ffood%2Fwhat-rot-strawberry-proteomics-and-the-art-of-staying-fresh%2F&psig=AOvVaw0K2IvM2nm1-Cba6oqAbHK_&ust=1587568995809000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPiylsPp-egCFQAAAAAdAAAAABAF'
  },

  {
    name: 'strawberryJam',
    price: 30,
    image:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.thermofisher.com%2Fblog%2Ffood%2Fwhat-rot-strawberry-proteomics-and-the-art-of-staying-fresh%2F&psig=AOvVaw0K2IvM2nm1-Cba6oqAbHK_&ust=1587568995809000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPiylsPp-egCFQAAAAAdAAAAABAF'
  }
]

class AllProducts extends React.Component {
  render() {
    return (
      <div className="all-products">
        <div className="all-products-container">
          <div className="single-product">
            {/* Product Image */}
            <img src="" alt="" />
            <Link to="/singleproduct/id">Product Name</Link>
            <p>$20.00</p>
            <button>Add</button>
          </div>
          {/* {products.map((product) => {
            // name, price, quantity, image, add to cart button

          })}  we are going to want to make the div for each item to be a link to the single item */}
        </div>
      </div>
    )
  }
}

export default AllProducts
