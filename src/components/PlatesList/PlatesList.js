import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredPlates, getPlates } from '../../redux/plates/selectors';
import { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import operations from '../../redux/plates/operations';

const PlatesList = () => {
    const plates = useSelector(getFilteredPlates);
    const dispatch = useDispatch();
    const location = useLocation();
    
    // useEffect(() => {
    //     dispatch(operations.fetchPlates());
    // }, [dispatch]);

    return (
        <ul>
            {plates.map(plate => (
                <li key={plate.id}>
                    <Link to={{
                        pathname: `/plates/${plate.id}`,
                        state: {
                            from: location,
                        },
                    }}
                    >
                        <h2>{plate.name}</h2>
                        <img src={plate.plateImage} alt="" />
                        <p>{plate.description}</p>
                        <p>Кількість: {plate.quantity} шт.</p>
                        <p>Ціна: {plate.price} грн.</p>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default PlatesList;