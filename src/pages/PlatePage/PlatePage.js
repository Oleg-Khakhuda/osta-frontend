import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import operations from "../../redux/plates/operations";
import { Button } from "../../components/Button/Button";

const PlatePage = () => {
    const navigate = useNavigate();
    const { plateId } = useParams();
    const dispatch = useDispatch();
    
    const [plate, setPlate] = useState([]);

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

    const handleClick = () => navigate(-1);

    const onDeletePlate = (e) => {
        dispatch(operations.deletePlate(e.target.id));
    }

    return (
        <div>
            <Button
                isBackButton = {true}
                onClick={handleClick}>
                Назад
            </Button>
            {plate.id ? (
                <>
                    <h1>{plate.name}</h1>
                    <img src={plate.plateImage[0]} alt={plate.description} />
                    <p>Ціна: {plate.price} грн.</p>
                    <p>Кількість: {plate.quantity} шт.</p>
                    <p>Опис підлоги: {plate.description}</p>
                    <Button>
                        Додати в корзину
                    </Button>
                    <Button>
                        Змінити
                    </Button>
                    <Button
                        onClick={onDeletePlate}
                        id={plate.id}
                        type="button"
                        isBackButton = {true}
                    >
                        Видалити
                    </Button>
                </>
            ): (<p>Підлога не знайдена</p>)}
        </div>
    );
};

export default PlatePage;