package EspacoArte.cliente.controller.Clientes;

import EspacoArte.cliente.dto.ClienteRequestDTO;
import EspacoArte.cliente.dto.ClienteResponseDTO;
import EspacoArte.cliente.service.ClienteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    private final ClienteService service;

    public ClienteController(ClienteService service) {
        this.service = service;
    }

    @GetMapping
    public List<ClienteResponseDTO> getAll() {
        return service.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED) // Retorna o status 201 Created para novos recursos [4]
    public ClienteResponseDTO create(@RequestBody @Valid ClienteRequestDTO dto) {
        return service.save(dto);
    }
}