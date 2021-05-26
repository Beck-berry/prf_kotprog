package hu.prf.springbackend.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "kittens")
public class Kitten {

    @Id
    @Getter
    private int id;

    @Getter
    private int price;

    public Kitten(){}

    public Kitten(int id, int price){
        this.id = id;
        this.price = price;
    }

    @Override
    public String toString(){
        return "{ id: " + id + ", price: " + price + " }";
    }
}
