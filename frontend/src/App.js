import './App.css';
import {Route} from 'react-router-dom';
import {HashRouter} from 'react-router-dom';
import MenuBar from './MenuBar';
import Home from './Home';
import Sessions from './Sessions';
import Settings from './Settings';

function App() {
  return (
    <div>
	  <HashRouter basename = '/'>
		<div>
			<MenuBar/>
	  		<br/><br/>
			<Route exact path = '/' component = {Home}/>
			<Route path = '/sessions' component = {Sessions}/>
			<Route path = '/settings' component = {Settings}/>
		</div>
	</HashRouter>
    </div>
  );
}

export default App;
