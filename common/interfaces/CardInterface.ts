export interface CardDescription {
  id?: number;
  card_id?: number;
  description: string;
}

export interface CardData {
  id: number;
  title: string;
  descriptions: CardDescription[];
}

export interface Props {
  initialData?: CardData;
  onClose: () => void;
}
