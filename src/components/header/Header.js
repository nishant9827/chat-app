import React from 'react'
import {NavLink} from 'react-router-dom';
import './style.css';
const Header = () => {
  return (
    <section>
        <div className="navbar_top">
            <div className="navbar_items_left">
                <div className="navbar_items">
                    <li>
                        <NavLink to="/" >Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="product-list">Product List</NavLink>
                    </li>
                    <li>
                        <NavLink to="add-product">Add Product</NavLink>
                    </li>
                </div>
            </div>
            <div className="navbar_items_right">
                <div className="navbar_items">
                    <li>
                        <NavLink to="login">Login</NavLink>
                    </li>
                    <li>
                        <NavLink to="signup">Sign Up</NavLink>
                    </li>
                    <li>
                        <NavLink to='logout'>Logout</NavLink>
                    </li>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Header
