
import { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../store/Actions/auth';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
    componentDidMount() {
        this.props.logout()
    }

    render() {
        return <Redirect to={'/auth'}/>
    }
};

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout())
    }
}
export default connect(null, mapDispatchToProps)(Logout)