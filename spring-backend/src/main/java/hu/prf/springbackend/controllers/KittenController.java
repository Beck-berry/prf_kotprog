package hu.prf.springbackend.controllers;

import hu.prf.springbackend.models.Kitten;
import hu.prf.springbackend.models.Transaction;
import hu.prf.springbackend.services.kittenService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@CrossOrigin(origins = "*")
public class KittenController {

    KittenService kittenService;

    public KittenController(KittenService kittenService){
        this.kittenService = kittenService;
    }

    @PostMapping(path="/addKitten", consumes = "application/json")
    public String addKitten(@RequestBody Kitten kitten) {
        try {
            this.kittenService.addKitten(kitten);
            return "Cica sikeresen hozzáadva.";
        } catch (Exception e) {
            System.out.println(e);
            return "Error";
        }
    }

    @GetMapping("/listKittens")
    public String listKittens() {
        return String.format(kittenService.listKittens().toString());
    }

}
