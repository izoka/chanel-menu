import React, {useEffect, useMemo, useState} from "react";
import { MenuData, formattedMenuData } from "../utils/menu";
import MenuOptions from "./MenuOptions";

import "./Menu.css";

interface MenuProps {
    data: MenuData[];
}

const Menu: React.FC<MenuProps> = ({ data }) => {
    const formattedOptions = useMemo(
        () => formattedMenuData(data),
        [data]
    );
    const [currentScreenPosition, setCurrenScreenPosition] = useState<number>(0);
    const [selectedOption, setSelectedOption] = useState<MenuData | null>(null);
    const [heightMenu, setHeightMenu] = useState<number>(formattedOptions.length * 38)

    const handleClickSubMenu = (option: MenuData) => {
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
        <div className="menu transition" style={{ height: `${heightMenu}px` }}>
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
