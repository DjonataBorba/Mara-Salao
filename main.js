// Dados com status de disponibilidade
const servicos = [
    { 
        nome: "Hidratação", 
        preco: "R$ 80,00", 
        desc: "Tratamento profundo.",
        horarios: [
            { hora: "08:00", ocupado: false },
            { hora: "09:00", ocupado: truw }, // Exemplo de horário já agendado
            { hora: "10:00", ocupado: false }
        ]
    },
    // ... adicione outros serviços seguindo a mesma lógica
];

function renderizarServicos() {
    const container = document.getElementById('container-servicos');
    
    servicos.forEach((servico, sIndex) => {
        // Criamos as opções, mas desabilitamos se estiver ocupado
        let options = servico.horarios.map(h => {
            return h.ocupado 
                ? `<option value="" disabled>${h.hora} (Indisponível)</option>` 
                : `<option value="${h.hora}">${h.hora}</option>`;
        }).join('');
        
        container.innerHTML += `
            <div class="card">
                <h3>${servico.nome}</h3>
                <span class="preco">${servico.preco}</span>
                <select id="horario-${sIndex}">
                    <option value="">Selecione o horário</option>
                    ${options}
                </select>
                <button onclick="agendar(${sIndex})">Agendar</button>
            </div>
        `;
    });
}

renderizarServicos()