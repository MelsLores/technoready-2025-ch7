package org.ch7techno.reservations.repository;

import org.ch7techno.reservations.model.Reservation;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

public class InMemoryReservationRepository implements ReservationRepository {
    private final Map<String, Reservation> store = new ConcurrentHashMap<>();
    @Override public Optional<Reservation> findById(String id) {
        return Optional.ofNullable(store.get(id));
    }
    @Override public void save(Reservation reservation) {
        store.put(reservation.getId(), reservation);
    }
    @Override public void deleteById(String id) {
        store.remove(id);
    }
    @Override public List<Reservation> findByHotel(String hotelId) {
        return store.values().stream()
                .filter(r -> r.getHotelId().equals(hotelId))
                .collect(Collectors.toList());
    }
}
