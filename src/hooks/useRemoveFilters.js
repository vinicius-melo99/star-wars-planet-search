import { useContext } from 'react';
import TableContext from '../context/TableContext';

const useRemoveFilter = () => {
  const {
    allAppliedFilters,
    setAllAppliedFilters,
    setColumnFilter,
    columnFilter,
    setTableBodyContent,
    originalTableContent,
    originalColumnFilter } = useContext(TableContext);

  let originalTableContentCopy = [...originalTableContent];

  const updateTable = (newList) => {
    let updatedList = [];
    if (newList.length === 0) {
      setTableBodyContent([...originalTableContent]);
      return 0;
    }

    newList.forEach((listItem) => {
      const [column, comparsion, que, number] = listItem.split(' ');
      switch (`${comparsion} ${que}`) {
      case 'maior que':
        updatedList = [...originalTableContentCopy]
          .filter((planet) => Number(planet[column]) > Number(number));
        originalTableContentCopy = updatedList;
        break;

      case 'menor que':
        updatedList = [...originalTableContentCopy]
          .filter((planet) => Number(planet[column]) < Number(number));
        originalTableContentCopy = updatedList;
        break;

      case 'igual a':
        updatedList = [...originalTableContentCopy]
          .filter((planet) => Number(planet[column]) === Number(number));
        originalTableContentCopy = updatedList;
        break;
      default:
      }
    });
    setTableBodyContent([...updatedList]);
  };

  const removeFilter = ({ target: { name } }) => {
    const newList = allAppliedFilters
      .filter((appliedFilter) => !(appliedFilter.includes(name)));
    setAllAppliedFilters([...newList]);
    setColumnFilter([...columnFilter, name]);
    updateTable(newList);
  };

  const removeAllFilters = () => {
    setAllAppliedFilters([]);
    setColumnFilter([...originalColumnFilter]);
    setTableBodyContent([...originalTableContent]);
  };

  return {
    removeFilter,
    removeAllFilters,
  };
};

export default useRemoveFilter;
