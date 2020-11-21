import './App.css';
import Quiz from './conatainers/Quiz/Quiz';
import QuizList from './conatainers/QuizList/QuizList';
import Auth from './conatainers/Auth/Auth';
import QuizCreator from './conatainers/QuizCreator/QuizCreator';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Logout from './components/Loguot/Logout';
import { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import { logout, autoLogin } from './store/Actions/auth';
class App extends Component {

  componentDidMount () {
    this.props.autoLogin();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/quiz-creator" component={QuizCreator} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/" exact component={QuizList} />
        <Redirect to="/" />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/logout" component={Logout} />
          <Route exact path="/" component={QuizList} />
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
      isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
