package hu.prf.springbackend.controllers;

import hu.prf.springbackend.models.Transaction;
import hu.prf.springbackend.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@CrossOrigin(origins = "*")
public class TransactionController {

    TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService){
        this.transactionService = transactionService;
        this.kittenService = kittenService;
    }

    @PostMapping(path="/addTransaction", consumes = "application/json")
    public String addTransaction(@RequestBody Transaction transaction) {
        try {
            this.transactionService.addTransaction(transaction);
            return "Tranzakció sikeres.";
        } catch (Exception e) {
            System.out.println(e);
            return "Error";
        }
    }

    @GetMapping("/listTransactions")
    public String listTransactions() {
        return String.format(transactionService.listTransactions().toString());
    }

}
