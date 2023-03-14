import React, { useState } from 'react'
import Modal from '@components/Modal'
import Title from '@components/Title'
import Input from '@components/Input'
import IconButton from '@components/IconButton'
import CheckBox from '@components/CheckBox'
import CheckBoxGroup from '@components/CheckBoxGroup'
import HealthAddInputBox from './HealthAddInputBox'
export default function HealthAddModal({
  title,
  content,
  onClick,
  onClose,
  healthName,
  healthCount,
  healthWeight,
  healthSet,
  minute,
  second,
  handleCountCalculation,
  onChange,
  handleInputChange,
  handleInputReset,
}) {
  const [healthCheckList, setHealthCheckList] = useState(['healthCount'])
  return (
    <Modal title={title} content={content} onClick={onClick} onClose={onClose} confirm>
      <Title content="운동명" sub left margitTopNone />
      <Input
        type="text"
        placeholder="무슨 운동을 하셨나요?"
        name="healthName"
        title="운동명"
        value={healthName}
        onChange={handleInputChange}
        unit={healthName && <IconButton kinds={'closeCircle'} onClick={handleInputReset} />}
      />
      <CheckBoxGroup label="운동 추가하기" values={healthCheckList} onChange={setHealthCheckList}>
        <CheckBox value="healthCount" tab>
          횟수
        </CheckBox>
        <CheckBox value="healthWeight" tab>
          무게
        </CheckBox>
        <CheckBox value="healthSet" tab>
          세트
        </CheckBox>
        <CheckBox value="healthTime" tab>
          시간
        </CheckBox>
      </CheckBoxGroup>
      <HealthAddInputBox
        healthCount={healthCount}
        healthWeight={healthWeight}
        healthSet={healthSet}
        minute={minute}
        second={second}
        healthCheckList={healthCheckList}
        handleCountCalculation={handleCountCalculation}
        onChange={onChange}
      />
    </Modal>
  )
}
