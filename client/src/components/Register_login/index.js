import React from 'react';
import MyButton from '../utils/button';
import Login from './login'

const RegisterLogin = (props) => {
    return (
        <div className="page_wrapper">
            <div className="container">
                <div className="register_login_container">
                    <div className="left">
                        <h1>New Customers</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit ducimus inventore, molestiae nesciunt minus cum tenetur, quia iste voluptatum, qui soluta officia hic ullam distinctio aspernatur porro fuga vel, reiciendis.</p>
                        <MyButton
                            type="default"
                            title="Create an account"
                            linkTo="/register"
                            addStyles={{
                                margin: '10px 0 0 0'
                            }}
                        />
                    </div>
                    <div className="right">
                        <h2>Registered customers</h2>
                        <p>If you have an account please log in.</p>
                        <Login />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterLogin;
