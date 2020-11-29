import React, { useEffect, useState } from 'react'
import useBrreg from '../../hooks/use-brreg'
import { TextField } from '../../_lib-components/TextField'

const EntitySearch = props => {
  const { setBrregData, fetcher } = props
  const [searchValue, setSearchValue] = useState('')
  const {
    data,
    setQuery
  } = useBrreg(fetcher)

  function startBrregSok (event) {
    if (event.key === 'Enter' || event.type === 'click' || event.type === 'blur') {
      setQuery(searchValue)
    }
  }

  useEffect(() => {
    if (data) {
      setBrregData(data)
    }
  }, [data])

  return (
    <div className='input-element'>
      <TextField
        hasSearchIcon
        value={searchValue}
        placeholder='Søk etter virksomheten hvor eleven skal på utplassering'
        onChange={(event) => setSearchValue(event.target.value)}
        onKeyDown={startBrregSok}
        onBlur={startBrregSok}
        searchAction={startBrregSok}
      />
    </div>
  )
}

export default EntitySearch