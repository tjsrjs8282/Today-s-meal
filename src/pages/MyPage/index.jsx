import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { localStorageService } from '@utils/localStorage.service'
import { useRecoilState } from 'recoil';
import { themeState } from '@store'
import $ from './myPage.module.scss'
import Wrapper from '@components/Wrapper'
import Header from '@components/Header'
import Flex from '@components/Flex'
import IconButton from '@components/IconButton'

const info = localStorageService().get('USER_INFO')
const gender = localStorageService().get('USER_GENDER')

export default function MyPage () {
  const [userInfo, setUserInfo] = useState({})
  const [userGender, setUserGender] = useState()
  const [checked, setChecked] = useState(false)
  const [toggleIcon, setToggleIcon] = useState('sun')
  const [theme, setTheme] = useRecoilState(themeState)
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  const handleChangeTheme = useCallback((e) => {
    console.log(e.target.checked)
    if (e.target.checked === false) {
      setChecked(e.target.checked)
      setToggleIcon('sun')
      console.log('handleChangeTheme:', checked)
      localStorageService().set('THEME', 'LIGHT')
      document.documentElement.setAttribute('data-theme', 'LIGHT')
      setTheme('LIGHT')
      return
    }
    console.log('handleChangeTheme:', checked)
    setChecked(e.target.checked)
    setToggleIcon('moon')
    localStorageService().set('THEME', 'DARK')
    document.documentElement.setAttribute('data-theme', 'DARK')
    setTheme('DARK')
  }, [theme, checked])

  useEffect(() => {
    console.log('useEffect', theme)
    if (theme === 'DARK') {
      setChecked(true)
      setToggleIcon('moon')
      return
    }
    setChecked(false)
    setToggleIcon('sun')
  }, [])

  useEffect(() => {
    const { userName, userHeight, userOld, userWeight } = info
    setUserInfo({
      userName: userName,
      userHeight: userHeight + 'cm',
      userOld: userOld + '살',
      userWeight: userWeight + 'kg'
    })
    setUserGender(gender)
  }, [info, gender])

  // const handleCheckChange = (e) => {
  //   setChecked(e.target.checked)
  //   console.log(e.target.checked)
  // }

  return (
    <Wrapper colorWhite>
      <Header>
        <Flex width between>
          <IconButton kinds="back" onClick={goBack} />
          <label className={$.switch_wrapper}>
              <input
                type="checkbox"
                checked={checked}
                className="blind"
                onChange={(e) => handleChangeTheme(e)}
              />
              <span className={$.switch}>
                <span className={$.switch_handler}>
                  <IconButton kinds={toggleIcon} />
                </span>
              </span>
          </label>
        </Flex>
      </Header>
      <Flex width between marginTop>
        <Flex>
          <div className={$.profile}></div>
          <div className={$.info_box}>
            <h2>{userInfo.userName}</h2>
            <ul className={$.info_list}>
              <li>{userGender === "man" ? "남자" : "여자" }</li>
              {
                Object.values(userInfo).filter((v) => v !== userInfo.userName)
                  .map((li, i) => <li key={i}>{li}</li>)
              }
            </ul>
          </div>
        </Flex>
        <IconButton kinds="setting"/>
      </Flex>
    </Wrapper>
  );
};

