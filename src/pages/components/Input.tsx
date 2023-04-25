import { ChangeEvent, useCallback, useState } from "react"

interface Props {
    type?:string,
    defaultValue?:string,
    placeholder?:string,
    className?:string,
    onTimedChange:Function
}

export default function Input({type, defaultValue, placeholder, className, onTimedChange}:Props) {
    const [value, setvalue] = useState(defaultValue)

    var timerRef: string | number | NodeJS.Timeout | undefined;

    const generateChange = useCallback((e: { target: { value: any; }; }) => {
        setvalue(e.target.value);

        if (onTimedChange) {
            clearTimeout(timerRef);
            timerRef = setTimeout(() => {
                onTimedChange(e.target.value);
            }, 2500);
        }

    }, [onTimedChange]);

    return <input type={type} placeholder={placeholder} className={className} value={value} onChange={generateChange} />
}