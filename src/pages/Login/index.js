import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Tabs, Form, Checkbox, Row } from "antd";
import {
  UserOutlined,
  LockTwoTone,
  MobileTwoTone,
  MailTwoTone,
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
} from "@ant-design/icons";
import styles from "./index.module.less";
import InputItem from "../../components/InputItem";
import SubmitButton from "../../components/SubmitButton";
import { login } from "../../actions/account";

const { TabPane } = Tabs;

const Login = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [autoLogin, setAutoLogin] = useState(true);
  const handleFinish = (values) => {
    dispatch(login(values));
  };
  return (
    <div className={styles.loginContainer}>
      <div className={styles.login}>
        <Form form={form} onFinish={handleFinish}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Username Login" key="1">
              <InputItem
                name="username"
                prefix={<UserOutlined style={{ color: "#1890ff" }} />}
                placeholder="Username"
                size="large"
                rules={[
                  {
                    required: true,
                    message: "Username is required.",
                  },
                ]}
              />
              <InputItem
                name="password"
                prefix={<LockTwoTone style={{ color: "#1890ff" }} />}
                placeholder="Password"
                size="large"
                type="password"
                rules={[
                  {
                    required: true,
                    message: "Password is required.",
                  },
                ]}
              />
            </TabPane>
            <TabPane tab="Mobile Login" key="2">
              <InputItem
                name="mobile"
                prefix={<MobileTwoTone />}
                placeholder="Mobile Number"
                size="large"
                rules={[
                  {
                    required: true,
                    message: "Mobile Number is required.",
                  },
                ]}
              />
              <InputItem
                name="captcha"
                prefix={<MailTwoTone />}
                placeholder="Text Code"
                size="large"
                rules={[
                  {
                    required: true,
                    message: "Text Code is required.",
                  },
                ]}
              />
            </TabPane>
          </Tabs>
          <Row justify="space-between">
            <Checkbox
              checked={autoLogin}
              onChange={(e) => setAutoLogin(e.target.checked)}
            >
              Remember Me
            </Checkbox>
            <a href="#!">Forgot Password</a>
          </Row>
          <SubmitButton>Login</SubmitButton>
        </Form>
        <div className={styles.other}>
          Other Login:
          <AlipayCircleOutlined className={styles.icon}></AlipayCircleOutlined>
          <TaobaoCircleOutlined className={styles.icon}></TaobaoCircleOutlined>
          <WeiboCircleOutlined className={styles.icon}></WeiboCircleOutlined>
          <Link className={styles.register} to="/register">
            New User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
