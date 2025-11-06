package org.ch7techno.reservations.model;

import java.time.LocalDate;
import java.util.Objects;

public class Reservation {
    private final String id;
    private String guestName;
    private String hotelId;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private ReservationStatus status;

    public Reservation(String id, String guestName, String hotelId, LocalDate checkIn, LocalDate checkOut) {
        this.id = Objects.requireNonNull(id, "id required");
        this.guestName = Objects.requireNonNull(guestName, "guest required");
        this.hotelId = Objects.requireNonNull(hotelId, "hotelId required");
        this.checkIn = Objects.requireNonNull(checkIn, "checkIn required");
        this.checkOut = Objects.requireNonNull(checkOut, "checkOut required");
        // reglas de negocio SOLO en ReservationService
        this.status = ReservationStatus.CREATED;
    }

    public String getId() { return id; }
    public String getGuestName() { return guestName; }
    public String getHotelId() { return hotelId; }
    public LocalDate getCheckIn() { return checkIn; }
    public LocalDate getCheckOut() { return checkOut; }
    public ReservationStatus getStatus() { return status; }

    public void setGuestName(String guestName) { this.guestName = Objects.requireNonNull(guestName); }
    public void setHotelId(String hotelId) { this.hotelId = Objects.requireNonNull(hotelId); }

    public void setDates(LocalDate checkIn, LocalDate checkOut) {
        if (checkIn == null || checkOut == null || !checkOut.isAfter(checkIn)) {
            throw new IllegalArgumentException("invalid dates");
        }
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.status = ReservationStatus.EDITED;
    }

    public void confirm() { this.status = ReservationStatus.CONFIRMED; }
    public void cancel() { this.status = ReservationStatus.CANCELED; }
}
