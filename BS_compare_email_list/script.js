document.getElementById('pd-file-input').addEventListener('change', handleFileSelect, false);
document.getElementById('pm-file-input').addEventListener('change', handleFileSelect, false);

let pdEmails = [];
let pmEmails = [];
let pdEmailToJobTitle = {};
let matchCount = 0;

function handleFileSelect(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        let worksheet;
        if (event.target.id === 'pd-file-input') {
            worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const { emails, emailToJobTitle } = extractEmailsAndJobTitlesFromColumn(worksheet, 7, 4); // Column H is index 7, Column E is index 4
            pdEmails = emails;
            pdEmailToJobTitle = emailToJobTitle;
            document.getElementById('pd-count').textContent = `Project Directory Emails: ${pdEmails.length}`;
        } else if (event.target.id === 'pm-file-input') {
            worksheet = workbook.Sheets['Members'];
            pmEmails = extractEmailsFromColumn(worksheet, 1); // Column B is index 1
            document.getElementById('pm-count').textContent = `Project Member Emails: ${pmEmails.length}`;
        }

        if (pdEmails.length > 0 && pmEmails.length > 0) {
            compareEmails();
        }
    };
    reader.readAsArrayBuffer(file);
}

function extractEmailsAndJobTitlesFromColumn(worksheet, emailColumnIndex, jobTitleColumnIndex) {
    const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emails = [];
    const emailToJobTitle = {};
    
    json.slice(1).forEach(row => {
        const email = row[emailColumnIndex];
        const jobTitle = row[jobTitleColumnIndex];
        if (email && emailPattern.test(email)) {
            const emailLowerCase = email.toLowerCase();
            emails.push(emailLowerCase);
            emailToJobTitle[emailLowerCase] = jobTitle;
        }
    });
    return { emails, emailToJobTitle };
}

function extractEmailsFromColumn(worksheet, columnIndex) {
    const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return json.slice(1).map(row => row[columnIndex]).filter(email => email && emailPattern.test(email)).map(email => email.toLowerCase());
}

function compareEmails() {
    const resultsTableBody = document.querySelector('#results-table tbody');
    const missingEmailsTableBody = document.querySelector('#missing-emails-table tbody');
    resultsTableBody.innerHTML = '';
    missingEmailsTableBody.innerHTML = '';

    matchCount = 0;

    pdEmails.forEach(email => {
        const row = document.createElement('tr');
        const emailCell = document.createElement('td');
        emailCell.textContent = email;
        row.appendChild(emailCell);

        const jobTitleCell = document.createElement('td');
        jobTitleCell.textContent = pdEmailToJobTitle[email] || '';
        row.appendChild(jobTitleCell);

        const statusCell = document.createElement('td');
        if (pmEmails.includes(email)) {
            statusCell.textContent = 'Present';
            matchCount++;
        } else {
            statusCell.textContent = 'Missing';
            const missingRow = document.createElement('tr');
            const missingEmailCell = document.createElement('td');
            missingEmailCell.textContent = email;
            const missingJobTitleCell = document.createElement('td');
            missingJobTitleCell.textContent = pdEmailToJobTitle[email] || '';
            missingRow.appendChild(missingEmailCell);
            missingRow.appendChild(missingJobTitleCell);
            missingEmailsTableBody.appendChild(missingRow);
        }
        row.appendChild(statusCell);
        resultsTableBody.appendChild(row);
    });

    document.getElementById('match-count').textContent = `Matching Emails: ${matchCount}`;
}
