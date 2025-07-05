"use client";
import { useEffect, useState } from "react";
import { createCard, updateCard } from "./cardservice";

interface Props {
  initialData?: any;
  onClose: () => void;
}

export default function CardFormModal({ initialData, onClose }: Props) {
  console.log(initialData);
  const [title, setTitle] = useState("");
  const [descriptions, setDescriptions] = useState<string[]>([""]);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescriptions(
        initialData.descriptions?.map((d: any) => d.description) || [""]
      );
    }
  }, [initialData]);

  const handleDescriptionChange = (index: number, value: string) => {
    const newDescs = [...descriptions];
    newDescs[index] = value;
    setDescriptions(newDescs);
  };

  const addDescription = () => {
    setDescriptions([...descriptions, ""]);
  };

  const removeDescription = (index: number) => {
    const newDescs = descriptions.filter((_, i) => i !== index);
    setDescriptions(newDescs.length ? newDescs : [""]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const descriptionsPayload = descriptions
      .filter((desc) => desc.trim() !== "")
      .map((desc) => ({
        card_id: initialData?.id || 0,
        description: desc,
      }));

    const data = {
      title,
      descriptions: descriptionsPayload,
    };

    try {
      if (initialData?.id) {
        await updateCard(initialData.id, data);
      } else {
        await createCard(data);
      }
      onClose();
    } catch (error) {
      console.error("Error al guardar tarjeta:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg border border-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300">
        <h2 className="text-2xl font-bold mb-4">
          {initialData ? "Editar Tarjeta" : "Nueva Tarjeta"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold">Descripciones</label>
            {descriptions.map((desc, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={desc}
                  onChange={(e) =>
                    handleDescriptionChange(index, e.target.value)
                  }
                  required
                  className="flex-1 border px-3 py-2 rounded"
                />
                <button
                  type="button"
                  onClick={() => removeDescription(index)}
                  className="bg-red-500 text-white px-3 rounded"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addDescription}
              className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
            >
              + Agregar descripción
            </button>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
