import React from "react";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../context";
import LogoutUser from "../loginreg/LogoutUser";
export default function LoginLink() {
  
  return (
      <ProductConsumer>
          {value => {
              const {user,cart,removeSetSingleProduct,clearCart,userLogout,handleSidebar} = value;
              
              if (user.token) {
                return (
                  <Link to="/"
                    className="sidebar-link"
                    onClick={() => {
                      handleSidebar();
                      userLogout();
                      clearCart();
                      removeSetSingleProduct();
                      LogoutUser({cart:cart,token:user.token});
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
