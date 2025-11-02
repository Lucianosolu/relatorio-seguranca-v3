# 🎨 EXEMPLOS DE CUSTOMIZAÇÃO

## 📋 COMO CUSTOMIZAR O DESIGN CORPORATIVO

Todos os exemplos abaixo podem ser aplicados diretamente no arquivo `styles_v3.css`.

---

## 🎯 EXEMPLO 1: MUDAR PARA PALETA VERDE (Segurança)

### Situação
Você quer uma paleta verde para reforçar o tema de segurança.

### Solução
Substitua as variáveis de cores no `:root`:

```css
:root {
    /* Cores Principais - Verde Segurança */
    --primary-color: #1b5e20;        /* Verde floresta */
    --primary-dark: #0d3817;         /* Mais escuro */
    --secondary-color: #2e7d32;      /* Verde segurança */
    --accent-color: #388e3c;         /* Verde claro */
    
    /* Cores de Status */
    --success-color: #1b5e20;        /* Verde escuro */
    --warning-color: #f39c12;        /* Laranja (mantém) */
    --error-color: #c0392b;          /* Vermelho (mantém) */
    --info-color: #388e3c;           /* Verde claro */
    
    /* Cores de Severidade */
    --severity-s1: #c0392b;          /* Vermelho crítico */
    --severity-s2: #e74c3c;          /* Vermelho alto */
    --severity-s3: #f39c12;          /* Laranja médio */
    --severity-s4: #1b5e20;          /* Verde baixo */
    --severity-s5: #388e3c;          /* Verde informativo */
}
```

### Resultado
- Header com gradiente verde
- Botões e abas em verde
- Tema coeso de segurança

---

## 🎯 EXEMPLO 2: AUMENTAR TAMANHO DE FONTE

### Situação
Usuários reclamam que o texto é muito pequeno.

### Solução
Aumente os tamanhos de fonte globalmente:

```css
/* HEADER */
.header h1 {
    font-size: 32px;  /* Era 28px */
}

/* LABELS */
label {
    font-size: 16px;  /* Era 14px */
}

/* INPUTS */
input[type="text"],
input[type="date"],
input[type="time"],
textarea,
select {
    font-size: 16px;  /* Era 14px */
}

/* BOTÕES */
button {
    font-size: 16px;  /* Era 14px */
}

/* TABELAS */
.data-table th,
.data-table td {
    font-size: 15px;  /* Era 13px */
}
```

### Resultado
- Texto mais legível
- Melhor para usuários com visão reduzida
- Mais acessível

---

## 🎯 EXEMPLO 3: MODO ESCURO

### Situação
Você quer adicionar suporte a modo escuro.

### Solução
Adicione um novo tema no CSS:

```css
/* Modo Escuro */
@media (prefers-color-scheme: dark) {
    :root {
        --primary-color: #1a1a1a;
        --secondary-color: #2d2d2d;
        --accent-color: #4db8ff;
        --bg-color: #1a1a1a;
        --card-bg: #2d2d2d;
        --border-color: #444444;
        --text-primary: #e0e0e0;
        --text-secondary: #b0b0b0;
        --text-muted: #808080;
    }
    
    body {
        background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    }
}
```

### Resultado
- Modo escuro automático baseado em preferências do sistema
- Reduz fadiga ocular em ambientes escuros
- Mais moderno

---

## 🎯 EXEMPLO 4: AUMENTAR ESPAÇAMENTO

### Situação
Você quer mais espaço entre elementos (design mais arejado).

### Solução
Aumente o padding e margins:

```css
/* CONTAINER */
.container {
    padding: 60px;  /* Era 40px */
}

/* SEÇÕES */
.section {
    padding: 32px;  /* Era 24px */
    margin-bottom: 40px;  /* Era 30px */
}

/* FORM ROW */
.form-row {
    gap: 30px;  /* Era 20px */
    margin-bottom: 30px;  /* Era 20px */
}

/* FORM GROUP */
.form-group {
    margin-bottom: 24px;  /* Era 16px */
}
```

