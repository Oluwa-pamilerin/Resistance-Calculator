    // Initialize dark mode from local storage
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeToggle').innerHTML = '<i class="fas fa-moon"></i>';
    }

    function addNewInput() {
        var inputsDiv = document.getElementById('inputs');
        var newInputGroup = document.createElement('div');
        newInputGroup.className = 'input-group';
        newInputGroup.innerHTML = '<label for="resistance" class="new-label elementToRemove">Resistance (ohms):</label><input type="number" class="resistance-input elementToRemove">';
        inputsDiv.appendChild(newInputGroup);
    }

    function dataCollection() {
        var inputs = document.querySelectorAll('.resistance-input');
        var resistances = Array.from(inputs).map(input => parseFloat(input.value));
        var connectionType = document.getElementById('connectionType').value;
        return [connectionType, resistances]
    }
    
    function calculateResistance() {
        data = dataCollection()
        connectionType = data[0]
        resistances = data[1]

        var result;

        if (connectionType === 'parallel') {
            result = 1 / resistances.reduce((accumulator, resistance) => accumulator + (1 / resistance), 0);
        } else {
            result = resistances.reduce((accumulator, resistance) => accumulator + resistance, 0);
        }
        return result;
    }
    
    function processResult() {
        result = calculateResistance()

        // remove all resistance apart from first resistance
        var elementToRemove = document.querySelectorAll('.elementToRemove');
        elementToRemove.forEach((element)=>{
            element.remove();
        });

        // set first resistance to resultant resistance value so as to continue calculation
        var firstResistance = document.getElementById('firstResistance')
        firstResistance.value = result

        document.getElementById('result').innerHTML = 'Resultant Resistance: <b><b>' + result.toFixed(2) + '</b></b> ohms';
    }

    function newCalculation() {
        // Check if dark mode is enabled from local storage and apply
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            document.getElementById('darkModeToggle').innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.body.classList.remove('dark-mode');
            document.getElementById('darkModeToggle').innerHTML = '<i class="fas fa-sun"></i>';
        }
        location.reload();
    }

    function toggleDarkMode() {
        var body = document.body;
        var darkModeToggle = document.getElementById('darkModeToggle');
        var icon = darkModeToggle.querySelector('i');

        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }