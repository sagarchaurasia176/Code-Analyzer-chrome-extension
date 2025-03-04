import React, { useState } from 'react'
import UserEmail from './UserEmail';

// user Option Model - for passing the props
interface UserEmailProps {
  models: string,
  setModel: React.Dispatch<React.SetStateAction<string>>;
}
const SelectMode = () => {
  const [models, setModel] = useState<string>("Gemini 1.5 Flash");

  return (
    <div>
      {/* Now select the model and used it */}
      <div className="mt-4 cursor-pointer">
        <label htmlFor="model" className=" cursor-pointer block  text-gray-700 text-sm font-semibold mb-1">
          Select Model
        </label>
        <select
          id="model"
          value={models}
          onChange={(e) => setModel(e.target.value)}
          className="w-full p-2 cursor-pointer rounded bg-slate-900 text-white border border-gray-300 outline-none"
        >
          <option className="bg-white p-2 text-black">Gemini 1.5 Flash</option>
          <option className="bg-white p-2 text-black">Claude 3.5 Sonnet</option>
        </select>
        <br /><br />
        {/* userEmail components */}
        <UserEmail models={models} setModel={setModel} />      
      </div>

    </div>
  )
}

export default SelectMode
