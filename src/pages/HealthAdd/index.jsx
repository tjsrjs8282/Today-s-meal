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

const initialState = {
  tabData: [true, false, false, false],
}

export const OPEN_TAB = "OPEN_TAB"

const reducer = (state, action) => {
  switch(action.type) {
    case OPEN_TAB: {
      const tabData = [...state.tabData]
      tabData[action.index] = action.checked;
      return {
        ...state,
        tabData
      }
    }
  }
}

export default function HealthAdd() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputs, setInputs] = useState({
    exerciseName: '',
    count: '',
    weight: '',
    set: '',
    time: ''
  })

  const { exerciseName, count, weight, set, time } = inputs
  const navigate = useNavigate()
  // const checkRef = useRef(null)

  const backHealth = useCallback(() => {
    navigate(-1)
  }, [])

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target
    setInputs({ ...inputs, [name]: value })
  }, [inputs])

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
            <Flex>
              {
                HEALTH_INFO.map((healthInfo, idx) => (
                  <HealthCheckBox
                    key={`checkBox${idx}`}
                    healthInfo={healthInfo}
                    dispatch={dispatch}
                    index={idx}
                    isCheck={state.tabData[idx]}
                  />
                )
                )
              }
            </Flex>

            <Flex width between>
              <div>
                <Title content="횟수" sub />
                <Input
                  type="number"
                  placeholder="0"
                  name="count"
                  title="횟수"
                  value={count}
                  // inputRef={(el) => (nameInput.current[0] = el)}
                  onChange={handleInputChange}
                  unit={"kg"}
                />
              </div>
              <div>
                <Title content="무게" sub />
                <Input
                  type="number"
                  placeholder="0"
                  name="weight"
                  title="무게"
                  value={weight}
                  // inputRef={(el) => (nameInput.current[0] = el)}
                  onChange={handleInputChange}
                  unit={"kg"}
                />
              </div>
            </Flex>          
        </div>
      </Wrapper>
  )
}