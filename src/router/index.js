import { Route, Routes } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import { Spin } from "antd";
import styles from "./index.module.less";

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

const Router = () => (
  <Suspense
    fallback={
      <div className={styles.spinWrapper}>
        <Spin size="large" />
      </div>
    }
  >
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/login" element={<Login />}></Route>
      <Route exact path="/register" element={<Register />}></Route>
    </Routes>
  </Suspense>
);

export default Router;
