import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import fetchStarWarsApi from '../helpers/fetchStarWarsApi';
import TableContext from './TableContext';

export default function TableProvider({ children }) {
  const [tableHeadContent, setTableHeadContent] = useState([]);
  const [tableBodyContent, setTableBodyContent] = useState([]);
  const [textFilter, setTextFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [originalColumnFilter] = useState([...columnFilter]);
  const [originalTableContent, setOriginalTableContent] = useState([]);
  const [usedNumericFilters, setUsedNumericFilters] = useState({
    column: '', comparsion: '', value: 0,
  });
  const [allAppliedFilters, setAllAppliedFilters] = useState([]);
  const [order, setOrder] = useState({ column: 'population', sort: 'ASC' });
  const [columnSort] = useState([...columnFilter]);

  useEffect(() => {
    async function fetchApi() {
      const { results } = await fetchStarWarsApi();
      setOriginalTableContent([...results]);
      if (results.length !== 0) {
        setTableHeadContent([...Object.keys(results[0])
          . filter((element) => element !== 'residents')]);
        setTableBodyContent([...results]);
        setUsedNumericFilters({
          column: 'population',
          comparsion: 'maior que',
          value: 0,
        });
      }
    }
    fetchApi();
  }, []);

  const handleFilterText = ({ target: { value } }) => {
    setTextFilter(value);
  };

  const handleNumericFilter = useCallback(({ target: { value, name } }) => {
    setUsedNumericFilters({
      ...usedNumericFilters,
      [name]: value,
    });
  }, [usedNumericFilters]);

  const handleSortSettings = useCallback(({ target: { value, name } }) => {
    setOrder({
      ...order,
      [name]: value,
    });
  }, [order]);

  const results = useMemo(() => ({
    tableHeadContent,
    tableBodyContent,
    textFilter,
    originalTableContent,
    columnFilter,
    usedNumericFilters,
    originalColumnFilter,
    allAppliedFilters,
    order,
    columnSort,
    handleFilterText,
    handleNumericFilter,
    handleSortSettings,
    setTableBodyContent,
    setColumnFilter,
    setUsedNumericFilters,
    setAllAppliedFilters,
    setOrder,
  }), [textFilter,
    originalTableContent,
    tableHeadContent,
    tableBodyContent,
    columnFilter,
    usedNumericFilters,
    originalColumnFilter,
    allAppliedFilters,
    order,
    columnSort,
    handleNumericFilter,
    handleSortSettings,
  ]);

  return (
    <TableContext.Provider value={ results }>
      { children }
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};
