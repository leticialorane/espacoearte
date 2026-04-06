// ════════════════════════════════════════
//  CHATBOT — Espaço & Arte
//  Arquivo: assets/chatbot/chatbot.js
//
//  Classes usadas (espelham o CSS BEM):
//    .chat-btn              → botão flutuante
//    .chat-btn--open        → estado aberto do botão
//    .chat-btn__badge       → bolinha de notificação
//    .chat-btn__icon-chat   → ícone de chat
//    .chat-btn__icon-close  → ícone de fechar
//    .chat-window           → janela principal
//    .chat-window--open     → estado visível da janela
//    .chat-welcome          → tela de boas-vindas
//    .chat-conversation     → tela de conversa
//    .chat-conversation--active → conversa visível
//    .chat-messages         → lista de mensagens
//    .chat-messages__bubble--bot  → bolha do bot
//    .chat-messages__bubble--user → bolha do usuário
//    .chat-messages__typing       → indicador digitando
//    .chat-messages__typing-dot   → ponto do indicador
//    .chat-input__field     → campo de texto
//    .chat-input__send-btn  → botão enviar
// ════════════════════════════════════════

(function () {

  // ── 1. INJEÇÃO DO HTML ──────────────────────────────────────────

  document.body.insertAdjacentHTML('beforeend', `

    <!-- BOTÃO FLUTUANTE -->
    <button class="chat-btn" id="chatBtn" aria-label="Abrir chat">
      <div class="chat-btn__badge" id="chatBtnBadge"></div>

      <svg class="chat-btn__icon-chat" width="24" height="24" fill="none"
           stroke="#C8D4AE" stroke-width="2" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>

      <svg class="chat-btn__icon-close" width="20" height="20" fill="none"
           stroke="#C8D4AE" stroke-width="2.5" viewBox="0 0 24 24">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </button>

    <!-- JANELA PRINCIPAL -->
    <div class="chat-window" id="chatWindow">

      <!-- TELA 1: BOAS-VINDAS -->
      <div class="chat-welcome" id="chatWelcome">
        <div class="chat-welcome__hero">
        <div class="chat-welcome__gold-line"></div>
        <div class="chat-welcome__title">Olá! Bem-vindo à<br>Espaço & Arte</div>
        <div class="chat-welcome__subtitle">Estamos aqui para transformar<br>seus ambientes com estilo.</div>
      </div>

        <div class="chat-welcome__body">
          <div class="chat-welcome__section-label">Como podemos ajudar?</div>

          <div class="chat-welcome__info-card">
            <div class="chat-welcome__info-icon">
              <svg width="18" height="18" fill="none" stroke="#4A5535" stroke-width="2" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div>
              <div class="chat-welcome__info-title">Atendimento especializado</div>
              <div class="chat-welcome__info-desc">Móveis planejados e interiores</div>
            </div>
          </div>

          <div class="chat-welcome__info-card">
            <div class="chat-welcome__info-icon">
              <svg width="18" height="18" fill="none" stroke="#4A5535" stroke-width="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <div>
              <div class="chat-welcome__info-title">Horário de atendimento</div>
              <div class="chat-welcome__info-desc">Seg–Sex, 8h às 18h · Sáb, 9h às 12h</div>
            </div>
          </div>

          <button class="chat-welcome__start-btn" id="chatStartBtn">
            Iniciar conversa
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- TELA 2: CONVERSA -->
      <div class="chat-conversation" id="chatConversation">

        <div class="chat-conversation__header">
          <button class="chat-conversation__back-btn" id="chatBackBtn" aria-label="Voltar">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
          <div class="chat-conversation__title">Espaço & Arte</div>
        </div>

        <div class="chat-messages" id="chatMessages"></div>

        <div class="chat-input">
          <input class="chat-input__field" id="chatInputField" type="text"
                 placeholder="Digite sua mensagem..." autocomplete="off">
          <button class="chat-input__send-btn" id="chatSendBtn" aria-label="Enviar">
            <svg width="15" height="15" fill="none" stroke="#C8D4AE" stroke-width="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <div class="chat-conversation__footer">Espaço & Arte · Marcenaria Moderna</div>
      </div>

    </div>
  `);


  // ── 2. ROTEIRO DE PERGUNTAS ─────────────────────────────────────

  const steps = [
    {
      key: 'nome',
      bot: 'Olá! Para começarmos, qual é o seu <strong>nome</strong>?'
    },
    {
      key: 'telefone',
      bot: 'Prazer, <strong>{nome}</strong>!<br>Qual é o melhor <strong>telefone</strong> para contato?<br><em>Não esqueça o DDD.</em>'
    },
    {
      key: 'procura',
      bot: '<strong>{nome}</strong>, como podemos te ajudar?<br><em>Conte quais móveis procura ou os espaços que deseja decorar.</em>'
    },
    {
      key: 'fim',
      bot: 'Perfeito, <strong>{nome}</strong>! Nossa equipe já recebeu suas informações e entrará em contato em breve.'
    },
  ];


  // ── 3. ESTADO ───────────────────────────────────────────────────

  let currentStep  = 0;
  let collectedData = {};
  let isOpen       = false;
  let isLocked     = false;
  let conversationStarted = false;


  // ── 4. REFERÊNCIAS AO DOM ───────────────────────────────────────

  const chatBtn          = document.getElementById('chatBtn');
  const chatWindow       = document.getElementById('chatWindow');
  const chatBtnBadge     = document.getElementById('chatBtnBadge');
  const chatWelcome      = document.getElementById('chatWelcome');
  const chatConversation = document.getElementById('chatConversation');
  const chatStartBtn     = document.getElementById('chatStartBtn');
  const chatBackBtn      = document.getElementById('chatBackBtn');
  const chatMessages     = document.getElementById('chatMessages');
  const chatInputField   = document.getElementById('chatInputField');
  const chatSendBtn      = document.getElementById('chatSendBtn');


  // ── 5. ABRIR / FECHAR JANELA ────────────────────────────────────

  chatBtn.addEventListener('click', () => {
    isOpen = !isOpen;
    chatWindow.classList.toggle('chat-window--open', isOpen);
    chatBtn.classList.toggle('chat-btn--open', isOpen);
    chatBtnBadge.style.opacity = isOpen ? '0' : '1';
    if (isOpen && conversationStarted) {
      setTimeout(() => chatInputField.focus(), 350);
    }
  });


  // ── 6. NAVEGAR ENTRE TELAS ──────────────────────────────────────

  chatStartBtn.addEventListener('click', () => {
    chatWelcome.style.display = 'none';
    chatConversation.classList.add('chat-conversation--active');
    conversationStarted = true;
    if (currentStep === 0) setTimeout(advanceStep, 400);
    setTimeout(() => chatInputField.focus(), 350);
  });

  chatBackBtn.addEventListener('click', () => {
    chatConversation.classList.remove('chat-conversation--active');
    chatWelcome.style.display = 'flex';
  });


  // ── 7. FLUXO DE CONVERSA ────────────────────────────────────────

  function advanceStep() {
    if (currentStep >= steps.length) return;

    const currentStepData = steps[currentStep];

    if (currentStepData.key === 'fim') lockInput();

    showTypingThen(() => {
      const message = currentStepData.bot.replace(/{nome}/g, collectedData.nome || '');
      appendBotBubble(message);
      currentStep++;
      if (steps[currentStep - 1].key !== 'fim') unlockInput();
    });
  }

  function handleUserSend() {
    if (isLocked) return;

    const userText = chatInputField.value.trim();
    if (!userText) return;

    appendUserBubble(userText);
    chatInputField.value = '';

    const previousStep = steps[currentStep - 1];
    if (previousStep?.key === 'nome')     collectedData.nome     = userText;
    if (previousStep?.key === 'telefone') collectedData.telefone = userText;
    if (previousStep?.key === 'procura')  collectedData.procura  = userText;

    lockInput();
    setTimeout(advanceStep, 600);
  }

  chatSendBtn.addEventListener('click', handleUserSend);
  chatInputField.addEventListener('keydown', e => {
    if (e.key === 'Enter') handleUserSend();
  });


  // ── 8. MANIPULAÇÃO DO DOM DE MENSAGENS ─────────────────────────

  function appendBotBubble(html) {
    const bubble = document.createElement('div');
    bubble.className = 'chat-messages__bubble--bot';
    bubble.innerHTML = html;
    chatMessages.appendChild(bubble);
    scrollToBottom();
  }

  function appendUserBubble(text) {
    const bubble = document.createElement('div');
    bubble.className = 'chat-messages__bubble--user';
    bubble.textContent = text;
    chatMessages.appendChild(bubble);
    scrollToBottom();
  }

  function showTypingThen(callback) {
    const indicator = document.createElement('div');
    indicator.className = 'chat-messages__typing';
    indicator.innerHTML = `
      <span class="chat-messages__typing-dot"></span>
      <span class="chat-messages__typing-dot"></span>
      <span class="chat-messages__typing-dot"></span>
    `;
    chatMessages.appendChild(indicator);
    scrollToBottom();

    const delay = 900 + Math.random() * 500;
    setTimeout(() => { indicator.remove(); callback(); }, delay);
  }

  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }


  // ── 9. BLOQUEIO DO INPUT ────────────────────────────────────────

  function lockInput() {
    isLocked = true;
    chatInputField.disabled = true;
    chatSendBtn.disabled    = true;
  }

  function unlockInput() {
    isLocked = false;
    chatInputField.disabled = false;
    chatSendBtn.disabled    = false;
    chatInputField.focus();
  }

})();