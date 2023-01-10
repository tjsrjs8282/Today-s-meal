import React from 'react'
import introLogo from '@assets/intro-logo.png'
import $ from './intro.module.scss'
import Wrapper from '@components/Wrapper'
import Flex from '@components/Flex'
import Button from '@components/Button'

export default function Intro() {
  return (
    <Wrapper>
      <Flex>
        <div className={$.intro_box}>
          <h1>
            오늘 하루
            <br />
            칼로리 알아보자
          </h1>
          <p>목표를 설정하고 칼로리 계산해보아요</p>
          <img src={introLogo} alt="로고" />
        </div>
        <Button content="시작하기" link="start" />
      </Flex>
    </Wrapper>
  )
}
