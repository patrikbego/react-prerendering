import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import DateLabel from "./dateLabel";
import React from 'react';

export default function MainList({allPostsData}) {
  if (allPostsData) {
    return (
      <ul className={utilStyles.list}>
        {allPostsData.map(({id, date, title}) => (
          <li className={utilStyles.listItem} key={id}>
            <Link href="/posts/[id]" as={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
            <br/>
            <small className={utilStyles.lightText}>
              <DateLabel dateString={date}/>
            </small>
          </li>
        ))}
      </ul>
    )
  } else {
    return (
      <ul className={utilStyles.list}>
        <li className={utilStyles.listItem}>
          <a>Loading ...</a>
        </li>
      </ul>
    )
  }

}
