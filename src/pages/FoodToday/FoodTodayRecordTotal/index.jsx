import React from 'react'
import Flex from '@components/Flex'
import FoodTodayRecord from '../FoodTodayRecord'
import { partState } from '@store'
import { useRecoilState } from 'recoil'
export default function FoodTodayRecordTotal({ breakfast, lunch, dinner, snack, onClick }) {
  const [partRecoil, setPartRecoil] = useRecoilState(partState)
  const goFoodSearch = (name) => {
    setPartRecoil(name)
    localStorageService().set('PART', name)
    navigate('/search')
  }
  return (
    <Flex wrap column>
      <FoodTodayRecord name={'아침'} onClick={() => goFoodSearch('아침')} data={breakfast} />
      <FoodTodayRecord name={'점심'} onClick={() => goFoodSearch('점심')} data={lunch} />
      <FoodTodayRecord name={'저녁'} onClick={() => goFoodSearch('저녁')} data={dinner} />
      <FoodTodayRecord name={'간식'} onClick={() => goFoodSearch('간식')} data={snack} />
    </Flex>
  )
}
