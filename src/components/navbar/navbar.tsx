import React from "react";
import { IoIosAdd, IoIosRemove } from 'react-icons/io';


const Navbar: React.FC = () => {

return (
    <div className="relative bg-blue-400 p-2">
       <ul className="flex">
        <li><IoIosAdd/></li>
        <li><IoIosRemove/></li>
       </ul>
    </div>
)

}

export default Navbar