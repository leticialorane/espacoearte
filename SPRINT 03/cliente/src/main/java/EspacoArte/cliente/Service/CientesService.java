package EspacoArte.cliente.Service;

import EspacoArte.cliente.Repository.ClientesRepository;
import org.springframework.stereotype.Service;

import EspacoArte.cliente.dto.ClienteRequestDTO;
import EspacoArte.cliente.dto.ClienteResponseDTO;
import EspacoArte.cliente.model.Clientes;
import EspacoArte.cliente.Repository.ClientesRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClienteService {

    private final ClienteRepository repository;

    // Injeção via construtor é preferível por promover imutabilidade [4]
    public ClienteService(ClienteRepository repository) {
        this.repository = repository;
    }

    public List<ClienteResponseDTO> findAll() {
        return repository.findAll().stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public ClienteResponseDTO save(ClienteRequestDTO dto) {
        Cliente entity = new Cliente();
        entity.setName(dto.name());
        entity.setCpf(dto.cpf());
        entity.setEmail(dto.email());
        entity.setTelefone(dto.telefone());

        Cliente saved = repository.save(entity);
        return toResponseDTO(saved);
    }

    private ClienteResponseDTO toResponseDTO(Cliente entity) {
        return new ClienteResponseDTO(
                entity.getID(),
                entity.getName(),
                entity.getCPF(),
                entity.getEmail(),
                entity.getTelefone()
        );
    }
}