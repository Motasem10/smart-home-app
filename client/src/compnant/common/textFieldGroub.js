import React from 'react';

const TextFielGroub=({
type,
placeholder,
name,
value,
errors,
onChange}
)=>{

return(
    <div className='form-group'>
    <input
    className=" form-control"
    type={type}
    placeholder={placeholder}
    name={name}
    value={value}
    onChange={onChange}
  />
  {errors &&(<div className="invalid-feedback">{errors}</div>)}
                            
</div>
)


}

export default TextFielGroub;