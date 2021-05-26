package hu.prf.springbackend.models;

import org.springframework.data.jpa.repository.JpaRepository;
import hu.prf.springbackend.models.Kitten;

public interface KittenRepo extends JpaRepository<Kitten, Integer> {

}
