package org.ch7techno.reservations.model;

/**
 * Enumeration of possible reservation status values.
 * Represents the lifecycle states of a hotel reservation.
 * 
 * @author Melany Rivera, Ricardo Ruiz
 * @since 10/11/2025
 * @version 1.0
 */
public enum ReservationStatus {
    /** Initial status when a reservation is first created */
    CREATED, 
    /** Status when a reservation has been confirmed by the guest */
    CONFIRMED, 
    /** Status when a reservation has been canceled */
    CANCELED, 
    /** Status when a reservation has been modified after creation */
    EDITED
}
