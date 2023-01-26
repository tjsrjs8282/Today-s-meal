import React from 'react';
import Wrapper from '@components/Wrapper'
import Flex from '@components/Flex'
import Header from '@components/Header'
import Title from '@components/Title'
import IconButton from '@components/IconButton'
import CountBox from '@components/CountBox';

const index = () => {
  return (
    <Wrapper>
      <Header>
        <IconButton kinds={'close'} />
      </Header>
      <Title 
        content="바나나"
      />
      <CountBox />
      <div>
        <div>아이콘</div>
        <p>칼로리</p>
        <h3>105<span>kcal</span></h3>
      </div>
    </Wrapper>
  );
};

export default index;