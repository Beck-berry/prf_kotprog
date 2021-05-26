package hu.prf.springbackend.services;

import hu.prf.springbackend.models.Transaction;
import hu.prf.springbackend.models.TransactionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TransactionService {

    private TransactionRepo transactionRepository;

    @Autowired
    public TransactionService(TransactionRepo transactionRepository){
        this.transactionRepository = transactionRepository;
    }

    public void addTransaction(Transaction transaction){
        this.transactionRepository.save(transaction);
    }

    public List<Transaction> listTransactions(){
        return this.transactionRepository.findAll();
    }

}
