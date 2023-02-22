import React from 'react'
import IconButton from '@components/IconButton'
import Flex from '@components/Flex'
import 아침 from '@assets/ic-morning-normal.png'
import 점심 from '@assets/ic-lunch-normal.png'
import 저녁 from '@assets/ic-dinner-normal.png'
import 간식 from '@assets/ic-snack-normal.png'
import DarkMorning from '@assets/ic-morning-white.png'
import DarkLunch from '@assets/ic-lunch-white.png'
import DarkDinner from '@assets/ic-dinner-white.png'
import DarkSnack from '@assets/ic-snack-white.png'

export default function FoodTodayRecord({ name, onClick, image, data, onefef }) {
  return (
    <Flex width colorWhite radius padding marginBottom column shadow>
      <Flex between width marginBottom>
        <Flex>
          <img src={image} alt={name} />
          <Flex column start>
            <h2>{name}</h2>
            <p>총 개수 : {data ? data.length : 0}개</p>
          </Flex>
        </Flex>
        <IconButton kinds="add" onClick={onClick} />
      </Flex>

      {data ? (
        <>
          {data.map((serving) => {
            const { name, calories, carbohydrate, fat, protein, measurement, id } = serving
            return (
              <Flex colorGray width radius padding marginBottom>
                <Flex column gray start width>
                  <h3>{name}</h3>
                  <p>
                    개수 : 1 개 | 사이즈 : {measurement}
                    <br />
                    칼로리 : {calories} kcal | 탄수화물 : {carbohydrate} g<br />
                    단백질 : {protein} g | 지방 : {fat} kcal
                  </p>
                </Flex>
                <IconButton kinds="close2" onClick={() => onefef(name, id)} />
              </Flex>
            )
          })}
        </>
      ) : null}
    </Flex>
  )
}
