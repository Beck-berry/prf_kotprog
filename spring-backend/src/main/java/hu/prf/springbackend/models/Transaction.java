package hu.prf.springbackend.models;

import lombok.Getter;
import javax.persistence.*;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @Getter
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int tr_id;

    @Getter
    private int id;

    @Getter
    private String date;

    @Getter
    private int checkout;

    public Transaction(){}

    public Transaction(int tr, int id, String date, int checkout){
        this.tr_id = tr;
        this.id = id;
        this.date = date;
        this.checkout = checkout;
    }

    @Override
    public String toString(){
        return "{ id: " + tr_id + ", kitten id: " + id + ", date: " + date + ", checkout: " + checkout + " }";
    }
}
