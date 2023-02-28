import { useContext } from 'react';
import TableContext from '../context/TableContext';

const useApplyFilters = () => {
  const {
    usedNumericFilters,
    tableBodyContent,
    setTableBodyContent,
    setColumnFilter,
    columnFilter,
    setUsedNumericFilters,
    setAllAppliedFilters,
    allAppliedFilters } = useContext(TableContext);

  const removeAplliedFilterFromList = (column) => {
    const newColumnFilterList = columnFilter.filter((element) => element !== column);
    setColumnFilter([...newColumnFilterList]);
    setUsedNumericFilters({
      ...usedNumericFilters,
      column: newColumnFilterList.length > 0
        ? newColumnFilterList[0] : '',
    });
  };

  const applyFilters = () => {
    const { column, comparsion, value } = usedNumericFilters;
    let newFilteredTableContent = [];

    switch (comparsion) {
    case 'menor que':
      newFilteredTableContent = tableBodyContent.filter((planet) => (
        Number(planet[column]) < value
      ));
      break;
    case 'maior que':
      newFilteredTableContent = tableBodyContent.filter((planet) => (
        Number(planet[column]) > value
      ));
      break;
    case 'igual a':
      newFilteredTableContent = tableBodyContent.filter((planet) => (
        planet[column] === value
      ));
      break;
    default:
    }

    setAllAppliedFilters([...allAppliedFilters, `${column} ${comparsion} ${value}`]);
    setTableBodyContent([...newFilteredTableContent]);
    removeAplliedFilterFromList(column);
  };

  return {
    applyFilters,
  };
};

export default useApplyFilters;
