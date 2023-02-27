import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';

function Home() {
  return (
    <div>
      <Header />
      <div className="main-table-container">
        <div className="table-container">
          <Table />
        </div>
      </div>
    </div>
  );
}

export default Home;
