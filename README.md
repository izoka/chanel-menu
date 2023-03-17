# Chanel Menu

The project presents a dynamic menu with react and use a json data including parents and children options.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Data structure interface

```
 interface MenuData {
    id: number;
    title: string;
    parent: number | null;
    url?: string;
    children?: MenuData[];
}
```

## Data structure example

```
[
    {
        id: 1,
        title: 'Artist',
        parent: null,
    },
    {
        id: 2,
        title: 'Stone',
        parent: 1,
    },
    {
        id: 3,
        title: 'Metallica',
        parent: 1,
        url: 'https://www.chanel.com/'
    },
    {
        id: 4,
        title: 'The Rolling Stones',
        parent: 2,
    },
]
```
