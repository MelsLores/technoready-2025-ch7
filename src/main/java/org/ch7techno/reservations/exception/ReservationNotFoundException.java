package org.ch7techno.reservations.exception;

/**
 * Exception thrown when attempting to access a reservation that does not exist.
 * This runtime exception indicates that no reservation could be found with the
 * specified identifier in the system.
 * 
 * Typically thrown by:
 * - Repository operations when searching by non-existent ID
 * - Service operations that require an existing reservation
 * - Edit or cancel operations on missing reservations
 * 
 * @author Melany Rivera, Ricardo Ruiz
 * @since 10/11/2025
 * @version 1.0
 */
public class ReservationNotFoundException extends RuntimeException {
    
    /**
     * Constructs a new ReservationNotFoundException for the specified reservation ID.
     * 
     * @param id the identifier of the reservation that could not be found
     */
    public ReservationNotFoundException(String id) {
        super("Reservation not found: " + id);
    }
}
