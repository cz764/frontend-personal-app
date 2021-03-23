import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Popover, Progress, Row, Col, Select } from "antd";
import InputItem from "../../components/InputItem";
import SubmitButton from "../../components/SubmitButton";
import { useDispatch } from "redux-react-hook";
import { getCaptcha, register } from "../../actions/register";
import styles from "./index.module.less";

const { Option } = Select;

const passwordStatusMap = {
  ok: <div className={styles.success}>Strong</div>,
  pass: <div className={styles.warning}>Normal</div>,
  poor: <div className={styles.error}>Weak</div>,
};

const passwordProgressMap = {
  ok: "success",
  pass: "normal",
  poor: "exception",
};

const Register = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [popover, setPopover] = useState(false);
  const [prefix, setPrefix] = useState("86");
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log(values);
    dispatch(register(values));
  };
  const handleOnFinishFailed = ({ values, errorFields, outOfDate }) => {
    // handle invalid form submission
    console.log(errorFields, outOfDate);
  };

  const checkConfirm = (_, value) => {
    const promise = Promise;
    if (value && value !== form.getFieldValue("password")) {
      return promise.reject("Confirm password and passwor does not match.");
    }
    return promise.resolve();
  };

  const getPasswordStatus = () => {
    const value = form.getFieldValue("password");
    if (value && value.length > 9) {
      return "ok";
    }
    if (value && value.length > 5) {
      return "pass";
    }

    return "poor";
  };

  const checkPassword = (_, value) => {
    const promise = Promise;
    // no password value
    if (!value) {
      setVisible(!!value);
      return promise.reject("Password is required.");
    }
    // has password value
    if (!visible) {
      setVisible(!!value);
    }
    setPopover(!popover);
    if (value.length < 6) {
      return promise.reject("Password is required to be more than 6 digits.");
    }
    if (value && form.getFieldValue("confirm")) {
      form.validateFields(["confirm"]);
    }
    return promise.resolve();
  };

  const renderPasswordProgress = () => {
    const value = form.getFieldValue("password");
    const passwordStatus = getPasswordStatus();
    return (
      value &&
      value.length && (
        <div className={styles[`progress-${passwordStatus}`]}>
          {passwordStatusMap[passwordStatus]}
          <Progress
            className={styles.progress}
            status={passwordProgressMap[passwordStatus]}
            strokeWidth={6}
            percent={value.length * 10 > 100 ? 100 : value.length * 10}
            showInfo={false}
          >
            progress
          </Progress>
        </div>
      )
    );
  };

  const handleClickCaptcha = () => {
    form
      .validateFields(["username", "email", "password"])
      .then(() => {
        dispatch(
          getCaptcha(form.getFieldsValue(["username", "email", "password"]))
        );
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.register}>
        <Form
          form={form}
          onFinish={handleFinish}
          onFinishFailed={handleOnFinishFailed}
        >
          <InputItem
            name="username"
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
            name="email"
            placeholder="Email"
            size="large"
            rules={[
              {
                required: true,
                message: "Email is required.",
              },
              {
                type: "email",
                message: "Email is not valid.",
              },
            ]}
          />
          <Popover
            content={
              visible && (
                <div>
                  {renderPasswordProgress()}
                  <div>
                    Please enter at least 6 digits. Please do not use 123, abc,
                    qwert etc.
                  </div>
                </div>
              )
            }
            overlayStyle={{ width: 240 }}
            placement="right"
            visible={visible}
          >
            <InputItem
              name="password"
              type="password"
              placeholder="At least 6 digits, case sensitive"
              size="large"
              rules={[
                {
                  validator: checkPassword,
                },
              ]}
            />
          </Popover>

          <InputItem
            name="confirm"
            type="password"
            placeholder="Confirm Password"
            size="large"
            rules={[
              {
                required: true,
                message: "Confirm Password is required.",
              },
              {
                validator: checkConfirm,
              },
            ]}
          />
          <Row>
            <Col span={6}>
              <Select
                size="large"
                value={prefix}
                onChange={(value) => setPrefix(value)}
                style={{ width: "100%" }}
              >
                <Option value="86">+86</Option>
                <Option value="1">+1</Option>
              </Select>
            </Col>
            <Col span={18}>
              <InputItem
                name="mobile"
                placeholder="Mobile Number"
                size="large"
                rules={[
                  {
                    required: true,
                    message: "Confirm Password is required.",
                  },
                  {
                    pattern: /^\d{11}$/,
                    message: "Not match Mobile Number.",
                  },
                ]}
              />
            </Col>
          </Row>
          <InputItem
            name="captcha"
            size="large"
            rules={[
              {
                required: true,
                message: "Please enter code",
              },
            ]}
            placeholder="code"
            onClick={handleClickCaptcha}
          ></InputItem>
          <Row justify="space-between" align="middle">
            <Col span={8}>
              <SubmitButton>Register</SubmitButton>
            </Col>
            <Col span={16}>
              <Link className={styles.login} to="/login">
                Already a user? Login.
              </Link>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Register;
