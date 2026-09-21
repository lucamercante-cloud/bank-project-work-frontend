import { useState } from "react";

const Navbar = () => {

    const listBtns = [
        "diomerda", "diobastardo", "diocazzo", "candio", "diocane", "dioculo", "diomerdaccia", "diobastardaccio", "diocazzaccio", "diominkiaccia", "diocanaccia", "dioculaccia"
    ]

    const [negro, setNegro] = useState(-1);

    return (
        <nav className="bg-gray-800 p-4 w-full h-[7vh]">
            <div className="flex items-center justify-between">
                {listBtns.map((btn, index) => (
                    <button onClick={() => setNegro(index)} key={index} className={`text-white hover:text-gray-300 ${negro === index ? 'text-gray-300 bg-red-600' : ''}`}>
                        {btn}
                    </button>
                ))}
            </div>
        </nav>
    )
}



export default Navbar