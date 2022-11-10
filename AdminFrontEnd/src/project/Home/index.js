import Header from '../Header'
import { Link } from 'react-router-dom'

const Home = () => {






  return (

    <>
      <div>
        <Header />
      </div>
      <div className=" text-white bg-white div-1">

        <div className="navbar">


          <hr />
          {sessionStorage.getItem("role") == "User" ?
            <ul className="nav nav-pills flex-column mb-auto">
            </ul>
            : //conditional ? operator
            <ul className="nav nav-pills flex-column mb-auto">

              {/* <li className="nav-item li-1">
           <Link className="nav-link text-white" to ="/get-emp-live">Order</Link>
         </li> */}
              <li className="list-group-item border">
                <Link className="nav-link text-black" to="/Addpizza">Add New Item</Link>
              </li>
              <br />
              <li className="list-group-item border">
                <Link className="nav-link text-black" to="/Addtoppings">Add new Toppings</Link>
              </li>
              <br />
              <li className="list-group-item border">
                <Link className="nav-link text-black" to="/orderstatus">Change order status</Link>
              </li>
              <br />
              <li className="list-group-item border">
                <Link className="nav-link text-black" to="/showallpizza">Show All Items</Link>
              </li>
              <br />
              <li className="list-group-item border">
                <Link className="nav-link text-black" to="/Showtoppings">Show All Toppings</Link>
              </li>
              <br />
              <li className="list-group-item border">
                <Link className="nav-link text-black" to="/viewprofile">View Profile</Link>
              </li>
              <br />
              <li className="list-group-item border">
                <Link className="nav-link text-black" to="/showfeedback">Show All Feedback</Link>
              </li>

            </ul>
          }

        </div>
      </div>
    </>
  )
}
export default Home