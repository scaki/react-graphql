import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import Item from "./item";
import styles from "./item-list.module.scss";
import Pagination from "./pagination";
import { ItemListProps } from "./types";

const ItemList = (props: ItemListProps) => {
  const {
    data,
    rowTemplate,
    className,
    pagination,
    totalCount,
    row,
    onChangePage,
    loading,
  } = props;
  const getPageSize = (): number => {
    if (pagination && totalCount && row) {
      return totalCount / row;
    }
    return 0;
  };
  return (
    <div className={`${styles.container} ${className}`}>
      {loading && (
        <div className={styles.loading}>
          <ProgressSpinner
            style={{ width: "200px", height: "200px" }}
            strokeWidth="4"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        </div>
      )}
      {data.map((item: any, index: number) => {
        if (item === null) return;
        return <Item key={index} item={item} template={rowTemplate} />;
      })}
      {pagination && (
        <Pagination
          size={getPageSize()}
          onChange={(page) => onChangePage && onChangePage(page)}
        />
      )}
    </div>
  );
};
ItemList.defaultProps = { data: [], totalCount: 10, row: 10 };
export default ItemList;
