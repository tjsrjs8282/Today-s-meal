import React from 'react'
import Flex from '@components/Flex'
import Input from '@components/Input'
import InputTime from '@components/InputTime'
import CountBox from '@components/CountBox'
export default function HealthAddInputBox({
  handleCountCalculation,
  onChange,
  healthCount,
  healthWeight,
  healthSet,
  minute,
  second,
  healthCheckList,
}) {
  return (
    <Flex width start wrap>
      {healthCheckList.includes('healthCount') && (
        <Flex col2 transition>
          <Input
            type="number"
            placeholder="0"
            name={'healthCount'}
            title={'횟수'}
            value={healthCount}
            onChange={onChange}
            unit={'번(회)'}
            maxLength={4}
          />
        </Flex>
      )}

      {healthCheckList.includes('healthWeight') && (
        <Flex col2 transition>
          <Input
            type="number"
            placeholder="0"
            name={'healthWeight'}
            title={'무게'}
            value={healthWeight}
            onChange={onChange}
            unit={'kg'}
            maxLength={4}
          />
        </Flex>
      )}
      {healthCheckList.includes('healthSet') && (
        <Flex col2 transition>
          <CountBox
            type="number"
            value={healthSet}
            name={'healthSet'}
            placeholder="0"
            title={'세트'}
            maxLength={3}
            onChange={onChange}
            handleCountCalculation={handleCountCalculation}
            marginBottomNone
            smallFont
          />
        </Flex>
      )}
      {healthCheckList.includes('healthTime') && (
        <Flex col2 transition>
          <InputTime
            type="number"
            placeholder="0"
            title={'시간'}
            maxLength={3}
            minute={minute}
            second={second}
            onChange={onChange}
          />
        </Flex>
      )}
    </Flex>
  )
}
