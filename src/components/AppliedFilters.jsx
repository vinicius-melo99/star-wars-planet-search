import React, { useContext } from 'react';
// import { MdDeleteForever } from 'react-icons/md';
import TableContext from '../context/TableContext';
import useRemoveFilter from '../hooks/useRemoveFilters';

export default function AppliedFilters() {
  const { allAppliedFilters } = useContext(TableContext);
  const { removeFilter } = useRemoveFilter();

  return (
    <div className="applied-filters-container">
      <p>Filtros aplicados: </p>
      { allAppliedFilters.length > 0
            && allAppliedFilters.map((filter, index) => (
              <div data-testid="filter" key={ index }>
                <span>{filter}</span>
                <button
                  id={ filter.split(' ')[0] }
                  name={ filter.split(' ')[0] }
                  className="remove-filter-button"
                  onClick={ removeFilter }
                >
                  Remover
                </button>
              </div>
            )) }
    </div>
  );
}
