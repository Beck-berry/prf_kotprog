package hu.prf.springbackend.controllers;

import hu.prf.springbackend.models.Transaction;
import hu.prf.springbackend.models.TransactionServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@CrossOrigin(origins = "*")
public class TransactionController {

    TransactionServiceImpl transactionServiceImpl;

    @Autowired
    public TransactionController(TransactionServiceImpl transactionServiceImpl){
        this.transactionServiceImpl = transactionServiceImpl;
    }

    @PostMapping(path="/addTransaction", consumes = "application/json")
    public String addTransaction(@RequestBody Transaction transaction) {
        try {
            this.transactionServiceImpl.addTransaction(transaction);
            return "Tranzakció sikeresen hozzáadva.";
        } catch (Exception e) {
            return "Error";
        }
    }

    @GetMapping("/listTransactions")
    public String listTransactions() {
        return transactionServiceImpl.listTransactions().toString();
    }

}
