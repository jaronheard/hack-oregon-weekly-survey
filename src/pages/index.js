import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"



class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allGoogleSheetMostRecentRow.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.team
          return (
            <div key={node.team}>
              <h2
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                {title}
              </h2>
              <small>{node.date}</small>
              <p>
                <strong>What did your team do this week?</strong>
              </p>
              <section>
                {node.whatdidyourteamdothisweek
                  .split("\n")
                  .map((item, key) => {
                    return <p key={key}>{item}</p>
                  })}
              </section>
              <p>
                <strong>
                  What is your team going to do next week?
                </strong>
              </p>
              <section>
                {node.whatisyourteamgoingtodonextweek
                  .split("\n")
                  .map((item, key) => {
                    return <p key={key}>{item}</p>
                  })}
              </section>
              <p>
                <strong>
                  What does your team need to be successful?
                </strong>
              </p>
              <section>
                {node.whatdoyouneedtobesuccessful
                  .split("\n")
                  .map((item, key) => {
                    return <p key={key}>{item}</p>
                  })}
              </section>
              <p>
                <strong>Any Roadblocks?</strong>
              </p>
              <section>
                {node.anyroadblocks
                  .split("\n")
                  .map((item, key) => {
                    return <p key={key}>{item}</p>
                  })}
              </section>
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allGoogleSheetMostRecentRow (
      sort: { fields: [date], order: DESC }
    ) {
      edges {
        node {
          date
          team
          whatdidyourteamdothisweek
          whatisyourteamgoingtodonextweek
          whatdoyouneedtobesuccessful
          anyroadblocks
        }
      }
    }
  }
`
