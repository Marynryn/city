
import CityInfo from "./CityInfo/CityInfo";

import { Searchbar } from "./Searchbar/Searchbar";


export function App() {


  return (
    <div
      style={{
        height: '100vh',
        display: 'block',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Searchbar />
      <CityInfo />
    </div >
  );
};

