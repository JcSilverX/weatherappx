import {
  state,
} from '../../common';

/* eslint-disable no-undef */
const initMap = async () => {
  const { Map } = await google.maps.importLibrary('maps');
  const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

  const map = new Map(document.getElementById('map'), {
    center: { lat: state.activeCityItem.latitude, lng: state.activeCityItem.longitude },
    zoom: 8,
    mapId: '',
  });
  // eslint-disable-next-line no-unused-vars
  const marker = new AdvancedMarkerElement({
    map,
    position: { lat: state.activeCityItem.latitude, lng: state.activeCityItem.longitude },
  });
};

export default initMap;
