import React, { useContext } from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import TableContext from '../context/TableContext';

function Home() {
  const { handleFilterText, textFilter } = useContext(TableContext);
  return (
    <div>
      <Header />
      <div className="main-table-container">
        <input
          data-testid="name-filter"
          type="text"
          onChange={ handleFilterText }
          value={ textFilter }
        />
        <div className="table-container">
          <Table />
        </div>
      </div>
    </div>
  );
}

export default Home;
