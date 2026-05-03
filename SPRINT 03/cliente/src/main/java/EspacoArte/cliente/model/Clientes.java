package EspacoArte.cliente.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "clientes") // Define o nome da tabela no PostgreSQL
@Data
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Ideal para colunas SERIAL no Postgres
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, length = 11)
    private String cpf;

    private String email;
    private String telefone;

    public Cliente() {}
}

