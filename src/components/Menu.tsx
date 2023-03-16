import React, {useEffect, useMemo, useState} from "react";
import { AiFillCaretRight } from "react-icons/ai";
import { AiFillCaretLeft } from "react-icons/ai";

import "./Menu.css";
import { FormattedMenuData, formattedMenuData } from "../utils/menu";

interface MenuProps {
    data: FormattedMenuData[];
}

interface MenuOptionsProps {
    formattedOptions: FormattedMenuData[];
    onClickSubMenu: (option: FormattedMenuData) => void;
    onCLickPrevMenu: (parentId: number | null) => void;
    position: number;
    currentScreenPosition: number;
    selectedOption: FormattedMenuData | null;
}


const MenuOptions = ({ formattedOptions, onClickSubMenu, onCLickPrevMenu, position, currentScreenPosition, selectedOption }: MenuOptionsProps): JSX.Element => {
    const localPosition = 0;
    return (
        <ul className={`${!formattedOptions[0].parent && 'transition'}`} style={{left: `${!formattedOptions[0].parent ? currentScreenPosition : position}%`, width: "100%"}}>
            {formattedOptions.map((option, index) => (
               <span key={index}>
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
                   <li style={{width: "100%"}} key={option.id}>
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


const Menu: React.FC<MenuProps> = ({ data }) => {
    const [currentScreenPosition, setCurrenScreenPosition] = useState<number>(0);
    const formattedOptions = useMemo(
        () => formattedMenuData(data),
        [data]
    );
    const [selectedOption, setSelectedOption] = useState<FormattedMenuData | null>(null);
    const [heightMenu, setHeightMenu] = useState<number>(formattedOptions.length * 38)

    const handleClickSubMenu = (option: FormattedMenuData) => {
        if (option.children) {
            setCurrenScreenPosition(currentScreenPosition - 100);
            setSelectedOption(option);
        }
    }

    const handleClickPrevMenu = (parentId: number | null) => {
        if (!parentId) {
            setSelectedOption(null);
        }
        setCurrenScreenPosition(currentScreenPosition + 100);
        if (parentId) {
            const firstParent = data.find(parent => parent.id === parentId)
            if (firstParent) {
                const parent = data.find(parent => parent.id === firstParent.parent);
                if (parent) {
                    setSelectedOption(parent ? parent : null);
                } else {
                    setSelectedOption(null);
                }
            }
        }
    }

    useEffect(() => {
        if (selectedOption && selectedOption.children) {
                setHeightMenu((selectedOption.children.length * 38) + 38);
                return;
        }

       setHeightMenu(formattedOptions.length * 38);
    }, [formattedOptions.length, selectedOption]);

    return (
        <div className="menu" style={{ height: `${heightMenu}px` }}>
            <MenuOptions
                currentScreenPosition={currentScreenPosition}
                selectedOption={selectedOption}
                position={0}
                onClickSubMenu={handleClickSubMenu}
                onCLickPrevMenu={handleClickPrevMenu}
                formattedOptions={formattedOptions}
            />
        </div>
    )
}

export default Menu;
