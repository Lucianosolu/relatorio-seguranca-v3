/**
 * RELATÓRIO DIGITAL DE SEGURANÇA v3.0
 * Sistema JavaScript com Auto-save, Validação e Navegação
 */

// ========================================
// CONFIGURAÇÕES GLOBAIS
// ========================================
const CONFIG = {
    autoSaveInterval: 120000, // 2 minutos
    inactivitySaveDelay: 30000, // 30 segundos após inatividade
    storageKey: 'relatorioSegurancaV3',
    version: '3.0'
};

// Estado da aplicação
const AppState = {
    currentTab: 0,
    totalTabs: 6,
    lastSaveTime: null,
    hasUnsavedChanges: false,
    inactivityTimer: null,
    autoSaveTimer: null
};

// Armazenamento persistente (localStorage + memória)
window.dadosRelatorioSeguranca = {
    version: CONFIG.version,
    data: {},
    timestamp: null
};

// Verificar suporte a localStorage
const hasLocalStorage = (function() {
    try {
        const test = '__storage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
})();

// ========================================
// INICIALIZAÇÃO
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🛡️ Relatório Digital de Segurança v3.0 - Inicializando...');
    
    inicializarFormulario();
    configurarEventListeners();
    inicializarAutoSave();
    carregarDadosSalvos();
    atualizarProgresso();
    
    console.log('✅ Sistema carregado com sucesso!');
    console.log('💡 Atalhos: Ctrl+S (Salvar) | Ctrl+P (PDF)');
});

// ========================================
// INICIALIZAÇÃO DO FORMULÁRIO
// ========================================
function inicializarFormulario() {
    // Preencher data atual
    const dataInput = document.getElementById('dataRelatorio');
    if (dataInput) {
        const hoje = new Date();
        dataInput.valueAsDate = hoje;
        atualizarDiaSemana(hoje);
    }
    
    // Configurar navegação de abas
    configurarAbas();
    
    // Configurar auto-cálculo do dia da semana
    if (dataInput) {
        dataInput.addEventListener('change', function() {
            const data = new Date(this.value + 'T00:00:00');
            atualizarDiaSemana(data);
        });
    }
}

// ========================================
// SISTEMA DE ABAS
// ========================================
function configurarAbas() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            mudarAba(index);
        });
    });
    
    // Botões de navegação
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    
    if (btnPrev) {
        btnPrev.addEventListener('click', () => navegarAba(-1));
    }
    
    if (btnNext) {
        btnNext.addEventListener('click', () => navegarAba(1));
    }
    
    atualizarBotoesNavegacao();
}

