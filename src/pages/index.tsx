import { graphql, Link, PageProps } from "gatsby";
import React from "react";
import Layout from "../components/layout";

const IndexPage = ({ data }: PageProps<Queries.lastPostsQuery>) => {
  return (
    <Layout pageTitle="主页">
      <ul className="post-list">
        {data.allAsciidoc.nodes.map((node) => (
          <li key={node.id} className="post-item">
            <h5>
              <Link to={`/posts/${node.pageAttributes?.slug}/`}>
                {node.document?.title}
              </Link>
            </h5>
            <p>发表于 {node.revision?.date}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default IndexPage;

export const lastPostsQuery = graphql`
  query lastPosts {
    allAsciidoc(
      sort: { fields: revision___date, order: DESC }
      filter: { pageAttributes: { draft: { ne: "true" } } }
      limit: 5
    ) {
      nodes {
        id
        document {
          title
        }
        pageAttributes {
          slug
        }
        revision {
          date
          number
        }
      }
    }
  }
`;
