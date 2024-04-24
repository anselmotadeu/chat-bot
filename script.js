const apiKey = 'AIzaSyD3JkH5fQSdOl_K8fWol9VHTY18ZzuHot4';

const recognition = new webkitSpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.continuous = true;

const translations = {
    "Hi, how are you?": "Oi, como você está?",
    "I'm fine, thanks. And how're you?": "Estou bem, obrigado. E você, como está?",
    "What's your name?": "Qual é o seu nome?",
    "My name is GitHub Copilot.": "Meu nome é GitHub Copilot.",
    "What can you do?": "O que você pode fazer?",
    "I can assist with software development tasks.": "Eu posso ajudar com tarefas de desenvolvimento de software.",
    "Tell me a joke.": "Conte-me uma piada.",
    "Why don't programmers like nature? It has too many bugs.": "Por que os programadores não gostam da natureza? Ela tem muitos bugs.",
    "Where do you live?": "Onde você mora?",
    "As an AI, I don't have a physical location.": "Como uma IA, eu não tenho uma localização física.",
    "What's your favorite color?": "Qual é a sua cor favorita?",
    "As an AI, I don't have personal preferences.": "Como uma IA, eu não tenho preferências pessoais.",
    "What is software quality?": "O que é qualidade de software?",
    "Software quality refers to the degree to which a software product meets specified requirements, customer needs and expectations.": "A qualidade do software refere-se ao grau em que um produto de software atende aos requisitos especificados, às necessidades e expectativas do cliente.",
    "What is a bug?": "O que é um bug?",
    "In software development, a bug is an error, flaw or fault in a computer program that causes it to produce an incorrect or unexpected result.": "No desenvolvimento de software, um bug é um erro, falha ou defeito em um programa de computador que faz com que ele produza um resultado incorreto ou inesperado.",
    "What is unit testing?": "O que é teste unitário?",
    "Unit testing is a level of software testing where individual units or components of a software are tested.": "O teste unitário é um nível de teste de software onde unidades individuais ou componentes de um software são testados.",
    "Sorry, but I still don't know how to answer that question. I'm in the learning phase. You could try asking Google Translator.": "Desculpe, mas ainda não sei como responder a essa pergunta. Estou na fase de aprendizado. Você poderia tentar perguntar ao Google Tradutor.",
    "Eu não entendo muito o Português, então por favor, fale comigo em Inglês.": "I don't understand Portuguese very well, so please speak to me in English."
    // Adicione mais traduções aqui...
};

const synthesis = window.speechSynthesis;

const userInput = document.getElementById('user-input');
const voiceIcon = document.getElementById('voice-icon');
const sendButton = document.getElementById('send-button');
const chatBox = document.getElementById('chat-box');

voiceIcon.addEventListener('click', () => {
    recognition.start();
});

recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript;
    userInput.value = transcript;
};

recognition.onerror = (event) => {
    console.error('Erro ao reconhecer a fala:', event.error);
};

recognition.onend = () => {
    recognition.start();
};

function getResponse(message) {
    const normalizedMessage = message.toLowerCase().replace(/[.,?!]/g, '').trim();

    const portugueseCharacters = ['ã', 'á', 'à', 'â', 'é', 'ê', 'í', 'ó', 'ô', 'õ', 'ú', 'ç'];
    const isPortuguese = portugueseCharacters.some(character => normalizedMessage.includes(character));

    if (isPortuguese) {
        return "Eu não entendo muito o Português, então por favor, fale comigo em Inglês.";
    }

    if (normalizedMessage === "hi how are you") {
        return "I'm fine, thanks. And how're you?";
    } else if (normalizedMessage === "what's your name") {
        return "My name is GitHub Copilot.";
    } else if (normalizedMessage === "what can you do") {
        return "I can assist with software development tasks.";
    } else if (normalizedMessage === "tell me a joke") {
        return "Why don't programmers like nature? It has too many bugs.";
    } else if (normalizedMessage === "where do you live") {
        return "As an AI, I don't have a physical location.";
    } else if (normalizedMessage === "what's your favorite color") {
        return "As an AI, I don't have personal preferences.";
    } else if (normalizedMessage === "what is software quality") {
        return "Software quality refers to the degree to which a software product meets specified requirements, customer needs and expectations.";
    } else if (normalizedMessage === "what is a bug") {
        return "In software development, a bug is an error, flaw or fault in a computer program that causes it to produce an incorrect or unexpected result.";
    } else if (normalizedMessage === "what is unit testing") {
        return "Unit testing is a level of software testing where individual units or components of a software are tested.";
    } else {
        return "Sorry, but I still don't know how to answer that question. I'm in the learning phase. You could try asking Google Translator.";
    }
}

const errorMessage = document.createElement('div');
errorMessage.id = 'error-message';
errorMessage.style.color = 'red';

