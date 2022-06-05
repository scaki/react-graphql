import React from "react";
import { gql, useQuery } from "@apollo/client";
import styles from "./bike-detail.module.scss";
import { BikeDetailProps } from "./types";
import { ProgressSpinner } from "primereact/progressspinner";

const BikeDetail = (props: BikeDetailProps) => {
  const QUERY = gql`
    query GetBikeById($bikeId: String!) {
      bikeById(bikeId: $bikeId) {
        data {
          bike {
            bikeId
            lat
            lon
            isReserved
            isDisabled
            vehicleType
            totalBookings
            android
            ios
          }
        }
      }
    }
  `;
  const { loading, data } = useQuery(QUERY, {
    variables: { bikeId: props.bikeId },
  });
  const renderBooleanRow = (value: boolean) => {
    if (value) {
      return "yes";
    }
    return "no";
  };
  const renderUrlRow = (value: string) => {
    return (
      <a href={value} target="_blank" rel="noreferrer">
        {value}
      </a>
    );
  };
  const bikeData = data?.bikeById.data.bike;
  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loading}>
          <ProgressSpinner
            style={{ width: "200px", height: "200px" }}
            strokeWidth="4"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        </div>
      ) : (
        <div className={styles.details}>
          <div className={styles.row}>
            <div className={styles.label}>bike_id:</div>
            <div className={styles.value}>{bikeData?.bikeId}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>lat:</div>
            <div className={styles.value}>{bikeData?.lat}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>lon:</div>
            <div className={styles.value}>{bikeData?.lon}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>is_reserved:</div>
            <div className={styles.value}>
              {renderBooleanRow(bikeData?.isReserved)}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>is_disabled:</div>
            <div className={styles.value}>
              {renderBooleanRow(bikeData?.isDisabled)}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>vehicle_type:</div>
            <div className={styles.value}>{bikeData?.vehicleType}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>total_bookings:</div>
            <div className={styles.value}>{bikeData?.totalBookings}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>android:</div>
            <div className={styles.value}>
              {renderUrlRow(bikeData?.android)}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>ios:</div>
            <div className={styles.value}>{renderUrlRow(bikeData?.ios)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BikeDetail;
