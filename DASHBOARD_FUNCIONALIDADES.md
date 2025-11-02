# 📊 DASHBOARD DE KPIs - FUNCIONALIDADES

## 🎯 VISÃO GERAL

O Dashboard é uma nova funcionalidade que permite visualizar:
- **KPIs em tempo real**
- **Histórico de relatórios**
- **Análise detalhada com gráficos**
- **Alertas críticos**
- **Filtros avançados**

---

## 📁 ARQUIVOS CRIADOS

### 1. `dashboard.html`
- Interface principal do dashboard
- 4 views: Overview, Histórico, Análise, Novo Relatório
- Integração com Chart.js para gráficos

### 2. `dashboard_styles.css`
- Estilos corporativos (paleta cinza/azul)
- Design responsivo
- Componentes: KPIs, Gráficos, Tabelas, Alertas

### 3. `dashboard_script.js`
- Lógica de carregamento de dados
- Cálculo de KPIs
- Criação de gráficos dinâmicos
- Filtros e buscas

---

## 🎨 COMPONENTES PRINCIPAIS

### 1. NAVEGAÇÃO
```
📈 Visão Geral    | 📋 Histórico | 📊 Análise | 🛡️ Novo Relatório
```

### 2. FILTROS
- **Período**: Semana, Mês, Trimestre, Ano, Personalizado
- **Severidade**: S1-S5
- **Local**: Pisos e Garagem
- **Responsável**: Busca por nome

### 3. KPIs (Painel Principal)
```
┌─────────────────────────────────────────────────────┐
│ 📋 Total de Relatórios  │  ⚠️ Total de Ocorrências │
│ 🔴 Críticos (S1)        │  🟠 Altos (S2)           │
└─────────────────────────────────────────────────────┘
```

### 4. GRÁFICOS

#### Visão Geral (Overview)
- **📈 Tendências de Segurança** (Gráfico de Linha)
  - Mostra ocorrências por dia
  - Identifica padrões

- **🥧 Distribuição por Severidade** (Gráfico de Pizza)
  - S1: Crítico (Vermelho)
  - S2: Alto (Laranja)
  - S3: Médio (Amarelo)
  - S4: Baixo (Verde)
  - S5: Informativo (Azul)

#### Análise Detalhada
- **📊 Ocorrências por Local** (Gráfico de Barra)
- **👤 Ocorrências por Responsável** (Gráfico de Barra)
- **⏰ Distribuição por Turno** (Gráfico de Pizza)
- **📈 Evolução Temporal** (Gráfico de Área)

### 5. ALERTAS CRÍTICOS
```
🔴 CRÍTICO
Descrição da ocorrência
Data | Local | Responsável
[Ver]
```

### 6. RESUMO DIÁRIO
```
Data      | Ocorrências | Críticos | Altos | Resolvidos
2025-01-01|      5      |    1     |   2   |     2
2025-01-02|      3      |    0     |   1   |     2
```

### 7. HISTÓRICO DE RELATÓRIOS
```
Data: 2025-01-01  [CRÍTICO]
📋 5 ocorrências | 👤 João Silva | ⏰ Diurno
```

---

## 🔄 FLUXO DE DADOS

```
LocalStorage (relatorios)
        ↓
Carrega Relatórios
        ↓
Filtra por Período
        ↓
Calcula KPIs
        ↓
Cria Gráficos
        ↓
Atualiza Dashboard
```

---

## 📊 CÁLCULOS DE KPIs

### Total de Relatórios
```javascript
Contagem de relatórios no período selecionado
```

### Total de Ocorrências
```javascript
Soma de todas as ocorrências em todos os relatórios
```

### Críticos (S1)
```javascript
Contagem de ocorrências com severidade S1
```

### Altos (S2)
```javascript
Contagem de ocorrências com severidade S2
```

### Mudanças Percentuais
```javascript
Comparação com período anterior (simulado)
```

---

## 🎯 FUNCIONALIDADES

### ✅ Visão Geral (Overview)
- [x] KPIs em destaque
- [x] Gráfico de tendências
- [x] Distribuição por severidade
- [x] Alertas críticos
- [x] Resumo diário

