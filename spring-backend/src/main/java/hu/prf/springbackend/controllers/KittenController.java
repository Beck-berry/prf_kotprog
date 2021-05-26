package hu.prf.springbackend.controllers;

import hu.prf.springbackend.models.Kitten;
import hu.prf.springbackend.models.KittenServiceImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@CrossOrigin(origins = "*")
public class KittenController {

    private KittenServiceImpl kittenServiceImpl;

    public KittenController(KittenServiceImpl kittenServiceImpl){
        this.kittenServiceImpl = kittenServiceImpl;
    }

    @PostMapping(path="/addKitten", consumes = "application/json")
    public String addKitten(@RequestBody Kitten kitten) {
        try {
            this.kittenServiceImpl.addKitten(kitten);
            return "Cica sikeresen hozzáadva.";
        } catch (Exception e) {
            return "Error";
        }
    }

    @GetMapping("/listKittens")
    public String listKittens() {
        return kittenServiceImpl.listKittens().toString();
    }

}
