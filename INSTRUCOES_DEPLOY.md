# 🚀 INSTRUÇÕES DE DEPLOY - REDESIGN CORPORATIVO

## 📋 VISÃO GERAL

Este documento fornece instruções passo a passo para fazer deploy da versão corporativa do Relatório Digital de Segurança.

---

## ✅ PRÉ-REQUISITOS

Antes de fazer deploy, certifique-se de:

- [ ] Revisar todas as mudanças de design
- [ ] Testar em navegadores principais
- [ ] Validar acessibilidade (WCAG AA)
- [ ] Coletar feedback de stakeholders
- [ ] Fazer backup do projeto original
- [ ] Comunicar mudanças aos usuários

---

## 🎯 OPÇÃO 1: GITHUB PAGES (Recomendado)

### Passo 1: Preparar o Repositório

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/relatorio-seguranca-v3.git
cd relatorio-seguranca-v3

# Criar branch de desenvolvimento
git checkout -b redesign-corporativo

# Adicionar arquivos modificados
git add styles_v3.css
git add REDESIGN_CORPORATIVO.md
git add GUIA_CORES_CORPORATIVAS.md
git add COMPARACAO_ANTES_DEPOIS.md
git add GUIA_USO_CORPORATIVO.md
git add EXEMPLOS_CUSTOMIZACAO.md
git add CHECKLIST_IMPLEMENTACAO.md
git add RESUMO_REDESIGN.txt
git add ARQUIVOS_CRIADOS.md
git add RESUMO_VISUAL.txt
git add INSTRUCOES_DEPLOY.md

# Fazer commit
git commit -m "feat: redesign corporativo com paleta profissional

- Atualizar paleta de cores (roxo/rosa → cinza/azul)
- Refinar tipografia e espaçamento
- Otimizar animações (mais discretas)
- Adicionar documentação completa
- Melhorar acessibilidade (WCAG AA+)"

# Fazer push
git push origin redesign-corporativo
```

### Passo 2: Criar Pull Request

1. Ir para GitHub
2. Clicar em "Compare & pull request"
3. Preencher descrição:
   ```
   ## Redesign Corporativo
   
   ### Mudanças
   - Paleta de cores corporativa
   - Tipografia refinada
   - Espaçamento aumentado
   - Animações discretas
   - Documentação completa
   
   ### Testes
   - [x] Navegadores principais
   - [x] Responsividade
   - [x] Acessibilidade
   - [x] Performance
   
   ### Documentação
   - REDESIGN_CORPORATIVO.md
   - GUIA_CORES_CORPORATIVAS.md
   - Mais 6 arquivos de documentação
   ```
4. Clicar em "Create pull request"

### Passo 3: Revisar e Mergear

1. Aguardar aprovação de reviewers
2. Resolver conflitos se houver
3. Clicar em "Merge pull request"
4. Clicar em "Confirm merge"
5. Deletar branch de desenvolvimento

### Passo 4: Deploy em Produção

```bash
# Atualizar main localmente
git checkout main
git pull origin main

# Verificar se tudo está correto
git log --oneline -5

# GitHub Pages faz deploy automaticamente
# Acessar: https://seu-usuario.github.io/relatorio-seguranca-v3
```

---

## 🎯 OPÇÃO 2: NETLIFY (Drag & Drop)

### Passo 1: Preparar Arquivos

1. Copiar `relatorio_v3.html`
2. Renomear para `index.html`
3. Garantir que `styles_v3.css` e `script_v3.js` estão na mesma pasta

### Passo 2: Upload para Netlify

1. Ir para [netlify.com](https://netlify.com)
2. Fazer login ou criar conta
3. Clicar em "New site from Git"
4. Selecionar repositório
5. Configurar build (deixar em branco para HTML puro)
6. Clicar em "Deploy site"

### Passo 3: Configurar Domínio

1. Ir para "Site settings"
2. Clicar em "Change site name"
3. Digitar novo nome (ex: relatorio-seguranca)
4. Salvar

### Resultado
- URL: `https://relatorio-seguranca.netlify.app`

---

## 🎯 OPÇÃO 3: SERVIDOR PRÓPRIO

### Passo 1: Preparar Servidor

```bash
# Conectar ao servidor
ssh usuario@seu-servidor.com

# Criar diretório
mkdir -p /var/www/relatorio-seguranca
cd /var/www/relatorio-seguranca

# Clonar repositório
git clone https://github.com/seu-usuario/relatorio-seguranca-v3.git .
```

### Passo 2: Configurar Nginx

```nginx
server {
    listen 80;
    server_name relatorio.sua-empresa.com;
    
    # Redirecionar para HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name relatorio.sua-empresa.com;
    
    # Certificado SSL
    ssl_certificate /etc/letsencrypt/live/relatorio.sua-empresa.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/relatorio.sua-empresa.com/privkey.pem;
    
    # Diretório raiz
    root /var/www/relatorio-seguranca;
    index index.html relatorio_v3.html;
    
    # Headers de segurança
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Cache
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Fallback para HTML
    location / {
        try_files $uri $uri/ /relatorio_v3.html;
    }
}
```

