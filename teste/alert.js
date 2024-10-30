function showCustomAlert(header, message) {
    const alertBox = document.getElementById('custom-alert');
    const alertHeader = document.getElementById('alert-header');
    const alertMessage = document.getElementById('alert-message');
    
    alertHeader.textContent = header;  // Definir o título do alerta
    alertMessage.textContent = message;  // Definir a mensagem do alerta

    alertBox.style.display = 'flex';  // Mostrar o alerta

    document.getElementById('alert-ok-btn').addEventListener('click', () => {
        alertBox.style.display = 'none';  // Ocultar o alerta ao clicar em OK
    });
}

// Exemplo de como chamar o alerta personalizado
showCustomAlert('Atenção!', 'Por favor, insira sua matrícula institucional.');
