import React, { useEffect, useState } from "react";
import { Input, Form, Button, Row, Col, message } from "antd";
import styles from "./index.module.less";

const InputItem = (props) => {
  const { name, rules, ...rest } = props;
  const [timing, setTiming] = useState(false); // timing=true when clicked Captcha button
  const [count, setCount] = useState(props.countDown || 60); // countdown seconds
  const handleClickCaptcha = (e) => {
    message.success("Successfully get text code 1234."); // popup to mock text set
    setTiming(true);
  };

  useEffect(() => {
    let interval = 0;
    if (timing) {
      interval = window.setInterval(() => {
        setCount((preSecond) => {
          if (preSecond <= 1) {
            setTiming(false); // countdown finish
            clearInterval(interval);
            return props.countDown || 60;
          }
          return preSecond - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timing, props.countDown]);

  if (name === "captcha") {
    return (
      <Form.Item name={name} rules={rules}>
        <Row gutter={8}>
          <Col span={16}>
            <Input {...rest} />
          </Col>
          <Col span={8}>
            <Button
              className={styles.getCaptcha}
              size="large"
              disabled={timing}
              onClick={handleClickCaptcha}
            >
              {timing ? `${count} Seconds` : "Send Text"}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    );
  }
  return (
    <Form.Item name={name} rules={rules}>
      <Input {...rest} />
    </Form.Item>
  );
};

export default InputItem;
