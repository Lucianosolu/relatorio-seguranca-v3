/* ========================================
   DASHBOARD SCRIPT - RELATÓRIO v3.0
   Lógica para Dashboard de KPIs
   ======================================== */

// CONFIGURAÇÕES
const CONFIG = {
    storageKey: 'relatorioSegurancaV3',
    chartColors: {
        primary: '#2c3e50',
        secondary: '#34495e',
        accent: '#3498db',
        success: '#27ae60',
        warning: '#f39c12',
        danger: '#c0392b',
        info: '#3498db'
    }
};

// VARIÁVEIS GLOBAIS
let charts = {};
let relatorios = [];
let filtrosAtivos = {};

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', function() {
    carregarRelatorios();
    inicializarEventos();
    atualizarDashboard();
    atualizarHora();
    setInterval(atualizarHora, 60000);
});

// CARREGAR RELATÓRIOS DO LOCALSTORAGE
function carregarRelatorios() {
    try {
        const dados = localStorage.getItem(CONFIG.storageKey);
        if (dados) {
            const parsed = JSON.parse(dados);
            relatorios = parsed.relatorios || [];
        }
    } catch (error) {
        console.error('Erro ao carregar relatórios:', error);
        relatorios = [];
    }
}

// INICIALIZAR EVENTOS
function inicializarEventos() {
    // Navegação entre views
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.dataset.view;
            mudarView(view);
        });
    });

    // Filtros
    document.getElementById('filterPeriod').addEventListener('change', aplicarFiltros);
    document.getElementById('filterSeveridade').addEventListener('change', aplicarFiltros);
    document.getElementById('filterLocal').addEventListener('change', aplicarFiltros);
    document.getElementById('filterResponsavel').addEventListener('change', aplicarFiltros);

    // Histórico
    document.getElementById('searchRelatorio').addEventListener('input', filtrarHistorico);
    document.getElementById('sortRelatorio').addEventListener('change', ordenarHistorico);
}

// MUDAR VIEW
function mudarView(view) {
    // Remover active de todos os botões
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Remover active de todos os views
    document.querySelectorAll('.view-content').forEach(content => {
        content.classList.remove('active');
    });

    // Adicionar active ao botão e view clicados
    document.querySelector(`[data-view="${view}"]`).classList.add('active');
    document.getElementById(`view-${view}`).classList.add('active');

    // Atualizar conteúdo específico
    if (view === 'historico') {
        atualizarHistorico();
    } else if (view === 'analise') {
        atualizarAnalise();
    }
}

// ATUALIZAR DASHBOARD
function atualizarDashboard() {
    const dados = calcularKPIs();
    atualizarKPIs(dados);
    criarGraficos(dados);
    atualizarAlertas(dados);
    atualizarResumodiario(dados);
}

// CALCULAR KPIs
function calcularKPIs() {
    const agora = new Date();
    const periodo = document.getElementById('filterPeriod').value || 'semana';
    
    // Filtrar relatórios por período
    const relatoriosFiltrados = relatorios.filter(rel => {
        const dataRel = new Date(rel.data);
        return estaNoPeríodo(dataRel, periodo);
    });

    // Calcular totais
    let totalRelatorios = relatoriosFiltrados.length;
    let totalOcorrencias = 0;
    let ocorrenciasPorSeveridade = { s1: 0, s2: 0, s3: 0, s4: 0, s5: 0 };
    let ocorrenciasPorDia = {};
    let ocorrenciasPorLocal = {};
    let ocorrenciasPorResponsavel = {};
    let ocorrenciasPorTurno = { diurno: 0, noturno: 0 };
    let alertasCriticos = [];

    relatoriosFiltrados.forEach(rel => {
        const data = new Date(rel.data);
        const dataStr = data.toLocaleDateString('pt-PT');

        // Contar ocorrências
        if (rel.ocorrencias && rel.ocorrencias.length > 0) {
            rel.ocorrencias.forEach(oc => {
                totalOcorrencias++;
                const severidade = oc.severidade || 's5';
                ocorrenciasPorSeveridade[severidade]++;

                // Agrupar por dia
                if (!ocorrenciasPorDia[dataStr]) {
                    ocorrenciasPorDia[dataStr] = 0;
                }
                ocorrenciasPorDia[dataStr]++;

                // Agrupar por local
                const local = oc.local || 'Desconhecido';
                if (!ocorrenciasPorLocal[local]) {
                    ocorrenciasPorLocal[local] = 0;
                }
                ocorrenciasPorLocal[local]++;

                // Agrupar por responsável
                const responsavel = oc.responsavel || 'Desconhecido';
                if (!ocorrenciasPorResponsavel[responsavel]) {
                    ocorrenciasPorResponsavel[responsavel] = 0;
                }
                ocorrenciasPorResponsavel[responsavel]++;

                // Alertas críticos
                if (severidade === 's1' || severidade === 's2') {
                    alertasCriticos.push({
                        data: dataStr,
                        severidade: severidade,
                        descricao: oc.descricao,
                        local: local,
                        responsavel: responsavel
                    });
                }
            });
        }

        // Agrupar por turno
        const turno = rel.turno || 'diurno';
        ocorrenciasPorTurno[turno]++;
    });

    return {
        totalRelatorios,
        totalOcorrencias,
        ocorrenciasPorSeveridade,
        ocorrenciasPorDia,
        ocorrenciasPorLocal,
        ocorrenciasPorResponsavel,
        ocorrenciasPorTurno,
        alertasCriticos
    };
}

