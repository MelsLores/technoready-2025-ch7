package org.ch7techno.reservations.service;

import org.ch7techno.reservations.exception.InvalidReservationException;
import org.ch7techno.reservations.exception.ReservationNotFoundException;
import org.ch7techno.reservations.model.Reservation;
import org.ch7techno.reservations.model.ReservationStatus;
import org.ch7techno.reservations.repository.ReservationRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

/**
 * Business service for managing hotel reservations.
 * Handles all reservation operations including creation, modification, cancellation,
 * and enforces business rules for date validation and stay duration limits.
 * 
 * Business Rules:
 * - Check-out date must be after check-in date
 * - Check-in date cannot be in the past
 * - Maximum stay duration is 60 nights
 * - All dates are required (non-null)
 * 
 * @author Melany Rivera, Ricardo Ruiz
 * @since 10/11/2025
 * @version 1.0
 */
public class ReservationService {
    private final ReservationRepository repository;

    /**
     * Creates a new ReservationService with the specified repository.
     * 
     * @param repository the repository implementation for storing reservations
     * @throws NullPointerException if repository is null
     */
    public ReservationService(ReservationRepository repository) {
        this.repository = Objects.requireNonNull(repository);
    }

    /**
     * Creates a new reservation after validating business rules.
     * The reservation dates are validated against business constraints
     * before being saved to the repository.
     * 
     * @param reservation the reservation to create
     * @return the created reservation
     * @throws InvalidReservationException if business rules are violated
     */
    public Reservation create(Reservation reservation) {
        validateBusinessRules(reservation.getCheckIn(), reservation.getCheckOut());
        repository.save(reservation);
        return reservation;
    }

    /**
     * Edits the dates of an existing reservation.
     * The new dates are validated against business rules before updating.
     * Sets the reservation status to EDITED upon successful modification.
     * 
     * @param id the identifier of the reservation to edit
     * @param newCheckIn the new check-in date
     * @param newCheckOut the new check-out date
     * @return the updated reservation
     * @throws ReservationNotFoundException if no reservation exists with the given id
     * @throws InvalidReservationException if the new dates violate business rules
     */
    public Reservation editDates(String id, LocalDate newCheckIn, LocalDate newCheckOut) {
        Reservation r = repository.findById(id).orElseThrow(() -> new ReservationNotFoundException(id));
        validateBusinessRules(newCheckIn, newCheckOut);
        r.setDates(newCheckIn, newCheckOut);
        repository.save(r);
        return r;
    }

    /**
     * Cancels an existing reservation.
     * This operation is idempotent - canceling an already canceled reservation has no effect.
     * Sets the reservation status to CANCELED.
     * 
     * @param id the identifier of the reservation to cancel
     * @throws ReservationNotFoundException if no reservation exists with the given id
     */
    public void cancel(String id) {
        Reservation r = repository.findById(id).orElseThrow(() -> new ReservationNotFoundException(id));
        if (r.getStatus() == ReservationStatus.CANCELED) return; // idempotent operation
        r.cancel();
        repository.save(r);
    }

    /**
     * Retrieves a reservation by its identifier.
     * 
     * @param id the unique identifier of the reservation
     * @return the reservation with the specified id
     * @throws ReservationNotFoundException if no reservation exists with the given id
     */
    public Reservation get(String id) {
        return repository.findById(id).orElseThrow(() -> new ReservationNotFoundException(id));
    }

    /**
     * Retrieves all reservations for a specific hotel.
     * 
     * @param hotelId the identifier of the hotel
     * @return list of reservations for the specified hotel (may be empty)
     */
    public List<Reservation> byHotel(String hotelId) { return repository.findByHotel(hotelId); }

    /**
     * Validates reservation dates against business rules.
     * Enforces the following constraints:
     * - Both dates must be non-null
     * - Check-out must be after check-in
     * - Check-in cannot be in the past
     * - Maximum stay duration is 60 nights
     * 
     * @param in the check-in date to validate
     * @param out the check-out date to validate
     * @throws InvalidReservationException if any business rule is violated
     */
    private void validateBusinessRules(LocalDate in, LocalDate out) {
        if (in == null || out == null) throw new InvalidReservationException("Dates are required");
        if (!out.isAfter(in)) throw new InvalidReservationException("checkOut must be after checkIn");
        if (in.isBefore(LocalDate.now())) throw new InvalidReservationException("checkIn cannot be in the past");
        if (out.isAfter(in.plusDays(60))) throw new InvalidReservationException("stay cannot exceed 60 nights");
    }
}
