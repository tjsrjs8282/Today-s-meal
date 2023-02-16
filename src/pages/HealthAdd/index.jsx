import React, { useMemo, useCallback, useRef, useState, useReducer } from 'react'
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

const initialState = {
  // 횟수, 무게, 세트, 시간
  tabData: [true, false, false, false],
  count: 0,
  weight: 0,
  set: 0,
  time: ''
}

export const CHANGE_TAB = "CHANGE_TAB"
export const ADD_EXERCISE = "ADD_EXERCISE"

const reducer = (state, action) => {
  switch(action.type) {
    case CHANGE_TAB: {
      const tabData = [...state.tabData]
      tabData[action.index] = action.checked;
      return {
        ...state,
        tabData
      }
    }
    case ADD_EXERCISE: {
      console.log(state)
      const count = action.count
      const weight = action.weight
      const set = action.set
      const time = action.time
      return {
        ...state,
        count,
        weight,
        set,
        time
      }
    }
  }
}

export default function HealthAdd() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [exerciseName, setExerciseName] = useState('')
  console.log(state)

  const navigate = useNavigate()
  // const checkRef = useRef(null)

  const backHealth = useCallback(() => {
    navigate(-1)
  }, [])

  const handleInputChange = useCallback((e) => {
    setExerciseName(e.target.value)
  }, [])

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
            // inputRef={(el) => (nameInput.current[0] = el)}
            onChange={handleInputChange}
            unit={<IconButton kinds={'closeCircle'} onClick={() => {}} />}
          />
            <Flex start marginTop>
              {
                HEALTH_INFO.map((healthInfo, idx) => (
                  <HealthCheckBox
                    key={`checkBox${idx}`}
                    healthInfo={healthInfo}
                    dispatch={dispatch}
                    index={idx}
                    isCheck={state.tabData[idx]}
                  />
                ))
              }
            </Flex>
            <Healthform state={state} dispatch={dispatch} onChange={handleInputChange} />
        </div>
      </Wrapper>
  )
}