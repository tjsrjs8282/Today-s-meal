import React from 'react'
import $ from './listBox.module.scss'
import IconButton from '../IconButton'

export default function ListBox({ data, onClick, kinds }) {
  const { name, number, size, kcal } = data

  return (
    <div className={$.list_box} onClick={() => onClick()}>
      <div>
        {kinds && (<span>{kinds}</span>)}
        <h2>{name}</h2>
        <p>{`${number}개 ${size} / ${kcal} kcal`}</p>
      </div>
      <IconButton kinds={'next'} />
    </div>
  )
}