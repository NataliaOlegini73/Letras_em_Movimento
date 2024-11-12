// Selecionando o elemento de áudio
const audio = document.getElementById('background-audio');

// Função para iniciar o áudio
function playAudio() {
  // Tenta tocar o áudio
  if (audio.paused) {
    audio.play().catch((error) => {
      console.log('Erro ao tentar tocar o áudio:', error);
    });
  }
}

// Função para pausar o áudio
function pauseAudio() {
  if (!audio.paused) {
    audio.pause();
  }
}

// Detectar quando a página perde ou ganha foco (visibilidade da aba)
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pausa o áudio quando a aba não está visível
    pauseAudio();
  }
});

// Interceptar cliques em links com target="_blank" e pausar o áudio
document.addEventListener('click', (event) => {
  const link = event.target.closest('a');  // Verifica o link mais próximo clicado
  if (link && link.target === '_blank') {
    // Pausa o áudio quando o link for para uma nova aba
    pauseAudio();
  }
});

// Iniciar o áudio quando a página carregar
window.addEventListener('load', () => {
  playAudio();
});

// Variável para armazenar a referência à aba que pode ser reutilizada
let openedWindow = null;

// Função que tenta abrir ou navegar para a aba já aberta
function openInSameTab(event) {
  event.preventDefault();  // Evita o comportamento padrão do link
  
  const link = event.target.href;  // Captura o href do link clicado
  
  // Verifica se a janela já está aberta
  if (openedWindow && !openedWindow.closed) {
    // Se a janela estiver aberta, apenas navega até a URL
    openedWindow.location.href = link;
    openedWindow.focus();
  } else {
    // Caso a janela não esteja aberta, abre uma nova aba
    openedWindow = window.open(link, '_blank');
  }
}

// Adiciona o evento de clique ao link
const linkElement = document.querySelector('.external-link');
linkElement.addEventListener('click', openInSameTab);