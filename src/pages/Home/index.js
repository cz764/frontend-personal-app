import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useMappedState } from "redux-react-hook";
import { Row, Col, Card, Divider, Avatar } from "antd";
import {
  ContactsOutlined,
  ClusterOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import Articles from "./components/Articles";
import Applications from "./components/Applications";
import Projects from "./components/Projects";
import TagList from "./components/TagList";
import styles from "./index.module.less";
import { currentUser, fakeList } from "./data.js";
import { getUserProfile } from "../../actions/profile";

const articleList = fakeList(10);
const applicationList = fakeList(10);
const projectList = fakeList(10);

const mapState = (state) => state.profile;

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
      return <Articles list={articleList} />;
    case "applications":
      return <Applications list={applicationList} />;
    case "projects":
      return <Projects list={projectList} />;
    default:
      return <Articles list={articleList} />;
  }
};

const renderUserInfo = (currentUser) => {
  return (
    <div className={styles.detail}>
      <p>
        <ContactsOutlined className={styles.userInfoIcon} />
        {currentUser.title}
      </p>
      <p>
        <ClusterOutlined className={styles.userInfoIcon} />
        {currentUser.group}
      </p>
      <p>
        <HomeOutlined className={styles.userInfoIcon} />
        {(currentUser.geographic || { province: { label: "" } }).province.label}
        {(currentUser.geographic || { city: { label: "" } }).city.label}
      </p>
    </div>
  );
};

const Home = () => {
  const dispatch = useDispatch();
  const { user = {} } = useMappedState(mapState);
  const [tabKey, setTabKey] = useState("articles");
  const onTabChange = (key) => {
    setTabKey(key);
  };

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Row gutter={24}>
        <Col lg={7} md={24}>
          <Card bordered={false} style={{ marginBottom: 24 }}>
            <div className={styles.avatarHolder}>
              <img alt="" src={currentUser.avatar} />
              <div className={styles.name}>{currentUser.name}</div>
              <div className={styles.signature}>{currentUser.signature}</div>
            </div>
            {renderUserInfo(currentUser)}
            <Divider dashed />
            <TagList tags={currentUser.tags} />
            <Divider dashed />
            <div>
              <div className={styles.teamTitle}>Team</div>
              <Row className={styles.team} gutter={36}>
                {currentUser.notice &&
                  currentUser.notice.map((item) => (
                    <Col key={item.id} lg={24} xl={12}>
                      <Link to="/setting">
                        <Avatar size="small" src={item.logo}></Avatar>
                        {item.member}
                      </Link>
                    </Col>
                  ))}
              </Row>
            </div>
          </Card>
        </Col>
        <Col lg={17} md={24}>
          <Card
            bordered={false}
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
