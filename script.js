const servicos = [
    { nome: "Hidratação", preco: "R$ 80,00", desc: "Tratamento profundo." },
    { nome: "Corte Feminino", preco: "R$ 120,00", desc: "Design moderno." },
    { nome: "Manicure", preco: "R$ 50,00", desc: "Cuidado completo." }
];

const horarios = ["08:00", "09:00", "10:00", "11:00", "13:30", "14:30", "15:30", "16:30"];

function renderizarServicos() {
    const container = document.getElementById('container-servicos');
    servicos.forEach((servico, index) => {
        let options = horarios.map(h => `<option value="${h}">${h}</option>`).join('');
        container.innerHTML += `
            <div class="card">
                <h3>${servico.nome}</h3>
                <p>${servico.desc}</p>
                <span class="preco">${servico.preco}</span>
                <select id="horario-${index}"><option value="">Selecione</option>${options}</select>
                <button onclick="agendar(${index})">Agendar no WhatsApp</button>
            </div>
        `;
    });
}

function agendar(index) {
    const servico = servicos[index];
    const horario = document.getElementById(`horario-${index}`).value;
    if (!horario) return alert("Selecione um horário!");

    // Salva no LocalStorage
    const agendamento = `${servico.nome} às ${horario}`;
    let lista = JSON.parse(localStorage.getItem('agendamentos')) || [];
    lista.push(agendamento);
    localStorage.setItem('agendamentos', JSON.stringify(lista));

    exibirAgendamentos();

    const msg = `Olá! Gostaria de agendar ${servico.nome} às ${horario}.`;
    window.open(`https://wa.me/5548996732704?text=${encodeURIComponent(msg)}`, '_blank');
}

function exibirAgendamentos() {
    const listaUI = document.getElementById('lista-agendamentos');
    const lista = JSON.parse(localStorage.getItem('agendamentos')) || [];
    
    listaUI.innerHTML = lista.map((item, index) => `
        <li>
            ✅ ${item} 
            <button onclick="removerAgendamento(${index})" class="botao-excluir">X</button>
        </li>
    `).join('');
}

function removerAgendamento(index) {
    // Pede uma senha antes de apagar
    const senha = prompt("Digite a senha do administrador para excluir:");
    
    if (senha === "depaula") {
        let lista = JSON.parse(localStorage.getItem('agendamentos')) || [];
        lista.splice(index, 1);
        localStorage.setItem('agendamentos', JSON.stringify(lista));
        exibirAgendamentos();
    } else {
        alert("Senha incorreta! Você não tem permissão.");
    }
}



document.addEventListener('DOMContentLoaded', () => {
    exibirAgendamentos();
});


function toggleAgenda() {
    const agenda = document.getElementById('agenda-publica');
    // Se a classe oculta existir, removemos; se não existir, adicionamos
    agenda.classList.toggle('oculta');
}


renderizarServicos();
