import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import fetchStarWarsApi from '../helpers/fetchStarWarsApi';
import TableContext from './TableContext';

export default function TableProvider({ children }) {
  const [tableContent, setTableContent] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      const { results } = await fetchStarWarsApi();
      setTableContent([...results]);
    }
    fetchApi();
  }, []);

  const results = useMemo(() => ({
    tableContent,
  }), [tableContent]);

  return (
    <TableContext.Provider value={ results }>
      { children }
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};
