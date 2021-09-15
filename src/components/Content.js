import React, { Component } from 'react';
import home from '../assets/home.svg';
import Search from '../components/Search';
import { Details } from '../components/Details';
import { Loader } from '@googlemaps/js-api-loader';
const loader = new Loader({
  apiKey: process.env.REACT_APP_API_KEY,
  version: 'weekly',
  libraries: ['geocoder,places'],
});

export default class Content extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    loader.load().then((google) => {
      let geocoder = new google.maps.Geocoder();
      this.setState({
        google: google,
        geocoder: geocoder,
      });
    });
  }

  fetchData = (searchState) => {
    // this.loadTestData();
    let { address } = searchState;
    this.state.geocoder.geocode({ address: address }, (results, status) => {
      if (status === 'OK') {
        this.setState({
          data: results,
        });
      } else {
        alert('API Call Error STATUS: ' + status);
      }
    });
  };

  render() {
    return (
      <div className="content">
        <div className="findHome">
          <h1>Find home details</h1>
          Search uses several Google API's to aggregate data.
          <ul>
            <li>Places</li>
            <li>Maps</li>
            <li>Geocode</li>
          </ul>
        </div>
        <div className="home">
          <img src={home} alt="home icon" />
        </div>
        <Search fetchData={this.fetchData} />
        {this.state.data ? (
          <Details data={this.state.data} google={this.state.google} />
        ) : (
          ''
        )}
      </div>
    );
  }

  loadTestData = () => {
    this.setState({
      data: [
        {
          address_components: [
            {
              long_name: '920',
              short_name: '920',
              types: ['street_number'],
            },
            {
              long_name: 'South Conkling Street',
              short_name: 'S Conkling St',
              types: ['route'],
            },
            {
              long_name: 'Canton',
              short_name: 'Canton',
              types: ['neighborhood', 'political'],
            },
            {
              long_name: 'Baltimore',
              short_name: 'Baltimore',
              types: ['locality', 'political'],
            },
            {
              long_name: 'Maryland',
              short_name: 'MD',
              types: ['administrative_area_level_1', 'political'],
            },
            {
              long_name: 'United States',
              short_name: 'US',
              types: ['country', 'political'],
            },
            {
              long_name: '21224',
              short_name: '21224',
              types: ['postal_code'],
            },
            {
              long_name: '5216',
              short_name: '5216',
              types: ['postal_code_suffix'],
            },
          ],
          formatted_address: '920 S Conkling St, Baltimore, MD 21224, USA',
          geometry: {
            bounds: {
              south: 39.2820669,
              west: -76.5672976,
              north: 39.2821276,
              east: -76.56704309999999,
            },
            location: {
              lat: 39.2820838,
              lng: -76.5671668,
            },
            location_type: 'ROOFTOP',
            viewport: {
              south: 39.2807482697085,
              west: -76.5685193302915,
              north: 39.2834462302915,
              east: -76.56582136970849,
            },
          },
          place_id: 'ChIJ0-7O9vUDyIkRcMilxaZu-90',
          types: ['premise'],
        },
      ],
    });
  };
}
