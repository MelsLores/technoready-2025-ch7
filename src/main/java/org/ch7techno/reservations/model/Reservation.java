package org.ch7techno.reservations.model;

import java.time.LocalDate;
import java.util.Objects;

/**
 * Represents a hotel reservation with guest information, dates, and status tracking.
 * This class implements core business logic for reservation management including
 * validation of dates and status transitions.
 * 
 * The reservation follows these business rules:
 * - Check-out date must be after check-in date
 * - All required fields must be non-null
 * - Status changes are managed through specific methods
 * 
 * @author Melany Rivera, Ricardo Ruiz
 * @since 10/11/2025
 * @version 1.0
 */
public class Reservation {
    private final String id;
    private String guestName;
    private String hotelId;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private ReservationStatus status;

    /**
     * Creates a new reservation with the specified details.
     * The reservation is initialized with CREATED status.
     * Business rule validation is handled by ReservationService.
     * 
     * @param id unique identifier for the reservation
     * @param guestName name of the guest making the reservation
     * @param hotelId identifier of the hotel being booked
     * @param checkIn check-in date for the reservation
     * @param checkOut check-out date for the reservation
     * @throws NullPointerException if any parameter is null
     */
    public Reservation(String id, String guestName, String hotelId, LocalDate checkIn, LocalDate checkOut) {
        this.id = Objects.requireNonNull(id, "id required");
        this.guestName = Objects.requireNonNull(guestName, "guest required");
        this.hotelId = Objects.requireNonNull(hotelId, "hotelId required");
        this.checkIn = Objects.requireNonNull(checkIn, "checkIn required");
        this.checkOut = Objects.requireNonNull(checkOut, "checkOut required");
        // Business rules validation ONLY in ReservationService
        this.status = ReservationStatus.CREATED;
    }

    /** @return the unique identifier of this reservation */
    public String getId() { return id; }
    
    /** @return the name of the guest for this reservation */
    public String getGuestName() { return guestName; }
    
    /** @return the hotel identifier for this reservation */
    public String getHotelId() { return hotelId; }
    
    /** @return the check-in date for this reservation */
    public LocalDate getCheckIn() { return checkIn; }
    
    /** @return the check-out date for this reservation */
    public LocalDate getCheckOut() { return checkOut; }
    
    /** @return the current status of this reservation */
    public ReservationStatus getStatus() { return status; }

    /**
     * Updates the guest name for this reservation
     * @param guestName the new guest name (must not be null)
     * @throws NullPointerException if guestName is null
     */
    public void setGuestName(String guestName) { this.guestName = Objects.requireNonNull(guestName); }
    
    /**
     * Updates the hotel identifier for this reservation
     * @param hotelId the new hotel identifier (must not be null)
     * @throws NullPointerException if hotelId is null
     */
    public void setHotelId(String hotelId) { this.hotelId = Objects.requireNonNull(hotelId); }

    /**
     * Updates both check-in and check-out dates for this reservation.
     * Automatically sets the status to EDITED when dates are modified.
     * 
     * @param checkIn the new check-in date (must not be null)
     * @param checkOut the new check-out date (must not be null and after checkIn)
     * @throws IllegalArgumentException if dates are invalid or checkOut is not after checkIn
     */
    public void setDates(LocalDate checkIn, LocalDate checkOut) {
        if (checkIn == null || checkOut == null || !checkOut.isAfter(checkIn)) {
            throw new IllegalArgumentException("invalid dates");
        }
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.status = ReservationStatus.EDITED;
    }

    /** Confirms this reservation by setting status to CONFIRMED */
    public void confirm() { this.status = ReservationStatus.CONFIRMED; }
    
    /** Cancels this reservation by setting status to CANCELED */
    public void cancel() { this.status = ReservationStatus.CANCELED; }
}
