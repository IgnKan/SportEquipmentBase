package ru.vsu.cs.sportbox.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import ru.vsu.cs.sportbox.data.model.Booking;

@EnableJpaRepositories
@Repository
public interface BookingRepository extends JpaRepository<Booking,Integer>, JpaSpecificationExecutor<Booking> {
    void removeBookingById(int id);
    Booking findById(int id);
}
