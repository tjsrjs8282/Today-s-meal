import React from 'react'
import Wrapper from '@components/Wrapper'
import introLogo from '@assets/intro-logo.png'
import $ from './intro.module.scss'
import Button from '@components/Button'

const Intro = () => {
  return (
    <Wrapper theme="column">
      <div className={$.introBox}>
        <h1>
          오늘 하루
          <br />
          칼로리 알아보자
        </h1>
        <p>목표를 설정하고 칼로리 계산해보아요</p>
        <img src={introLogo} alt="로고" />
      </div>
      <Button title="시작하기" />
    </Wrapper>
  )
}

export default Intro
