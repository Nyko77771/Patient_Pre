document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('detailsForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = {
                firstName: document.getElementById('firstName').value.trim(),
                lastName: document.getElementById('lastName').value.trim(),
                dateOfBirth: document.getElementById('dateOfBirth').value.trim(),
                phoneNumber: document.getElementById('phoneNumber').value.trim(),
                bloodGroup: document.getElementById('bloodGroup').value.trim(),
                height: document.getElementById('height').value.trim(),
                weight: document.getElementById('weight').value.trim(),
                eireCode: document.getElementById('eireCode').value.trim(),
                address: document.getElementById('address').value.trim()
            };

            // Validate form inputs
            let isValid = true;

            Object.keys(formData).forEach(key => {
                if (!formData[key]) {
                    showError(document.getElementById(key), 'This field is required.');
                    isValid = false;
                }
                if ((key === 'phoneNumber' || key === 'height' || key === 'weight') && isNaN(formData[key])) {
                    showError(document.getElementById(key), `${key} must be a number.`);
                    isValid = false;
                }
                if (key === 'dateOfBirth' && !/^[\d-]+$/.test(formData[key])) {
                    showError(document.getElementById(key), 'Date of Birth must contain only numbers and hyphens.');
                    isValid = false;
                }
            });

            if (isValid) {
                fetch('/details', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Details saved successfully!');
                        window.location.href = '/';
                    } else {
                        alert('Failed to save details. Error: ' + data.error);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Failed to save details. Error: ' + error.message);
                });
            }
        });
    }


    const viewDetailsButton = document.getElementById('viewDetailsButton');
    const editDetailsButton = document.getElementById('editDetailsButton');
    const deleteDetailsButton = document.getElementById('deleteDetailsButton');
    const personalDetailsContainer = document.getElementById('personalDetailsContainer');

    if (viewDetailsButton) {
        viewDetailsButton.addEventListener('click', () => {
            fetch('/user-details')
                .then(response => response.json())
                .then(details => {
                    personalDetailsContainer.innerHTML = '';

                    if (details) {
                        const detailsBox = document.createElement('div');
                        detailsBox.classList.add('details-box');

                        const keys = ['firstName', 'lastName', 'dateofBirth', 'phoneNumber', 'bloodGroup', 'height', 'weight', 'eireCode', 'address'];
                        const labels = ['First Name', 'Last Name', 'Date of Birth', 'Phone Number', 'Blood Group', 'Height', 'Weight', 'Eire Code', 'Address'];

                        keys.forEach((key, index) => {
                            const p = document.createElement('p');
                            p.textContent = `${labels[index]}: ${details[key]}`;
                            detailsBox.appendChild(p);
                        });

                        personalDetailsContainer.appendChild(detailsBox);
                    } else {
                        const detailsBox = document.createElement('div');
                        detailsBox.classList.add('details-box');

                        const p = document.createElement('p');
                        p.textContent = 'No details available.';
                        detailsBox.appendChild(p);

                        personalDetailsContainer.appendChild(detailsBox);
                    }
                })
                .catch(error => console.error('Error:', error));
        });
    }

    if (editDetailsButton) {
        editDetailsButton.addEventListener('click', () => {
            fetch('/user-details')
                .then(response => response.json())
                .then(details => {
                    if (details) {
                        window.location.href = '/details';
                    }
                })
                .catch(error => console.error('Error:', error));
        });
    }

    if (deleteDetailsButton) {
        deleteDetailsButton.addEventListener('click', () => {
            fetch('/user-details', { method: 'DELETE' })
                .then(response => response.json())
                .then(data => {

                    personalDetailsContainer.innerHTML = '';

                    const detailsBox = document.createElement('div');
                    detailsBox.classList.add('details-box');

                    const p = document.createElement('p');
                    p.textContent = 'Details deleted successfully.';
                    detailsBox.appendChild(p);

                    personalDetailsContainer.appendChild(detailsBox);
                })
                .catch(error => console.error('Error:', error));
        });
    }
});



    const showError = (input, message) => {
        const error = document.createElement('div');
        error.className = 'error';
        error.style.color = 'red';
        error.textContent = message;
        input.parentElement.insertBefore(error, input.nextSibling);
    };

