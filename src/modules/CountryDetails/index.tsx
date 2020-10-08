import React from 'react';
import { match as matchType } from 'react-router-dom';
import { graphql } from 'relay-runtime';
import { QueryRenderer } from '@mindtickle/relay-core';
import Detail from './components/Detail';
import {
  CountryDetailsQuery,
  CountryDetailsQueryResponse
} from './__generated__/CountryDetailsQuery.graphql';
import Loader, { LOADING_SIZE, LOADER_TYPE } from 'mt-ui-components/Loader'

function Wrapper({ props }: { props?: CountryDetailsQueryResponse }) {
  if (!props) {
    return <Loader
      loadingMessage={'Fetching country Details...'}
      type={LOADER_TYPE.Full}
      size={LOADING_SIZE.sizeBig}
  />;
  } else {
    return <Detail country={props.country} />;
  }
}
function CountryDetails({ match }: { match: matchType<{code: string}> }) {
  console.log(match.params, 'codepapa');
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
