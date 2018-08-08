import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet';

export default class SimpleMap extends Component {
  state = {
    zoom: 14,
    minZoom:14,
    maxZoom:14,
    attributionControl:false,
    zoomControl: false   
  }

  render() {
 
    return (
      <Map zoomControl={this.state.zoomControl} attributionControl={this.state.attributionControl} center={this.props.position} zoom={this.state.zoom}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
      </Map>
    )
  }
}