import ReactDOM from 'react-dom';

import App from './App';
import {EventsContextProvider} from './context/EventsContext';

ReactDOM.render(<EventsContextProvider>
                    <App />
                </EventsContextProvider>, document.getElementById('root'));