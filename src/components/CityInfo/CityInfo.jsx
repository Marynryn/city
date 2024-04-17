
import React from 'react';
import { selectFarthestCity } from 'store/selector';
import { useSelector } from 'react-redux';



const CityInfo = () => {
    const farthestCity = useSelector(selectFarthestCity);
    console.log(farthestCity);
    return (
        <div>
            <h2>Самый удаленный город:</h2>
            {farthestCity ? (
                <div>
                    <p>Название: {farthestCity.name}</p>
                    <p>Расстояние: {farthestCity.distance} км</p>

                </div>
            ) : (
                <p>Нет данных о городе</p>
            )}
        </div>
    );
};

export default CityInfo;
