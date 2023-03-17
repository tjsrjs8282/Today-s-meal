import React, { useState } from 'react';
import $ from './checkBox.module.scss'
import IconButton from '@components/IconButton';

export default function CheckBox({ id, onChecked }) {
  const [checked, setChecked] = useState(false)
  const [checkedIcon, setCheckedIcon] = useState('checkNone')

  const handleOnChecked = (e) => {
    if (!checked === true) {
      setCheckedIcon('check')
    } else {
      setCheckedIcon('checkNone')
    }
    setChecked(!checked)
    onChecked(e.target.id, e.target.checked)
  }

  return (
    <label className={$.checked_label}>
      <input type="checkbox" id={id} checked={checked} onChange={handleOnChecked}/>
      <IconButton kinds={checkedIcon} />
    </label>
  );
};