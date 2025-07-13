// Wait for DOM to load
window.addEventListener('DOMContentLoaded', function() {
    const submitButtons = document.querySelectorAll('.submit-btn');
    const modal = new bootstrap.Modal(document.getElementById('loaderModal'));
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalLoader = document.getElementById('modalLoader');
    const modalCompleteMsg = document.getElementById('modalCompleteMsg');
    const modalPrompt = document.getElementById('modalPrompt');
    const form = document.getElementById('mainForm');

    // Helper to get row input values
    function getRowData(row) {
        const input = row.querySelector('input[type="text"]');
        const record = row.querySelector('input[name^="record"]');
        const screenshot = row.querySelector('input[name^="screenshot"]');
        return {
            field: input.value.trim(),
            record: record.checked,
            screenshot: screenshot.checked
        };
    }

    // Attach event listeners to each submit button
    submitButtons.forEach((btn, idx) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = btn.closest('.row');
            const input = row.querySelector('input[type="text"]');
            if (!input.value.trim()) {
                input.classList.add('is-invalid');
                input.focus();
                return;
            } else {
                input.classList.remove('is-invalid');
            }

            // Show modal
            modalPrompt.textContent = 'Processing your request...';
            modalLoader.style.display = '';
            modalCompleteMsg.style.display = 'none';
            modal.show();

            // Simulate loader
            setTimeout(() => {
                modalLoader.style.display = 'none';
                modalCompleteMsg.style.display = '';
                modalPrompt.textContent = '';
            }, 3000);

            // Optionally, send data to backend

            const data = getRowData(row);
            fetch('/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(resp => {
                // handle response
            });

        });
    });

    // Close modal on cross button
    closeModalBtn.addEventListener('click', function() {
        modal.hide();
    });

    // Prevent form submission on Enter
    form.addEventListener('submit', function(e) {
        e.preventDefault();
    });
}); 