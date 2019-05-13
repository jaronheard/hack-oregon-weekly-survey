import React, { Fragment } from "react"

import { rhythm } from "../utils/typography"

function Question({question, answer}) {
  return (
    <Fragment>
      <h3
        style={{
          marginTop: rhythm(1 / 2),
          marginBottom: rhythm(1 / 2),
        }}
      >
        {question}
      </h3>
      <section>
        {answer.split("\n").map((item, key) => {
          return (
            <p
              style={{
                marginBottom: rhythm(1 / 4),
              }}
              key={key}
            >
              {item}
            </p>
          )
        })}
      </section>
    </Fragment>
  )
}

export default Question
