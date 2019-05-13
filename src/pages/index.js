import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Question from "../components/question"
import { rhythm } from "../utils/typography"

import { withStyles } from "@material-ui/core/styles"
import Input from "@material-ui/core/Input"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3,
  },
})

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function getStyles(name, that) {
  return {
    fontWeight:
      that.state.selectedTeams.indexOf(name) === -1
        ? that.props.theme.typography.fontWeightRegular
        : that.props.theme.typography.fontWeightMedium,
  }
}

class BlogIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = { selectedTeams: ["Design"] }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = event => {
    this.setState({ selectedTeams: event.target.value })
  }

  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const allQuestions = data.allGoogleSheetMostRecentRow.edges
    const teams = allQuestions.map(({ node }) => node.team)

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All Questions"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Bio />
        <div>
        <FormControl>
          <Select
            multiple
            displayEmpty
            value={this.state.selectedTeams}
            onChange={this.handleChange}
            input={<Input id="select-multiple-placeholder" />}
            renderValue={selected => {
              if (selected.length === 0) {
                return <em>Placeholder</em>
              }

              return selected.join(", ")
            }}
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>Placeholder</em>
            </MenuItem>
            {teams.map(team => (
              <MenuItem key={team} value={team} style={getStyles(team, this)}>
                {team}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        </div>
        {allQuestions
          .filter(({ node }) =>
            this.state.selectedTeams.some(team => node.team === team)
          )
          .map(({ node }) => {
            return (
              <div key={node.team}>
                <h2
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  {node.team}
                </h2>
                <time>{node.date}</time>
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
              </div>
            )
          })}
      </Layout>
    )
  }
}

export default withStyles(styles, { withTheme: true })(BlogIndex)

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
