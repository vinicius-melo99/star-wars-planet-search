import { useContext } from 'react';
import TableContext from '../context/TableContext';

const useSortOrder = () => {
  const { order, tableBodyContent, setTableBodyContent } = useContext(TableContext);
  const { column, sort } = order;

  const sortOrder = () => {
    if (sort === 'ASC') {
      setTableBodyContent([...tableBodyContent
        .sort((a, b) => b[column] - a[column])]);

      setTableBodyContent([...tableBodyContent
        .sort((a, b) => a[column] - b[column])]);
    } else {
      setTableBodyContent([...tableBodyContent
        .sort((a, b) => a[column] - b[column])]);

      setTableBodyContent([...tableBodyContent
        .sort((a, b) => b[column] - a[column])]);
    }
  };

  return {
    sortOrder,
  };
};

export default useSortOrder;