function mudarAba(index) {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Remover classe active de todos
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Adicionar classe active ao selecionado
    if (tabButtons[index]) {
        tabButtons[index].classList.add('active');
    }
    if (tabContents[index]) {
        tabContents[index].classList.add('active');
    }
    
    AppState.currentTab = index;
    atualizarBotoesNavegacao();
    
    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navegarAba(direcao) {
    const novaAba = AppState.currentTab + direcao;
    if (novaAba >= 0 && novaAba < AppState.totalTabs) {
        mudarAba(novaAba);
    }
}

function atualizarBotoesNavegacao() {
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    
    if (btnPrev) {
        btnPrev.disabled = AppState.currentTab === 0;
    }
    
    if (btnNext) {
        btnNext.disabled = AppState.currentTab === AppState.totalTabs - 1;
        btnNext.textContent = AppState.currentTab === AppState.totalTabs - 1 ? 'Finalizar' : 'Próxima →';
    }
}

// ========================================
// AUTO-CÁLCULO DO DIA DA SEMANA
// ========================================
function atualizarDiaSemana(data) {
    const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const diaSemanaInput = document.getElementById('diaSemana');
    
    if (diaSemanaInput && data) {
        diaSemanaInput.value = diasSemana[data.getDay()];
    }
}

// ========================================
// SISTEMA DE AUTO-SAVE
// ========================================
function inicializarAutoSave() {
    // Auto-save periódico (a cada 2 minutos)
    AppState.autoSaveTimer = setInterval(() => {
        if (AppState.hasUnsavedChanges) {
            salvarAutomaticamente();
        }
    }, CONFIG.autoSaveInterval);
    
    // Detectar mudanças no formulário
    const form = document.getElementById('relatorioForm');
    if (form) {
        form.addEventListener('input', () => {
            AppState.hasUnsavedChanges = true;
            resetarTimerInatividade();
        });
        
        form.addEventListener('change', () => {
            AppState.hasUnsavedChanges = true;
            resetarTimerInatividade();
            atualizarProgresso();
        });
    }
}

function resetarTimerInatividade() {
    // Limpar timer anterior
    if (AppState.inactivityTimer) {
        clearTimeout(AppState.inactivityTimer);
    }
    
    // Criar novo timer (salva após 30s de inatividade)
    AppState.inactivityTimer = setTimeout(() => {
        if (AppState.hasUnsavedChanges) {
            salvarAutomaticamente();
        }
    }, CONFIG.inactivitySaveDelay);
}

function salvarAutomaticamente() {
    mostrarIndicadorSalvamento('saving');
    
    setTimeout(() => {
        salvarDados(true);
        mostrarIndicadorSalvamento('saved');
        
        setTimeout(() => {
            mostrarIndicadorSalvamento('ready');
        }, 2000);
    }, 500);
}

function mostrarIndicadorSalvamento(status) {
    const indicator = document.getElementById('autoSaveIndicator');
    const statusText = document.getElementById('saveStatus');
    
    if (!indicator || !statusText) return;
    
    indicator.className = 'auto-save-indicator';
    
    switch(status) {
        case 'saving':
            indicator.classList.add('saving');
            statusText.textContent = 'Salvando...';
            break;
        case 'saved':
            indicator.classList.add('saved');
            statusText.textContent = 'Salvo com sucesso!';
            AppState.lastSaveTime = new Date();
            break;
        case 'ready':
            statusText.textContent = 'Pronto para salvar';
            break;
    }
}

// ========================================
// SALVAR E CARREGAR DADOS
// ========================================
function salvarDados(autoSave = false) {
    const form = document.getElementById('relatorioForm');
    if (!form) return false;
    
    const dados = {};
    const formData = new FormData(form);
    
    // Coletar todos os campos
    for (let [key, value] of formData.entries()) {
        dados[key] = value;
    }
    
    // Coletar checkboxes não marcados
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
        dados[cb.name || cb.id] = cb.checked;
    });
    
    // Criar objeto de salvamento
    const dadosSalvamento = {
        version: CONFIG.version,
        data: dados,
        timestamp: new Date().toISOString()
    };
    
    // Salvar em memória
    window.dadosRelatorioSeguranca = dadosSalvamento;
    
    // Salvar em localStorage se disponível
    if (hasLocalStorage) {
        try {
            localStorage.setItem(CONFIG.storageKey, JSON.stringify(dadosSalvamento));
            console.log('💾 Dados salvos em localStorage');
        } catch(e) {
            console.warn('⚠️ Erro ao salvar em localStorage:', e.message);
        }
    }
    
    AppState.hasUnsavedChanges = false;
    
    if (!autoSave) {
        alert('✅ Relatório salvo com sucesso!\n\n' + 
              'Data/Hora: ' + new Date().toLocaleString('pt-AO') + '\n\n' +
              'Dados salvos localmente e persistirão entre sessões.\n\n' +
              'Use o botão "Gerar PDF" para exportar o relatório.');
    }
    
    console.log('💾 Dados salvos:', dadosSalvamento);
    return true;
}

