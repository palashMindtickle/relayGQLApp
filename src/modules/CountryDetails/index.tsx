import React from 'react';
import { match as matchType } from 'react-router-dom';
import { graphql } from 'relay-runtime';
import { QueryRenderer } from '@mindtickle/relay-core';
import Detail from './components/Detail';
import {
  CountryDetailsQuery,
  CountryDetailsQueryResponse,
} from './__generated__/CountryDetailsQuery.graphql';

function Wrapper({ props }: { props?: CountryDetailsQueryResponse }) {
  if (!props) {
    return <div>Loading</div>;
  } else {
    return <Detail country={props.country} />;
  }
}
function CountryDetails({ match }: { match: matchType<{ code: string }> }) {
  return (
    <>
      <QueryRenderer<CountryDetailsQuery>
        query={graphql`
          query CountryDetailsQuery($code: ID!) {
            country(code: $code) {
              ...Detail_country
            }
          }
        `}
        variables={{ code: match.params.code }}
        Component={Wrapper}
      />
    </>
  );
}

export default CountryDetails;
