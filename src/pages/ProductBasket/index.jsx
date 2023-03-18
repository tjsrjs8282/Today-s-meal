import React, {  useState } from 'react';
import $ from './productBasket.module.scss'
import Wrapper from '@components/Wrapper'
import Flex from '@components/Flex'
import Header from '@components/Header'
import HeaderTitle from '@components/HeaderTitle'
import IconButton from '@components/IconButton'
import Button from '@components/Button'
import CountBox from '@components/CountBox'
import CheckBox from './Checkbox';
import { PRODUCT_LIST } from '@pages/Product/productData.js'
import classNames from 'classnames/bind'
import BgImg from '@assets/ic-logo-bg.png'

const cx = classNames.bind($)

const list = [
  {
    id: PRODUCT_LIST[0].id,
    title: PRODUCT_LIST[0].title,
    price: PRODUCT_LIST[0].price,
    img: PRODUCT_LIST[0].img
  },
  {
    id: PRODUCT_LIST[1].id,
    title: PRODUCT_LIST[1].title,
    price: PRODUCT_LIST[1].price,
    img: PRODUCT_LIST[1].img
  },
  {
    id: PRODUCT_LIST[2].id,
    title: PRODUCT_LIST[2].title,
    price: PRODUCT_LIST[2].price,
    img: PRODUCT_LIST[2].img
  }
]

const price1 = 10000;
const contants = [
  {
    id: 1,
    title: '총 상품 금액',
    price: price1
  },
  {
    id: 2,
    title: '배송비',
    price: 3000
  },
  {
    id: 3,
    title: '총 결제 금액',
    price: price1 + 3000,
    total: true
  },
]

export default function ProductBasket() {
  const [checkedList, setCheckedList] = useState([])
  const [listData, setListData] = useState(list)

  const handleCheckedItem = (id, isChecked) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, id])   
    } else {
      setCheckedList(checkedList.filter((item) => item !== id ))
    }
    console.log(checkedList)
  }

  const handleAllChecked = (e) => {
    if (e.target.checked) {
      const allCheckedList = []
      listData.forEach((item) => allCheckedList.push(item.id.toString()))
      
      setCheckedList(allCheckedList)
    } else {
      setCheckedList([])
    }
    console.log('handleAllChecked', checkedList)
  }

  const handleClickDelete = (e) => {
    const checkedId = e.currentTarget.parentNode.parentNode.parentNode.id
    setListData(listData.filter((item) => {
      return item.id.toString() !== checkedId
    }))
  }

  const handleCheckedDelete = () => {
    const listCopy = listData.filter((item) => {
      return !checkedList.includes(item.id.toString())
    }) 
    setListData(listCopy)
    console.log(listCopy)
  }

  return (
    <Wrapper colorGray>
      <Header>
        <Flex width between>
          <HeaderTitle content="장바구니" />
          <IconButton kinds="close" />
        </Flex>
      </Header>
      <div>
        <Flex width between marginTop marginBottom>
          <label className={$.all_check}>
            <input type="checkbox" onChange={handleAllChecked}
              checked={
                checkedList.length === 0 
                ? false : checkedList.length === listData.length 
                ? true : false
                } />
            <IconButton kinds={
                checkedList.length === 0 
                ? 'checkNone' : checkedList.length === listData.length 
                ? 'check' : 'checkNone'
              } />
            전체선택
          </label>
          <Button content="선택삭제" onClick={handleCheckedDelete} border />
        </Flex>
        <ul className={$.list_container}>
          {
            listData.length === 0 ? 
            // 리스트 없을 때
            <li className={$.empty_list}>
              <img src={BgImg} alt="빈 접시 이미지" />
            </li>
            : listData.map((li) => {
              const { id, title, price, img } = li
              return (
                <li key={id} id={id}>
                  <CheckBox id={id} onChecked={handleCheckedItem} 
                    checked={checkedList.includes(id.toString()) ? true : false}
                    icon={checkedList.includes(id.toString()) ? 'check' : 'checkNone'} />
                  <div className={$.product_container}>
                    <Flex start>
                      <div className={$.image_box}>
                        <img src={img} alt={title} />
                      </div>
                      <h3>{title}</h3>
                    </Flex>
                    <Flex between>
                      <div className={$.count_container}>
                        <CountBox value={1} marginBottomNone smallFont onChange={() => {}}/>
                      </div>
                      <p className={$.price}>{price}원</p>
                    </Flex>
                    <div className={$.close_button}>
                      <IconButton kinds="close" onClick={handleClickDelete} />
                    </div>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
      <ul className={$.order_container}>
        {
          contants.map((li) => {
            const { id, title, price, total } = li;
            return (
              <li key={id}>
                <Flex width between>
                  <p className={cx('order_title', { total })}>{title}</p>
                  <p className={cx('price', { total })}>{price}원</p>
                </Flex>
              </li>
            )
          })
        }
      </ul>
      <Button content="구매하기" />
    </Wrapper>
  );
};
