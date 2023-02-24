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
import ListItemBox from '@components/ListItemBox'
const constants = [
  {
    title: '데드리프트',
    description: '1회/10분'
  },
  {
    title: '데드리프트',
    description: '1회/10분'
  },
  {
    title: '데드리프트',
    description: '1회/10분'
  },
]
export default function HealthAdd() {
  const [healthData, setHealthData] = useState(constants)
  const [checkItems, setCheckItems] = useState(new Set())
  const [exerciseName, setExerciseName] = useState('')
  const [isHealthInfo, setIsHealthInfo] = useState(true)
  const [inputs, setInputs] = useState({
    count: 0,
    weight: 0,
    set: 1,
    minute: 0,
    second: 0,
  })
  const navigate = useNavigate()
  
  useEffect(() => {
    checkHelathInfo()
  }, [isHealthInfo, exerciseName, checkItems])

  const handleHealthInfoData = (inputs) => {
    setInputs(inputs)
    console.log(inputs)
  }

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


  const checkHelathInfo = () => {
    if (exerciseName !== '' && checkItems.size > 0) {
      setIsHealthInfo(false)
    } else {
      setIsHealthInfo(true)
    }
  }

  const handleButtonClick = () => {
    if (!isHealthInfo) {
      return
    }
    console.log(exerciseName)
    console.log(inputs)
  }

  return (
      <Wrapper colorGray>
        <Header >
          <Flex width between>
            <HaederTitle content="운동일지 추가" />
            <IconButton kinds={"close"} onClick={backHealth}/>
          </Flex>
        </Header>
        <div className={$.list_box}>
          {
            healthData.map((v) => (<ListItemBox title={v.title} description={v.description}/>))
          }
        </div>
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
            <Healthform handleHealthInfoData={handleHealthInfoData} checkItems={checkItems} value={inputs} />
            <Button content={"추가하기"} check={isHealthInfo} onClick={handleButtonClick} nonefixed  marginTop />
        </div>
      </Wrapper>
  )
}