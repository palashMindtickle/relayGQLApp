import React from 'react';
import { Link } from 'react-router-dom';
import '../../style.css'
export default function Country({ country }: { country: any }) {
  return (<>
      <td className='alignC'>
        <Link to={`/country/${country.code}`}>{country.name}</Link>
      </td>
      <td className='alignC'>
        {country.languages.map((l: any) => l.name).join()}
      </td>
      <td className='alignC'>
        {country.continent.name}
      </td>
    </>);
}