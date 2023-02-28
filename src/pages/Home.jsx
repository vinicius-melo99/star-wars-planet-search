import React, { useContext } from 'react';
import AppliedFilters from '../components/AppliedFilters';
import Header from '../components/Header';
import Table from '../components/Table';
import TableContext from '../context/TableContext';
import useApplyFilters from '../hooks/useApplyFilters';
import useRemoveFilter from '../hooks/useRemoveFilters';

function Home() {
  const { applyFilters } = useApplyFilters();
  const { removeAllFilters } = useRemoveFilter();
  const {
    handleFilterText,
    textFilter,
    columnFilter,
    usedNumericFilters,
    handleNumericFilter,
    allAppliedFilters } = useContext(TableContext);
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
          <button
            data-testid="button-remove-filters"
            onClick={ removeAllFilters }
          >
            Remover Filtros
          </button>
        </div>
        { allAppliedFilters.length > 0 && <AppliedFilters /> }
        <div className="table-container">
          <Table />
        </div>
      </div>
    </div>
  );
}

export default Home;
