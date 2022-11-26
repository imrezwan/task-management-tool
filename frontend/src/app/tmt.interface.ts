
export interface Board {
    id: Number;
    name: String;
    listItems: ListItem[];
    created_at: Date;
}

export interface ListItem {
    id: Number;
    name: String;
    order: number;
    cardItems: CardItem[];
    created_at: Date;
}

export interface CardItem {
    id: Number;
    name: String;
    order: number;
    desc?: String;
    created_at: Date;
}