package com.repository;

import com.model.ReportDamage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportDamageRepository extends JpaRepository<ReportDamage, Long> {
}