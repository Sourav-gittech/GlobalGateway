import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const EmbassyAuthInputField = React.forwardRef(
    ({ label, error, helperText, showPassword, setShowPassword, ...inputProps }, ref) => {
        const isPassword = inputProps.name === "password";

        return (
            <div className="relative">
                <input
                    ref={ref}
                    id={inputProps.name}
                    type={isPassword ? (showPassword ? "text" : "password") : inputProps.type || "text"}
                    placeholder=" "
                    className={`w-full px-4 py-3 rounded-md bg-transparent text-white border
            ${error ? "border-red-500" : "border-white/50 focus:border-white"} peer`}
                    {...inputProps}
                />

                <label
                    htmlFor={inputProps.name}
                    className={`absolute left-3 transition-all pointer-events-none
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-white/70
            peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-black/60 peer-focus:px-1
            ${error ? "text-red-500" : "text-white"}`}
                >
                    {label}
                </label>

                {isPassword && setShowPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70"
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </button>
                )}

                {helperText && (
                    <p className="text-red-500 text-xs mt-1 ml-2">{helperText}</p>
                )}
            </div>
        );
    }
);

EmbassyAuthInputField.displayName = "InputField";