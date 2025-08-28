package com.repository;

import com.model.RoomRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRegistrationRepository extends JpaRepository<RoomRegistration, Long> {
}