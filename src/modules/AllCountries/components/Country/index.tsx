import React from 'react';
import { Link } from 'react-router-dom';

export default function Country({ country }: { country: any }) {
  return (<>
      <td>
        <Link to={`/country/${country.code}`}>{country.name}</Link>
      </td>
      <td>
        {country.languages.map(l => l.name).join()}
      </td>
      <td>
        {country.continent.name}
      </td>
    </>);
}