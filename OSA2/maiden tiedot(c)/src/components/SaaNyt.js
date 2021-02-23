import JsonTuonti from './JsonTuonti'
import React from 'react'

const SaaNyt = ({maanNimi}) => {


return (
    <>
    {JsonTuonti({maanNimi})}
    </>
)
}

export default SaaNyt