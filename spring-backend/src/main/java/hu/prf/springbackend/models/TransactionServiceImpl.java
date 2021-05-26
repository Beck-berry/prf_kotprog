package hu.prf.springbackend.models;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {

    private TransactionRepo transactionRepository;

    @Autowired
    public TransactionServiceImpl(TransactionRepo transactionRepository){
        this.transactionRepository = transactionRepository;
    }

    public void addTransaction(Transaction transaction){
        this.transactionRepository.save(transaction);
    }

    public List<Transaction> listTransactions(){
        return this.transactionRepository.findAll();
    }

}
