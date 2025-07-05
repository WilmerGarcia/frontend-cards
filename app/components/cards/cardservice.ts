// components/cards/CardService.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

export const getCards = async (page: number = 1, limit: number = 10) => {
  const res = await fetch(`${API_URL}/cards?page=${page}&limit=${limit}`, {
    method: "GET",
    headers: headers(),
  });

  if (!res.ok) throw new Error("Error al obtener tarjetas");

  return res.json();
};

export const createCard = async (card: {
  title: string;
  descriptions: { card_id: number; description: string }[];
}) => {
  const res = await fetch(`${API_URL}/cards`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(card),
  });
  if (!res.ok) throw new Error("Error al crear tarjeta");
  return res.json();
};

export const updateCard = async (
  id: number,
  card: {
    title: string;
    descriptions: { card_id: number; description: string }[];
  }
) => {
  const res = await fetch(`${API_URL}/cards/${id}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(card),
  });
  if (!res.ok) throw new Error("Error al actualizar tarjeta");
  return res.json();
};

export const deleteCard = async (id: number) => {
  const res = await fetch(`${API_URL}/cards/${id}`, {
    method: "DELETE",
    headers: headers(),
  });
  if (!res.ok) throw new Error("Error al eliminar tarjeta");
  return res.json();
};

export const getCardById = async (id: number) => {
  const res = await fetch(`${API_URL}/cards/${id}`, {
    method: "GET",
    headers: headers(),
  });
  if (!res.ok) throw new Error("Error al obtener tarjeta por ID");
  return res.json();
};
