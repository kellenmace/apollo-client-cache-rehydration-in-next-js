import { gql, useQuery } from "@apollo/client";
import { GetStaticPropsContext } from "next";

import { initializeApollo, addApolloState } from "../lib/apolloClient";
import Layout from "../components/Layout";

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

export default function Blog() {
  const { loading, error, data, fetchMore } = useQuery(GET_COUNTRIES, {
    fetchPolicy:'cache-only',
    // variables: {
    //   first: POSTS_PER_PAGE,
    //   after: null,
    // },
    notifyOnNetworkStatusChange: true,
  });
  const countries = data?.countries || [];
  const haveCountries = Boolean(countries.length);
 // const haveMorePost = Boolean(data?.posts?.pageInfo?.hasNextPage);
 

  return (
    <Layout>
      <h1>Blog</h1>
      {!haveCountries && loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error has occurred.</p>
      ) : !haveCountries ? (
        <p>No countries found.</p>
      ) : (
        countries.map((country: Country, index:number) => {
          return (
            <article key={index} style={{ border: "2px solid #eee", padding: "1rem", marginBottom: "1rem", borderRadius: "10px" }}>
              <h2>{country.code} | {country.name} | {country.emoji}</h2> 
            </article>
          );
        })
      )}
      {/* {havePosts ? (
        haveMorePosts ? (
          <form onSubmit={event => {
            event.preventDefault();
            fetchMore({
              variables: {
                first: 5,
                after: data.posts.pageInfo.endCursor,
              }
            });
          }}>
            <button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Load more"}
            </button>
          </form>
        ) : (
          <p>✅ All posts loaded.</p>
        )
      ) : null} */}
    </Layout>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_COUNTRIES,
    fetchPolicy: 'cache-first'
    // variables: {
    //   first: POSTS_PER_PAGE,
    //   after: null,
    // }
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}
