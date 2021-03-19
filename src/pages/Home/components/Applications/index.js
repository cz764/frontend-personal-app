import React from "react";
import { List, Tag } from "antd";
import styles from "./index.module.less";

const Applications = ({ list }) => {
  return (
    <List
      className={styles.filterCardList}
      rowKey="id"
      grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
      dataSource={list}
      renderItem={(item) => <List.Item key={item.id}>blabla</List.Item>}
    ></List>
  );
};

export default Applications;
