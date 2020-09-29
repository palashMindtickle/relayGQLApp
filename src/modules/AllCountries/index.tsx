import React from 'react';
// import { graphql } from 'relay-runtime';
// @ts-ignore
import { graphql } from 'relay-runtime';

// import { graphql } from 'babel-plugin-relay/macro'
import { QueryRenderer } from '@mindtickle/relay-core';
import Country from './components/Country';
import {
  AllCountriesQuery,
  AllCountriesQueryResponse,
} from './__generated__/AllCountriesQuery.graphql';
// interface Props {
//   error: Error | null;
//   props: any;
// }

const CountriesList = ({ props }:  { props?: AllCountriesQueryResponse }) => {
  if (props) {
    return (
      <ul>
        {props.countries.map((country, index) => (
          <li key={index}>
            <Country country={country} />
          </li>
        ))}
      </ul>
    );
  } else {
    return <div>Loading.....</div>;
  }
}

export default function AllCountries() {
  return (
    <div>
      {/* <Header /> */}
      <QueryRenderer<AllCountriesQuery>
        query={graphql`
          query AllCountriesQuery {
            countries {
              name,
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
