package org.ch7techno.reservations.repository;

import org.ch7techno.reservations.model.Reservation;
import java.util.List;
import java.util.Optional;

/**
 * Repository interface for managing reservation data persistence.
 * Provides CRUD operations and query methods for reservations.
 * Implementations should handle concurrent access safely.
 * 
 * @author Melany Rivera, Ricardo Ruiz
 * @since 10/11/2025
 * @version 1.0
 */
public interface ReservationRepository {
    /**
     * Finds a reservation by its unique identifier.
     * 
     * @param id the unique identifier of the reservation
     * @return Optional containing the reservation if found, empty otherwise
     */
    Optional<Reservation> findById(String id);
    
    /**
     * Saves a reservation to the repository.
     * If a reservation with the same ID exists, it will be updated.
     * 
     * @param reservation the reservation to save
     */
    void save(Reservation reservation);
    
    /**
     * Deletes a reservation by its identifier.
     * If no reservation exists with the given ID, this operation has no effect.
     * 
     * @param id the identifier of the reservation to delete
     */
    void deleteById(String id);
    
    /**
     * Finds all reservations for a specific hotel.
     * 
     * @param hotelId the identifier of the hotel
     * @return list of reservations for the specified hotel (may be empty)
     */
    List<Reservation> findByHotel(String hotelId);
}
