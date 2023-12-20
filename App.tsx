import AppContainer from '@components/AppContainer';
import AppNavigator from '@src/navigation/Index';
import store from '@src/store';
import { Provider } from 'react-redux';
import {QueryClient, QueryClientProvider} from 'react-query';


const quryClient = new QueryClient()

const App = () => {

  return(
    <Provider store={store}>
      <QueryClientProvider client={quryClient}>

      <AppContainer>
      <AppNavigator/> 
      </AppContainer>
      </QueryClientProvider>
    </Provider>

  ) 
};


export default App;     