// VERIFICAR SE ESTÁ NO PERÍODO
function estaNoPeríodo(data, periodo) {
    const agora = new Date();
    const dataAtual = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
    const dataVerif = new Date(data.getFullYear(), data.getMonth(), data.getDate());

    switch (periodo) {
        case 'semana':
            const inicioSemana = new Date(dataAtual);
            inicioSemana.setDate(dataAtual.getDate() - dataAtual.getDay());
            return dataVerif >= inicioSemana && dataVerif <= dataAtual;

        case 'mes':
            return dataVerif.getMonth() === dataAtual.getMonth() &&
                   dataVerif.getFullYear() === dataAtual.getFullYear();

        case 'trimestre':
            const trimestre = Math.floor(dataAtual.getMonth() / 3);
            const trimestreVerif = Math.floor(dataVerif.getMonth() / 3);
            return trimestre === trimestreVerif &&
                   dataAtual.getFullYear() === dataVerif.getFullYear();

        case 'ano':
            return dataAtual.getFullYear() === dataVerif.getFullYear();

        default:
            return true;
    }
}

// ATUALIZAR KPIs
function atualizarKPIs(dados) {
    document.getElementById('kpiTotalRelatorios').textContent = dados.totalRelatorios;
    document.getElementById('kpiTotalOcorrencias').textContent = dados.totalOcorrencias;
    document.getElementById('kpiCriticos').textContent = dados.ocorrenciasPorSeveridade.s1;
    document.getElementById('kpiAltos').textContent = dados.ocorrenciasPorSeveridade.s2;

    // Calcular mudanças percentuais (simulado)
    const changeTotal = Math.floor(Math.random() * 20) - 10;
    const changeOcorrencias = Math.floor(Math.random() * 20) - 10;
    const changeCriticos = Math.floor(Math.random() * 20) - 10;
    const changeAltos = Math.floor(Math.random() * 20) - 10;

    atualizarChange('kpiTotalChange', changeTotal);
    atualizarChange('kpiOcorrenciasChange', changeOcorrencias);
    atualizarChange('kpiCriticosChange', changeCriticos);
    atualizarChange('kpiAltosChange', changeAltos);
}

// ATUALIZAR MUDANÇA PERCENTUAL
function atualizarChange(elementId, valor) {
    const elemento = document.getElementById(elementId);
    const sinal = valor >= 0 ? '↑' : '↓';
    const classe = valor >= 0 ? '' : 'negative';
    elemento.textContent = `${sinal} ${Math.abs(valor)}%`;
    elemento.className = `kpi-change ${classe}`;
}

// CRIAR GRÁFICOS
function criarGraficos(dados) {
    // Gráfico de Tendências (Linha)
    criarGraficoTendencias(dados);

    // Gráfico de Severidade (Pizza)
    criarGraficoSeveridade(dados);

    // Gráfico de Local (Barra)
    criarGraficoLocal(dados);

    // Gráfico de Responsável (Barra)
    criarGraficoResponsavel(dados);

    // Gráfico de Turno (Pizza)
    criarGraficoTurno(dados);

    // Gráfico de Evolução (Linha)
    criarGraficoEvolucao(dados);
}

