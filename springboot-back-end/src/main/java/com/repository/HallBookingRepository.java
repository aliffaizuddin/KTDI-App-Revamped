package com.repository;

import com.model.HallBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HallBookingRepository extends JpaRepository<HallBooking, Long> {
}