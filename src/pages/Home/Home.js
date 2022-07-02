import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import operations from '../../redux/plates/operations';
import Filter from '../../components/Filter/Filter';
import Navbar from '../../components/Navbar/Navbar';
import PlatesList from '../../components/PlatesList/PlatesList';

const Home = () => {
  const [plates, setPlates] = useState([]);

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(operations.fetchPlates())
      .then((plates) => {
        setPlates(plates)
      })
      .catch(err => {
        console.log(err);
      });
  }, [dispatch]);
  
    return (
      <>
        <Navbar />
        <Filter />
        <PlatesList plates={plates} />
      </>
    );
};

export default Home;