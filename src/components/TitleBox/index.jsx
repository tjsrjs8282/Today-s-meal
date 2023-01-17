import React from 'react'
import $ from './titleBox.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind($)
export default function TitleBox({ content, kinds }) {
  const isKinds = kinds === "margin"
  return (
    <div className={cx('title_box', { margin: isKinds })} >
      <h1>{content}</h1>
      <p>12월 28일 수요일</p>
  </div>
  )
}