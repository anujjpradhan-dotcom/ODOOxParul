import { useState, useCallback } from "react";
import { api } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants";
import { toast } from "sonner";
import { PackingItem } from "@/types";

export function usePacking(tripId: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<PackingItem[]>([]);

  const fetchItems = useCallback(async () => {
    if (!tripId) return;
    setIsLoading(true);
    try {
      const response = await api.get<PackingItem[]>(API_ENDPOINTS.PACKING.LIST(tripId));
      setItems(response.data || []);
    } catch (error: any) {
      toast.error("Failed to fetch packing list");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [tripId]);

  const addItem = async (data: { name: string; category: string; quantity?: number }) => {
    try {
      const response = await api.post<PackingItem>(API_ENDPOINTS.PACKING.ADD(tripId), data);
      setItems(prev => [...prev, response.data]);
      toast.success("Item added");
      return response.data;
    } catch (error: any) {
      toast.error(error.message || "Failed to add item");
      throw error;
    }
  };

  const toggleItem = async (itemId: string) => {
    try {
      const response = await api.patch<PackingItem>(API_ENDPOINTS.PACKING.TOGGLE(tripId, itemId));
      setItems(prev => prev.map(item => item.id === itemId ? response.data : item));
      return response.data;
    } catch (error: any) {
      toast.error("Failed to update item");
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      await api.delete(API_ENDPOINTS.PACKING.DELETE(tripId, itemId));
      setItems(prev => prev.filter(item => item.id !== itemId));
      toast.success("Item removed");
    } catch (error: any) {
      toast.error("Failed to remove item");
    }
  };

  return {
    items,
    isLoading,
    fetchItems,
    addItem,
    toggleItem,
    removeItem,
  };
}
