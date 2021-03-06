import React from 'react';
import { graphql } from 'relay-runtime';
import { QueryRenderer } from '@mindtickle/relay-core';
import Country from './components/Country';
import {
  AllCountriesQuery,
  AllCountriesQueryResponse,
} from './__generated__/AllCountriesQuery.graphql';
import './style.css'
const CountriesList = ({ props }:  { props?: AllCountriesQueryResponse }) => {
  if (props) {
    return (
      <table style={{width:"100%"}}>
        <tr>
          <th className='alignC'>Country</th>
          <th className='alignC'>Languages</th>
          <th className='alignC'>Continent</th>
        </tr>
        {props.countries.map((country, index) => (
          <tr>
            <Country country={country} />
          </tr>
        ))}
      </table>
    );
  } else {
    return <div>Loading.....</div>;
  }
}

export default function AllCountries() {
  return (
    <div>
      <QueryRenderer<AllCountriesQuery>
        query={graphql`
          query AllCountriesQuery {
            countries {
              name
              code
              continent {
                name
              }
              languages {
                name
						  }
            }
          }
        `}
        Component={CountriesList}
        variables={{}}
      />
    </div>
  );
}
