import React from 'react';
import { graphql } from 'relay-runtime';
import { createFragmentContainer } from 'react-relay';

import { Detail_country } from './__generated__/Detail_country.graphql';

function Detail({ country }: { country: Detail_country | null }) {
  if (!country) {
    return <div>Country Not found</div>;
  }
  return (
    <div>
      <div>
        <b>Name</b>: {country.name}
      </div>
      <div>
        <b>Currency</b>: {country.currency}
      </div>
      <div>
        <b>Code</b>: {country.code}
      </div>
    </div>
  );
}

export default createFragmentContainer(Detail, {
  country: graphql`
    fragment Detail_country on Country {
      name
      currency
      code
    }
  `,
});