### Passo 3: Configurar SSL

```bash
# Instalar Certbot
sudo apt-get install certbot python3-certbot-nginx

# Gerar certificado
sudo certbot certonly --nginx -d relatorio.sua-empresa.com

# Renovação automática
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

### Passo 4: Reiniciar Nginx

```bash
sudo systemctl restart nginx
```

---

## 🧪 TESTES PÓS-DEPLOY

### Verificação Imediata

```bash
# Testar acesso
curl -I https://relatorio.sua-empresa.com

# Verificar headers de segurança
curl -I https://relatorio.sua-empresa.com | grep -E "Strict-Transport|X-Content"

# Testar performance
curl -w "@curl-format.txt" -o /dev/null -s https://relatorio.sua-empresa.com
```

### Testes Manuais

- [ ] Acessar em Chrome
- [ ] Acessar em Firefox
- [ ] Acessar em Safari
- [ ] Acessar em Edge
- [ ] Testar em mobile
- [ ] Testar em tablet
- [ ] Verificar cores
- [ ] Verificar tipografia
- [ ] Testar auto-save
- [ ] Testar PDF
- [ ] Testar validação
- [ ] Testar atalhos (Ctrl+S, Ctrl+P)

### Testes de Performance

```bash
# Usar Google PageSpeed Insights
# https://pagespeed.web.dev/

# Usar GTmetrix
# https://gtmetrix.com/

# Usar WebPageTest
# https://www.webpagetest.org/
```

---

## 📊 MONITORAMENTO

### Configurar Alertas

```bash
# Uptime monitoring
# Usar: UptimeRobot, Pingdom, ou similar

# Error tracking
# Usar: Sentry, Rollbar, ou similar

# Analytics
# Usar: Google Analytics, Plausible, ou similar
```

### Verificar Logs

```bash
# Nginx
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# Sistema
journalctl -u nginx -f
```

---

## 🔄 ROLLBACK (Se Necessário)

### GitHub Pages

```bash
# Reverter commit
git revert <commit-hash>
git push origin main

# Ou resetar para versão anterior
git reset --hard <commit-hash>
git push -f origin main
```

### Netlify

1. Ir para "Deploys"
2. Clicar no deploy anterior
3. Clicar em "Publish deploy"

### Servidor Próprio

```bash
# Reverter para versão anterior
cd /var/www/relatorio-seguranca
git revert <commit-hash>
git pull

# Ou restaurar backup
rsync -av /backup/relatorio-seguranca/ /var/www/relatorio-seguranca/
```

---

## 📝 COMUNICAÇÃO

### Email para Usuários

```
Assunto: Novo Design do Relatório de Segurança

Prezados Usuários,

Estamos felizes em anunciar o lançamento da versão redesenhada do 
Relatório Digital de Segurança!

MUDANÇAS:
✅ Design mais profissional e corporativo
✅ Melhor legibilidade
✅ Espaçamento aumentado
✅ Cores mais refinadas

COMPATIBILIDADE:
✅ Todas as funcionalidades mantidas
✅ Dados anteriores carregam normalmente
✅ Auto-save continua funcionando

SUPORTE:
Se tiver dúvidas, entre em contato:
- Email: suporte@sua-empresa.com
- WhatsApp: +244 942 479 552

Obrigado,
Equipe de Segurança
```

### Anúncio em Slack/Teams

```
🎨 Novo Design Disponível!

Estamos lançando a versão redesenhada do Relatório de Segurança com:
- Paleta corporativa
- Tipografia refinada
- Melhor acessibilidade

Acesse: https://relatorio.sua-empresa.com

Feedback? Reaja com 👍 ou comente aqui!
```

---

## ✅ CHECKLIST FINAL

- [ ] Código revisado
- [ ] Testes passando
- [ ] Documentação atualizada
- [ ] Backup realizado
- [ ] Deploy em staging OK
- [ ] Testes em staging OK
- [ ] Aprovação de stakeholders
- [ ] Comunicação aos usuários
- [ ] Deploy em produção
- [ ] Verificação pós-deploy
- [ ] Monitoramento ativo
- [ ] Suporte disponível

---

## 🎉 SUCESSO!

Quando todos os itens estiverem marcados, seu redesign corporativo está em produção!

---

## 📞 SUPORTE

Se tiver problemas durante o deploy:

- 📧 Email: lucianoamos@gmail.com
- 💬 Discord: lucianoamos
- 📱 WhatsApp: +244 942 479 552

---

**Deploy Guide v1.0**
**Última atualização: Novembro 2025**
