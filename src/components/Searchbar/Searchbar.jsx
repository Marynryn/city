import React, { useState, useEffect } from 'react';
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
    const googleKey = 'AIzaSyCduEZkYjqoZtkbdTktC1z5HgotpZbU7BI';
    const Key = '16dc66080156492b8f5d7bda3f9ce890';

    const handleSearch = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const { lat: cityLat, lng: cityLng } = await geocodeCity(cityName);
            const oppositeLat = cityLat * -1;
            const oppositeLng = (Number(cityLng) > 0) ? Number(cityLng) - 180 : Number(cityLng) + 180;
            const nearestCityData = await findNearestCity(oppositeLat, oppositeLng);
            setNearestCity(nearestCityData.city);
            setNearestCountry(nearestCityData.country);
            setLoading(false);
        } catch (error) {
            setError('Ошибка при поиске города');
            setNearestCity('');
            setNearestCountry('');
            setLoading(false);
        }
    };

    const geocodeCity = async (cityName) => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(cityName)}&key=${googleKey}`;
        const response = await axios.get(url);
        const { lat, lng } = response.data.results[0].geometry.location;
        return { lat, lng };
    };

    const findNearestCity = async (latitude, longitude) => {
        const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${Key}`;
        const response = await axios.get(url);
        const cityObject = response.data.features[0];
        if (cityObject) {
            const cityName = cityObject.properties.address_line1;
            const country = cityObject.properties.country;
            return { city: cityName, country };
        }
        return { city: '', country: '' };
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Радиус Земли в кілометрах
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Расстояние в кілометрах
        return distance;
    };

    const toRadians = (degrees) => {
        return degrees * Math.PI / 180;
    };

    useEffect(() => {
        const fetchData = async () => {
            if (nearestCity) {
                try {
                    const { lat: nearestLat, lng: nearestLng } = await geocodeCity(nearestCity);
                    const { lat: cityLat, lng: cityLng } = await geocodeCity(cityName);
                    const distance = calculateDistance(cityLat, cityLng, nearestLat, nearestLng);
                    setDistance(distance);
                } catch (error) {
                    setError('Ошибка при поиске ближайшего города');
                    setDistance(null);
                }
            }
        };

        fetchData();
    }, [nearestCity]);

    return (
        <>
            <HeaderSearchbar>
                <SearchForm>
                    <Input
                        type="text"
                        placeholder="Введите город"
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
                    />
                    <SearchBtn onClick={handleSearch}>Найти</SearchBtn>
                </SearchForm>
            </HeaderSearchbar>
            <Container>
                {loading && <Loader />}
                {error && <Error>{error}</Error>}
                {nearestCity && <><Result>Самый отдаленный город: {nearestCity}</Result>
                    <Result>Страна: {nearestCountry}</Result></>}
                {distance && <Result>Расстояние между городами: {distance.toFixed(2)} км</Result>}
            </Container>
        </>
    );
};

export default Searchbar;
