# 🛡️ Relatório Digital de Segurança v3.0

Sistema moderno e responsivo para gestão de relatórios diários de segurança hoteleira.

## ✨ Características

### 🎯 **Funcionalidades Principais**
- ✅ **6 Abas Completas**: Identificação, Equipe, Rondas, Ocorrências, Controles, Aprovações
- ✅ **Auto-save Inteligente**: Salva automaticamente a cada 2 minutos ou 30s após inatividade
- ✅ **Persistência Local**: Dados salvos em localStorage, persistem entre sessões
- ✅ **Validação Robusta**: Verifica campos obrigatórios antes de gerar PDF
- ✅ **Exportação PDF**: Gera PDF otimizado para impressão
- ✅ **Progresso em Tempo Real**: Barra de progresso mostra % de preenchimento
- ✅ **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- ✅ **Atalhos de Teclado**: Ctrl+S (Salvar) | Ctrl+P (PDF)

### 🎨 **Interface Moderna**
- Design gradiente profissional
- Animações suaves e transições
- Feedback visual claro
- Badges de severidade coloridos
- Layout intuitivo por abas

### 💾 **Sistema de Dados**
- **150+ Campos** estruturados
- **LocalStorage** para persistência
- **Backup automático** em memória
- **Recuperação** automática de dados
- **Limpeza** segura com confirmação

## 🚀 Deploy Rápido

### **Opção 1: GitHub Pages (Recomendado)**

1. **Clique em "Use this template"** no GitHub
2. **Nomeie o repositório**: `relatorio-seguranca-v3`
3. **Aguarde 2-3 minutos**
4. **Acesse**: `https://SEU-USUARIO.github.io/relatorio-seguranca-v3`

### **Opção 2: Deploy Automático (Windows)**

```bash
# Execute o script de deploy automático
deploy.bat
```

### **Opção 3: Netlify (Drag & Drop)**

1. Arraste `relatorio_v3_deploy.html` para [netlify.com](https://netlify.com)
2. Renomeie para `index.html`
3. Pronto! 🎉

## 📱 Como Usar

### **Passo 1: Preencher Dados**
1. **Aba 1 - Identificação**: Data, turno, clima
2. **Aba 2 - Equipe**: Supervisores e operadores
3. **Aba 3 - Rondas**: Registros de patrulhamento
4. **Aba 4 - Ocorrências**: Incidentes com severidade
5. **Aba 5 - Controles**: Dormitórios, refeitório, equipamentos
6. **Aba 6 - Aprovações**: Assinaturas finais

### **Passo 2: Salvar**
- **Auto-save**: Salva automaticamente
- **Manual**: Botão "Salvar" ou Ctrl+S
- **Persistência**: Dados ficam salvos localmente

### **Passo 3: Gerar PDF**
- Clique em "Gerar PDF" ou Ctrl+P
- Validação automática de campos obrigatórios
- Selecione "Salvar como PDF" na impressão

## 🔧 Estrutura das Abas

### **📋 Aba 1: Identificação**
- Data (obrigatório)
- Dia da semana (auto-calculado)
- Turno (Diurno/Noturno)
- Condições climáticas

### **👥 Aba 2: Equipe**
- Supervisor Diurno (Nr. Mec. + Nome)
- Operador CCTV Diurno (Nr. Mec. + Nome)
- Supervisor Noturno (Nr. Mec. + Nome)
- Operador CCTV Noturno (Nr. Mec. + Nome)

### **🚶 Aba 3: Rondas**
- **Rondas Gerais**: 4 registros (Piso -5 ao 5)
- **Rondas Garagem**: 4 registros + veículos
- **Inspeções Sanitárias**: 4 registros (vasilhames)
- **Rondas Setoriais**: 5 setores noturnos

### **📝 Aba 4: Ocorrências**
- **3 Casos** completos com:
  - Severidade (S1-S5)
  - Horário e local
  - Descrição detalhada
  - Ação tomada
  - Responsável e assinatura

### **🔒 Aba 5: Controles**
- **Dormitórios**: Rondas + registro de uso
- **Refeitório**: Horários + trabalhadores
- **Equipamentos**: Checklist 5 itens
- **Observações**: Gerais + pendências

### **✍️ Aba 6: Aprovações**
- Chefe de Equipa (Nome + Assinatura + Horário)
- Supervisor Serviço Interno (Nome + Assinatura + Horário)

## 🛠️ Tecnologias

### **Frontend**
- **HTML5** semântico e acessível
- **CSS3** moderno com variáveis e flexbox
- **JavaScript ES6+** vanilla (sem frameworks)
- **Responsive Design** mobile-first

### **Armazenamento**
- **LocalStorage** para persistência
- **Memória** como fallback
- **JSON** para serialização
- **Auto-save** inteligente

### **Compatibilidade**
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile iOS/Android

## 🔒 Segurança

### **Privacidade**
- ✅ Sem backend - dados ficam no navegador
- ✅ Sem envio de dados para servidores
- ✅ HTTPS obrigatório para localStorage
- ✅ Sandbox do navegador

### **Considerações**
- ⚠️ Dados não criptografados localmente
- ⚠️ Limite de ~5MB no localStorage
- ⚠️ Dados podem ser limpos pelo usuário

## 📊 Estatísticas

| Métrica | Valor |
|---------|-------|
| **Abas** | 6 completas |
| **Campos** | 150+ inputs |
| **Tabelas** | 8 estruturadas |
| **Validações** | 10+ regras |
| **Tamanho** | ~45KB |
| **Carregamento** | <1s |

## 🔄 Versões

### **v3.0 (Atual)**
- ✅ Todas as 6 abas implementadas
- ✅ Auto-save com localStorage
- ✅ Validação robusta
- ✅ Design responsivo
- ✅ Deploy standalone

### **v2.0 (Anterior)**
- ❌ 4 abas vazias
- ❌ Sem persistência
- ❌ Sem validação
- ❌ Encoding problemático

## 🆘 Suporte

### **Problemas Comuns**

**❌ Auto-save não funciona**
```bash
# Verifique console (F12)
localStorage.getItem('relatorioSegurancaV3')
```

**❌ Dados não persistem**
- Use HTTPS (obrigatório)
- Limpe cache do navegador
- Verifique permissões

**❌ PDF não gera**
- Desbloqueie popups
- Use Ctrl+P
- Verifique permissões de impressão

### **Debug**
```javascript
// Console (F12)
console.log(window.dadosRelatorioSeguranca);  // Dados atuais
console.log(AppState);                        // Estado da app
localStorage.clear();                         // Limpar tudo
```

## 🤝 Contribuição

### **Como Contribuir**
1. **Fork** este repositório
2. **Crie** branch: `git checkout -b feature/nova-funcionalidade`
3. **Commit**: `git commit -m 'Adicionar nova funcionalidade'`
4. **Push**: `git push origin feature/nova-funcionalidade`
5. **Pull Request**

### **Issues**
- 🐛 Report bugs via GitHub Issues
- 💡 Sugira melhorias e novas funcionalidades
- 📧 Contato direto para suporte prioritário

## 📄 Licença

MIT License - Uso livre para fins comerciais e não comerciais.

## 📞 Contato

- 📧 **Email**: [lucianoamos@gmail.com](mailto:lucianoamos@gmail.com)
- 💬 **Discord**: [lucianoamos](https://discord.com/users/lucianoamos)
- 📱 **WhatsApp**: [+244 942 479 552](https://wa.me/244942479552)
- 🌐 **Website**: [lucianoamos.com](https://lucianoamos.com)
