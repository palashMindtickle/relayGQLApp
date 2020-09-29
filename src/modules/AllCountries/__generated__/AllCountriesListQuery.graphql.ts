/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AllCountriesListQueryVariables = {};
export type AllCountriesListQueryResponse = {
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
export type AllCountriesListQuery = {
    readonly response: AllCountriesListQueryResponse;
    readonly variables: AllCountriesListQueryVariables;
};



/*
query AllCountriesListQuery {
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
    "name": "AllCountriesListQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AllCountriesListQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "c37d17d2964b9983a05914c8d78cc4b1",
    "id": null,
    "metadata": {},
    "name": "AllCountriesListQuery",
    "operationKind": "query",
    "text": "query AllCountriesListQuery {\n  countries {\n    name\n    continent {\n      name\n    }\n    languages {\n      name\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '5280ca9aa50309d21ed8f795edd7baee';
export default node;