sendButton.addEventListener('click', () => {
    const message = userInput.value;

    if (message.trim() === '') {
        errorMessage.textContent = 'Sou um chat para conversação, por favor, insira uma mensagem antes de clicar no botão de enviar.';
        errorMessage.style.marginTop = '5px';
        errorMessage.style.fontSize = '0.8em';
        userInput.parentNode.insertBefore(errorMessage, userInput.nextSibling);

        userInput.style.borderColor = 'red';

        setTimeout(() => {
            errorMessage.textContent = '';
            userInput.style.borderColor = '';
        }, 4000);
    } else {
        userInput.style.borderColor = '';

    const messageElement = document.createElement('div');
    messageElement.classList.add('user-message');
    messageElement.innerHTML = '<strong>Você:</strong> ' + message;
    chatBox.appendChild(messageElement);
    userInput.value = '';

    // Adicione os eventos de mouseover e mouseout
    addMouseoverAndMouseoutEvents(messageElement);

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'en-US';
    synthesis.speak(utterance);

    const response = getResponse(message);
    if (response !== "") {
        const responseElement = document.createElement('div');
        responseElement.classList.add('bot-message');
        responseElement.innerHTML = '<strong>Bot:</strong> ' + response;
        chatBox.appendChild(responseElement);

        // Adicione os eventos de mouseover e mouseout
        addMouseoverAndMouseoutEvents(responseElement);

        // Rola a caixa de chat para a última mensagem
        responseElement.scrollIntoView();

        const responseUtterance = new SpeechSynthesisUtterance(response);
        responseUtterance.lang = 'en-US';
        synthesis.speak(responseUtterance);
    }

    const assistantMessageElement = document.createElement('div');
    assistantMessageElement.classList.add('assistant-message');
    assistantMessageElement.innerHTML = 'Assistente: ' + assistantMessage;
    chatBox.appendChild(assistantMessageElement);

    // Adicione os eventos de mouseover e mouseout
    addMouseoverAndMouseoutEvents(assistantMessageElement);
}
});

userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita a ação padrão da tecla Enter

        const message = userInput.value;

        if (message.trim() === '') {
            errorMessage.textContent = 'Sou um chat para conversação, por favor, insira uma mensagem antes de clicar no botão de enviar.';
            errorMessage.style.marginTop = '5px';
            errorMessage.style.fontSize = '0.8em';
            userInput.parentNode.insertBefore(errorMessage, userInput.nextSibling);

            userInput.style.borderColor = 'red';

            setTimeout(() => {
                errorMessage.textContent = '';
                userInput.style.borderColor = '';
            }, 4000);
        } else {
            userInput.style.borderColor = '';

        const messageElement = document.createElement('div');
        messageElement.innerHTML = '<strong>Você:</strong> ' + message;
        chatBox.appendChild(messageElement);
        userInput.value = '';

        // Adicione os eventos de mouseover e mouseout
        addMouseoverAndMouseoutEvents(messageElement);

        const utterance = new SpeechSynthesisUtterance(message);
        utterance.lang = 'en-US';
        synthesis.speak(utterance);

        const response = getResponse(message);
        if (response !== "") {
            const responseElement = document.createElement('div');
            responseElement.innerHTML = '<strong>Bot:</strong> ' + response;
            chatBox.appendChild(responseElement);

            const responseUtterance = new SpeechSynthesisUtterance(response);
            responseUtterance.lang = 'en-US';
            synthesis.speak(responseUtterance);

            // Adicione os eventos de mouseover e mouseout
            addMouseoverAndMouseoutEvents(responseElement);

            // Rola a caixa de chat para a última mensagem
            responseElement.scrollIntoView();
        }
    }
    

    const assistantMessageElement = document.createElement('div');
        assistantMessageElement.textContent = 'Assistente: ' + assistantMessage;
        chatBox.appendChild(assistantMessageElement);

        // Adicione os eventos de mouseover e mouseout
        addMouseoverAndMouseoutEvents(assistantMessageElement);
}
});

function addMouseoverAndMouseoutEvents(element) {
    element.addEventListener('mouseover', function() {
        let text = this.textContent;
        if (text.startsWith('Você: ')) {
            text = text.replace('Você: ', '');
        } else if (text.startsWith('Bot: ')) {
            text = text.replace('Bot: ', '');
        }
        const translation = translations[text];
        if (translation) {
            this.title = translation;
        }
    });

    element.addEventListener('mouseout', function() {
        this.title = '';
    });
}

// Obtenha todos os itens da lista de perguntas
const questionItems = document.querySelectorAll('#questions-list li');

// Adicione um evento de clique a cada item
for (let i = 0; i < questionItems.length; i++) {
    questionItems[i].addEventListener('click', function() {
        // Quando um item é clicado, copie o texto da pergunta para a caixa de texto
        const userInput = document.getElementById('user-input');
        userInput.value = this.textContent;
    });
}