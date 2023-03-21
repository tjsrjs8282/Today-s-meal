import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import $ from './productDetail.module.scss'
import Wrapper from '@components/Wrapper'
import Flex from '@components/Flex'
import Header from '@components/Header'
import IconButton from '@components/IconButton'
import Button from '@components/Button'
import Modal from '@components/Modal'
import { PRODUCT_LIST } from '@pages/Product/productData'
import { localStorageService } from '@utils/localStorage.service'

export default function ProductDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [myPoint, setMyPoint] = useState(0)
  const sessionMyPoint = localStorageService().get('MY_POINT')

  const [productList, setProductList] = useState([])
  const [modal, setModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalContent, setModalContent] = useState('')
  const deliPrice = productList.price > 50000 ? 0 : 3000
  const priceTotal = productList.price + deliPrice

  const goBack = () => {
    navigate(-1)
  }

  const goCart = () => {
    navigate('/basket')
  }

  const onClickBuyHandler = () => {
    if (sessionMyPoint - priceTotal > 0) {
      setMyPoint(myPoint - priceTotal)
      localStorageService().set('MY_POINT', myPoint)

      alert('구매가 완료되었습니다!')
    } else {
      alert('포인트가 부족합니다.')
    }
    setModal(false)
  }

  const onClickModalHandler = (name, id) => {
    setModalTitle(`구매하기`)
    setModalContent(`${productList.title} 를(을) 구매 하시겠습니까?`)

    setModal(!modal)
  }

  const modalOnClose = () => {
    setModal(false)
  }

  function getPoint() {
    const getPoint = sessionMyPoint ? sessionMyPoint : 0
    setMyPoint(getPoint)
  }

  function getProduct() {
    const productIdfilter = PRODUCT_LIST.filter((data) => data.id === Number(id))
    setProductList(...productIdfilter)
  }
  useEffect(() => {
    getProduct()
    getPoint()
  }, [])

  return (
    <Wrapper colorGray none>
      {modal && (
        <Modal
          title={modalTitle}
          content={modalContent}
          onClick={onClickBuyHandler}
          onClose={modalOnClose}
          confirm
        ></Modal>
      )}
      <Header>
        <Flex width between>
          <IconButton kinds="back" onClick={goBack} />
          <IconButton kinds="cart" onClick={goCart} />
        </Flex>
      </Header>

      <div className={$.product_image}>
        <img src={productList.img} alt="상품이미지" />
      </div>
      <Flex column width start padding>
        <div className={$.title}>
          <h2>{productList.title}</h2>
          <p className={$.price}>{productList.price} 원</p>
        </div>
        <ul className={$.benefit}>
          <li>
            <Flex width between>
              <p className={$.list_title}>적립포인트</p>
              <p>{Math.ceil(productList.price * 0.02)} P</p>
            </Flex>
          </li>
          <li>
            <Flex width between>
              <p className={$.list_title}>배송비</p>
              <p>{deliPrice} 원</p>
            </Flex>
            <Flex width between>
              <p className={$.list_title}>(50000원 이상 구매 시 배송비 무료)</p>
            </Flex>
          </li>
          <li className={$.total_price}>
            <Flex width between borderBottom paddingBottom>
              <h2 className={$.list_title}>총 결제금액</h2>
              <h2>{priceTotal} 원</h2>
            </Flex>
            <Flex width between marginTop>
              <h2 className={$.list_title}>나의 포인트</h2>

              <h2>{myPoint} 원</h2>
            </Flex>
            {myPoint < priceTotal ? (
              <Flex width between>
                <p className={$.list_title}>포인트가 부족합니다.</p>
              </Flex>
            ) : null}
          </li>
        </ul>
      </Flex>
      <div className={$.bottom_button}>
        <div className={$.wrapper}>
          <Flex marginRight width>
            <Button content="장바구니" nonefixed noneBackground />
          </Flex>
          <Flex marginRigth width>
            <Button content="구매하기" nonefixed onClick={onClickModalHandler}></Button>
          </Flex>
        </div>
      </div>
    </Wrapper>
  )
}
