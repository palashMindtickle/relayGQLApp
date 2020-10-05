import React from 'react';
import { Link } from 'react-router-dom';

export default function Country({ country }: { country: any }) {
  return <Link to={`/country/${country.code}`}>{country.name}</Link>;
}
