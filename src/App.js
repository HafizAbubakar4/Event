import AuthContextProvider from 'context/AuthContext';
import './App.scss';
import 'bootstrap/dist/js/bootstrap'


import Routes from './pages/Routes';

function App() {
  return (
    <AuthContextProvider>
    <Routes/>
    </AuthContextProvider>
  );
}

export default App;
