function showCustomAlert(header, message) {
    const alertBox = document.getElementById('custom-alert');
    const alertHeader = document.getElementById('alert-header');
    const alertMessage = document.getElementById('alert-message');
    
    alertHeader.textContent = header; 
    alertMessage.textContent = message;  

    alertBox.style.display = 'flex';  

    document.getElementById('alert-ok-btn').addEventListener('click', () => {
        alertBox.style.display = 'none';  
    });
}


showCustomAlert('Atenção!', 'Por favor, insira sua matrícula institucional.');
