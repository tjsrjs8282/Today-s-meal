import React, { useState } from 'react'
import Modal from '@components/Modal'
import Title from '@components/Title'
import Input from '@components/Input'
import Flex from '@components/Flex'
export default function MyIntakeModal({
  title,
  content,
  onClick,
  onClose,
  onChange,
  todayCalorie,
  todayCarbohydrate,
  todayProtein,
  todayFat,
}) {
  return (
    <Modal title={title} content={content} onClick={onClick} onClose={onClose} confirm>
      <Flex width start wrap>
        <Flex col2 transition column>
          <Title content="칼로리" sub left margitTopNone margitBottomNone />
          <Input
            type="number"
            placeholder={todayCalorie}
            name={'todayCalorie'}
            title={'칼로리'}
            onChange={onChange}
            unit={'kcal'}
            maxlength={5}
          />
        </Flex>
        <Flex col2 transition column>
          <Title content="탄수화물" sub left margitTopNone margitBottomNone />
          <Input
            type="number"
            placeholder={todayCarbohydrate}
            name={'todayCarbohydrate'}
            title={'탄수화물'}
            onChange={onChange}
            unit={'g'}
            maxlength={3}
          />
        </Flex>
        <Flex col2 transition column>
          <Title content="단백질" sub left margitTopNone margitBottomNone />
          <Input
            type="number"
            placeholder={todayProtein}
            name={'todayProtein'}
            title={'단백질'}
            onChange={onChange}
            unit={'g'}
            maxlength={3}
          />
        </Flex>
        <Flex col2 transition column>
          <Title content="지방" sub left margitTopNone margitBottomNone />
          <Input
            type="number"
            placeholder={todayFat}
            name={'todayFat'}
            title={'지방'}
            onChange={onChange}
            unit={'g'}
            maxlength={3}
          />
        </Flex>
      </Flex>
    </Modal>
  )
}
