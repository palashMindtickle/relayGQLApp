import React from 'react';

import { match as matchType } from 'react-router-dom';
import { graphql } from 'relay-runtime';

import { QueryRenderer } from "react-relay"
import environment from '../../api/relayEnv';

import Detail from './components/Detail';
import {
  CountryDetailsQuery,
} from './__generated__/CountryDetailsQuery.graphql';

import Header from './components/Header';
interface Props {
  error: Error | null;
  props: any;
}
function Wrapper({ props }: Props) {
  if (!props) {
    return <div>Loading</div>;
  } else {
    return <Detail country={props.country} />;
  }
}

function CountryDetails({ match }: { match: matchType<{ id: string }> }) {
  return (
    <>
      <Header />
      <QueryRenderer<CountryDetailsQuery>
        query={graphql`
          query CountryDetailsQuery($code: ID!) {
            country(code: $code) {
              ...Detail_country
            }
          }
        `}
        variables={{ code: match.params.id }}
        render={Wrapper}
        environment={environment}
      />
    </>
  );
}

export default CountryDetails;
