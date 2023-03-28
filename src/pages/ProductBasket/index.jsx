import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BasketListItem from './BasketListItem'
import $ from './productBasket.module.scss'
import Wrapper from '@components/Wrapper'
import Flex from '@components/Flex'
import Header from '@components/Header'
import HeaderTitle from '@components/HeaderTitle'
import IconButton from '@components/IconButton'
import Button from '@components/Button'
import CountBox from '@components/CountBox'
import CheckBox from './CheckBox'
import Modal from '@components/Modal'
import classNames from 'classnames/bind'
import BgImg from '@assets/ic-logo-bg.png'
import { localStorageService } from '@utils/localStorage.service'
const cx = classNames.bind($)

export default function ProductBasket() {
  const [checkedList, setCheckedList] = useState([])
  const [cartList, setCartList] = useState([])
  const [cartDelete, setCartDelete] = useState([])
  const [checkModal, setCheckModal] = useState(false)
  const [modal, setModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalContent, setModalContent] = useState('')
  const [listOrder, setListOrder] = useState([])
  const [listCount, setListCount] = useState(getListCount())

  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  function getListCount() {
    return cartList.map((item) => {
      return { id: item.id, price: item.price, count: 1 }
    })
  }

  useEffect(() => {
    setListCount(getListCount())
  }, [cartList])

  const handleCountList = (id, count) => {
    const copy = [...listCount]
    copy.forEach((item) => {
      if (item.id === id) {
        item.count = count
      }
    })
    setListCount([...copy])
  }

  const teststset = () => {
    const price = listCount
      .map((item) => item.price * item.count)
      .reduce((acc, cur) => acc + cur, 0)
    const delivery = price === 0 ? 0 : price >= 50000 ? 0 : 3000
    const totalPrice = price + delivery

    const TOTAL_PRICE = [
      {
        id: 1,
        title: '총 상품 금액',
        price: price.toLocaleString('ko-KR'),
      },
      {
        id: 2,
        title: '배송비',
        price: delivery.toLocaleString('ko-KR'),
      },
      {
        id: 3,
        title: '총 결제 금액',
        price: totalPrice.toLocaleString('ko-KR'),
        total: true,
      },
    ]
    setListOrder(TOTAL_PRICE)
  }

  useEffect(() => {
    teststset()
  }, [listCount])

  const handleCheckedItem = (id, isChecked) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, id])
    } else {
      setCheckedList(checkedList.filter((item) => item !== id))
    }
  }

  const handleAllChecked = (e) => {
    if (e.target.checked) {
      const allCheckedList = []
      cartList.forEach((item) => allCheckedList.push(item.id.toString()))
      setCheckedList(allCheckedList)
    } else {
      setCheckedList([])
    }
  }
  setCheckModal
  const onClickDeleteModal = async (e) => {
    const checkedId = await e.currentTarget.parentNode.parentNode.parentNode.id
    const cartCheckFilter = await cartList.filter((item) => {
      return item.id.toString() === checkedId
    })
    const cartDeleteFilter = await cartList.filter((item) => {
      return item.id.toString() !== checkedId
    })
    setCartDelete(cartDeleteFilter)
    setModalTitle(`삭제하기`)
    setModalContent(`${cartCheckFilter[0].title} 를(을)
     삭제 하시겠습니까?`)
    setModal(!modal)
  }

  const handleClickDelete = () => {
    setCartList(cartDelete)
    localStorageService().set('CART', cartDelete)
    setModal(false)
  }

  const handleCheckedDelete = async () => {
    const listCopy = await cartList.filter((item) => {
      return !checkedList.includes(item.id.toString())
    })
    setCartList(listCopy)
    localStorageService().set('CART', listCopy)
    setCheckModal(false)
  }

  const onClickCheckedModal = () => {
    if (checkedList.length !== 0) {
      setModalTitle(`삭제하기`)
      setModalContent(`선택하신 상품을 삭제 하시겠습니까?`)
    } else {
      setModalTitle(`삭제하기`)
      setModalContent(`선택하신 상품을 없습니다.`)
    }

    setCheckModal(!modal)
  }

  const modalOnClose = () => {
    setModal(false)
    setCheckModal(false)
  }

  const onClickModalHandler = (name, id) => {
    setModalTitle(`구매하기`)
    setModalContent(`선택하신 상품들을
     구매 하시겠습니까?`)
    setModal(!modal)
  }

  function getCartList() {
    const sessionCart = localStorageService().get('CART')
    const sessionCheck = sessionCart ? sessionCart : []
    setCartList(sessionCheck)
  }

  useEffect(() => {
    getCartList()
  }, [])

  return (
    <Wrapper colorGray>
      {modal && (
        <Modal
          title={modalTitle}
          content={modalContent}
          onClick={handleClickDelete}
          onClose={modalOnClose}
          confirm
        ></Modal>
      )}
      {checkModal && (
        <Modal
          title={modalTitle}
          content={modalContent}
          onClick={handleCheckedDelete}
          onClose={modalOnClose}
          confirm
        ></Modal>
      )}
      <Header>
        <Flex width between>
          <HeaderTitle content="장바구니" />
          <IconButton kinds="close" onClick={goBack} />
        </Flex>
      </Header>
      <div>
        <Flex width between marginTop marginBottom>
          <label className={$.all_check}>
            <input
              type="checkbox"
              onChange={handleAllChecked}
              checked={
                checkedList.length === 0
                  ? false
                  : checkedList.length === cartList.length
                  ? true
                  : false
              }
            />
            <IconButton
              kinds={
                checkedList.length === 0
                  ? 'checkNone'
                  : checkedList.length === cartList.length
                  ? 'check'
                  : 'checkNone'
              }
            />
            전체선택
          </label>
          <Button content="선택삭제" onClick={onClickCheckedModal} border />
        </Flex>
        <ul className={$.list_container}>
          {cartList.length === 0 ? (
            // 리스트 없을 때
            <li className={$.empty_list}>
              <img src={BgImg} alt="빈 접시 이미지" />
            </li>
          ) : (
            cartList.map((li) => {
              return (
                <BasketListItem
                  key={li.id}
                  data={li}
                  checkedList={checkedList}
                  onClickDeleteModal={onClickDeleteModal}
                  handleCheckedItem={handleCheckedItem}
                  handleCountList={handleCountList}
                />
              )
            })
          )}
        </ul>
      </div>
      <ul className={$.order_container}>
        {listOrder.map((li) => {
          const { id, title, price, total } = li
          return (
            <li key={id}>
              <Flex width between>
                <p className={cx('order_title', { total })}>{title}</p>
                <p className={cx('price', { total })}>{price}원</p>
              </Flex>
            </li>
          )
        })}
      </ul>
      <Button content="구매하기" onClick={onClickModalHandler} />
    </Wrapper>
  )
}
