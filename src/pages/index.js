import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Question from "../components/question"
import DaysAgo from "../components/daysago"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const allQuestions = data.allGoogleSheetMostRecentRow.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Hack Oregon Weekly Status Updates"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        {allQuestions.map(({ node }) => {
          return (
            <section
              style={{
                marginBottom: rhythm(2),
              }}
            >
              <h2
                style={{
                  marginBottom: rhythm(1 / 4),
                  color: "#AAA4AB",
                }}
              >
                {node.team}
              </h2>
              <DaysAgo date={node.date} author={node.author} time={node.time} />
              <Question
                question="What did your team do this week?"
                answer={node.whatdidyourteamdothisweek}
              />
              <Question
                question="What is your team going to do next week?"
                answer={node.whatisyourteamgoingtodonextweek}
              />
              <Question
                question="What does your team need to be successful"
                answer={node.whatdoyouneedtobesuccessful}
              />
              <Question
                question="Any roadblocks?"
                answer={node.anyroadblocks}
              />
            </section>
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
          author
          time
        }
      }
    }
  }
`
