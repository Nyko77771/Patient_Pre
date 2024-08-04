document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('detailsForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // prevent the form from submitting

            const formInputs = Array.from(form.querySelectorAll('input'));
            let isValid = true;
            const formValues = {};

            // Clear previous error messages
            form.querySelectorAll('.error').forEach(errorElement => errorElement.remove());

            formInputs.forEach((input) => {
                const value = input.value.trim();
                formValues[input.id] = value;

                // Check if the field is empty
                if (!value) {
                    showError(input, 'This field is required.');
                    isValid = false;
                }


                // Check if the field should be a number
                if ((input.id === 'phoneNumber') && isNaN(value)) {
                    showError(input, 'This field must be a number.');
                    isValid = false;
                }


                // Check if the dateofBirth field contains only numbers and hyphens
                if (input.id === 'dateofBirth' && !/^[\d-]+$/.test(value)) {
                    showError(input, 'Date of Birth must contain only numbers and hyphens.');
                    isValid = false;
                }

                if ((input.id === 'height' || input.id === 'weight') && isNaN(value)) {
                    showError(input, `${input.placeholder} must be numeric.`);
                    isValid = false;
                }


            });

            if (isValid) {
                // Save the details in local storage
                localStorage.setItem('patientDetails', JSON.stringify(formValues));
                alert('Details saved successfully!');
                // Redirect to index.html
                window.location.href = 'index.html';
            }
        });
    }

    const viewDetailsButton = document.getElementById('viewDetailsButton');
    const editDetailsButton = document.getElementById('editDetailsButton');
    const deleteDetailsButton = document.getElementById('deleteDetailsButton');
    const personalDetailsContainer = document.getElementById('personalDetailsContainer');

    if (viewDetailsButton) {
        viewDetailsButton.addEventListener('click', () => {
            const details = JSON.parse(localStorage.getItem('patientDetails'));
            personalDetailsContainer.innerHTML = ''; // Clear previous content

            if (details) {
                const detailsBox = document.createElement('div');
                detailsBox.classList.add('details-box');

                const keys = ['firstName', 'lastName', 'dateofBirth', 'phoneNumber', 'bloodGroup', 'height', 'weight', 'eircode', 'address'];
                const labels = ['First Name', 'Last Name', 'Date of Birth', 'Phone Number', 'Blood Group', 'Height', 'Weight', 'Eircode', 'Address'];

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
        });
    }

    if (editDetailsButton) {
        editDetailsButton.addEventListener('click', () => {
            window.location.href = 'details.html';
        });
    }

    if (deleteDetailsButton) {
        deleteDetailsButton.addEventListener('click', () => {
            localStorage.removeItem('patientDetails');
            personalDetailsContainer.innerHTML = ''; // Clear previous content

            const detailsBox = document.createElement('div');
            detailsBox.classList.add('details-box');

            const p = document.createElement('p');
            p.textContent = 'Details deleted successfully.';
            detailsBox.appendChild(p);

            personalDetailsContainer.appendChild(detailsBox);
        });
    }
});

function showError(input, message) {
    const error = document.createElement('div');
    error.className = 'error';
    error.style.color = 'red';
    error.textContent = message;
    input.parentElement.insertBefore(error, input.nextSibling);
}
