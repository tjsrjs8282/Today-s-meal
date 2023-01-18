import React from 'react'
import $ from './listBox.module.scss'
import IconButton from '../IconButton'

export default function ListBox({ data }) {
  const { name, number, size, kcal } = data
  return (
    <div className={$.list_box}>
      <div>
        <span></span>
        <h2>{name}</h2>
        <p>{`${number}개 ${size} / ${kcal}`}</p>
      </div>
      <IconButton kinds={'next'} />
    </div>
  )
}