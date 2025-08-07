import { eventsAtom } from "@context/events.store";
import { eventsService } from "@services/events.service";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useEffect } from "react";

export const useEvents = () => {
  const [events, setEvents] = useAtom(eventsAtom);

  const { data, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: eventsService.getEvents,
    gcTime: 5 * 60 * 1000,
    enabled: true,
  });

  useEffect(() => {
    if (data) {
      setEvents(data);
    }
  }, [data, setEvents]);

  return {
    events: data || events || [],
    isLoading,
    error,
  };
};
