import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Icon } from '../../_lib-components/Icon'
import { RadioButton } from '../../_lib-components/RadioButton'
import { Checkbox } from '../../_lib-components/Checkbox'

import './styles.scss'

export function Select ({ placeholder, label, items, selectedItem, onChange, isOpen, closeOnSelect, ...props }) {
  const [open, setOpen] = useState(isOpen || false)

  function toggleSelect () {
    setOpen(prevSelectState => !prevSelectState)
  }

  function selectItem (item) {
    onChange(item)
    if (closeOnSelect) setOpen(false)
  }

  return (
    <div className={`select select-single ${open === true ? 'is-open' : ''}`}>
      <div {...props}>
        {
          placeholder &&
          selectedItem &&
            <div>
              <div className='select-label'>
                {placeholder}
              </div>
              <button className='select-trigger' onClick={() => { toggleSelect() }} aria-haspopup='listbox' aria-expanded={open}>
                <div className='select-trigger-text'>
                  <div>{open === true ? placeholder : selectedItem.label}</div>
                </div>
                <Icon className='select-trigger-icon' name={open ? 'chevronUp' : 'chevronDown'} size='auto' alt='' />
              </button>
            </div>
        }

        {
          placeholder &&
          !selectedItem &&
            <button className='select-trigger' onClick={() => { toggleSelect() }} aria-haspopup='listbox' aria-expanded={open}>
              <div className='select-trigger-text'>
                <div>
                  {placeholder}
                </div>
              </div>
              <Icon className='select-trigger-icon' name={open ? 'chevronUp' : 'chevronDown'} size='auto' alt='' />
            </button>
        }

        {
          open === true &&
            <div className='select-items' role='listbox'>
              {
                items.map(function (item, index) {
                  const checked = selectedItem && selectedItem.value === item.value
                  return (
                    <div className='select-item' key={index}>
                      <RadioButton
                        onChange={() => { selectItem(item) }}
                        name={`select-${placeholder.replace(/\s+/g, '-').toLowerCase()}`}
                        value={item.value}
                        label={item.label}
                        checked={checked}
                        aria-selected={checked}
                        role='option'
                      />
                    </div>
                  )
                })
              }
            </div>
        }
      </div>
    </div>
  )
}

export function SelectMultiple ({ placeholder, label, items, selectedItems, isOpen, onChange, ...props }) {
  const [open, setOpen] = useState(isOpen || false)

  function toggleSelect () {
    setOpen(prevSelectState => !prevSelectState)
  }

  function selectItem (item) {
    onChange(item)
  }

  function isSelected (item) {
    return selectedItems.filter(function (e) { return e.value === item.value }).length > 0
  }

  return (
    <div className={`select select-multiple ${open === true ? 'is-open' : ''}`}>
      <div {...props}>
        {
          placeholder &&
          selectedItems.length > 0 &&
            <div>
              <div className='select-label'>
                {placeholder}
              </div>
              <button className='select-trigger' onClick={() => { toggleSelect() }} aria-haspopup='listbox' aria-expanded={open}>
                <div className='select-trigger-text'>
                  {
                    open === true
                      ? placeholder
                      : selectedItems.map(function (item, index) {
                        return (
                          <div key={item.value}>{item.label}</div>
                        )
                      })
                  }
                </div>
                <Icon className='select-trigger-icon' name={open ? 'chevronUp' : 'chevronDown'} size='auto' alt='' />
              </button>
            </div>
        }
        {
          placeholder &&
          (!selectedItems || selectedItems.length === 0) &&
            <button className='select-trigger' onClick={() => { toggleSelect() }} aria-haspopup='listbox' aria-expanded={open}>
              <div className='select-trigger-text'>
                {placeholder}
              </div>
              <Icon className='select-trigger-icon' name={open ? 'chevronUp' : 'chevronDown'} size='auto' alt='' />
            </button>
        }

        {
          open === true &&
            <div className='select-items' role='listbox'>
              {
                items.map(function (item, index) {
                  return (
                    <div className='select-item' key={index}>
                      <Checkbox
                        onChange={() => { selectItem(item) }}
                        name={`select-multiple-${placeholder.replace(/\s+/g, '-').toLowerCase()}`}
                        value={item.value}
                        label={item.label}
                        checked={isSelected(item)}
                        aria-selected={isSelected(item)}
                        role='option'
                      />
                    </div>
                  )
                })
              }
            </div>
        }
      </div>
    </div>
  )
}

Select.propTypes = {
  placeholder: PropTypes.string,
  items: PropTypes.array.isRequired,
  selectedItem: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  closeOnSelect: PropTypes.bool
}

SelectMultiple.propTypes = {
  placeholder: PropTypes.string,
  items: PropTypes.array.isRequired,
  selectedItems: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  isOpen: PropTypes.bool
}
