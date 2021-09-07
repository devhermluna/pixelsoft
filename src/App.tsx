import { Provider } from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import Container from './components/Container';
import store from './store';

const persistor = persistStore(store);

const App = () => (
  <Container />
);
// all wrappers here
const AppWrapper = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

export default AppWrapper;
