package org.ch7techno.reservations.exception;

/**
 * Exception thrown when a reservation violates business rules or constraints.
 * This is a runtime exception indicating that the reservation data or operation
 * is invalid according to the system's business logic.
 * 
 * Common scenarios that trigger this exception:
 * - Invalid date ranges (check-out before check-in)
 * - Check-in dates in the past
 * - Stay duration exceeding maximum allowed nights
 * - Missing required reservation data
 * 
 * @author Melany Rivera, Ricardo Ruiz
 * @since 10/11/2025
 * @version 1.0
 */
public class InvalidReservationException extends RuntimeException {
    
    /**
     * Constructs a new InvalidReservationException with the specified message.
     * 
     * @param message the detail message explaining why the reservation is invalid
     */
    public InvalidReservationException(String message) {
        super(message);
    }
}
