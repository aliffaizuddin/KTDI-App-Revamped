package com.repository;

import com.model.ElectricalAppliance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ElectricalApplianceRepository extends JpaRepository<ElectricalAppliance, Long> {
}