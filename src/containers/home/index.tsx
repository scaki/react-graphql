import { gql, useQuery } from "@apollo/client";
import logo from "../../logo.svg";
const Home = () => {
  const { loading, error, data } = useQuery(gql`
    query {
      items {
        nextPage
        data {
          bikes {
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
  `);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default Home;
