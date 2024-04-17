import React, { useState } from 'react';
import axios from 'axios';

import { Container, Error, HeaderSearchbar, Input, Result, SearchBtn, SearchForm } from './Searchbar.styled';
import { Loader } from 'components/Loader/Loader';

const Searchbar = () => {

    const [cityName, setCityName] = useState('');
    const [nearestCity, setNearestCity] = useState('');
    const [nearestCountry, setNearestCountry] = useState('');
    const [distance, setDistance] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (event) => {
        event.preventDefault();
        setLoading(true);
        setNearestCity('');
        setNearestCountry('');
        setDistance(null);
        setError(null);
        try {

            const { lat: cityLat, lng: cityLng } = await geocodeCity(cityName);


            const oppositeLat = cityLat * -1;
            const oppositeLng = (Number(cityLng) > 0) ? Number(cityLng) - 180 : Number(cityLng) + 180;
            console.log(cityLng)
            console.log(oppositeLng)

            const nearestCityData = await findNearestCity(oppositeLat, oppositeLng);
            setNearestCity(nearestCityData.city);
            setNearestCountry(nearestCityData.country);



            const { lat: nearestLat, lng: nearestLng } = await geocodeCity(nearestCity);


            const distance = calculateDistance(cityLat, cityLng, nearestLat, nearestLng);
            setDistance(distance);

            setError(null);
            setLoading(false);
        } catch (error) {
            setError('Ошибка при поиске ближайшего города');
            setNearestCity('');
            setNearestCountry('');
            setDistance(null);
            setLoading(false);
        }
    };
    const geocodeCity = async (cityName) => {
        const username = 'marynak'; // Ваше имя пользователя на GeoNames
        const url = `http://api.geonames.org/searchJSON?q=${encodeURIComponent(cityName)}&maxRows=1&username=${username}`;
        const response = await axios.get(url);
        const { lat, lng } = response.data.geonames[0];
        return { lat, lng };
    };

    const findNearestCity = async (latitude, longitude) => {
        const username = 'marynak'; // Ваше имя пользователя на GeoNames
        const url = `http://api.geonames.org/findNearbyJSON?lat=${latitude}&lng=${longitude}&radius=300&username=${username}`;
        const response = await axios.get(url);
        const nearestCity = response.data.geonames[0].name;
        const country = response.data.geonames[0].countryName;

        return { city: nearestCity, country: country };
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Радиус Земли в километрах
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Расстояние в километрах
        return distance;
    };

    const toRadians = (degrees) => {
        return degrees * Math.PI / 180;
    };

    return (<>
        <HeaderSearchbar>
            <SearchForm>
                <Input
                    type="text"
                    placeholder="Введите город"
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                />
                <SearchBtn onClick={handleSearch}>Найти </SearchBtn>
            </SearchForm>
        </HeaderSearchbar >
        <Container>
            {loading && <Loader />
            }
            {error && <Error>{error}</Error>}
            {nearestCity && <><Result>Ближайший город: {nearestCity}</Result>
                <Result>Страна: {nearestCountry} </Result></>}
            {distance && <Result>Расстояние между городами: {distance.toFixed(2)} км</Result>}
        </Container></>
    );
};

export default Searchbar;
