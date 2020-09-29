/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 8da6cf5c65602cd321dfbcdd805d92fe */

import { ConcreteRequest } from "relay-runtime";
export type AllCountriesQueryVariables = {};
export type AllCountriesQueryResponse = {
    readonly countries: ReadonlyArray<{
        readonly name: string;
        readonly continent: {
            readonly name: string;
        };
        readonly languages: ReadonlyArray<{
            readonly name: string | null;
        }>;
    }>;
};
export type AllCountriesQuery = {
    readonly response: AllCountriesQueryResponse;
    readonly variables: AllCountriesQueryVariables;
};



/*
query AllCountriesQuery {
  countries {
    name
    continent {
      name
    }
    languages {
      name
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = [
  (v0/*: any*/)
],
v2 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Country",
    "kind": "LinkedField",
    "name": "countries",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Continent",
        "kind": "LinkedField",
        "name": "continent",
        "plural": false,
        "selections": (v1/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Language",
        "kind": "LinkedField",
        "name": "languages",
        "plural": true,
        "selections": (v1/*: any*/),
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AllCountriesQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AllCountriesQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "8da6cf5c65602cd321dfbcdd805d92fe",
    "metadata": {},
    "name": "AllCountriesQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = '4aaa7375fd8f33d402176fa254e21d8d';
export default node;
