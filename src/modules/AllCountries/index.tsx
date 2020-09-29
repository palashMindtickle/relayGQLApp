import React from 'react';
import { graphql } from 'relay-runtime';


import { createFragmentContainer, QueryRenderer } from "react-relay"
// import { Props } from 'relay-runtime';
import environment from '../../api/relayEnv';
// const graphql = require('babel-plugin-relay/macro');

// import Header from './components/Header';
// import { graphql } from "babel-plugin-relay/macro";
import Country from './components/Country';
// import {
//   HomeCountriesListQuery,
//   HomeCountriesListQueryResponse,
// } from './__generated__/HomeCountriesListQuery.graphql';
// ({ error, props }: Props)
interface Props {
  error: Error | null;
  props: any;
}

const CountriesList = ({ props }: Props) => {
  if (props) {
    return (
      <ul>
        {props.countries.map((country: Object, index: number) => (
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
      <QueryRenderer
        query={graphql`
          query AllCountriesListQuery {
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
        render={CountriesList}
        variables={{}}
        environment={environment}
      />
    </div>
  );
}
