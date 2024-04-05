import React from "react";


const Navbar: React.FC = () => {

return (
    <div className="relative bg-blue-400 p-2">
       <ul className="flex ">
        <li>New note</li>
        <li>Delete note</li>
       </ul>
    </div>
)

}

export default Navbar