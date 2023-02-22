import React, { useCallback, useEffect, useState } from "react";
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
    minute: "00",
    second: "00",
  })
  const { count, weight, set, minute, second } = inputs

  const handleClickButton = useCallback(() => {
    console.log(`count: ${count}`)
    console.log(`weight: ${weight}`)
    console.log(`set: ${set}`)
    console.log(`time: ${minute} : ${second}`)
    dispatch({ type: ADD_EXERCISE, count: count, weight: weight, set: set, minute: minute, second: second })
  }, [count, weight, set, minute, second])

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target
    console.log(name)
    if(name === "minute" || name === "second") {
      const isNum = value.length > 2 ? value: value.padStart(2, '0')
      setInputs({ ...inputs, [name]: isNum })
      return
    }
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
        <HealthInput
          title={"시간"}
          isTime={true}
          minute={minute}
          second={second}
          onChange={handleInputChange}
        />
      }
      <Button content={"추가하기"} onClick={handleClickButton} nonefixed marginTop />
    </Flex>          
  )
}