### ✅ Histórico
- [x] Lista de relatórios
- [x] Busca por data/responsável
- [x] Ordenação (recente, antigo, ocorrências)
- [x] Badges de severidade
- [x] Informações resumidas

### ✅ Análise Detalhada
- [x] 4 gráficos adicionais
- [x] Tabela detalhada de ocorrências
- [x] Filtros por local, responsável, turno
- [x] Exportação (futuro)

### ✅ Novo Relatório
- [x] Redirecionamento para formulário
- [x] Botão de ação rápida

---

## 🔧 COMO USAR

### 1. Acessar o Dashboard
```html
<!-- Adicionar link no menu -->
<a href="dashboard.html">📊 Dashboard</a>
```

### 2. Filtrar Dados
```
1. Selecionar período (Semana/Mês/Ano)
2. Selecionar severidade (opcional)
3. Selecionar local (opcional)
4. Digitar responsável (opcional)
5. Clicar em "Filtrar"
```

### 3. Visualizar Gráficos
- Passar mouse sobre gráficos para ver valores
- Clicar em legendas para mostrar/ocultar séries

### 4. Buscar Relatório
```
1. Ir para "Histórico"
2. Digitar na barra de busca
3. Ordenar por preferência
4. Clicar para ver detalhes
```

---

## 📱 RESPONSIVIDADE

### Desktop (1200px+)
- 4 KPIs em linha
- 2 gráficos por linha
- Tabela completa

### Tablet (768px-1199px)
- 2 KPIs por linha
- 1 gráfico por linha
- Tabela com scroll

### Mobile (<768px)
- 1 KPI por linha
- 1 gráfico por linha
- Tabela com scroll horizontal

---

## 🎨 CORES UTILIZADAS

### Severidade
```
S1 - Crítico:      #c0392b (Vermelho)
S2 - Alto:         #f39c12 (Laranja)
S3 - Médio:        #ffc107 (Amarelo)
S4 - Baixo:        #27ae60 (Verde)
S5 - Informativo:  #3498db (Azul)
```

### Gráficos
```
Primária:   #2c3e50 (Cinza Azulado)
Secundária: #34495e (Cinza Azulado Médio)
Acentuação: #3498db (Azul Corporativo)
```

---

## 🔗 INTEGRAÇÃO

### Com Relatório Principal
```javascript
// Dados salvos em localStorage
localStorage.setItem('relatorioSegurancaV3', JSON.stringify({
    relatorios: [...]
}));

// Dashboard carrega automaticamente
carregarRelatorios();
```

### Com Chart.js
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js"></script>
```

---

## 📈 MÉTRICAS RASTREADAS

### Por Período
- Total de relatórios
- Total de ocorrências
- Distribuição por severidade
- Tendências diárias

### Por Local
- Ocorrências por piso
- Ocorrências por garagem
- Hotspots de segurança

### Por Responsável
- Ocorrências por pessoa
- Performance individual
- Padrões de trabalho

### Por Turno
- Comparação Diurno vs Noturno
- Distribuição de carga

---

## 🚀 FUNCIONALIDADES FUTURAS

### Próxima Versão
- [ ] Exportar relatórios (PDF, Excel)
- [ ] Agendamento de relatórios
- [ ] Notificações de alertas
- [ ] Comparação entre períodos
- [ ] Previsões com IA
- [ ] Integração com email
- [ ] API REST para dados
- [ ] Modo escuro

---

## 🐛 TROUBLESHOOTING

### Gráficos não aparecem
```
1. Verificar se Chart.js está carregado
2. Verificar console para erros
3. Limpar cache do navegador
```

### Dados não carregam
```
1. Verificar se há relatórios salvos
2. Verificar localStorage
3. Recarregar página
```

### Filtros não funcionam
```
1. Verificar valores dos filtros
2. Clicar em "Limpar" e tentar novamente
3. Recarregar página
```

---

## 📞 SUPORTE

Para dúvidas ou sugestões:
- 📧 Email: lucianoamos@gmail.com
- 💬 Discord: lucianoamos
- 📱 WhatsApp: +244 942 479 552

---

## 📝 VERSÃO

**Dashboard v1.0**
**Data**: Novembro 2025
**Status**: ✅ Funcional

---

**Aproveite o Dashboard! 📊**
