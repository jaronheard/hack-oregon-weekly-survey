import React from "react"
import { distanceInWords, differenceInWeeks } from "date-fns"

function DaysAgo({date}) {
  const dateSections = date.split("/")
  const d = new Date(dateSections[2], dateSections[0] - 1, dateSections[1])
  const now = new Date()
  const ago =  distanceInWords(now, d)
  const weeksAgo = differenceInWeeks(now, d)
  const weeksAgoStyle = weeksAgo > 0 ? "#EE495C" : ""

  return (
    <span
      style={{
        color: weeksAgoStyle,
      }}
    >
      <small>
        <time>{date}</time>
        {`– ${ago} ago`}
      </small>
    </span>
  )
}

export default DaysAgo
