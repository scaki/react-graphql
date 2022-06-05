import React from "react";
import styles from "./item.module.scss";
import { ItemProps } from "./types";

const Item = (props: ItemProps) => {
  const { item, template } = props;
  return <div className={styles.item}>{template(item)}</div>;
};

export default Item;
