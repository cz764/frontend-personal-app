import React, { useState } from "react";
import { Tag, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./index.module.less";

const TagList = ({ tags }) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [newTags, setNewTags] = useState([]);
  const showInput = (e) => {
    setInputVisible(true);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = (e) => {
    let tempsTags = [...newTags]; // copy newTags state
    if (
      inputValue &&
      !tags
        .concat(tempsTags)
        .map(({ label }) => label)
        .includes(inputValue) // no existing tags
    ) {
      tempsTags = [
        ...tempsTags,
        { key: `new-${tempsTags.length}`, label: inputValue },
      ];
    }
    setNewTags(tempsTags);
    setInputVisible(false);
    setInputValue("");
  };
  return (
    <div className={styles.tags}>
      <div className={styles.tagsTitle}>Tags</div>
      {(tags || []).concat(newTags).map((item) => (
        <Tag key={item.key}>{item.label}</Tag>
      ))}
      {inputVisible && (
        <Input
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag onClick={showInput} style={{ borderStyle: "dashed" }}>
          <PlusOutlined />
        </Tag>
      )}
    </div>
  );
};

export default TagList;
