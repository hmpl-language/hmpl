const toggleButton = document.getElementById('darkModeToggle');

// On page load: Check localStorage
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  toggleButton.textContent = 'Light Mode'; // Set button text properly
}

// On button click: Toggle and Save to localStorage
toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  
  if (document.body.classList.contains('dark-mode')) {
    toggleButton.textContent = 'Light Mode';
    localStorage.setItem('theme', 'dark'); // Save choice
  } else {
    toggleButton.textContent = 'Dark Mode';
    localStorage.setItem('theme', 'light'); // Save choice
  }
});