### Resultado
- Design mais arejado
- Melhor legibilidade
- Menos poluição visual

---

## 🎯 EXEMPLO 5: BORDAS MAIS ARREDONDADAS

### Situação
Você quer um design mais suave com bordas arredondadas.

### Solução
Aumente o border-radius:

```css
:root {
    /* Border Radius */
    --radius-sm: 8px;    /* Era 4px */
    --radius-md: 12px;   /* Era 6px */
    --radius-lg: 16px;   /* Era 8px */
    --radius-full: 50px; /* Mantém igual */
}
```

### Resultado
- Design mais suave
- Menos agressivo
- Mais moderno

---

## 🎯 EXEMPLO 6: SOMBRAS MAIS FORTES

### Situação
Você quer mais profundidade visual com sombras mais fortes.

### Solução
Aumente a opacidade das sombras:

```css
:root {
    /* Sombras - Mais Fortes */
    --shadow-sm: 0 2px 8px rgba(0,0,0,0.15);
    --shadow-md: 0 8px 16px rgba(0,0,0,0.20);
    --shadow-lg: 0 12px 32px rgba(0,0,0,0.25);
}
```

### Resultado
- Mais profundidade
- Elementos se destacam mais
- Design mais dramático

---

## 🎯 EXEMPLO 7: MUDAR FONTE PARA SERIF

### Situação
Você quer um design mais formal com fonte serif.

### Solução
Altere a font-family:

```css
body {
    font-family: 'Georgia', 'Times New Roman', serif;
    font-size: 15px;
    line-height: 1.6;
    color: var(--text-primary);
}

/* Manter sans-serif para inputs */
input[type="text"],
input[type="date"],
input[type="time"],
textarea,
select {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

### Resultado
- Design mais formal
- Mais elegante
- Melhor para documentos

---

## 🎯 EXEMPLO 8: CORES PERSONALIZADAS POR EMPRESA

### Situação
Você quer usar as cores da marca da empresa.

### Solução
Crie um tema customizado:

```css
/* Tema Empresa XYZ */
:root.theme-xyz {
    --primary-color: #003d82;        /* Azul da marca */
    --secondary-color: #005fa3;      /* Azul mais claro */
    --accent-color: #ff6b35;         /* Laranja da marca */
    --success-color: #00a86b;        /* Verde da marca */
}

/* Aplicar no HTML */
/* <html class="theme-xyz"> */
```

### Resultado
- Design alinhado com marca
- Consistência visual
- Profissionalismo

---

## 🎯 EXEMPLO 9: REMOVER ANIMAÇÕES

### Situação
Você quer remover animações para melhor performance.

### Solução
Desabilite as transições:

```css
/* Remover todas as animações */
* {
    animation: none !important;
    transition: none !important;
}

/* Ou manter apenas hover */
button:hover {
    transform: none;  /* Remover translateY */
}
```

### Resultado
- Melhor performance
- Menos uso de CPU
- Mais rápido em dispositivos antigos

---

## 🎯 EXEMPLO 10: LAYOUT COMPACTO

### Situação
Você quer um layout mais compacto para caber mais informação.

### Solução
Reduza padding e font-size:

```css
:root {
    /* Espaçamentos Compactos */
    --spacing-xs: 3px;
    --spacing-sm: 6px;
    --spacing-md: 10px;
    --spacing-lg: 15px;
    --spacing-xl: 20px;
}

.container {
    padding: 20px;  /* Era 40px */
}

.section {
    padding: 16px;  /* Era 24px */
}

label {
    font-size: 12px;  /* Era 14px */
}

input[type="text"],
input[type="date"],
input[type="time"],
textarea,
select {
    padding: 6px 8px;  /* Era 10px 12px */
    font-size: 12px;  /* Era 14px */
}
```

### Resultado
- Mais informação por tela
- Menos scroll necessário
- Ideal para tablets

---

## 🎯 EXEMPLO 11: BOTÕES COM ÍCONES

### Situação
Você quer adicionar ícones aos botões.

### Solução
Adicione estilos para ícones:

```css
button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

