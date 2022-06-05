import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Dropdown, DropdownChangeParams } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import ItemList from "../../components/item-list";
import styles from "./home.module.scss";
import BikeDetail from "../bike-detail";
import { Button } from "primereact/button";
const Home = () => {
  const [vehicleType, setVehicleType] = useState<string | null>("all");
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [selectedBikeId, setSelectedBikeId] = useState<string>("");
  const QUERY = gql`
    query Items($page: Int!, $vehicleType: String!) {
      items(page: $page, vehicleType: $vehicleType) {
        totalCount
        data {
          bikes {
            bikeId
            vehicleType
          }
        }
      }
    }
  `;
  const { loading, data, refetch } = useQuery(QUERY, {
    variables: { page: 1, vehicleType: "all" },
  });
  const rowTemplate = (item: any) => {
    return (
      <div className={styles.row}>
        <div className={styles.info}>
          <b style={{ marginRight: 5 }}>{item.bikeId}</b> - {item.vehicleType}
        </div>
        <div className={styles.actions}>
          {item.bikeId !== null && (
            <Button label="Show" onClick={() => showDetailModal(item.bikeId)} />
          )}
        </div>
      </div>
    );
  };
  const showDetailModal = (bikeId: string) => {
    setSelectedBikeId(bikeId);
    setVisibleModal(true);
  };
  const vehicleTypeOptions = [
    { label: "All", value: "all" },
    { label: "Bike", value: "bike" },
    { label: "Scooter", value: "scooter" },
  ];
  const handleSelectVehicleType = (e: DropdownChangeParams) => {
    setVehicleType(e.value);
    refetch({ vehicleType: e.value });
    console.log(e.value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.filterBar}>
        <Dropdown
          value={vehicleType}
          options={vehicleTypeOptions}
          onChange={handleSelectVehicleType}
          optionLabel="label"
        />
      </div>
      <ItemList
        className={styles.listWrapper}
        data={data?.items.data.bikes}
        rowTemplate={rowTemplate}
        pagination
        totalCount={data?.items.totalCount}
        onChangePage={(page: number) => refetch({ page })}
        loading={loading}
      />
      <Dialog
        header="Bike Detail"
        visible={visibleModal}
        style={{ width: "50vw" }}
        onHide={() => setVisibleModal(false)}
      >
        <BikeDetail bikeId={selectedBikeId} />
      </Dialog>
    </div>
  );
};

export default Home;
