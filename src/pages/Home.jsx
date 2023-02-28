import React, { useContext } from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import TableContext from '../context/TableContext';
import useApplyFilters from '../hooks/useApplyFilters';

function Home() {
  const { applyFilters } = useApplyFilters();
  const {
    handleFilterText,
    textFilter,
    columnFilter,
    usedNumericFilters,
    handleNumericFilter } = useContext(TableContext);
  const { column, comparsion, value } = usedNumericFilters;
  return (
    <div>
      <Header />
      <div className="main-table-container">
        <div className="text-filter-container">
          <input
            data-testid="name-filter"
            type="text"
            onChange={ handleFilterText }
            value={ textFilter }
          />
        </div>
        <div className="numeric-value-filter">
          <select
            name="column"
            data-testid="column-filter"
            value={ column }
            onChange={ handleNumericFilter }
          >
            {columnFilter.map((columnName, index) => (
              <option key={ index }>{columnName}</option>
            ))}
          </select>
          <select
            name="comparsion"
            data-testid="comparison-filter"
            value={ comparsion }
            onChange={ handleNumericFilter }
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
          <input
            name="value"
            data-testid="value-filter"
            type="number"
            value={ value }
            onChange={ handleNumericFilter }
          />
          <button
            data-testid="button-filter"
            onClick={ applyFilters }
          >
            Filtar
          </button>
        </div>
        <div className="table-container">
          <Table />
        </div>
      </div>
    </div>
  );
}

export default Home;
