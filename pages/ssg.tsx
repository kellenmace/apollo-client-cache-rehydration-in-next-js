import { gql } from "@apollo/client";
import { GetStaticPropsContext } from "next";

import { initializeApollo, addApolloState } from "../lib/apolloClient";
import Ssg from "../components/Ssg";

export interface Countries {
  countries: Country[];
}

export interface Country {
  code:       string;
  name:       string;
  emoji:      string;
  __typename: Typename;
}

export enum Typename {
  Country = "Country",
}

// interface Post {
//   databaseId: number;
//   title: string;
// };

// interface PostEdge {
//   node: Post;
// };

// const POSTS_PER_PAGE = 10;

const GET_COUNTRIES = gql`
  query Countries {
    countries {
      code
      name
      emoji
    }
  }
`;

// const GET_POSTS = gql`
//   query getPosts($first: Int!, $after: String) {
//     posts(first: $first, after: $after) {
//       pageInfo {
//         hasNextPage
//         endCursor
//       }
//       edges {
//         node {
//           id
//           databaseId
//           title
//           slug
//         }
//       }
//     }
//   }
// `;

export default function SSGPage() {
 

  return (
    <Ssg />
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_COUNTRIES,
    // variables: {
    //   first: POSTS_PER_PAGE,
    //   after: null,
    // }
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}
