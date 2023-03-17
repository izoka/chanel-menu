import React  from "react";
import { AiFillCaretRight } from "react-icons/ai";
import { AiFillCaretLeft } from "react-icons/ai";

import "./Menu.css";
import { MenuData } from "../utils/menu";

interface MenuOptionsProps {
    formattedOptions: MenuData[];
    onClickSubMenu: (option: MenuData) => void;
    onCLickPrevMenu: (parentId: number | null) => void;
    position: number;
    currentScreenPosition: number;
    selectedOption: MenuData | null;
}


const MenuOptions = ({ formattedOptions, onClickSubMenu, onCLickPrevMenu, position, currentScreenPosition, selectedOption }: MenuOptionsProps): JSX.Element => {
    const localPosition = 0;
    return (
        <ul
            className={`${!formattedOptions[0].parent && 'transition'}`}
            style={{left: `${!formattedOptions[0].parent ? currentScreenPosition : position}%`, width: "100%"}}
        >
            {formattedOptions.map((option, index) => (
               <span key={option.id}>
                   {index === 0 && (
                       <>
                           {option && option.parent && (
                               <li onClick={(e) => {
                                   e.stopPropagation();
                                   onCLickPrevMenu(option.parent)
                               }}>
                                   <div className="menu-button">
                                       <AiFillCaretLeft />
                                   </div>
                               </li>
                           )}
                       </>
                   )}
                   <li key={option.id}>
                       <div className={`menu-button ${(selectedOption?.id === option.parent || !selectedOption) ? 'flex' : 'none'}`} onClick={(e) => {
                           if (!option.children && option.url) {
                               window.open(option.url, "_blank")
                           } else {
                               e.stopPropagation();
                               onClickSubMenu(option);
                           }
                       }}>
                           {option.title}
                           {option.children && <AiFillCaretRight />}
                       </div>

                       {option.children &&
                           <MenuOptions
                               position={localPosition + 100}
                               onClickSubMenu={onClickSubMenu}
                               onCLickPrevMenu={onCLickPrevMenu}
                               formattedOptions={option.children}
                               currentScreenPosition={currentScreenPosition}
                               selectedOption={selectedOption}
                           />
                       }
                   </li>
               </span>
            ))}
        </ul>
    )
}

export default MenuOptions;
