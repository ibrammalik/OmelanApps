import React, { useState, useEffect } from "react";

const FAVORITE_KEY = "favoriteCaregivers";

export function useFavoriteCaregivers() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITE_KEY);
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(FAVORITE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (caregiver) => {
    const exists = favorites.some((c) => c.id === caregiver.id);
    if (exists) {
      setFavorites(favorites.filter((c) => c.id !== caregiver.id));
    } else {
      setFavorites([...favorites, caregiver]);
    }
  };

  const isFavorite = (id) => favorites.some((c) => c.id === id);

  return { favorites, toggleFavorite, isFavorite };
}
