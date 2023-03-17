import React from 'react';
import $ from './checkBox.module.scss'
import IconButton from '@components/IconButton';

export default function CheckBox({ id, onChecked, checked, icon }) {
  const handleOnChecked = (e) => {
    onChecked(e.target.id, e.target.checked)
  }

  return (
    <label className={$.checked_label}>
      <input type="checkbox" id={id} checked={checked} onChange={handleOnChecked}/>
      <IconButton kinds={icon} />
    </label>
  );
};