import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

/**
 * Component Select đơn giản
 */
const SimpleSelect = ({
  options = [],
  placeholder = "Vui lòng chọn",
  onChange,
  value,
  disabled = false
}) => {
  return (
    <Select
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      style={{ width: '100%' }}
    >
      {options.map(option => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
};

export default SimpleSelect;