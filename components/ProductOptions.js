import React from 'react'

export default function ProductOptions({ name, values, selectedOptions, setOptions }) {
    return (
        <fieldset className='text-xl font-semibold'>
            <legend className='text-xl font-semibold'>{name}</legend>
            <div className='inline-flex items-center flex-wrap'>
                {
                    values.map(value => {
                        const id = `option-${name}-${value}`
                        //wir checken ob die state variable, also der aktuelle state. Es wird also erstmal geprüft, ob der aktuelle State gleich ist wie der ausgewählte value
                        const checked = selectedOptions[name] === value
                    

                        return(
                            <label key={id} htmlFor={id}>
                                <input 
                                className='sr-only'
                                type="radio"
                                id={id}
                                name={`option-${name}`}
                                value={value}
                                checked={checked}
                                onChange={()=>{
                                    setOptions(name, value)
                                }}
                                />
                                <div className={`p-2 my-3 text-lg rounded-full block cursor-pointer mr-3 ${checked ? "text-white bg-gray-900" : "text-gray-900 bg-gray-200"}`}>
                                    <span className='px-2'>{value}</span>
                                </div> 

                            </label>
                        )
                    })
                }
            </div>
        </fieldset>
        

    )
}
