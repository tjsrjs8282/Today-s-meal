import React from 'react'
import IconButton from '@components/IconButton'
import Flex from '@components/Flex'
import $ from './foodTodayRecord.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind($)

export default function FoodTodayRecord({ name, onClick, image, data, onClickModalHandler }) {
  const onClickRemoveHandler = (name, id) => {
    onClickModalHandler(name, id)
  }
  return (
    <Flex width colorWhite radius padding marginBottom column shadow>
      <Flex between width marginBottom>
        <Flex>
          <div className={cx('part_image', image)}></div>
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
                <IconButton kinds="close2" onClick={() => onClickRemoveHandler(name, id)} />
              </Flex>
            )
          })}
        </>
      ) : null}
    </Flex>
  )
}
