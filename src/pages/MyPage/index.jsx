import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { localStorageService } from '@utils/localStorage.service'
import { useRecoilState } from 'recoil';
import { themeState } from '@store'
import { LOCAL_STORAGE_KEY } from '@constants'
import $ from './myPage.module.scss'
import ImageMan from '@assets/man.svg'
import ImageWoman from '@assets/woman.svg'
import IconPurpose from '@assets/ic-purpose-white.png'
import Wrapper from '@components/Wrapper'
import Header from '@components/Header'
import Flex from '@components/Flex'
import IconButton from '@components/IconButton'
import FloatMenu from '@components/FloatMenu'
import Title from '@components/Title'
import Button from '@components/Button'
import { INTAKE_TOTAL } from './constants';

export default function MyPage () {
  const [userInfo, setUserInfo] = useState({})
  const [userGender, setUserGender] = useState()
  const [userPurpose, setUserPurpose] = useState()
  const [theme, setTheme] = useRecoilState(themeState)
  const [checked, setChecked] = useState(theme === 'DARK' ? true : false)
  const [toggleIcon, setToggleIcon] = useState(theme === 'DARK' ? 'moon' : 'sun')
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  const goUserPurpose = () => {
    navigate('/purpose')
  }

  const goUserInfo = () => {
    navigate('/start')
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

  // useEffect(() => {
  //   console.log('useEffect', theme)
  //   if (theme === 'DARK') {
  //     setChecked(true)
  //     setToggleIcon('moon')
  //     return
  //   }
  //   setChecked(false)
  //   setToggleIcon('sun')
  // }, [])

  useEffect(() => {
    const info = localStorageService().get(LOCAL_STORAGE_KEY.USER_INFO)
    setUserGender(localStorageService().get(LOCAL_STORAGE_KEY.USER_GENDER))
    setUserPurpose(localStorageService().get(LOCAL_STORAGE_KEY.USER_PURPOSE))
    const { userName, userHeight, userOld, userWeight } = info
    setUserInfo({
      userName: userName,
      userHeight: userHeight + 'cm',
      userOld: userOld + '살',
      userWeight: userWeight + 'kg'
    })
  }, [])

  return (
    <Wrapper colorWhite>
      <Header>
        <Flex width between>
          <IconButton kinds='back' onClick={goBack} />
          <label className={$.switch_wrapper}>
              <input
                type='checkbox'
                checked={checked}
                className='blind'
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
          <div className={$.profile}>
            <img src={userGender === 'man' ? ImageMan : ImageWoman} alt='프로필 사진' />
          </div>
          <div className={$.info_box}>
            <h2>{userInfo.userName}</h2>
            <ul className={$.info_list}>
              <li>{userGender === 'man' ? '남자' : '여자' }</li>
              {
                Object.values(userInfo).filter((v) => v !== userInfo.userName)
                  .map((li, i) => <li key={i}>{li}</li>)
              }
            </ul>
          </div>
        </Flex>
        <IconButton kinds='setting' onClick={goUserInfo}/>
      </Flex>

      <Title content='나의 목표' sub />
      <div className={$.purpose_wrapper}>
        <Flex>
          <img src={IconPurpose} alt='목표 이미지' />
          <h3>{userPurpose}</h3>
        </Flex>
        <Button content='목표 수정' border colorWhite onClick={goUserPurpose} />
      </div>

      <Title content='하루 목표 섭취량' sub>
        <Button content='수정하기' none />
      </Title>
      <Flex width around radius shadow border >
        {
          INTAKE_TOTAL.map((value) => {
            const { id, name, max, unit } = value
            return (
              <div key={id} className={$.intake_item}>
                <h4>{name}</h4>
                <span>{max + unit}</span>
              </div>
            )
          })
        }
    
      </Flex>
      <FloatMenu />
    </Wrapper>
  );
};

