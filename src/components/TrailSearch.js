import React from 'react'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng
} from 'use-places-autocomplete'
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption
} from '@reach/combobox'

import '@reach/combobox/styles.css'



function TrailSearch(props){
    const {
        ready,
        value,
        suggestions: {status, data},
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions:{
            location: {lat: () => 38.907192, lng: () => -77.036873},
            radius: 10 * 1000
        }
    })
    return (
        <div className="search">
            <Combobox onSelect={
                async (address)=> {
                    setValue(address, false)
                    clearSuggestions()
                    try{
                        const results = await getGeocode({address})
                        const {lat, lng} = await getLatLng(results[0])
                        props.panTo({lat, lng})
                        props.searchResults(lat, lng)
                    } catch (error) {
                        console.log('error!')
                    }
                
            }}>
                <ComboboxInput
                    value={value}
                    onChange={(e)=> setValue(e.target.value)}
                    disabled={!ready}
                    placeholder ="Search For Location"
                />
                <ComboboxPopover >
                    <ComboboxList>
                    {status === "OK" && 
                    data.map(({id, description}) => (
                        <ComboboxOption key={id} value={description}/>
                    ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    )
}

export default TrailSearch