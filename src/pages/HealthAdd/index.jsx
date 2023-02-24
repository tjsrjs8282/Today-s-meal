import React, { useMemo, useCallback, useRef, useState, useReducer, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import $ from './healthAdd.module.scss'
import Wrapper from '@components/Wrapper'
import Flex from '@components/Flex'
import Title from '@components/Title'
import Header from '@components/Header'
import HaederTitle from '@components/HeaderTitle'
import IconButton from '@components/IconButton'
import Input from '@components/Input'
import { HEALTH_INFO } from './constants'
import HealthCheckBox from './HealthCheckBox'
import Healthform from './HealthForm'
import Button from '@components/Button'

export default function HealthAdd() {
  const [checkItems, setCheckItems] = useState(new Set())
  const [exerciseName, setExerciseName] = useState('')
  const [isHealthInfo, setIsHealthInfo] = useState(true)
  const navigate = useNavigate()

  const backHealth = useCallback(() => {
    navigate(-1)
  }, [])

  const checkItemHandler = (id, isChecked) => {
    // console.log('checkItemHandler')
    const copyCheckItems = new Set(checkItems)
    if (isChecked) {
      copyCheckItems.add(id)
      setCheckItems(copyCheckItems)
    } else if (!isChecked && checkItems.has(id)) {
      copyCheckItems.delete(id);
      setCheckItems(copyCheckItems)
    }
  }
  
  const handleInputChange = useCallback((e) => {
    setExerciseName(e.target.value)
  }, [])

  useEffect(() => {
    checkHelathInfo()
  }, [isHealthInfo, exerciseName, checkItems])

  const checkHelathInfo = () => {
    if (exerciseName !== '' && checkItems.size > 0) {
      setIsHealthInfo(false)
    } else {
      setIsHealthInfo(true)
    }
  }

  return (
      <Wrapper colorGray>
        <Header >
          <Flex width between>
            <HaederTitle content="운동일지 추가" />
            <IconButton kinds={"close"} onClick={backHealth}/>
          </Flex>
        </Header>
        <div className={$.add_box} >
          <Title content="운동명" sub />
          <Input
            type="text"
            placeholder="무슨 운동을 하셨나요?"
            name="exerciseName"
            title="운동명"
            value={exerciseName}
            onChange={handleInputChange}
            unit={
              exerciseName 
              && <IconButton kinds={'closeCircle'} onClick={() => {setExerciseName('')}} />
            }
          />
            <Flex start marginTop>
              {
                HEALTH_INFO.map((healthInfo, idx) => (
                  <HealthCheckBox
                    key={`checkBox${idx}`}
                    healthInfo={healthInfo}
                    index={idx}
                    checkItemHandler={checkItemHandler}
                  />
                ))
              }
            </Flex>
            <Healthform checkItems={checkItems} />
            <Button content={"추가하기"} check={isHealthInfo} nonefixed  marginTop />
        </div>
      </Wrapper>
  )
}