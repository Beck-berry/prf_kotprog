package hu.prf.springbackend.models;

import org.springframework.data.jpa.repository.JpaRepository;

public interface KittenRepo extends JpaRepository<Kitten, Integer> {

}
