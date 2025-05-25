document.addEventListener('DOMContentLoaded', function() {

    
    const validateForm = (formId) => {
      const form = document.getElementById(formId);
      if (!form) return;
  
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
  
       
        form.querySelectorAll('[required]').forEach(field => {
          if (!field.value.trim()) {
            field.style.borderColor = '#ff6b6b';
            isValid = false;
          } else {
            field.style.borderColor = '#2a623d'; // Slytherin green
          }
        });
  
        const urlField = form.querySelector('input[type="url"]');
        if (urlField && !isValidUrl(urlField.value)) {
          urlField.style.borderColor = '#ff6b6b';
          isValid = false;
          alert('Please enter a valid Spotify/YouTube URL');
        }
  
        if (isValid) {
         
          const submitBtn = form.querySelector('button[type="submit"]');
          submitBtn.innerHTML = 'Submitted! 🐇';
          submitBtn.disabled = true;
          
          console.log('Form data:', new FormData(form));
        
          setTimeout(() => {
            submitBtn.innerHTML = 'Submit Again';
            submitBtn.disabled = false;
          }, 2000);
        }
      });
    };
  
   
    const isValidUrl = (url) => {
      try {
        new URL(url);
        return url.includes('spotify.com') || url.includes('youtube.com');
      } catch {
        return false;
      }
    };
  
  
    const setupGenreFilter = () => {
      const filterButtons = document.querySelectorAll('.filter-btn');
      if (!filterButtons.length) return;
  
      filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          
      
          filterButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          
          const genre = btn.textContent.toLowerCase();
          filterBooks(genre);
        });
      });
    };
  
    const filterBooks = (genre) => {
      const books = document.querySelectorAll('.book-card');
      books.forEach(book => {
        const bookGenre = book.querySelector('.genre-tag').textContent.toLowerCase();
        if (genre === 'all' || bookGenre === genre) {
          book.style.display = 'block';
        } else {
          book.style.display = 'none';
        }
      });
    };
  

    const loadPlaylist = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const playlistId = urlParams.get('id');
      
      
      const playlistEmbed = document.querySelector('.music-player iframe');
      if (playlistEmbed) {
        // Example: Update Spotify embed (replace with dynamic logic)
        playlistEmbed.src = `https://open.spotify.com/embed/playlist/${playlistId || '37i9dQZF1DX4WYpdgoIcn6'}`;
      }
    };
  

    validateForm('submission-form');
    validateForm('feedback-form');
    setupGenreFilter();
    loadPlaylist();
  
 
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-3px)';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
      });
    });
  
   
    console.log('%c🐇 Welcome to BookBunny! 🎧', 
      'color: #1a472a; font-size: 16px; font-family: sans-serif;');
  });