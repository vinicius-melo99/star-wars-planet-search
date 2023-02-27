import React from 'react';
import './App.css';
import './css/Home.css';
import Home from './pages/Home';
import TableProvider from './context/TableProvider';

function App() {
  return (
    <TableProvider>
      <Home />
    </TableProvider>
  );
}

export default App;
