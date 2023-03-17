
export interface MenuData {
    id: number;
    title: string;
    parent: number | null;
    url?: string;
    children?: MenuData[];
}

/* format menu data to array with children
Structure example : [
    {
        "id": 1,
        "title": "Artist",
        "parent": null,
        "children": [
            {
                "id": 2,
                "title": "Stone",
                "parent": 1,
                "children": [
                    {
                        "id": 5,
                        "title": "The Rolling Stones",
                        "parent": 2,
                        "children": [
                            {
                                "id": 7,
                                "title": "Album",
                                "parent": 5,
                                "url": "https://www.chanel.com/"
                            }
                        ]
                    }
                ]
            },
            {
                "id": 3,
                "title": "Metallica",
                "parent": 1
            },
        ]
    },
    {
        "id": 4,
        "title": "Film",
        "parent": null,
        "url": "https://www.chanel.com/"
    }
]
*/
export const formattedMenuData = (data: MenuData[]) => {
    const formattedMenuData = data as MenuData[];
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
