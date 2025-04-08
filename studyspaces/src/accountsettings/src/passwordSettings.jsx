/* import { useState } from "react";
import { VscEye, VscEyeClosed } from "vscode-icons-react";

const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-64">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        className="w-full p-2 border rounded"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-3 text-gray-500"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
};

export default PasswordInput; 
*/