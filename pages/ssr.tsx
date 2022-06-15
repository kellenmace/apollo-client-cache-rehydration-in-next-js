import { gql  } from "@apollo/client";
import { GetStaticPropsContext } from "next";
import Ssr from "../components/Ssr";

import { initializeApollo, addApolloState } from "../lib/apolloClient";


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

export default function SSRPage() {
 

  return (
    <Ssr />
  );
}

export async function getServerSideProps(context: GetStaticPropsContext) {
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
