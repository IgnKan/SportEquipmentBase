package ru.vsu.cs.sportbox.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import ru.vsu.cs.sportbox.data.model.InventoryType;

import java.util.List;

@EnableJpaRepositories
@Repository
public interface InventoryTypeRepository extends JpaRepository<InventoryType,Integer>, JpaSpecificationExecutor<InventoryType> {
    InventoryType findByType(String type);
    InventoryType findById(int id);
    List<InventoryType> findAllByOrderByTypeAsc();
}
