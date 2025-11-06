package org.ch7techno.reservations.exception;

public class ReservationNotFoundException extends RuntimeException {
    public ReservationNotFoundException(String id) {
        super("Reservation not found: " + id);
    }
}
