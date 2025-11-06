package org.ch7techno.reservations.service;

import org.ch7techno.reservations.exception.InvalidReservationException;
import org.ch7techno.reservations.exception.ReservationNotFoundException;
import org.ch7techno.reservations.model.Reservation;
import org.ch7techno.reservations.model.ReservationStatus;
import org.ch7techno.reservations.repository.ReservationRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

public class ReservationService {
    private final ReservationRepository repository;

    public ReservationService(ReservationRepository repository) {
        this.repository = Objects.requireNonNull(repository);
    }

    public Reservation create(Reservation reservation) {
        validateBusinessRules(reservation.getCheckIn(), reservation.getCheckOut());
        repository.save(reservation);
        return reservation;
    }

    public Reservation editDates(String id, LocalDate newCheckIn, LocalDate newCheckOut) {
        Reservation r = repository.findById(id).orElseThrow(() -> new ReservationNotFoundException(id));
        validateBusinessRules(newCheckIn, newCheckOut);
        r.setDates(newCheckIn, newCheckOut);
        repository.save(r);
        return r;
    }

    public void cancel(String id) {
        Reservation r = repository.findById(id).orElseThrow(() -> new ReservationNotFoundException(id));
        if (r.getStatus() == ReservationStatus.CANCELED) return; // idempotente
        r.cancel();
        repository.save(r);
    }

    public Reservation get(String id) {
        return repository.findById(id).orElseThrow(() -> new ReservationNotFoundException(id));
    }

    public List<Reservation> byHotel(String hotelId) { return repository.findByHotel(hotelId); }

    private void validateBusinessRules(LocalDate in, LocalDate out) {
        if (in == null || out == null) throw new InvalidReservationException("Dates are required");
        if (!out.isAfter(in)) throw new InvalidReservationException("checkOut must be after checkIn");
        if (in.isBefore(LocalDate.now())) throw new InvalidReservationException("checkIn cannot be in the past");
        if (out.isAfter(in.plusDays(60))) throw new InvalidReservationException("stay cannot exceed 60 nights");
    }
}
