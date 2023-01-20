import React from 'react'
import IconButton from '../IconButton'
import Flex from '../Flex'
//경로들은 절대경로로 맞추기 ex: @components/Flex

export default function ListBox({ data, onClick, kinds }) {
  //컴퍼넌트명이랑 폴더명이랑 동일하게 맞추기 (그래야 불러올때 경로 축약 됨)
  const { name, number, size, kcal } = data

  return (
    // <div className={$.list_box} onClick={() => onClick()}>
    //   <div>
    //     {kinds && (<span>{kinds}</span>)}
    //     <h2>{name}</h2>
    //     <p>{`${number}개 ${size} / ${kcal} kcal`}</p>
    //   </div>
    //   <IconButton kinds={'next'} />
    // </div>

    <Flex between marginTop marginBottom padding wrap radius colorWhite onClick={onClick}>
      <Flex column start>
        {kinds && <span>{kinds}</span>}
        <h2>{name}</h2>
        <p>
          {number}개 {size} / {kcal} kcal
        </p>
      </Flex>
      <IconButton kinds="next" />
    </Flex>
    //Flex 컴포넌트 활요해서 하기.
    //폴더위치 해당 페이지
  )
}
