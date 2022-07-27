import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import operations from '../../redux/plates/operations';
import { Button } from '../../components/Button/Button';
import axios from 'axios';

const UpdatePlate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
    
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [plateImage, setPlateImage] = useState([]);
    const [oldPlateImage, setOldPlateImage] = useState([]);
    const [newPlateImage, setNewPlateImage] = useState([]);
  
    const fetchPlate = useCallback(async () => {
        const { data } = await axios.get(`/api/plates/plate/${params.id}`);
      // dispatch(operations.getPlateById(params.id));
        setName(data.name);
        setQuantity(data.quantity);
        setPrice(data.price);
        setDescription(data.description);
        setOldPlateImage(data.plateImage);
        
    }, [params.id]); 

    useEffect(() => {
        fetchPlate();
    }, [fetchPlate]);

    const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'quantity':
        setQuantity(value);
        break;
        
      case 'price':
        setPrice(value);
        break;
        
      case 'description':
        setDescription(value);
        break;
        
      case 'plateImage':
        setNewPlateImage(value);
        break;

      default:
        return;
    }
  };
  

  const onFileChange = e => {
    
    setOldPlateImage('');

    let fileObj = [];
    let fileArray = [];

    fileObj.push(e.target.files);

    for(let i = 0; i < fileObj[0].length; i++){
      fileArray.push(URL.createObjectURL(fileObj[0][i]));
      setNewPlateImage(fileArray);
    }
    setPlateImage(e.target.files);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const plateId = params.id;
    try {
      const updatedPlate = new FormData();
        updatedPlate.append('name', name);
        updatedPlate.append('quantity', quantity);
        updatedPlate.append('price', price);
        updatedPlate.append('description', description);
        updatedPlate.append('id', plateId);
          for (const key of Object.keys(plateImage)) {
          updatedPlate.append('plateImage', plateImage[key]);
         }
        dispatch(operations.updatePlate(updatedPlate)).then((res) => {
      if (!res.error) {
        navigate(`/plate/${res.payload.id}`, { replace: true });
          }
          console.log(params.id);
          console.log(updatedPlate.id);
          resetForm();

        });  
        } catch (error) {
            console.log(error);
        }
  };

  const resetForm = () => {
    setName('');
    setQuantity('');
    setPrice('');
    setDescription('');
    setOldPlateImage('');
  };

  const handleClick = () => navigate(-1);
    
    return (
      <>
        <Button
          isBackButton = {true}
          onClick={handleClick}
        >
          Назад
        </Button>
            <h1>Оновити плиту</h1>
        <form>
          <label>
            Зображення підлоги:
            <input
                type="file"
                placeholder="Зображення"
                name="plateImage"  
                multiple
                onChange={onFileChange}
            />
          </label>
                <div>
                    {oldPlateImage && (
              <ul>
                {oldPlateImage.map((image, index) => (
                  <li key={index}>;
                  <img src={image} alt={image} />
                </li>
                ))}
              </ul>
            )}
            {newPlateImage && (
              <ul>
                {newPlateImage.map((image, index) => (
                <li key={index}>
                  <img src={image} alt={image} />
                </li>
                ))}
              </ul>      
                )}
                </div>
          <label>
            Назва підлоги:
            <input
                type="text"
                placeholder="Назва виробу"
                value={name}
                name="name"   
                onChange={handleChange}
            />
          </label>
          <label>
            Кількість:
            <input
                type="text"
                placeholder="Кількість"
                value={quantity}
                name="quantity" 
                onChange={handleChange}
            />
            </label>
          <label>
            Ціна підлоги:
            <input
                type="text"
                placeholder="Ціна"
                value={price}
                name="price" 
                onChange={handleChange}
            />
            </label>
          <label>
            Опис підлоги:
            <input
                type="text"
                placeholder="Опис"
                value={description}
                name="description"   
                onChange={handleChange}
            />
            </label>
          <Button
            onClick={handleSubmit}
          >
            Оновити
                </Button>
                <Button
                onClick={resetForm}>
                    Очистити
                </Button>
        </form>
        </>
    );
};

export default UpdatePlate;