package org.ch7techno.reservations.service;

import org.ch7techno.reservations.exception.InvalidReservationException;
import org.ch7techno.reservations.exception.ReservationNotFoundException;
import org.ch7techno.reservations.model.Reservation;
import org.ch7techno.reservations.model.ReservationStatus;
import org.ch7techno.reservations.repository.InMemoryReservationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class ReservationServiceTest {

    private ReservationService service;

    @BeforeEach
    void setUp() {
        service = new ReservationService(new InMemoryReservationRepository());
    }

    @Test
    void create_ok_setsCreated() {
        var r = new Reservation("r1", "Teresa", "H001",
                LocalDate.now().plusDays(2), LocalDate.now().plusDays(5));
        var saved = service.create(r);
        assertEquals(ReservationStatus.CREATED, saved.getStatus());
        assertEquals("r1", service.get("r1").getId());
    }

    @Test
    void create_fails_whenPastCheckIn() {
        var in = LocalDate.now().minusDays(1);
        var out = LocalDate.now().plusDays(1);
        var r = new Reservation("r2", "Karen", "H002", in, out);
        assertThrows(InvalidReservationException.class, () -> service.create(r));
    }

    @Test
    void create_fails_whenOutBeforeIn() {
        var in = LocalDate.now().plusDays(5);
        var out = LocalDate.now().plusDays(3);
        var r = new Reservation("r3", "Karen", "H002", in, out);
        assertThrows(InvalidReservationException.class, () -> service.create(r));
    }

    @Test
    void create_fails_whenStayExceeds60Nights() {
        var in = LocalDate.now().plusDays(1);
        var out = in.plusDays(61);
        var r = new Reservation("r4", "Teresa", "H001", in, out);
        assertThrows(InvalidReservationException.class, () -> service.create(r));
    }

    @Test
    void editDates_ok_changesStatusToEdited() {
        var r = new Reservation("r5", "Teresa", "H001",
                LocalDate.now().plusDays(4), LocalDate.now().plusDays(6));
        service.create(r);
        var edited = service.editDates("r5",
                LocalDate.now().plusDays(7), LocalDate.now().plusDays(9));
        assertEquals(ReservationStatus.EDITED, edited.getStatus());
        assertEquals(LocalDate.now().plusDays(7), edited.getCheckIn());
    }

    @Test
    void editDates_fails_whenNotFound() {
        assertThrows(ReservationNotFoundException.class, () ->
                service.editDates("nope", LocalDate.now().plusDays(1), LocalDate.now().plusDays(2)));
    }

    @Test
    void cancel_ok_idempotent() {
        var r = new Reservation("r6", "Karen", "H010",
                LocalDate.now().plusDays(2), LocalDate.now().plusDays(4));
        service.create(r);
        service.cancel("r6");
        assertEquals(ReservationStatus.CANCELED, service.get("r6").getStatus());
        service.cancel("r6");
        assertEquals(ReservationStatus.CANCELED, service.get("r6").getStatus());
    }

    @Test
    void get_fails_whenNotFound() {
        assertThrows(ReservationNotFoundException.class, () -> service.get("unknown"));
    }
}
