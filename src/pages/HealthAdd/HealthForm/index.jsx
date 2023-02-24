import React, { useCallback, useEffect, useState } from "react";
import HealthInput from "../HealthInput"
import Button from "@components/Button";
import Flex from "@components/Flex"

export default function Healthform ({ checkItems }) {
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target
    setInputs({ ...inputs, [name]: Number(value) })
  }, [])

  return (
    <Flex wrap width between >
      {
        // 횟수
        checkItems.has('count') &&
        <HealthInput
          title={"횟수"}
          name={"count"}
          // value={count}
          onChange={handleInputChange}
        />
      }
      {
        // 무게
        checkItems.has('weight') &&
        <HealthInput
          title={"무게"}
          name={"weight"}
          onChange={handleInputChange}
          isCount={false}
        />
      }
      {
        // 세트
        checkItems.has('set') &&
        <HealthInput
          title={"세트"}
          isCount={true}
        />
      }
      {
        // 시간
        checkItems.has('time') &&
        <HealthInput title={"시간"} isTime={true} />
      }
    </Flex>          
  )
}