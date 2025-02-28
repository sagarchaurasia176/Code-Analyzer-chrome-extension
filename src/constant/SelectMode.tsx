import React, { useState } from 'react'

const SelectMode = () => {
const [model, setModel] = useState("Gemini 1.5 Flash");
  return (
    <div>  
     {/* Now select the model and used it */}
      <div className="mt-4 cursor-pointer">
        <label htmlFor="model" className=" cursor-pointer block text-sm font-semibold mb-1">
          Select Model
        </label>
        <select
          id="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full p-2 cursor-pointer rounded bg-gray-200 text-black border border-gray-300 outline-none"
        >
          <option>Gemini 1.5 Flash</option>
          <option>Claude AI</option>
        </select>
        <button
            type="submit"
            className="mt-4 p-2 w-full bg-black text-white rounded cursor-pointer"
        >
            Submit
        </button>
      </div>
      <br />
      
    </div>
  )
}

export default SelectMode
