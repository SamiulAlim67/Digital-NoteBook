// scripts.js

document.addEventListener('DOMContentLoaded', function() {
    const noteTitle = document.getElementById('noteTitle');
    const noteContent = document.getElementById('noteContent');
    const noteTags = document.getElementById('noteTags');
    const noteCreationDate = document.getElementById('noteCreationDate');
    const noteCreationTime = document.getElementById('noteCreationTime');
    const setReminder = document.getElementById('setReminder');
    const reminderOptions = document.getElementById('reminderOptions');
    const reminderDate = document.getElementById('reminderDate');
    const reminderTime = document.getElementById('reminderTime');
    const saveNote = document.getElementById('saveNote');
    const notesContainer = document.getElementById('notesContainer');
    const remindersContainer = document.getElementById('remindersContainer');

    setReminder.addEventListener('change', function() {
        if (setReminder.checked) {
            reminderOptions.style.display = 'block';
        } else {
            reminderOptions.style.display = 'none';
        }
    });

    saveNote.addEventListener('click', function() {
        const title = noteTitle.value;
        const content = noteContent.value;
        const tags = noteTags.value.split(',').map(tag => tag.trim());
        const date = noteCreationDate.value;
        const time = noteCreationTime.value;
        const reminder = setReminder.checked;
        const reminderDateTime = reminderDate.value + 'T' + reminderTime.value;

        if (title && content && date && time) {
            const dateTime = date + 'T' + time;
            const note = createNoteElement(title, content, tags, dateTime, reminder, reminderDateTime);
            notesContainer.appendChild(note);

            // Clear input fields
            noteTitle.value = '';
            noteContent.value = '';
            noteTags.value = '';
            noteCreationDate.value = '';
            noteCreationTime.value = '';
            setReminder.checked = false;
            reminderOptions.style.display = 'none';

            if (reminder && reminderDate.value && reminderTime.value) {
                const reminderElement = createReminderElement(title, reminderDateTime);
                remindersContainer.appendChild(reminderElement);
            }
        } else {
            alert('Please fill in all required fields');
        }
    });

    function createNoteElement(title, content, tags, dateTime, reminder, reminderDateTime) {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');

        const noteTitleDiv = document.createElement('div');
        noteTitleDiv.classList.add('note-title');
        noteTitleDiv.textContent = title;

        const noteContentDiv = document.createElement('div');
        noteContentDiv.classList.add('note-content');
        noteContentDiv.textContent = content;

        const noteTagsDiv = document.createElement('div');
        noteTagsDiv.classList.add('note-tags');
        noteTagsDiv.textContent = 'Tags: ' + tags.join(', ');

        const noteDateTimeDiv = document.createElement('div');
        noteDateTimeDiv.classList.add('note-datetime');
        noteDateTimeDiv.textContent = 'Date & Time: ' + new Date(dateTime).toLocaleString();

        if (reminder) {
            const noteReminderDiv = document.createElement('div');
            noteReminderDiv.classList.add('note-reminder');
            noteReminderDiv.textContent = 'Reminder set for: ' + new Date(reminderDateTime).toLocaleString();
            noteDiv.appendChild(noteReminderDiv);
        }

        noteDiv.appendChild(noteTitleDiv);
        noteDiv.appendChild(noteContentDiv);
        noteDiv.appendChild(noteTagsDiv);
        noteDiv.appendChild(noteDateTimeDiv);

        return noteDiv;
    }

    function createReminderElement(title, dateTime) {
        const reminderDiv = document.createElement('div');
        reminderDiv.classList.add('reminder');

        const reminderTitleDiv = document.createElement('div');
        reminderTitleDiv.classList.add('reminder-title');
        reminderTitleDiv.textContent = title;

        const reminderDateTimeDiv = document.createElement('div');
        reminderDateTimeDiv.classList.add('reminder-datetime');
        reminderDateTimeDiv.textContent = 'Reminder set for: ' + new Date(dateTime).toLocaleString();

        const reminderClockDiv = document.createElement('div');
        reminderClockDiv.classList.add('reminder-clock');

        reminderDiv.appendChild(reminderTitleDiv);
        reminderDiv.appendChild(reminderDateTimeDiv);
        reminderDiv.appendChild(reminderClockDiv);

        // Set interval to update the countdown every second
        setInterval(() => {
            const timeRemaining = getTimeRemaining(dateTime);
            reminderClockDiv.textContent = formatTimeRemaining(timeRemaining);

            if (timeRemaining.total <= 0) {
                alert(`Reminder for "${title}"`);
                reminderDiv.remove();
            }
        }, 1000);

        return reminderDiv;
    }

    function getTimeRemaining(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));

        return {
            total,
            days,
            hours,
            minutes,
            seconds
        };
    }

    function formatTimeRemaining(time) {
        return `${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s`;
    }
});

