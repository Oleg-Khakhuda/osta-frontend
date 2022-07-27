import React from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { getFilteredPlates } from '../../redux/plates/selectors';
import { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import operations from '../../redux/plates/operations';
import s from '../PlatesList/PlatesList.module.css';
import { Button } from '../Button/Button';

const PlatesList = () => {
    const plates = useSelector(getFilteredPlates);
    const location = useLocation();
    const dispatch = useDispatch();
  
    useEffect(() => {
        dispatch(operations.fetchPlates())
    }, [dispatch, location]);
    
    const onDeletePlate = (e) => {
        dispatch(operations.deletePlate(e.target.id));
    }
  
    return ( 
        <ul className={s.list}>
            {plates.map(plate => (
                <li key={plate.id} className={s.item}>
                    <Link to={{
                        pathname: `/plate/${plate.id}`,
                        state: {
                            from: location,
                        },
                    }}
                    >
                        <h2 className={s.title}>{plate.name}</h2>
                        <div className={s.image_block}>
                        <img
                            src={plate.plateImage[0]}
                            alt={plate.description}
                            className={s.image}
                            />
                        </div>
                        <div className={s.desc_item}>
                            <p>{plate.description}</p>
                            <p>Кількість: {plate.quantity} шт.</p>
                            <p>Ціна: {plate.price} грн.</p>
                        </div>
                    </Link>
                    <Button>
                        Додати в корзину
                    </Button>
                    
                        <Link to={{
                            pathname: `/plate/update-plate/${plate.id}`,
                            state: {
                                from: location,
                            }
                    }}
                    >
                        <Button>
                            Оновити
                        </Button>
                        </Link>
                    
                    <Button
                        onClick={onDeletePlate}
                        id={plate.id}
                        type="button"
                        isBackButton = {true}
                    >
                        x
                    </Button>
                </li>
            ))}
        </ul>
    )
}

export default PlatesList;