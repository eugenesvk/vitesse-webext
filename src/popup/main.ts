import { render }	from 'solid-js/web'
import App       	from './Popup'
import           	     '../styles'

document.getElementById('app').textContent = '';
render(App, document.getElementById('app'));
