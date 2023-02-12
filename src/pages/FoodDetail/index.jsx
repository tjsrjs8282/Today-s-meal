import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import $ from './foodDetail.module.scss'
import Wrapper from '@components/Wrapper'
import Flex from '@components/Flex'
import Header from '@components/Header'
import Title from '@components/Title'
import IconButton from '@components/IconButton'
import CountBox from '@components/CountBox'
import Button from '@components/Button'
import RadioGroup from '@components/RadioGroup'
import Radio from '@components/Radio'
import FoodDetailInfo from './FoodDetailInfo'
import { FOOD_DETAIL_INFO } from './FoodDetailInfo/constants'
import { fatsecretInstance } from '@api/axiosInstance'

import kcalIcon from '@assets/ic-kcal-normal.png'
import carbohydrateIcon from '@assets/ic-carbohydrate-normal.png'
import proteinIcon from '@assets/ic-protein-normal.png'
import fatIcon from '@assets/ic-fat-normal.png'

const FoodDetail = () => {
  const navigate = useNavigate()
  const [foodList, setFoodList] = useState([])
  const [foodServingList, setFoodServingList] = useState([])
  const [foodServing, setFoodServing] = useState('')
  const [loading, setLoading] = useState(false)
  const nameRadio = useRef([])
  const { id } = useParams()
  console.log(foodServingList)
  const test = [
    {
      id: 1,
      name: '칼로리',
      icon: kcalIcon,
      unit: 'kcal',
    },
    {
      id: 2,
      name: '탄수화물',
      icon: carbohydrateIcon,
      unit: 'g',
    },
    {
      id: 3,
      name: '단백질',
      icon: proteinIcon,
      unit: 'g',
    },
    {
      id: 4,
      name: '지방',
      icon: fatIcon,
      unit: 'g',
    },
  ]

  const handleClickAdd = () => {
    console.log('handleClickAdd')
  }

  const goBack = () => {
    navigate('../search')
  }

  async function getFatsecret() {
    setLoading(true)
    await fatsecretInstance
      .get(`?method=food.get.v2&format=json&food_id=${id}`)
      .then((res) => {
        setFoodList(res.data.food)
        setFoodServingList(res.data.food.servings.serving)
        // setFoodServing(res.data.food.servings.serving[0].measurement_description)
      })
      .catch((err) => console.log(err))
    setLoading(false)
  }

  function filtergg(e) {
    let filter = foodServingList.filter((v) => {
      v.measurement_description === foodServing
    })
    console.log(foodServing)
    // setFoodServingList(filter)
  }

  useEffect(() => {
    getFatsecret()
  }, [])

  return (
    <Wrapper>
      <Header>
        <IconButton kinds={'close'} onClick={goBack} />
      </Header>
      <Title content={foodList.food_name} subContent={foodServing.serving_amount} />
      <CountBox />

      {Array.isArray(foodServingList) ? (
        <RadioGroup label="surving" value={foodServing} onChange={setFoodServing}>
          {foodServingList.map((surving, index) => {
            return (
              <Radio
                name="surving"
                value={surving.measurement_description}
                key={index}
                radioRef={(el) => (nameRadio.current[index] = el)}
                tab
              >
                <p>{surving.measurement_description}</p>
              </Radio>
            )
          })}
        </RadioGroup>
      ) : null}

      {/*  */}

      {loading ? (
        <Flex fontWhite whdth padding>
          <div className={$.loader}>
            <div className={$.bg}></div>
            <h2>Loading</h2>
          </div>
        </Flex>
      ) : (
        <div className={$.info_box}>
          <Flex wrap between>
            {/* {FOOD_DETAIL_INFO.map((foodInfo) => {
            const { id } = foodInfo
            return <FoodDetailInfo key={id} foodInfo={foodInfo} />
          })} */}
            {/* {test.map((data, index) => {
            return (
              <Flex padding radius shadow column start colorWhite whdth fontBlack marginBottom col2>
                <Flex paddingBottom>
                  <img src={data.icon} alt={data.name} />
                </Flex>
                <Flex marginTop column start>
                  <p>{data.name}</p>
                  <h2>
                    {data.calories}
                    <span className={$.unit}> {data.unit}</span>
                  </h2>
                </Flex>
              </Flex>
            )
          })} */}

            <Flex padding radius shadow column start colorWhite whdth fontBlack marginBottom col2>
              <Flex paddingBottom>
                <img src={kcalIcon} alt="칼로리" />
              </Flex>
              <Flex marginTop column start>
                <p>칼로리</p>

                <h2>
                  {Array.isArray(foodServingList) ? (
                    <>{foodServingList.calories}</>
                  ) : (
                    <>{foodServingList.calories}</>
                  )}
                  <span className={$.unit}>kcal</span>
                </h2>
              </Flex>
            </Flex>

            <Flex padding radius shadow column start colorWhite whdth col2 fontBlack marginBottom>
              <Flex paddingBottom>
                <img src={carbohydrateIcon} alt="탄수화물" />
              </Flex>
              <Flex marginTop column start>
                <p>탄수화물</p>
                <h2>
                  {foodServingList.carbohydrate}
                  <span className={$.unit}>g</span>
                </h2>
              </Flex>
            </Flex>
            <Flex padding radius shadow column start colorWhite whdth col2 fontBlack marginBottom>
              <Flex paddingBottom>
                <img src={proteinIcon} alt="단백질" />
              </Flex>
              <Flex marginTop column start>
                <p>단백질</p>
                <h2>
                  {foodServingList.protein}
                  <span className={$.unit}>g</span>
                </h2>
              </Flex>
            </Flex>
            <Flex padding radius shadow column start colorWhite whdth col2 fontBlack marginBottom>
              <Flex paddingBottom>
                <img src={fatIcon} alt="지방" />
              </Flex>
              <Flex marginTop column start>
                <p>지방</p>
                <h2>
                  {foodServingList.fat}
                  <span className={$.unit}>g</span>
                </h2>
              </Flex>
            </Flex>
          </Flex>
        </div>
      )}
      {/* {foodServing === '' && <p>단위를 선택해주세요.</p>} */}
      <Button content="식단추가" onClick={handleClickAdd} />
    </Wrapper>
  )
}

export default FoodDetail
