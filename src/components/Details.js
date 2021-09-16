import React, { useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';
export const Details = (props) => {
  useEffect(() => {
    getPlaces();
  }, []);

  const [points, setPoints] = useState('');
  let home = {
    neighborhood: props.data[0].address_components[2].long_name,
    address: props.data[0].formatted_address,
    latitude: props.data[0].geometry.location.lat(),
    longitude: props.data[0].geometry.location.lng(),
  };
  const getPlaces = () => {
    console.log(props);
    console.log(home);
    const map = new props.google.maps.Map(document.createElement('div'), {
      center: { lat: home.latitude, lng: home.longitude },
      zoom: 15,
    });
    const request = {
      location: map.getCenter(),
      rankBy: 'DISTANCE',
      query: 'parks',
    };
    const service = new props.google.maps.places.PlacesService(map);
    service.textSearch(request, callback);

    function callback(results, status) {
      if (status == 'OK') {
        setPoints(results);
      }
    }
  };

  const displayPoints = (results) => {
    return results.map((place, id) => {
      return (
        <Fade left>
          <div className="place" key={id}>
            <li>
              <b>Address: </b>
              {place.formatted_address}
              <br />
              <b>Name: </b>
              {place.name}
              <br />
              <b>Type: </b>
              {place.types.join(', ')}
              <br />
            </li>
          </div>
        </Fade>
      );
    });
  };
  return (
    <>
      <Fade>
        <div className="homeShow">
          {home.address}
          <br />
          <b>Neighborhood: </b>
          {home.neighborhood}
          <h1>Points of Interest</h1>
          <ul>{points ? displayPoints(points) : ''}</ul>
        </div>
      </Fade>
    </>
  );
};
