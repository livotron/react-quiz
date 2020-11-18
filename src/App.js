import logo from './logo.svg';
import './App.css';
import Layout from './hoc/Layout/Layout';
import Quiz from './conatainers/Quiz/Quiz';
import QuizList from './conatainers/QuizList/QuizList';
import Auth from './conatainers/Auth/Auth';
import QuizCreator from './conatainers/QuizCreator/QuizCreator';

import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/auth" component={Auth}/>
        <Route path="/quiz-creator" component={QuizCreator}/>
        <Route path="/quiz/:id" component={Quiz}/>
        <Route path="/" component={QuizList}/>
      </Switch>
    </Layout>
  );
}

export default App;
