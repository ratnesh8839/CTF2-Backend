document.getElementById('rollForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const rollno = document.getElementById('rollno').value.trim(); // Trim any whitespace
    const input32 = document.getElementById('input32').value.trim(); // Trim any whitespace

    try {
        // Send data to backend for validation
        const response = await fetch('/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rollno, input32 })
        });

        const result = await response.json();

        if (result.success) {
            // Show the link if valid
            document.getElementById('message').innerText = '';
            const linkContainer = document.getElementById('linkContainer');
            linkContainer.innerHTML = `<a href="${result.link}" target="_blank">${result.link}</a>`;
        } else {
            document.getElementById('message').innerText = 'Wrong Key';
            document.getElementById('linkContainer').innerHTML = ''; // Clear link if invalid
        }
    } catch (error) {
        console.error('Error during validation:', error);
        document.getElementById('message').innerText = 'An error occurred. Please try again later.';
    }
});
