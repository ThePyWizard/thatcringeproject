document.addEventListener('DOMContentLoaded', () => {
    const createHeart = () => {
      const heart = document.createElement('div');
      heart.classList.add('floating-heart');
      heart.style.left = `${Math.random() * 100}vw`;
      heart.style.animationDuration = `${Math.random() * 2 + 3}s`;
      document.body.appendChild(heart);
  
      setTimeout(() => {
        heart.remove();
      }, 5000);
    };
  
    setInterval(createHeart, 300);
  });