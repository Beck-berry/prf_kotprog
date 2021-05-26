package hu.prf.springbackend.models;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class KittenServiceImpl implements KittenService {

    private KittenRepo kittenRepo;

    @Autowired
    public KittenServiceImpl(KittenRepo kittenRepo){
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
