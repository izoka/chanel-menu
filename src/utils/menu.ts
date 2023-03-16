
export interface FormattedMenuData {
    id: number;
    title: string;
    parent: number | null;
    url?: string;
    children?: FormattedMenuData[];
}

// format menu data to array with children
export const formattedMenuData = (data: FormattedMenuData[]) => {
    const formattedMenuData = data as FormattedMenuData[];
    const ids = formattedMenuData.map((x) => x.id);

    return formattedMenuData.map((parent) => {
        const children = formattedMenuData.filter((child) => {
            return child.id !== child.parent && child.parent === parent.id;
        });

        if (children.length) {
            parent.children = children;
        }
        return parent;
    }).filter((obj) => {
        return obj.id === obj.parent || !obj.parent || !ids.includes(obj.parent);
    });
}
