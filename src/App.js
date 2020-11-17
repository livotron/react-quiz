import logo from './logo.svg';
import './App.css';
import Layout from './hoc/Layout/Layout';
import Quiz from './conatainers/Quiz/Quiz'

function App() {
  return (
    <Layout>
      <div style={{width: 400, border: '1px solid black'}}>
        <h1>Layout worka</h1>
      </div>
      <Quiz/>

    </Layout>
  );
}

export default App;
