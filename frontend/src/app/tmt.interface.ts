
export interface Board {
    id: Number;
    name: String;
    owner: number;
    listitems: ListItem[];
    created_at: Date;
}

export interface ListItem {
    id: number;
    name: String;
    order: number;
    carditems: CardItem[];
    created_at: Date;
}

export interface CardItem {
    id: number;
    name: String;
    order: number;
    listitem: number;
    desc?: String;
    created_at: Date;
}