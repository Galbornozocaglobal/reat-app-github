import React, { useMemo, useRef } from 'react'
import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";
import { useNavigate } from 'react-router-dom';

export const ButtonSidenav = ({ element }) => {

    useMemo(() => { }, [element]);
    const buttonRef = useRef();
    const navigate = useNavigate();


    const handleNavigate = (e) => {
        e.preventDefault();
        navigate(`?name=${element}&pages=1`)
    }

    return (
        <>
            <button ref={buttonRef} ripple="light" type="button" onClick={handleNavigate} className="mt-2 w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                <p className="truncate">{element}</p>
            </button>

            <Tooltips placement="left" ref={buttonRef}>
                <TooltipsContent>{element}</TooltipsContent>
            </Tooltips>
        </>
    )
}
