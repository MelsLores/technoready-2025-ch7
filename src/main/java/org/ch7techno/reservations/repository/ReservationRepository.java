package org.ch7techno.reservations.repository;

import org.ch7techno.reservations.model.Reservation;
import java.util.List;
import java.util.Optional;

public interface ReservationRepository {
    Optional<Reservation> findById(String id);
    void save(Reservation reservation);
    void deleteById(String id);
    List<Reservation> findByHotel(String hotelId);
}
