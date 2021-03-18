import React, { useState } from "react";
import { Row, Col, Card } from "antd";
import Articles from "./components/Articles";
import Applications from "./components/Applications";
import Projects from "./components/Projects";
import styles from "./index.module.less";

const operationTabList = [
  {
    key: "articles",
    tab: (
      <span>
        Articles <span>(9)</span>
      </span>
    ),
  },
  {
    key: "applications",
    tab: (
      <span>
        Applications <span>(10)</span>
      </span>
    ),
  },
  {
    key: "projects",
    tab: (
      <span>
        Projects <span>(11)</span>
      </span>
    ),
  },
];

const renderChildrenByTabKey = (tabKey) => {
  switch (tabKey) {
    case "articles":
      return <Articles />;
    case "applications":
      return <Applications />;
    case "projects":
      return <Projects />;
    default:
      return <Articles />;
  }
};

const Home = () => {
  const [tabKey, setTabKey] = useState("articles");
  const onTabChange = (key) => {
    setTabKey(key);
  };
  return (
    <div className={styles.container}>
      <Row gutter={24}>
        <Col lg={7} md={24}>
          <Card boardered={false} style={{ marginBottom: 24 }}>
            card1
          </Card>
        </Col>
        <Col lg={17} md={24}>
          <Card
            bbordered={false}
            tabList={operationTabList}
            activeTabKey={tabKey}
            onTabChange={onTabChange}
          >
            {renderChildrenByTabKey(tabKey)}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
