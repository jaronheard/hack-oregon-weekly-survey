import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    const description = (
      <p>
        <em>
          Updates from Hack Oregon teams, populated by{" "}
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSdlLUPDCcReqxorFx-Fw_PZC3SRbXL4ycGaw5ZC3AvUUZ7YqQ/viewform">
            this form
          </a>
        </em>
      </p>
    )
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{header}{description}</header>
        <main>{children}</main>
        <footer>
          <a href="https://github.com/jaronheard/hack-oregon-weekly-survey">
            <em>Improve this on GitHub</em>
          </a>
        </footer>
      </div>
    )
  }
}

export default Layout
