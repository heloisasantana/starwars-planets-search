import React from 'react';
import './App.css';
import MyProvider from './context/MyProvider';
import Table from './components/Table';

function App() {
  return (
    <MyProvider>
      <Table />
    </MyProvider>
  );
}

export default App;
