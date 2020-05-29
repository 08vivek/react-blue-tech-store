import React from "react";
import {ProductConsumer} from "../context";
import { useHistory } from "react-router-dom";
import LoginUser from "../loginreg/LoginUser";
import RegisterUser from "../loginreg/RegisterUser";
import AlertForm from "../components/AlertForm";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function Login(){
    const history = useHistory();
    return (
        <ProductConsumer>
            {value => {
                const {userLogin,isEmpty,username,email,password,isMember,setPasswordForm,updateCart,setEmailForm,handleChangeForm,toggleMemberForm} = value;
                  
                const handleSubmit = async e => {   
                                   
                    e.preventDefault();
                    let response;
                    if (isMember) {
                        response = await LoginUser({ email, password });
                    } else {
                        response = await RegisterUser({ email, password, username });
                    }
                    if(isMember && response.data){
                      const {token,user} = response.data;
                      let username = user.username;
                      let cart = user.cart;
                      const curruser = {token,username};
                      updateCart(cart);
                      userLogin(curruser);
                      AlertForm();
                      console.log(`you are logged in ${username}`);
                      history.push("/products");

                    }
                    else if(!isMember && response.data){
                      console.log(`you are signed up ${username}`);
                      setPasswordForm("");
                      setEmailForm("");
                      toggleMemberForm();
                    }else{
                      if(isMember){
                        console.log('check your login credentials');
                      }else{
                        console.log('Email is already taken');
                      }
                    }
                  };
                  
                return (
                <Card style={{ width: '25rem',display: "flex",justifyContent: "center",alignItems: "center"}}>
                <Card.Header >{isMember ? "Sign in" : "Register"}</Card.Header>
                <Form > 
                  {/* single input */}
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" id="email" name="email" onChange={handleChangeForm} value={email} placeholder="Enter email" />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  
                  {/* end of single input */}
                  {/* single input */}
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" id="password" value={password} onChange={handleChangeForm} placeholder="Password" />
                  </Form.Group>
                  {/* end of single input */}
                  {/* single input */}
                  {!isMember && (
                  <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" id="username" value={username} placeholder="username" onChange={handleChangeForm}/>
                  </Form.Group>
                    
                  )}
                  {/* end of single input */}
                  {/* empty form text */}
                  {isEmpty && (
                    <Form.Text className="text-muted">
                      Please fill out all form fields.
                    </Form.Text>
                    //<p >please fill out all form fields</p>
                  )}
                  {/* submit btn */}
                  {!isEmpty && (

                    <Button type="submit" variant="info" onClick={handleSubmit}>
                      submit
                    </Button>
                  )}
                  {/* register link */}
                  
                  <Form.Text className="text-muted">
                      {isMember ? "Need to register!!  " : "Already a member!!  "}
                  
                  <Button type="button" variant="secondary" onClick={toggleMemberForm}>
                      click here
                  </Button>
                  </Form.Text>
                  
                </Form>
              </Card>);
            }}
        </ProductConsumer>
    );
}