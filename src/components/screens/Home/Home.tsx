"use client";

import LoadingSpinner from "@atoms/General/LoadingSpinner";
import { selectedEventAtom } from "@context/events.store";
import { useEventFilters } from "@hooks/useEventFilters";
import { useEvents } from "@hooks/useEvents";
import EventFilters from "@molecules/Home/EventFilters/EventFilters";
import EventModal from "@molecules/Home/EventModal/EventModal";
import EventsList from "@organisms/Home/EventsList/EventsList";
import Header from "@organisms/Home/Header/Header";
import { ClimateEvent } from "@utils/types/event.types";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { HOME_ELEMENTS } from "./Home.enum";
import { HomeProps } from "./Home.types";

const Home = ({}: HomeProps) => {
  const [mounted, setMounted] = useState(false);
  const { isLoading, error } = useEvents();
  const {
    filters,
    filteredEvents,
    updateFilters,
    clearFilters,
    addRegion,
    removeRegion,
    hasActiveFilters,
  } = useEventFilters();
  const [selectedEvent, setSelectedEvent] = useAtom(selectedEventAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEventClick = (event: ClimateEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  if (!mounted) {
    return <LoadingSpinner size="lg" className="min-h-screen" />;
  }

  return (
    <div className="min-h-screen bg-gray-50" data-cy={HOME_ELEMENTS.CONTAINER}>
      <Header />

      <main
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
        data-cy={HOME_ELEMENTS.MAIN_CONTENT}
      >
        <div className="space-y-8">
          <EventFilters
            filters={filters}
            onFiltersChange={updateFilters}
            onClearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters || false}
            onAddRegion={addRegion}
            onRemoveRegion={removeRegion}
          />

          <EventsList
            events={filteredEvents}
            isLoading={isLoading}
            error={error?.message || null}
            onEventClick={handleEventClick}
          />
        </div>
      </main>

      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Home;
