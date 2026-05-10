import { useState, useCallback } from "react";
import { api } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants";
import { toast } from "sonner";

export interface Note {
  id: string;
  tripId: string;
  tripStopId?: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export function useNotes(tripId: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchNotes = useCallback(async () => {
    if (!tripId) return;
    setIsLoading(true);
    try {
      const response = await api.get<Note[]>(API_ENDPOINTS.NOTES.LIST(tripId));
      setNotes(response.data || []);
    } catch (error: any) {
      toast.error("Failed to fetch notes");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [tripId]);

  const createNote = async (data: { title?: string; content: string; tripStopId?: string }) => {
    try {
      const response = await api.post<Note>(API_ENDPOINTS.NOTES.CREATE(tripId), data);
      setNotes(prev => [response.data, ...prev]);
      toast.success("Note created");
      return response.data;
    } catch (error: any) {
      toast.error(error.message || "Failed to create note");
      throw error;
    }
  };

  const updateNote = async (noteId: string, data: { title?: string; content: string; tripStopId?: string }) => {
    try {
      const response = await api.put<Note>(API_ENDPOINTS.NOTES.DETAIL(tripId, noteId), data);
      setNotes(prev => prev.map(note => note.id === noteId ? response.data : note));
      toast.success("Note updated");
      return response.data;
    } catch (error: any) {
      toast.error("Failed to update note");
      throw error;
    }
  };

  const deleteNote = async (noteId: string) => {
    try {
      await api.delete(API_ENDPOINTS.NOTES.DETAIL(tripId, noteId));
      setNotes(prev => prev.filter(note => note.id !== noteId));
      toast.success("Note deleted");
    } catch (error: any) {
      toast.error("Failed to delete note");
    }
  };

  return {
    notes,
    isLoading,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
  };
}
