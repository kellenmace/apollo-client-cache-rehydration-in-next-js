import { gql, useQuery } from "@apollo/client";

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

export default function Ssg() {
  const { loading, error, data } = useQuery(GET_COUNTRIES, {
    // variables: {
    //   first: POSTS_PER_PAGE,
    //   after: null,
    // }
  });
  const countries = data?.countries || [];
  const haveCountries = Boolean(countries.length);

  return (
    <Layout>
      <h1>SSG Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error has occurred.</p>
      ) : !haveCountries ? (
        <p>No posts found.</p>
      ) : (
        countries.map((country: Country, index:number) => {
          return (
            <article key={index} style={{ border: "2px solid #eee", padding: "1rem", marginBottom: "1rem", borderRadius: "10px" }}>
                <h2>{country.code} | {country.name} | {country.emoji}</h2>
            </article>
          );
        })
      )}
    </Layout>
  );
}

