import React from 'react'
import $ from '../foodDetail.module.scss'

const FoodDetailInfo = ({ foodInfo }) => {
  const { name, icon, value, unit } = foodInfo
  return (
    <div className={$.info_box}>
      <div className={$.icon}>
        <img src={icon} />
      </div>
      <p>{name}</p>
      <h3>
        {value}
        <span className={$.unit}>{unit}</span>
      </h3>
    </div>
  )
}

export default FoodDetailInfo
