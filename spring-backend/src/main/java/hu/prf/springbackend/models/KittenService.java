package hu.prf.springbackend.models;

import java.util.List;

public interface KittenService {

    void addKitten(Kitten kitten);
    List<Kitten> listKittens();
}