button::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    background-size: contain;
}

.btn-save::before {
    background-image: url('data:image/svg+xml,...');
}

.btn-print::before {
    background-image: url('data:image/svg+xml,...');
}
```

### Resultado
- Botões mais visuais
- Melhor UX
- Mais profissional

---

## 🎯 EXEMPLO 12: TABELAS COM ZEBRA STRIPES

### Situação
Você quer melhorar legibilidade de tabelas com cores alternadas.

### Solução
Adicione estilos para linhas alternadas:

```css
.data-table tbody tr:nth-child(odd) {
    background: #f8f9fa;
}

.data-table tbody tr:nth-child(even) {
    background: #ffffff;
}

.data-table tbody tr:hover {
    background: #e8f4f8;
}
```

### Resultado
- Tabelas mais legíveis
- Melhor experiência
- Menos erros de leitura

---

## 🎯 EXEMPLO 13: FOOTER COM INFORMAÇÕES

### Situação
Você quer adicionar um footer com informações da empresa.

### Solução
Adicione estilos para footer:

```css
.footer {
    text-align: center;
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid var(--border-color);
    color: var(--text-secondary);
    font-size: 12px;
    background: var(--bg-color);
    border-radius: 0 0 8px 8px;
}

.footer p {
    margin: 5px 0;
}

.footer a {
    color: var(--accent-color);
    text-decoration: none;
}

.footer a:hover {
    text-decoration: underline;
}
```

### Resultado
- Footer profissional
- Informações da empresa
- Links úteis

---

## 🎯 EXEMPLO 14: NOTIFICAÇÕES CUSTOMIZADAS

### Situação
Você quer customizar as notificações de salvamento.

### Solução
Adicione estilos para notificações:

```css
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 20px;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    animation: slideIn 0.3s ease;
}

.notification.success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.notification.error {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

@keyframes slideIn {
    from {
        transform: translateX(400px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
```

### Resultado
- Notificações mais visuais
- Melhor feedback do usuário
- Design moderno

---

## 🎯 EXEMPLO 15: IMPRESSÃO OTIMIZADA

### Situação
Você quer melhorar a qualidade da impressão.

### Solução
Customize o CSS para impressão:

```css
@media print {
    body {
        background: white;
        padding: 0;
    }
    
    .container {
        box-shadow: none;
        padding: 20px;
        max-width: 100%;
    }
    
    .header {
        background: white;
        color: black;
        border-bottom: 2px solid black;
    }
    
    .tabs-navigation,
    .button-group,
    .auto-save-indicator {
        display: none !important;
    }
    
    .section {
        page-break-inside: avoid;
        border: 1px solid black;
    }
    
    /* Cores em escala de cinza */
    * {
        color: black !important;
        background: white !important;
    }
}
```

### Resultado
- Impressão mais clara
- Melhor qualidade
- Sem elementos desnecessários

---

## 📝 DICAS GERAIS

### ✅ BOAS PRÁTICAS

1. **Sempre fazer backup** antes de customizar
2. **Testar em múltiplos navegadores** após mudanças
3. **Validar acessibilidade** (WCAG AA)
4. **Documentar mudanças** para referência futura
5. **Usar variáveis CSS** para facilitar manutenção

### ❌ EVITAR

1. Não modificar HTML
2. Não adicionar dependências externas
3. Não quebrar responsividade
4. Não reduzir contraste abaixo de 4.5:1
5. Não adicionar animações excessivas

---

## 🔧 FERRAMENTAS ÚTEIS

- **Color Picker**: https://htmlcolorcodes.com/
- **Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **CSS Validator**: https://jigsaw.w3.org/css-validator/
- **Responsive Tester**: https://responsively.app/

---

**Customize com confiança! 🎨**
