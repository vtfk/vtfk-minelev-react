import { useState, useEffect } from 'react'
import { Select } from '../_lib-components/Select'

function KlassetrinnSelectorForm (props) {
  const [select, setSelect] = useState()
  const { setSelected } = props

  useEffect(() => {
    if (typeof setSelected === 'function') {
      setSelected(select)
    }
  }, [select, setSelected])

  return (
    <div className='input-element'>
      <Select
        placeholder='Velg klassetrinn'
        items={[
          { value: 'vg1', label: 'VG 1' },
          { value: 'vg2', label: 'VG 2' },
          { value: 'vg3', label: 'VG 3' }
        ]}
        selectedItem={select}
        onChange={(item) => { setSelect(item) }}
        closeOnSelect
        isOpen
      />
    </div>
  )
}

export default KlassetrinnSelectorForm