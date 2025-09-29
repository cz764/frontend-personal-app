import React from "react";
import { Avatar } from "antd";
import dayjs from "dayjs";
import styles from "./index.module.less";

const ArticleListContent = ({
  data: { content, avatar, href, owner, updateAt },
}) => (
  <div>
    <div>{content}</div>
    <div className={styles.extra}>
      <Avatar src={avatar} size="small" />
      <a href={href}>{owner}</a>Posted at <a href={href}>{href}</a>
      <em>{dayjs(updateAt).format("YYYY-MM-DD")}</em>
    </div>
  </div>
);

export default ArticleListContent;
