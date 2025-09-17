// repository/PingRepository.java
package com.autofuellanka.systemmanager.repository;

import com.autofuellanka.systemmanager.model.Ping;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PingRepository extends JpaRepository<Ping, Long> {}
