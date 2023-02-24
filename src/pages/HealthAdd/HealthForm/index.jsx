import React, { useCallback, useEffect, useState } from "react";
import HealthInput from "../HealthInput"
import Flex from "@components/Flex"

export default function Healthform ({ checkItems, value, handleHealthInfoData }) {
  const [inputs, setInputs] = useState(value)

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target
    setInputs({ ...inputs, [name]: Number(value) })
    console.log(inputs)
    handleHealthInfoData(inputs)
  }, [inputs])

  const handleCountCalculation = (set) => {
    setInputs({ ...inputs, set: set})
    handleHealthInfoData(inputs)
    console.log(inputs)
    console.log(inputs.set)
  }

  return (
    <Flex wrap width between >
      {
        // 횟수
        checkItems.has('count') &&
        <HealthInput
          title={"횟수"}
          name={"count"}
          value={inputs.count}
          onChange={handleInputChange}
        />
      }
      {
        // 무게
        checkItems.has('weight') &&
        <HealthInput
          title={"무게"}
          name={"weight"}
          value={inputs.weight}
          onChange={handleInputChange}
          isCount={false}
        />
      }
      {
        // 세트
        checkItems.has('set') &&
        <HealthInput
          title={"세트"}
          value={inputs.set}
          name={"set"}
          isCount={true}
          onChange={handleInputChange}
          handleCountCalculation={handleCountCalculation}
        />
      }
      {
        // 시간
        checkItems.has('time') &&
        <HealthInput
          title={"시간"}
          minute={inputs.minute}
          second={inputs.second}
          isTime={true}
          onChange={handleInputChange}
        />
      }
    </Flex>          
  )
}