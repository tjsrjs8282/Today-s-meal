import React, { memo } from 'react';

function WeatherSubInfo ({ weather }) {
  const {title, data} = weather
  console.log(weather)
  return (
    <li>
      <p>{title}</p>
      <span>{data}</span>
    </li>
  );
};
export default memo(WeatherSubInfo)