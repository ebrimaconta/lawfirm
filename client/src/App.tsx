import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './domain/Main';
import './assets/css/tailwind.css';
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route path='/' component={Main} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
