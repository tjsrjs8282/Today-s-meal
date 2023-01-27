import React from 'react';
import Wrapper from '@components/Wrapper'
import Flex from '@components/Flex'
import Header from '@components/Header'
import Title from '@components/Title'
import IconButton from '@components/IconButton'
import CountBox from '@components/CountBox'
import Button from '@components/Button'
import FoodDetailInfo from './FoodDetailInfo';
import { FOOD_DETAIL_INFO } from './FoodDetailInfo/constants'

const FoodDetail = () => {
  const handleClickAdd = () => {
    console.log('handleClickAdd')
  }
  
  return (
    <Wrapper>
      <Header>
        <IconButton kinds={'close'} />
      </Header>
      <Title 
        content="바나나"
      />
      <CountBox />
      <Flex wrap between marginTop  >
        {
          FOOD_DETAIL_INFO.map((foodInfo) => {
            const { id } = foodInfo
            return <FoodDetailInfo key={id} foodInfo={foodInfo}/>
          })
        }
      </Flex>
      <Button content='식단추가' onClick={handleClickAdd} />
    </Wrapper>
  );
};

export default FoodDetail;