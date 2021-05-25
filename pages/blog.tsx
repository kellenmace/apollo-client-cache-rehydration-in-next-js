import { gql, useQuery } from "@apollo/client";
import { GetStaticPropsContext } from "next";

import { initializeApollo, addApolloState } from "../lib/apolloClient";
import Layout from "../components/Layout";

interface Post {
  databaseId: number;
  title: string;
};

interface PostEdge {
  node: Post;
};

const POSTS_PER_PAGE = 10;

const GET_POSTS = gql`
  query getPosts($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          databaseId
          title
          slug
        }
      }
    }
  }
`;

export default function Blog() {
  const { loading, error, data, fetchMore } = useQuery(GET_POSTS, {
    variables: {
      first: POSTS_PER_PAGE,
      after: null,
    },
    notifyOnNetworkStatusChange: true,
  });
  const posts = data?.posts?.edges?.map((edge: PostEdge) => edge.node) || [];
  const havePosts = Boolean(posts.length);
  const haveMorePosts = Boolean(data?.posts?.pageInfo?.hasNextPage);

  return (
    <Layout>
      <h1>Blog</h1>
      {!havePosts && loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error has occurred.</p>
      ) : !havePosts ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post: Post) => {
          return (
            <article key={post.databaseId} style={{ border: "2px solid #eee", padding: "1rem", marginBottom: "1rem", borderRadius: "10px" }}>
              <h2>{post.title}</h2>
            </article>
          );
        })
      )}
      {havePosts ? (
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
      ) : null}
    </Layout>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_POSTS,
    variables: {
      first: POSTS_PER_PAGE,
      after: null,
    }
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}
