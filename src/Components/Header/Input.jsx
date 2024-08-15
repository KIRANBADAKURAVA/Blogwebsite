import React, { forwardRef, useId } from "react";

const Input = forwardRef(function Input({
    label, 
    type = 'text', 
    className = 'inline-block mb-1 pl-1', 
    ...props 
}, ref) { 

    const id = useId(); 

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id} 
                    className="block mb-2 font-medium text-gray-700"
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full 
                    ${className}`} // Combine the default and passed className
                ref={ref} // Attach the ref to the input element
                id={id} // Use the generated id
                {...props} // Spread remaining props (like register from react-hook-form)
            />
        </div>
    );
});

export default Input;
