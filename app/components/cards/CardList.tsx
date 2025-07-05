"use client";
import { useEffect, useState } from "react";
import {
  getCards,
  deleteCard,
  getCardById,
} from "./cardservice";
import CardFormModal from "./CardFormModal";

export default function CardList() {
  const [cards, setCards] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  const loadCards = async () => {
    setLoading(true);
    try {
      const res = await getCards(page, limit);
      const data = res.data.data || [];
      setCards(data);
      const total = res.data.total || 0;
      setTotalPages(Math.ceil(total / limit));
    } catch (e) {
      console.error("Error cargando cards", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCards();
  }, [page]);

  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar esta tarjeta?")) return;
    await deleteCard(id);
    loadCards();
  };

  const handleEdit = async (id: number) => {
    const card = await getCardById(id);
    setSelectedCard(card.data);
    setShowModal(true);
  };

  const handleCreate = () => {
    setSelectedCard(null);
    setShowModal(true);
  };

  const renderPagination = () => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
      <div className="flex justify-center mt-6 gap-2 flex-wrap">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 rounded ${
              p === page ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    );
  };

  return (
    <div className="px-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Lista de Tarjetas</h2>
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Crear Nueva Tarjeta
        </button>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cards?.map((card) => (
            <div key={card.id} className="border p-4 rounded shadow">
              <h3 className="text-xl font-semibold">{card.title}</h3>
              <ul className="pl-5 list-disc text-gray-700">
                {card.descriptions?.map((desc: any) => (
                  <li key={desc.id}>{desc.description}</li>
                ))}
              </ul>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleEdit(card.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(card.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Paginación numérica */}
      {renderPagination()}

      {/* Modal de creación / edición */}
      {showModal && (
        <CardFormModal
          initialData={selectedCard}
          onClose={() => {
            setShowModal(false);
            loadCards();
          }}
        />
      )}
    </div>
  );
}
