import React from 'react';
import {connect} from 'react-redux';
// import CircularProgress from '@material-ui/core/CircularProgress';
import {auth} from '../actions/user_actions';

export default function (ComposedClass, reload, adminRoute = null) {

    class AuthenticationCheck extends React.Component {
        state = {
            loading: false
        }

        componentDidMount() {
            this.props.dispatch(auth()).then(response => {
                console.log('props:', this.props);

                let user = this.props.user.userData;
                // console.log(user);

                if (!user.isAuth) {
                    if (reload) {
                        this.props.history.push('/register_login');
                    }
                } else {
                    if (adminRoute && !user.isAdmin) {
                        this.props.history.push('/user/dashboard');
                    } else {
                        this.props.history.push('/user/dashboard');
                    }
                }

                this.setState({loading: false});
            })
        }

        render() {
            if (this.state.loading) {
                return (
                    <div className="main_loader">
                        {/* <CircularProgress style={{color: '#2196F3'}} thickness={7} /> */}
                    </div>
                )
            }

            return (
                <ComposedClass {...this.props} user={this.props.user}/>
            )
        }
    }

    function mapStateToProps(state) {
        return {
            user: state.user
        }
    }

    return connect(mapStateToProps)(AuthenticationCheck);
}
