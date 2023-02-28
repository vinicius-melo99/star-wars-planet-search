import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

export default function Table() {
  const {
    tableHeadContent,
    tableBodyContent,
    textFilter } = useContext(TableContext);

  return (
    <table>
      <thead>
        <tr>
          {tableHeadContent.length !== 0 && tableHeadContent.map((th, index) => (
            <th key={ index }>{ th }</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableBodyContent.filter(({ name }) => name.toLowerCase()
          .includes(textFilter.toLowerCase()))
          .map(({
            name,
            rotation_period: rotationPeriod,
            orbital_period: orbitalPeriod,
            diameter,
            climate,
            gravity,
            terrain,
            surface_water: surfaceWater,
            population,
            films,
            created,
            edited,
            url,
          }, index) => (
            <tr key={ index }>
              <td data-testid="planet-name">{ name }</td>
              <td>{ rotationPeriod }</td>
              <td>{ orbitalPeriod }</td>
              <td>{ diameter }</td>
              <td>{ climate }</td>
              <td>{ gravity }</td>
              <td>{ terrain }</td>
              <td>{ surfaceWater }</td>
              <td>{ population }</td>
              <td>{ films }</td>
              <td>{ created }</td>
              <td>{ edited }</td>
              <td>{ url }</td>
            </tr>
          ))}

      </tbody>
    </table>
  );
}
