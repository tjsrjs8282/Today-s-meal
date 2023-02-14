import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import $ from './search.module.scss'
import logoBg from '@assets/ic-logo-bg.png'
import Wrapper from '@components/Wrapper'
import Flex from '@components/Flex'
import Header from '@components/Header'
import HeaderTitle from '@components/HeaderTitle'
import IconButton from '@components/IconButton'
import InputSearch from '@components/InputSearch'
import RadioGroup from '@components/RadioGroup'
import Radio from '@components/Radio'
import FoodSearchListItem from './FoodSearchListItem'
import { fatsecretInstance } from '@api/axiosInstance'

export default function FoodSearch() {
  const [date, setDate] = useState(new Date())
  const [searchFood, setSearchFood] = useState('')
  const [foodList, setFoodList] = useState([])
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const [clickable, setClickable] = useState(true)
  const randomFootList = [
    'Beans',
    'Milk',
    'Breads',
    'Fast',
    'Fruit',
    'Meat',
    'Salads',
    'Pasta',
    'Desserts',
    'Snacks',
  ]

  const handleInputChange = useCallback(
    (e) => {
      setSearchFood(e.target.value)
    },
    [searchFood]
  )

  const handleResetClick = () => {
    setSearchFood('')
    inputRef.current.focus()
  }

  const handleItemClick = (id) => {
    navigate(`../search/${id}`)
  }

  const goBack = () => {
    navigate('../today')
  }

  const search = (e) => {
    if (e.key === 'Enter') {
      let keyword = e.target.value
      getFatsecret(keyword)
    }
  }

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
    let res = await fatsecretInstance.get(
      `?method=foods.search&format=json&search_expression=${keword}&page_number=0&max_results=15`
    )
    if (res.err) {
      console.log(err)
      return
    }
    setFoodList(res.data.foods.food)
    setSearchFood(keword)

    // fatsecretInstance.then((res) => console.log(res)).catch((err) => console.log(err))
  }

  console.log(foodList)
  console.log(searchFood)
  useEffect(() => {
    let randomKeyword = randomFootList[~~(Math.random() * 10)]

    getFatsecret(randomKeyword)
  }, [])

  if (!foodList) {
    return (
      <Wrapper colorGray>
        <Header>
          <Flex column start width>
            <Flex between>
              <HeaderTitle content="아침식사" date={date} />
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
        <div className={$.empty_box}>
          <img src={logoBg} alt="빈접시" />
          <p>검색명과 일치하는 음식이 없습니다.</p>
        </div>
      </Wrapper>
    )
  }
  return (
    <Wrapper colorGray>
      <Header>
        <Flex column start width>
          <Flex between width>
            <HeaderTitle content="아침식사" dates={date} />
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
      <div className={$.food_list}>
        {foodList.map((foodData) => {
          const { food_id } = foodData
          // console.log(food_id)
          return (
            <FoodSearchListItem
              key={food_id}
              foodData={foodData}
              onClick={() => handleItemClick(food_id)}
            />
          )
        })}
      </div>
    </Wrapper>
  )
}
