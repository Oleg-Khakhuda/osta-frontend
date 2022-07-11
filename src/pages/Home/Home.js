import React from 'react';
import Filter from '../../components/Filter/Filter';
import Navbar from '../../components/Navbar/Navbar';
import PlatesList from '../../components/PlatesList/PlatesList';

const Home = () => {  
    return (
      <>
        <Navbar />
        <Filter />
        <PlatesList />
      </>
    );
};

export default Home;