import React, {Fragment} from "react"
import { distanceInWords, differenceInWeeks } from "date-fns"
import { parseFromTimeZone, convertToLocalTime } from "date-fns-timezone";

function DaysAgo({date, time, author}) {
  const dateTime = `${date} ${time}`;
  const postDate = parseFromTimeZone(dateTime,"M/D/YYYY H:mm",{ timeZone: 'America/Los_Angeles' })
  const now = convertToLocalTime(new Date(), { timeZone: "America/Los_Angeles"})
  const ago =  distanceInWords(now, postDate)
  const weeksAgo = differenceInWeeks(now, postDate)
  const weeksAgoStyle = weeksAgo > 0 ? "#EE495C" : ""

  return (
    <Fragment>
      <time
        style={{
          color: weeksAgoStyle,
        }}
      >
        <em><small>{`${ago} ago`}</small></em>
      </time>
      <br />
      <span>
        <small>
          <a href={`mailto:${author}`}>{author}</a>
        </small>
      </span>
    </Fragment>
  )
}

export default DaysAgo
