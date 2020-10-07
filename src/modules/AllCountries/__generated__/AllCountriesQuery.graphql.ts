/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AllCountriesQueryVariables = {};
export type AllCountriesQueryResponse = {
    readonly countries: ReadonlyArray<{
        readonly name: string;
        readonly code: string;
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
    code
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
        "kind": "ScalarField",
        "name": "code",
        "storageKey": null
      },
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
    "cacheID": "8ac808fd186cfb93303ae463a19754f4",
    "id": null,
    "metadata": {},
    "name": "AllCountriesQuery",
    "operationKind": "query",
    "text": "query AllCountriesQuery {\n  countries {\n    name\n    code\n    continent {\n      name\n    }\n    languages {\n      name\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '03e44d765dc0c3e782407ad1c27ee15b';
export default node;
