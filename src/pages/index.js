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
        <section>
          <p>
            <em>
              Updates from Hack Oregon teams, populated by{" "}
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSdlLUPDCcReqxorFx-Fw_PZC3SRbXL4ycGaw5ZC3AvUUZ7YqQ/viewform">
                this form
              </a>
            </em>
          </p>
        </section>
        {allQuestions.map(({ node }) => {
          return (
            <article
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
              <DaysAgo date={node.date} />
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
            </article>
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
