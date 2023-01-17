import React from 'react'
import $ from './titleBox.module.scss'

export default function TitleBox({ content }) {
  return (
    <div className={$.title_box} >
      <h1>{content}</h1>
      <p>12월 28일 수요일</p>
  </div>
  )
}