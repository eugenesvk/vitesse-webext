import { render }	from 'solid-js/web'
import App       	from './Options'
import           	     '../styles'

document.getElementById('app').textContent = '';
render(App, document.getElementById('app'));
