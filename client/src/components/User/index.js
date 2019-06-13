import React from 'react';
import isEmpty from 'lodash/isEmpty';
import UserLayout from '../../hoc/user';
import MyButon from '../utils/button';

const UserDashboard = ({user}) => {
    console.log('UserDashboard user:', user);
    console.log('render');

    if (isEmpty(user)) return false;

    return (
        <UserLayout>
            <div>
                <div className="user_nfo_panel">
                    <h1>User information</h1>
                    <div>
                        <span>{user.userData.name}</span>
                        <span>{user.userData.lastname}</span>
                        <span>{user.userData.email}</span>
                    </div>
                    <MyButon
                        type="default"
                        title="Edit account info"
                        linkTo="/user/user_profile"
                    />
                </div>

                <div className="user_nfo_panel">
                    <h1>History purchases</h1>
                    <div className="user_product_block_wrapper">
                        history
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default UserDashboard;
