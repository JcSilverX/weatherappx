const pollutants = {
  /*-
   * AQI and Concentration Breakpoints for O3 (8hr avg).
   */
  O3: {
    concBPLow:
      [
        0.000,
        0.055,
        0.071,
        0.086,
        0.106,
      ],
    concBPHigh:
      [
        0.054,
        0.070,
        0.085,
        0.105,
        0.200,
      ],
    aqiBPLow:
      [
        0,
        51,
        101,
        151,
        201,
      ],
    aqiBPHigh:
      [
        50,
        100,
        150,
        200,
        300,
      ],
  },

  /*-
   * AQI and Concentration Breakpoints for pm2.5 (24hr avg).
   */
  PM2_5: {
    concBPLow:
      [
        0.0,
        12.1,
        35.5,
        55.5,
        150.5,
        250.5,
      ],
    concBPHigh:
      [
        12.0,
        35.4,
        55.4,
        150.4,
        250.4,
        500.4,
      ],
    aqiBPLow:
      [
        0,
        51,
        101,
        151,
        201,
        301,
        401,
      ],
    aqiBPHigh:
      [
        50,
        100,
        150,
        200,
        300,
        400,
        500,
      ],
  },

  /*-
   * AQI and Concentration Breakpoints for pm2.10 (24hr avg).
   */
  PM2_10: {
    concBPLow:
      [
        0,
        55,
        155,
        255,
        355,
        425,
      ],
    concBPHigh:
      [
        54,
        154,
        254,
        354,
        424,
        604,
      ],
    aqiBPLow:
      [
        0,
        51,
        101,
        151,
        201,
        301,
        401,
      ],
    aqiBPHigh:
      [
        50,
        100,
        150,
        200,
        300,
        400,
        500,
      ],
  },

  /*-
   * AQI and Concentration Breakpoints for CO (8hr avg).
   */
  CO: {
    concBPLow:
      [
        0.0,
        4.5,
        9.5,
        12.5,
        15.5,
        30.5,
      ],
    concBPHigh:
      [
        4.4,
        9.4,
        12.4,
        15.4,
        40.4,
        50.4,
      ],
    aqiBPLow:
      [
        0,
        51,
        101,
        151,
        201,
        301,
        401,
      ],
    aqiBPHigh:
      [
        50,
        100,
        150,
        200,
        300,
        400,
        500,
      ],
  },
};

const {
  O3, PM2_5, PM2_10, CO,
} = pollutants;
const pollutantsMap = new Map();

pollutantsMap.set('o3', O3);
pollutantsMap.set('pm2.5', PM2_5);
pollutantsMap.set('pm2.10', PM2_10);
pollutantsMap.set('co', CO);

const concToAQI = (pollutant, conc) => {
  const {
    concBPLow, concBPHigh, aqiBPLow, aqiBPHigh,
  } = pollutantsMap.get(pollutant);

  const aqi = concBPLow.map((concL, index) => {
    const concH = concBPHigh[index];
    const aqiL = aqiBPLow[index];
    const aqiH = aqiBPHigh[index];

    if (conc >= concL && conc <= concH) {
      return ((aqiH - aqiL) / (concH - concL)) * (conc - concL) + aqiL;
    }

    return -1;
  // eslint-disable-next-line no-shadow
  }).filter((aqi) => aqi !== -1);

  return Math.round(Number(aqi));
};

export default concToAQI;
