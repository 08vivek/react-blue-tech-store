import Alert from "react-bootstrap/Alert";
import React from 'react'
import {ProductConsumer} from "../context";
import Button from "react-bootstrap/Button";
export default function AlertForm() {
    return (
        <ProductConsumer>
            {value => {
                const {user,alertShow,setShow} = value;
                return (
                    <>
                        <Alert alertShow={alertShow} variant="success">
                            <Alert.Heading>Welcome!</Alert.Heading>
                            <p>You are logged in {user.username}</p>
                                <hr />
                                <div className="d-flex justify-content-end">
                                    <Button onClick={() => setShow(false)} variant="outline-success">Close!</Button>
                                </div>
                        </Alert>

                        {/* {!alertShow && <Button onClick={() => setShow(true)}>Show Alert</Button>} */}
                    </>
                );
            }}
        </ProductConsumer>
    );
}
