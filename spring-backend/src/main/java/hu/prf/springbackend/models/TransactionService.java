package hu.prf.springbackend.models;

import java.util.List;

public interface TransactionService {

    void addTransaction(Transaction transaction);
    List<Transaction> listTransactions();
}
