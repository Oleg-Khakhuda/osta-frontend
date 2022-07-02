import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import operations from "../../redux/plates/operations";
import { Button } from "../../components/button/button";

const PlatePage = () => {
    const navigate = useNavigate();
    const { plateId } = useParams();
    const dispatch = useDispatch();
    
    const [plate, setPlate] = useState({});

    useEffect(() => {
        dispatch(operations.getPlateById(plateId))
            .then((plate) => {
                setPlate(plate.payload);
            })
            .catch((err) => {
                console.log(err);
            })
                ;
    }, [dispatch, plateId]);
    
    console.log(plate);

    return (
        <div>
            <Button onClick={() => navigate(-1)}>
                Назад
            </Button>
            <h1>{plate.name}</h1>
            <img src={plate.plateImage} alt={plate.description} />
            <p>Ціна: {plate.price} грн.</p>
            <p>Кількість: {plate.quantity} шт.</p>
            <p>Опис підлоги: {plate.description}</p>
        </div>
    );
};

export default PlatePage;