function carregarDadosSalvos() {
    let dadosCarregados = null;
    
    // Tentar carregar do localStorage primeiro
    if (hasLocalStorage) {
        try {
            const dadosString = localStorage.getItem(CONFIG.storageKey);
            if (dadosString) {
                dadosCarregados = JSON.parse(dadosString);
                window.dadosRelatorioSeguranca = dadosCarregados;
                console.log('📥 Dados carregados do localStorage');
            }
        } catch(e) {
            console.warn('⚠️ Erro ao carregar do localStorage:', e.message);
        }
    }
    
    // Se não encontrou no localStorage, usar memória
    if (!dadosCarregados && window.dadosRelatorioSeguranca && window.dadosRelatorioSeguranca.data) {
        dadosCarregados = window.dadosRelatorioSeguranca;
        console.log('📥 Dados carregados da memória');
    }
    
    // Se não há dados, sair
    if (!dadosCarregados || !dadosCarregados.data) {
        console.log('ℹ️ Nenhum dado salvo encontrado');
        return;
    }
    
    const dados = dadosCarregados.data;
    const form = document.getElementById('relatorioForm');
    if (!form) return;
    
    // Restaurar valores
    Object.keys(dados).forEach(key => {
        const element = form.elements[key];
        if (!element) return;
        
        if (element.type === 'checkbox') {
            element.checked = dados[key];
        } else if (element.type === 'radio') {
            const radio = form.querySelector(`input[name="${key}"][value="${dados[key]}"]`);
            if (radio) radio.checked = true;
        } else {
            element.value = dados[key];
        }
    });
    
    atualizarProgresso();
    
    // Mostrar mensagem de dados restaurados
    const timestamp = new Date(dadosCarregados.timestamp);
    console.log(`✅ Dados restaurados de ${timestamp.toLocaleString('pt-AO')}`);
}

// ========================================
// CÁLCULO DE PROGRESSO
// ========================================
function atualizarProgresso() {
    const form = document.getElementById('relatorioForm');
    if (!form) return;
    
    const camposObrigatorios = form.querySelectorAll('[required]');
    const totalCampos = camposObrigatorios.length;
    let camposPreenchidos = 0;
    
    camposObrigatorios.forEach(campo => {
        if (campo.type === 'radio') {
            const grupo = form.querySelectorAll(`input[name="${campo.name}"]`);
            const algumMarcado = Array.from(grupo).some(r => r.checked);
            if (algumMarcado) camposPreenchidos++;
        } else if (campo.value.trim() !== '') {
            camposPreenchidos++;
        }
    });
    
    const progresso = totalCampos > 0 ? Math.round((camposPreenchidos / totalCampos) * 100) : 0;
    
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    if (progressBar) {
        progressBar.style.width = progresso + '%';
    }
    
    if (progressText) {
        progressText.textContent = progresso + '%';
    }
}

// ========================================
// GERAR PDF
// ========================================
function gerarPDF() {
    const form = document.getElementById('relatorioForm');
    if (!form) return;
    
    // Validar campos obrigatórios
    const camposObrigatorios = form.querySelectorAll('[required]');
    const camposVazios = [];
    
    camposObrigatorios.forEach(campo => {
        if (campo.type === 'radio') {
            const grupo = form.querySelectorAll(`input[name="${campo.name}"]`);
            const algumMarcado = Array.from(grupo).some(r => r.checked);
            if (!algumMarcado) {
                const label = form.querySelector(`label[for="${campo.id}"]`) || 
                             campo.closest('.form-group')?.querySelector('label');
                if (label) camposVazios.push(label.textContent.replace('*', '').trim());
            }
        } else if (!campo.value.trim()) {
            const label = form.querySelector(`label[for="${campo.id}"]`) || 
                         campo.closest('.form-group')?.querySelector('label');
            if (label) camposVazios.push(label.textContent.replace('*', '').trim());
        }
    });
    
    // Se houver campos vazios, avisar
    if (camposVazios.length > 0) {
        const mensagem = `⚠️ Campos obrigatórios não preenchidos:\n\n${camposVazios.slice(0, 5).join('\n')}` +
                        (camposVazios.length > 5 ? `\n\n... e mais ${camposVazios.length - 5} campos` : '') +
                        '\n\nDeseja continuar mesmo assim?';
        
        if (!confirm(mensagem)) {
            return;
        }
    }
    
    // Salvar antes de imprimir
    salvarDados(true);
    
    // Preparar para impressão
    alert('📄 Preparando PDF para impressão...\n\n' +
          'Dica: Na janela de impressão, selecione "Salvar como PDF" como destino.');
    
    // Mostrar todas as abas para impressão (CSS @media print já faz isso)
    // Apenas acionar impressão
    window.print();
}