// GRÁFICO DE TENDÊNCIAS
function criarGraficoTendencias(dados) {
    const ctx = document.getElementById('chartTendencias');
    if (!ctx) return;

    // Destruir gráfico anterior
    if (charts.tendencias) {
        charts.tendencias.destroy();
    }

    const dias = Object.keys(dados.ocorrenciasPorDia).sort();
    const valores = dias.map(dia => dados.ocorrenciasPorDia[dia]);

    charts.tendencias = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dias,
            datasets: [{
                label: 'Ocorrências por Dia',
                data: valores,
                borderColor: CONFIG.chartColors.accent,
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: CONFIG.chartColors.accent,
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

// GRÁFICO DE SEVERIDADE
function criarGraficoSeveridade(dados) {
    const ctx = document.getElementById('chartSeveridade');
    if (!ctx) return;

    if (charts.severidade) {
        charts.severidade.destroy();
    }

    const labels = ['S1 - Crítico', 'S2 - Alto', 'S3 - Médio', 'S4 - Baixo', 'S5 - Info'];
    const valores = [
        dados.ocorrenciasPorSeveridade.s1,
        dados.ocorrenciasPorSeveridade.s2,
        dados.ocorrenciasPorSeveridade.s3,
        dados.ocorrenciasPorSeveridade.s4,
        dados.ocorrenciasPorSeveridade.s5
    ];

    charts.severidade = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: valores,
                backgroundColor: [
                    '#c0392b',
                    '#f39c12',
                    '#ffc107',
                    '#27ae60',
                    '#3498db'
                ],
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// GRÁFICO DE LOCAL
function criarGraficoLocal(dados) {
    const ctx = document.getElementById('chartLocal');
    if (!ctx) return;

    if (charts.local) {
        charts.local.destroy();
    }

    const locais = Object.keys(dados.ocorrenciasPorLocal).slice(0, 10);
    const valores = locais.map(local => dados.ocorrenciasPorLocal[local]);

    charts.local = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: locais,
            datasets: [{
                label: 'Ocorrências',
                data: valores,
                backgroundColor: CONFIG.chartColors.accent,
                borderColor: CONFIG.chartColors.primary,
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// GRÁFICO DE RESPONSÁVEL
function criarGraficoResponsavel(dados) {
    const ctx = document.getElementById('chartResponsavel');
    if (!ctx) return;

    if (charts.responsavel) {
        charts.responsavel.destroy();
    }

    const responsaveis = Object.keys(dados.ocorrenciasPorResponsavel).slice(0, 10);
    const valores = responsaveis.map(resp => dados.ocorrenciasPorResponsavel[resp]);

    charts.responsavel = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: responsaveis,
            datasets: [{
                label: 'Ocorrências',
                data: valores,
                backgroundColor: CONFIG.chartColors.warning,
                borderColor: CONFIG.chartColors.primary,
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// GRÁFICO DE TURNO
function criarGraficoTurno(dados) {
    const ctx = document.getElementById('chartTurno');
    if (!ctx) return;

    if (charts.turno) {
        charts.turno.destroy();
    }

    charts.turno = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Diurno', 'Noturno'],
            datasets: [{
                data: [
                    dados.ocorrenciasPorTurno.diurno,
                    dados.ocorrenciasPorTurno.noturno
                ],
                backgroundColor: [
                    '#f39c12',
                    '#2c3e50'
                ],
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// GRÁFICO DE EVOLUÇÃO
function criarGraficoEvolucao(dados) {
    const ctx = document.getElementById('chartEvolucao');
    if (!ctx) return;

    if (charts.evolucao) {
        charts.evolucao.destroy();
    }

    const dias = Object.keys(dados.ocorrenciasPorDia).sort();
    const valores = dias.map(dia => dados.ocorrenciasPorDia[dia]);

    charts.evolucao = new Chart(ctx, {
        type: 'area',
        data: {
            labels: dias,
            datasets: [{
                label: 'Evolução de Ocorrências',
                data: valores,
                borderColor: CONFIG.chartColors.danger,
                backgroundColor: 'rgba(192, 57, 43, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });
}

// ATUALIZAR ALERTAS
function atualizarAlertas(dados) {
    const container = document.getElementById('alertasContainer');
    
    if (dados.alertasCriticos.length === 0) {
        container.innerHTML = '<p class="no-data">Nenhum alerta crítico no período</p>';
        return;
    }

    const alertas = dados.alertasCriticos.slice(0, 5).map(alerta => `
        <div class="alert-item ${alerta.severidade === 's1' ? '' : 'high'}">
            <div class="alert-content">
                <div class="alert-severity">${alerta.severidade === 's1' ? '🔴 CRÍTICO' : '🟠 ALTO'}</div>
                <div class="alert-description">${alerta.descricao}</div>
                <div class="alert-date">${alerta.data} | ${alerta.local} | ${alerta.responsavel}</div>
            </div>
            <button class="alert-action" onclick="alert('Detalhes do alerta')">Ver</button>
        </div>
    `).join('');

    container.innerHTML = alertas;
}

// ATUALIZAR RESUMO DIÁRIO
function atualizarResumodiario(dados) {
    const container = document.getElementById('dailyTable');
    
    if (Object.keys(dados.ocorrenciasPorDia).length === 0) {
        container.innerHTML = '<p class="no-data">Nenhum dado disponível</p>';
        return;
    }

    const dias = Object.keys(dados.ocorrenciasPorDia).sort();
    const resumo = dias.map(dia => {
        const ocorrencias = dados.ocorrenciasPorDia[dia];
        return `
            <div class="daily-row">
                <div class="daily-date">${dia}</div>
                <div class="daily-stat">
                    <div class="daily-stat-value">${ocorrencias}</div>
                    <div class="daily-stat-label">Ocorrências</div>
                </div>
                <div class="daily-stat">
                    <div class="daily-stat-value">-</div>
                    <div class="daily-stat-label">Críticos</div>
                </div>
                <div class="daily-stat">
                    <div class="daily-stat-value">-</div>
                    <div class="daily-stat-label">Altos</div>
                </div>
                <div class="daily-stat">
                    <div class="daily-stat-value">-</div>
                    <div class="daily-stat-label">Resolvidos</div>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = resumo;
}

// ATUALIZAR HISTÓRICO
function atualizarHistorico() {
    const container = document.getElementById('historicoList');
    
    if (relatorios.length === 0) {
        container.innerHTML = '<p class="no-data">Nenhum relatório encontrado</p>';
        return;
    }

    const historico = relatorios.slice().reverse().map(rel => {
        const data = new Date(rel.data);
        const dataStr = data.toLocaleDateString('pt-PT');
        const ocorrencias = rel.ocorrencias ? rel.ocorrencias.length : 0;
        const severidadeMax = rel.ocorrencias ? 
            Math.min(...rel.ocorrencias.map(o => parseInt(o.severidade.replace('s', '')))) : 5;
        const severidadeClass = `s${severidadeMax}`;

        return `
            <div class="historico-item" onclick="verDetalhesRelatorio('${rel.id}')">
                <div class="historico-header">
                    <div class="historico-date">${dataStr}</div>
                    <div class="historico-badge ${severidadeClass}">
                        ${severidadeMax === 1 ? 'CRÍTICO' : severidadeMax === 2 ? 'ALTO' : 'NORMAL'}
                    </div>
                </div>
                <div class="historico-info">
                    <div class="historico-info-item">📋 ${ocorrencias} ocorrências</div>
                    <div class="historico-info-item">👤 ${rel.supDiurnoNome || 'N/A'}</div>
                    <div class="historico-info-item">⏰ ${rel.turno || 'N/A'}</div>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = historico;
}

// FILTRAR HISTÓRICO
function filtrarHistorico() {
    const termo = document.getElementById('searchRelatorio').value.toLowerCase();
    const items = document.querySelectorAll('.historico-item');

    items.forEach(item => {
        const texto = item.textContent.toLowerCase();
        item.style.display = texto.includes(termo) ? 'block' : 'none';
    });
}

// ORDENAR HISTÓRICO
function ordenarHistorico() {
    atualizarHistorico();
}

// ATUALIZAR ANÁLISE
function atualizarAnalise() {
    const dados = calcularKPIs();
    
    // Atualizar tabela detalhada
    atualizarTabelaDetalhada(dados);
}

// ATUALIZAR TABELA DETALHADA
function atualizarTabelaDetalhada(dados) {
    const tbody = document.getElementById('tabelaDetalhadaBody');
    
    if (dados.alertasCriticos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="no-data">Nenhum dado disponível</td></tr>';
        return;
    }

    const linhas = dados.alertasCriticos.map(alerta => `
        <tr>
            <td>${alerta.data}</td>
            <td><span class="severity-badge ${alerta.severidade}">${alerta.severidade}</span></td>
            <td>${alerta.local}</td>
            <td>${alerta.descricao}</td>
            <td>${alerta.responsavel}</td>
            <td><button class="btn-action" onclick="alert('Ação')">⚙️</button></td>
        </tr>
    `).join('');

    tbody.innerHTML = linhas;
}

// APLICAR FILTROS
function aplicarFiltros() {
    atualizarDashboard();
}

// LIMPAR FILTROS
function limparFiltros() {
    document.getElementById('filterPeriod').value = 'semana';
    document.getElementById('filterSeveridade').value = '';
    document.getElementById('filterLocal').value = '';
    document.getElementById('filterResponsavel').value = '';
    atualizarDashboard();
}

// IR PARA RELATÓRIO
function irParaRelatorio() {
    window.location.href = 'index.html';
}

// VER DETALHES DO RELATÓRIO
function verDetalhesRelatorio(id) {
    console.log('Ver detalhes do relatório:', id);
    alert('Funcionalidade de detalhes em desenvolvimento');
}

// ATUALIZAR HORA
function atualizarHora() {
    const agora = new Date();
    const hora = agora.toLocaleTimeString('pt-PT');
    document.getElementById('lastUpdate').textContent = hora;
}
