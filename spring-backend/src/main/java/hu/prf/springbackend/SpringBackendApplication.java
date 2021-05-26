package hu.prf.springbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@RestController
public class SpringBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringBackendApplication.class, args);
    }

    @GetMapping("/")
    public String hello(@RequestParam(value = "name", defaultValue = "a spring backenden") String name) {
        return String.format("<h2>Hali %s!</h2><br><a href='/listTransaction'>Tranzakciók listázása</a><br><br><a href='/listKittens'>Cicák listázása</a>", name);
    }

}
