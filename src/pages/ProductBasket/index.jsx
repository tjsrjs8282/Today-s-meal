import React from 'react';
import Wrapper from '@components/Wrapper'
import Flex from '@components/Flex'
import Header from '@components/Header'
import HeaderTitle from '@components/HeaderTitle'
import IconButton from '@components/IconButton'

export default function ProductBasket() {
  return (
    <Wrapper colorGray>
      <Header>
        <Flex width between>
          <HeaderTitle content="장바구니" />
          <IconButton kinds="close" />
        </Flex>
      </Header>
    </Wrapper>
  );
};
