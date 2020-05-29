import React from "react";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../context";
import LogoutUser from "../loginreg/LogoutUser";
import UpdateCart from "../loginreg/UpdateCart";
export default function LoginLink() {
  
  return (
      <ProductConsumer>
          {value => {
              const {user,cart, clearCart,userLogout,handleSidebar} = value;
              if (user.token) {
                return (
                  <Link to="/"
                    className="sidebar-link"
                    onClick={() => {
                      UpdateCart({cart:cart,token:user.token})
                      LogoutUser(user);
                      userLogout();
                      clearCart();
                      handleSidebar();
                    }}
                  >
                    logout
                  </Link>
                );
              }
              return <Link to="/login" className="sidebar-link" onClick={handleSidebar}>login</Link>;          
          }}
      </ProductConsumer>
  );
  
}
