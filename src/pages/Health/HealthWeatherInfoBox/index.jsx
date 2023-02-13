import React from 'react';
import WeatherSubInfo from './WeatherSubInfo';
import $ from './healthWeatherInfoBox.module.scss'
import IconButton from '@components/IconButton';
import Flex from '@components/Flex';

export default function HealthWeatherInfoBox () {
  return (
    <article>
      <Flex column>
        <h2 className='blind'>오늘의 날씨</h2>
        <IconButton kinds={"sun"} />
        <p>맑음</p>
      </Flex>
      <div>
        <div>
          <h3><span className='blind'>현재 온도</span>20</h3>
          <ul>
            <li><span className='blind'>최고 온도</span>15</li>
            <li><span className='blind'>최저 온도</span>13</li>
          </ul>
        </div>
        <p>운동하기 너무 좋은 날씨입니다. 오늘은 야외 운동을 추천해요!</p>
      </div>
      
      <ul className={$.sub_info}>
        {
          Array(3).fill().map((v) => <WeatherSubInfo /> )
        }
      </ul>

    </article>
  );
};
