import React from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'relay-runtime';
import { createFragmentContainer } from 'react-relay';

import { Country_country } from './__generated__/Country_country.graphql';

export default function Country({ country }: { country: Country_country }) {
  return <Link to={`/country/${country.code}`}>{country.name}</Link>;
}