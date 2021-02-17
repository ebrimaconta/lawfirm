import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './domain/Main';
import Display from './domain/Display';
import './assets/css/tailwind.css';
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route path='/' component={Main} exact />
          <Route path='/display' component={Display} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
