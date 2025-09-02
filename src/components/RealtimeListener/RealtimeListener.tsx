import { useEffect } from "react";
import { RealtimeListenerProps } from "./RealtimeListener.interface";
import { useAppDispatch } from "@/lib/hooks";
import supabase from "@/lib/supabaseClient";


export function RealtimeListener({ table, onInsert, onUpdate, onDelete }: RealtimeListenerProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const channel = supabase
      .channel(`${table}-realtime`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table }, (payload) => {
        if (onInsert) dispatch(onInsert(payload.new));
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table }, (payload) => {
        if (onUpdate) dispatch(onUpdate(payload.new));
      })
      .on("postgres_changes", { event: "DELETE", schema: "public", table }, (payload) => {
        if (onDelete) dispatch(onDelete(payload.old));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [dispatch, table, onInsert, onUpdate, onDelete]);

  return null;
}
