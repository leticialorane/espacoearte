/**
 * servicos.js — Espaço & Arte
 */

const SERVICOS = [
  {
    id: 1,
    nome: "Assessoria em Obras",
    descricao: "Acompanhamento completo de obras residenciais e comerciais, desde o planejamento até a entrega final.",
    preco: 4500,
    categoria: "obras",
    status: "ativo"
  },
  {
    id: 2,
    nome: "Móveis Planejados",
    descricao: "Projeto e execução de móveis planejados sob medida.",
    preco: 8200,
    categoria: "moveis",
    status: "ativo"
  },
  {
    id: 3,
    nome: "Projeto de Quarto",
    descricao: "Projeto completo com layout, cores e mobiliário.",
    preco: 2800,
    categoria: "projetos",
    status: "ativo"
  },
  {
    id: 4,
    nome: "Projeto de Banheiro",
    descricao: "Projetos funcionais e personalizados.",
    preco: 1900,
    categoria: "projetos",
    status: "ativo"
  },
  {
    id: 5,
    nome: "Consultoria de Decoração",
    descricao: "Orientação de cores, objetos e composição do ambiente.",
    preco: 650,
    categoria: "consultoria",
    status: "ativo"
  }
];


let todosServicos = [...SERVICOS];
let proximoId = 6;
let idExcluir = null;



document.addEventListener("DOMContentLoaded", () => {

  iniciarEventos();

  renderizarCards(todosServicos);

  atualizarContagem(todosServicos.length);

});





function iniciarEventos(){


  const eventos = [

    ["btn-novo-servico","click",abrirNovo],

    ["btn-fechar-modal","click",fecharModal],

    ["btn-cancelar","click",fecharModal],

    ["btn-fechar-modal-excluir","click",fecharExcluir],

    ["btn-cancelar-excluir","click",fecharExcluir],

    ["btn-confirmar-excluir","click",confirmarExcluir],

    ["input-busca","input",filtrar],

    ["filtro-categoria","change",filtrar],

    ["filtro-status","change",filtrar]

  ];



  eventos.forEach(e=>{

    const el=document.getElementById(e[0]);

    if(el){

      el.addEventListener(e[1],e[2]);

    }

  });



  const form=document.getElementById("form-servico");

  if(form){

    form.addEventListener("submit",salvar);

  }


}






function filtrar(){


 const texto =
 document.getElementById("input-busca").value.toLowerCase();


 const categoria =
 document.getElementById("filtro-categoria").value;


 const status =
 document.getElementById("filtro-status").value;



 const resultado =
 todosServicos.filter(s=>{


 return (

 s.nome.toLowerCase().includes(texto)

 &&

 (!categoria || s.categoria===categoria)

 &&

 (!status || s.status===status)

 );


 });



 renderizarCards(resultado);

 atualizarContagem(resultado.length);


}






function renderizarCards(lista){


 const grid=document.getElementById("servicos-grid");

 const vazio=document.getElementById("servicos-vazio");


 if(!grid) return;



 if(lista.length===0){


   grid.innerHTML="";

   if(vazio)

   vazio.style.display="flex";


   return;


 }



 if(vazio)

 vazio.style.display="none";



 grid.innerHTML = lista.map(criarCard).join("");



 lista.forEach(s=>{


 const editar=document.getElementById(`editar-${s.id}`);

 const excluir=document.getElementById(`excluir-${s.id}`);



 if(editar)

 editar.onclick=()=>editarServico(s);



 if(excluir)

 excluir.onclick=()=>abrirExcluir(s);



 });



}






function criarCard(s){


return `


<div class="card-servico">


<div class="card-servico-cabecalho">


<span class="card-servico-nome">

${s.nome}

</span>


<span class="card-servico-status 
${s.status==="ativo"?
"card-servico-status--ativo":
"card-servico-status--inativo"}">

${s.status}

</span>


</div>



<p class="card-servico-descricao">

${s.descricao}

</p>



<div class="card-servico-rodape">


<span class="card-servico-categoria">

${s.categoria}

</span>


<span class="card-servico-preco">

${s.preco.toLocaleString("pt-BR",
{
style:"currency",
currency:"BRL"
})}

</span>


</div>



<div class="card-servico-acoes">


<button id="editar-${s.id}" class="card-servico-btn-editar">

<i class="ti ti-pencil"></i>
Editar

</button>



<button id="excluir-${s.id}" class="card-servico-btn-excluir">

<i class="ti ti-trash"></i>
Excluir

</button>


</div>


</div>


`;


}






function atualizarContagem(total){


const texto=document.getElementById("texto-contagem");


if(texto)

texto.textContent =
`${total} serviço${total!=1?"s":""} encontrado${total!=1?"s":""}`;


}







function abrirNovo(){


limparFormulario();


document.getElementById("modal-servico").style.display="flex";


}





function editarServico(s){


document.getElementById("campo-id").value=s.id;

document.getElementById("campo-nome").value=s.nome;

document.getElementById("campo-descricao").value=s.descricao;

document.getElementById("campo-preco").value=s.preco;

document.getElementById("campo-categoria").value=s.categoria;

document.getElementById("campo-status").checked =
s.status==="ativo";


document.getElementById("modal-servico").style.display="flex";


}







function salvar(e){


e.preventDefault();



const id=document.getElementById("campo-id").value;



const novo={


nome:
document.getElementById("campo-nome").value,


descricao:
document.getElementById("campo-descricao").value,


preco:
Number(document.getElementById("campo-preco").value),


categoria:
document.getElementById("campo-categoria").value,


status:
document.getElementById("campo-status").checked
?"ativo"
:"inativo"


};




if(id){


const index=todosServicos.findIndex(s=>s.id==id);


todosServicos[index]={
id:Number(id),
...novo
};


}else{


novo.id=proximoId++;

todosServicos.push(novo);


}



fecharModal();

renderizarCards(todosServicos);

atualizarContagem(todosServicos.length);


}







function abrirExcluir(s){


idExcluir=s.id;


document.getElementById("nome-servico-excluir").textContent=s.nome;


document.getElementById("modal-excluir").style.display="flex";


}






function confirmarExcluir(){


todosServicos =
todosServicos.filter(s=>s.id!==idExcluir);


fecharExcluir();


renderizarCards(todosServicos);


}






function fecharModal(){

const modal=document.getElementById("modal-servico");

if(modal)

modal.style.display="none";


}




function fecharExcluir(){


const modal=document.getElementById("modal-excluir");


if(modal)

modal.style.display="none";


idExcluir=null;


}






function limparFormulario(){


const campos=[

"campo-id",

"campo-nome",

"campo-descricao",

"campo-preco",

"campo-categoria"

];


campos.forEach(id=>{

const el=document.getElementById(id);

if(el)

el.value="";

});



const status=document.getElementById("campo-status");


if(status)

status.checked=true;


}