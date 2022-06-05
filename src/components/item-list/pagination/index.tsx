import React, { useState } from "react";
import { Button } from "primereact/button";
import styles from "./pagination.module.scss";
import { PaginationProps } from "./types";

const Pagination = (props: PaginationProps) => {
  const { size, onChange } = props;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const goToPage = (page: number) => {
    setCurrentPage(page);
    onChange(page);
  };
  const renderPages = () => {
    const pageList = [];
    pageList.push(
      <Button
        key="-1"
        label="<<"
        onClick={() => goToPage(1)}
        disabled={currentPage === 1}
        style={{ width: 50, height: 50, justifyContent: "center" }}
      />
    );
    pageList.push(
      <Button
        key="0"
        label="<"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        style={{ width: 50, height: 50, justifyContent: "center" }}
      />
    );

    for (let page = currentPage; page <= size; page++) {
      if (pageList.length !== 11) {
        pageList.push(
          <Button
            key={page.toString()}
            label={page.toString()}
            onClick={() => goToPage(page)}
            disabled={page === currentPage}
            style={{ width: 50, height: 50, justifyContent: "center" }}
          />
        );
      }
    }

    pageList.push(
      <Button
        label=">"
        onClick={() => goToPage(currentPage + 1)}
        style={{ width: 50, height: 50, justifyContent: "center" }}
        disabled={currentPage === size}
        key={(size + 1).toString()}
      />
    );

    pageList.push(
      <Button
        label=">>"
        onClick={() => goToPage(size)}
        style={{ width: 50, height: 50, justifyContent: "center" }}
        disabled={currentPage === size}
        key={(size + 2).toString()}
      />
    );
    return pageList;
  };
  return <div className={styles.pagination}>{renderPages()}</div>;
};

export default Pagination;
