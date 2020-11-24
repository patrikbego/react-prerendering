import {parseISO, format} from 'date-fns'
import React from 'react'

export default function DateLabel({dateString}) {
  const date = dateString ? parseISO(dateString) : Date.now();
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}
