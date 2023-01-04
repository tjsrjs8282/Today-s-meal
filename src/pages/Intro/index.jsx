import React from 'react'
import Wrapper from '@components/Wrapper'
import introLogo from '@assets/intro-logo.png'
const Intro = () => {
  return (
    <Wrapper theme="column">
      <h1>
        오늘 하루
        <br />
        칼로리 알아보자
      </h1>
      <p>목표를 설정하고 칼로리 계산해보아요</p>
      <img src={introLogo} alt="로고" />
    </Wrapper>
  )
}

export default Intro
