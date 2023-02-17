import React, { useCallback, useState } from "react";
import HealthInput from "../HealthInput"
import Button from "@components/Button";
import Flex from "@components/Flex"
import { ADD_EXERCISE } from "..";

export default function Healthform ({state, dispatch}) {
  const { tabData } = state
  const [inputs, setInputs] = useState({
    count: 0,
    weight: 0,
    set: 0,
    time: ''
  })

  const { count, weight, set, time } = inputs

  const handleClickButton = useCallback(() => {
    console.log(count, weight, set, time)
    dispatch({ type: ADD_EXERCISE, count: count, weight: weight, set: set, time: time})

  }, [count, weight, set, time])

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target
    setInputs({ ...inputs, [name]: Number(value) })
  }, [inputs])


  return (
    <Flex wrap width between >
      {
        // 횟수
        tabData[0] &&
        <HealthInput
          title={"횟수"}
          name={"count"}
          value={count}
          onChange={handleInputChange}
          dispatch={dispatch}
        />
      }
      {
        // 무게
        tabData[1] &&
        <HealthInput
          title={"무게"}
          name={"weight"}
          value={weight}
          onChange={handleInputChange}
          isCount={false}
          dispatch={dispatch}
        />
      }
      {
        // 세트
        tabData[2] &&
        <HealthInput
          title={"세트"}
          isCount={true}
          dispatch={dispatch}
        />
      }
      {
        // 시간
        tabData[3] &&
        <HealthInput title={"시간"} isTime={true} />
      }
      <Button content={"추가하기"} onClick={handleClickButton} nonefixed marginTop />
    </Flex>          
  )
}