// ========================================
// LIMPAR FORMULÁRIO
// ========================================
function limparFormulario() {
    if (!confirm('⚠️ Tem certeza que deseja limpar todo o formulário?\n\nEsta ação não pode ser desfeita e apagará todos os dados salvos.')) {
        return;
    }
    
    const form = document.getElementById('relatorioForm');
    if (!form) return;
    
    // Limpar todos os campos
    form.reset();
    
    // Resetar data para hoje
    const dataInput = document.getElementById('dataRelatorio');
    if (dataInput) {
        dataInput.valueAsDate = new Date();
        atualizarDiaSemana(new Date());
    }
    
    // Limpar dados salvos em memória
    window.dadosRelatorioSeguranca = {
        version: CONFIG.version,
        data: {},
        timestamp: null
    };
    
    // Limpar localStorage
    if (hasLocalStorage) {
        try {
            localStorage.removeItem(CONFIG.storageKey);
            console.log('🗑️ Dados removidos do localStorage');
        } catch(e) {
            console.warn('⚠️ Erro ao limpar localStorage:', e.message);
        }
    }
    
    AppState.hasUnsavedChanges = false;
    atualizarProgresso();
    
    alert('✅ Formulário limpo com sucesso!\n\nTodos os dados foram apagados.');
}

// ========================================
// EVENT LISTENERS
// ========================================
function configurarEventListeners() {
    // Botão Salvar
    const btnSave = document.getElementById('btnSave');
    if (btnSave) {
        btnSave.addEventListener('click', () => salvarDados(false));
    }
    
    // Botão Imprimir PDF
    const btnPrint = document.getElementById('btnPrint');
    if (btnPrint) {
        btnPrint.addEventListener('click', gerarPDF);
    }
    
    // Botão Limpar
    const btnClear = document.getElementById('btnClear');
    if (btnClear) {
        btnClear.addEventListener('click', limparFormulario);
    }
    
    // Atalhos de teclado
    document.addEventListener('keydown', function(e) {
        // Ctrl+S para salvar
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            salvarDados(false);
        }
        
        // Ctrl+P para PDF
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            gerarPDF();
        }
    });
    
    // Avisar antes de sair se houver dados não salvos
    window.addEventListener('beforeunload', function(e) {
        if (AppState.hasUnsavedChanges) {
            e.preventDefault();
            e.returnValue = 'Você tem alterações não salvas. Deseja realmente sair?';
            return e.returnValue;
        }
    });
    
    // Configurar seletores de severidade
    configurarSeletoresSeveridade();
}

// ========================================
// SELETORES DE SEVERIDADE
// ========================================
function configurarSeletoresSeveridade() {
    const radioBadges = document.querySelectorAll('.radio-badge');
    
    radioBadges.forEach(badge => {
        badge.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                
                // Remover seleção visual de outros badges do mesmo grupo
                const grupo = document.querySelectorAll(`input[name="${radio.name}"]`);
                grupo.forEach(r => {
                    const parentBadge = r.closest('.radio-badge');
                    if (parentBadge) {
                        const badgeSpan = parentBadge.querySelector('.badge');
                        if (badgeSpan) {
                            badgeSpan.style.transform = '';
                            badgeSpan.style.borderColor = 'transparent';
                        }
                    }
                });
                
                // Adicionar seleção visual ao badge clicado
                const badgeSpan = this.querySelector('.badge');
                if (badgeSpan) {
                    badgeSpan.style.transform = 'scale(1.1)';
                    badgeSpan.style.borderColor = '#333';
                }
                
                AppState.hasUnsavedChanges = true;
                atualizarProgresso();
            }
        });
    });
}

// ========================================
// UTILITÁRIOS
// ========================================
function formatarData(data) {
    if (!data) return '';
    const d = new Date(data);
    return d.toLocaleDateString('pt-AO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function formatarHora(hora) {
    if (!hora) return '';
    return hora;
}

// ========================================
// CLEANUP
// ========================================
window.addEventListener('unload', function() {
    // Limpar timers
    if (AppState.autoSaveTimer) {
        clearInterval(AppState.autoSaveTimer);
    }
    if (AppState.inactivityTimer) {
        clearTimeout(AppState.inactivityTimer);
    }
});

// ========================================
// EXPORTAR FUNÇÕES GLOBAIS
// ========================================
window.RelatorioSeguranca = {
    salvar: () => salvarDados(false),
    gerarPDF: gerarPDF,
    limpar: limparFormulario,
    progresso: atualizarProgresso,
    versao: CONFIG.version
};

console.log('📦 Módulo RelatorioSeguranca carregado');
