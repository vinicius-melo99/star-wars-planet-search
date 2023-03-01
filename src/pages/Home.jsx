import { BiSearch } from 'react-icons/bi';
import React, { useContext } from 'react';
import AppliedFilters from '../components/AppliedFilters';
import Header from '../components/Header';
import Table from '../components/Table';
import TableContext from '../context/TableContext';
import useApplyFilters from '../hooks/useApplyFilters';
import useRemoveFilter from '../hooks/useRemoveFilters';
import useSortOrder from '../hooks/useSortOrder';

function Home() {
  const { applyFilters } = useApplyFilters();
  const { removeAllFilters } = useRemoveFilter();
  const { sortOrder } = useSortOrder();
  const {
    handleFilterText,
    textFilter,
    columnFilter,
    usedNumericFilters,
    handleNumericFilter,
    allAppliedFilters,
    columnSort,
    handleSortSettings,
    order } = useContext(TableContext);
  const { column, comparsion, value } = usedNumericFilters;
  const { column: columnNameToSort } = order;

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
          <BiSearch color="white" size="24px" className="search-icon" />
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
            className="input-type-number"
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
          <select
            name="column"
            data-testid="column-sort"
            onChange={ handleSortSettings }
            value={ columnNameToSort }
          >
            { columnSort.map((columnName, index) => (
              <option key={ index }>
                { columnName }
              </option>
            )) }
          </select>

          <label htmlFor="sort1">
            Ascendente
            <input
              data-testid="column-sort-input-asc"
              id="sort1"
              name="sort"
              value="ASC"
              type="radio"
              onClick={ handleSortSettings }
              className="radio-button-sort"
            />
          </label>
          <label htmlFor="sort2">
            Descendente
            <input
              data-testid="column-sort-input-desc"
              id="sort2"
              name="sort"
              value="DESC"
              type="radio"
              onClick={ handleSortSettings }
              className="radio-button-sort"
            />
          </label>

          <button
            data-testid="column-sort-button"
            onClick={ sortOrder }
          >
            Ordenar
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
