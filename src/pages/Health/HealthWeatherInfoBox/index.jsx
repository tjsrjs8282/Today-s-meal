import React, { memo } from 'react';
import WeatherSubInfo from './WeatherSubInfo';
import $ from './healthWeatherInfoBox.module.scss'
import IconButton from '@components/IconButton';
import Flex from '@components/Flex';

function HealthWeatherInfoBox ({ data }) {
  // 현재온도, 습도, 체감온도, 최고온도, 최저온도
  const { temp, humidity, feels_like, } = data.main
  const { main } = data.weather[0]
  // 	[°C] = [K] − 273.15 섭씨온도 만들기
  const WEATHER_STANDARD = 273.15
  const constance = [
    {
      id: 1,
      title: '체감온도',
      data: `${Math.round(feels_like - WEATHER_STANDARD)}°`
    },
    {
      id: 2,
      title: '습도',
      data: `${humidity}%`
    },
    {
      id: 3,
      title: '바람',
      data: `${Math.round(data.wind.speed)}m/s`
    },
  ]
  
  return (
    <article>
      <Flex>
        <Flex column>
          <h2 className='blind'>오늘의 날씨</h2>
          <IconButton kinds={"sun"} />
          <p>{main}</p>
        </Flex>
        <Flex>
          <h3><span className='blind'>현재 온도</span>{Math.round(temp - WEATHER_STANDARD)}°</h3>
          <p>운동하기 너무 좋은 날씨입니다. 오늘은 야외 운동을 추천해요!</p>
        </Flex>
      </Flex>
      
      <ul className={$.sub_info}>
        {
          constance.map((v) => <WeatherSubInfo weather={v} key={v.id}/> )
        }
      </ul>

    </article>
  );
};
export default memo(HealthWeatherInfoBox)