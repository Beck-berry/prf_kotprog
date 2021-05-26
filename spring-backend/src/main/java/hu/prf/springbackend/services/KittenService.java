package hu.prf.springbackend.services;

import hu.prf.springbackend.models.Kitten;
import hu.prf.springbackend.models.KittenRepo;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class KittenService {

    private KittenRepo kittenRepo;

    public KittenService(KittenRepo kittenRepo){
        this.kittenRepo = kittenRepo;
    }

    public void addKitten(Kitten kitten){
        if(!this.kittenRepo.existsById(kitten.getId())){
            this.kittenRepo.save(kitten);
        }
    }

    public List<Kitten> listKittens(){
        return this.kittenRepo.findAll();
    }
}
