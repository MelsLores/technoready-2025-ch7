package org.ch7techno.reservations.repository;

import org.ch7techno.reservations.model.Reservation;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

/**
 * In-memory implementation of ReservationRepository.
 * Uses ConcurrentHashMap for thread-safe operations in concurrent environments.
 * Suitable for testing and development purposes.
 * 
 * This implementation provides:
 * - Thread-safe concurrent access
 * - Fast O(1) lookup by reservation ID
 * - Efficient filtering by hotel ID using streams
 * 
 * @author Melany Rivera, Ricardo Ruiz
 * @since 10/11/2025
 * @version 1.0
 */
public class InMemoryReservationRepository implements ReservationRepository {
    /** Thread-safe concurrent map for storing reservations by ID */
    private final Map<String, Reservation> store = new ConcurrentHashMap<>();
    
    /**
     * {@inheritDoc}
     */
    @Override public Optional<Reservation> findById(String id) {
        return Optional.ofNullable(store.get(id));
    }
    
    /**
     * {@inheritDoc}
     */
    @Override public void save(Reservation reservation) {
        store.put(reservation.getId(), reservation);
    }
    
    /**
     * {@inheritDoc}
     */
    @Override public void deleteById(String id) {
        store.remove(id);
    }
    
    /**
     * {@inheritDoc}
     */
    @Override public List<Reservation> findByHotel(String hotelId) {
        return store.values().stream()
                .filter(r -> r.getHotelId().equals(hotelId))
                .collect(Collectors.toList());
    }
}
