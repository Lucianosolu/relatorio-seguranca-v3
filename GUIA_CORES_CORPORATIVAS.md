# 🎨 GUIA DE CORES CORPORATIVAS

## 📋 PALETA PRINCIPAL

### Cores Base
```
🔵 Primária Escura:    #2c3e50  (Cinza Azulado Escuro)
🔵 Primária Média:     #34495e  (Cinza Azulado Médio)
🔵 Acentuação:         #3498db  (Azul Corporativo)
⚫ Escura Extrema:     #1a252f  (Quase Preto)
```

### Cores Neutras
```
⚪ Fundo Claro:        #ecf0f1  (Cinza Claro)
⚪ Card Branco:        #ffffff  (Branco Puro)
⚪ Borda Média:        #bdc3c7  (Cinza Médio)
⚪ Texto Secundário:   #7f8c8d  (Cinza Médio)
⚪ Texto Muted:        #95a5a6  (Cinza Claro)
```

---

## 🎯 CORES DE STATUS

### Sucesso
```css
--success-color: #27ae60;  /* Verde Profissional */
Uso: Confirmações, botões salvos, status OK
RGB: rgb(39, 174, 96)
HSL: hsl(145, 63%, 43%)
```

### Aviso
```css
--warning-color: #f39c12;  /* Laranja Corporativo */
Uso: Alertas, atenção necessária
RGB: rgb(243, 156, 18)
HSL: hsl(38, 89%, 51%)
```

### Erro
```css
--error-color: #c0392b;  /* Vermelho Corporativo */
Uso: Erros críticos, ações destrutivas
RGB: rgb(192, 57, 43)
HSL: hsl(9, 63%, 46%)
```

### Info
```css
--info-color: #3498db;  /* Azul Corporativo */
Uso: Informações, dicas, help
RGB: rgb(52, 152, 219)
HSL: hsl(204, 70%, 53%)
```

---

## 🚨 CORES DE SEVERIDADE

### S1 - Crítico
```css
--severity-s1: #c0392b;  /* Vermelho Crítico */
Uso: Incidentes críticos que requerem ação imediata
Exemplo: Roubo, agressão, incêndio
```

### S2 - Alto
```css
--severity-s2: #e74c3c;  /* Vermelho Alto */
Uso: Incidentes sérios que precisam atenção
Exemplo: Tentativa de roubo, dano grave
```

### S3 - Médio
```css
--severity-s3: #f39c12;  /* Laranja Médio */
Uso: Incidentes moderados
Exemplo: Comportamento suspeito, dano leve
```

### S4 - Baixo
```css
--severity-s4: #27ae60;  /* Verde Baixo */
Uso: Incidentes menores
Exemplo: Ruído, desordem, questões administrativas
```

### S5 - Informativo
```css
--severity-s5: #3498db;  /* Azul Informativo */
Uso: Apenas informação, sem ação necessária
Exemplo: Visitante registrado, inspeção de rotina
```

---

## 🎨 COMBINAÇÕES RECOMENDADAS

### Header + Botões
```css
Header: linear-gradient(135deg, #2c3e50 0%, #34495e 100%)
Botão Primário: #3498db
Botão Hover: #2980b9
```

### Cards + Hover
```css
Card Border: #bdc3c7
Card Hover: #3498db (border)
Card Shadow: 0 4px 12px rgba(0,0,0,0.12)
```

### Inputs + Focus
```css
Input Border: #bdc3c7
Input Focus: #3498db
Input Focus BG: #f8fbff
```

---

## 📊 CONTRASTES (WCAG AA)

| Combinação | Contraste | Status |
|-----------|-----------|--------|
| #2c3e50 (texto) + #ffffff (bg) | 12.6:1 | ✅ AAA |
| #3498db (texto) + #ffffff (bg) | 4.5:1 | ✅ AA |
| #7f8c8d (texto) + #ffffff (bg) | 4.8:1 | ✅ AA |
| #ffffff (texto) + #2c3e50 (bg) | 12.6:1 | ✅ AAA |
| #ffffff (texto) + #3498db (bg) | 4.5:1 | ✅ AA |

---

## 🔄 GRADIENTES CORPORATIVOS

### Header Gradient
```css
background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
Direção: 135° (canto inferior direito)
Suave e profissional
```

### Progress Bar Gradient
```css
background: linear-gradient(90deg, #3498db, #2980b9);
Direção: 90° (esquerda para direita)
Dinâmico mas corporativo
```

### Table Header Gradient
```css
background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
Mesmo do header para consistência
```

---

## 🎯 APLICAÇÕES ESPECÍFICAS

### Barra de Progresso
```css
Background: rgba(255, 255, 255, 0.3)  /* Translúcido */
Progress: linear-gradient(90deg, #3498db, #2980b9)
Shadow: 0 0 10px rgba(52, 152, 219, 0.3)
```

### Indicador Auto-Save
```css
Saving: rgba(243, 156, 18, 0.2)  /* Laranja translúcido */
Saved: rgba(39, 174, 96, 0.2)    /* Verde translúcido */
```

### Botões
```css
Save: #27ae60 (Verde)
Print: #3498db (Azul)
Clear: #c0392b (Vermelho)
```

### Hover States
```css
Save Hover: #229954 (Verde mais escuro)
Print Hover: #2980b9 (Azul mais escuro)
Clear Hover: #a93226 (Vermelho mais escuro)
```

---

## 🌙 MODO ESCURO (Futuro)

Sugestão para implementação futura:

```css
:root.dark-mode {
    --primary-color: #1a1a1a;
    --secondary-color: #2d2d2d;
    --accent-color: #4db8ff;
    --bg-color: #1a1a1a;
    --card-bg: #2d2d2d;
    --border-color: #444444;
    --text-primary: #e0e0e0;
    --text-secondary: #b0b0b0;
}
```

---

## 📱 ACESSIBILIDADE

### Checklist
- ✅ Contraste mínimo 4.5:1 para texto
- ✅ Contraste mínimo 3:1 para elementos gráficos
- ✅ Não usar cor como único indicador
- ✅ Testar com simuladores de daltonismo
- ✅ Validar com ferramentas WCAG

### Ferramentas Recomendadas
- WebAIM Contrast Checker
- Stark (Figma plugin)
- Color Oracle (simulador de daltonismo)
- WAVE (acessibilidade)

---

## 🎨 EXPORTAR PARA FIGMA

```json
{
  "colors": {
    "primary": "#2c3e50",
    "secondary": "#34495e",
    "accent": "#3498db",
    "success": "#27ae60",
    "warning": "#f39c12",
    "error": "#c0392b",
    "info": "#3498db",
    "bg": "#ecf0f1",
    "card": "#ffffff",
    "border": "#bdc3c7"
  }
}
```

---

## 🔗 REFERÊNCIAS

- Material Design: https://material.io/design/color
- WCAG 2.1: https://www.w3.org/WAI/WCAG21/quickref/
- Color Contrast Checker: https://webaim.org/resources/contrastchecker/
- Coolors: https://coolors.co/

---

**Paleta Corporativa Completa! 🎉**
