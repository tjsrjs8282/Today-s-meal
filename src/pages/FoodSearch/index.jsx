import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import $ from './search.module.scss'
import logoBg from '@assets/ic-logo-bg.png'
import Wrapper from '@components/Wrapper'
import Loding from '@components/Loding'
import Flex from '@components/Flex'
import Header from '@components/Header'
import HeaderTitle from '@components/HeaderTitle'
import IconButton from '@components/IconButton'
import InputSearch from '@components/InputSearch'
import RadioGroup from '@components/RadioGroup'
import Radio from '@components/Radio'
import ListItemBox from '@components/ListItemBox'
import FoodSearchListItem from './FoodSearchListItem'
import { fatsecretInstance } from '@api/axiosInstance'

export default function FoodSearch() {
  const [searchFood, setSearchFood] = useState('')
  const [foodList, setFoodList] = useState([])
  const inputRef = useRef(null)

  const navigate = useNavigate()
  const [clickable, setClickable] = useState(true)
  const [loading, setLoading] = useState(false)
  const randomFootList = [
    'Bean',
    'Milk',
    'Bread',
    'Fast',
    'Fruit',
    'Meat',
    'Salad',
    'Pasta',
    'Dessert',
    'Snacks',
  ]

  const handleInputChange = useCallback(
    (e) => {
      setSearchFood(e.target.value)
    },
    [searchFood]
  )

  const handleResetClick = useCallback(() => {
    setSearchFood('')
    inputRef.current.focus()
  }, [searchFood])

  const handleItemClick = (id) => {
    navigate(`../search/${id}`)
  }

  const goBack = () => {
    navigate('../today')
  }

  const search = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        let keyword = e.target.value
        getFatsecret(keyword)
      }
    },
    [searchFood]
  )

  const handleRadioChange = async (e) => {
    if (clickable) {
      setClickable(false)
      const setValue = await e.target.value
      getFatsecret(setValue)
      setTimeout(() => {
        setClickable(true)
      }, 1000)
    }

    return
  }

  async function getFatsecret(keword) {
    setLoading(true)
    let res = await fatsecretInstance.get(
      `?method=foods.search&format=json&search_expression=${keword}&page_number=0&max_results=15`
    )
    if (res.err) {
      console.log(err)
      return
    }
    setFoodList(res.data.foods.food)
    setSearchFood(keword)
    setLoading(false)
  }

  useEffect(() => {
    let randomKeyword = randomFootList[~~(Math.random() * 10)]

    getFatsecret(randomKeyword)
  }, [])

  return (
    <Wrapper colorGray>
      <Header>
        <Flex column start width>
          <Flex between width>
            <HeaderTitle />
            <IconButton kinds="close" onClick={goBack} />
          </Flex>
          <InputSearch
            type="text"
            name="foodSearch"
            value={searchFood}
            inputRef={inputRef}
            placeholder="먹은 음식을 검색해 주세요."
            onChange={handleInputChange}
            onClick={handleResetClick}
            onKeyPress={(e) => search(e)}
          />
        </Flex>
      </Header>
      <Flex marginTop>
        <RadioGroup label="surving" value={searchFood} onChange={setSearchFood}>
          {randomFootList.map((surving, index) => {
            return (
              <Radio
                name="surving"
                value={surving}
                key={index}
                onClick={(e) => handleRadioChange(e)}
                tab
              >
                <p>{surving}</p>
              </Radio>
            )
          })}
        </RadioGroup>
      </Flex>
      {loading ? (
        <Loding />
      ) : (
        <>
          {!foodList ? (
            <div className={$.empty_box}>
              <img src={logoBg} alt="빈접시" />
              <p>검색명과 일치하는 음식이 없습니다.</p>
            </div>
          ) : (
            <div className={$.food_list}>
              {foodList.map((foodData) => {
                const { food_id, food_name, food_description, brand_name } = foodData

                return (
                  <ListItemBox
                    key={food_id}
                    title={food_name}
                    brandName={brand_name}
                    description={food_description}
                    onClick={() => handleItemClick(food_id)}
                  />
                )
              })}
            </div>
          )}
        </>
      )}
    </Wrapper>
  )
}
