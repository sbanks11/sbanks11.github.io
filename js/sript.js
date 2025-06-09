function fadeOutAndSlideUp(element, duration) {
  let height = element.offsetHeight;
  let opacity = 1;
  const stepHeight = height / duration * 10;
  const stepOpacity = opacity / duration * 10;

  function decrease() {
      height -= stepHeight;
      opacity -= stepOpacity;
      if (height <= 0) {
          height = 0;
          opacity = 0;
          element.style.display = 'none';
      }
      element.style.height = height + 'px';
      element.style.opacity = opacity;
      if (height > 0 || opacity > 0) {
          requestAnimationFrame(decrease);
      }
  }
  decrease();
}

function fadeInAndSlideDown(element, duration) {
  element.classList.remove('hide');
  element.style.display = 'block';
  element.style.height = '0';
  element.style.opacity = '0';
  const fullHeight = element.scrollHeight;
  let opacity = 0;
  const stepHeight = fullHeight / duration * 10;
  const stepOpacity = 1 / duration * 10;

  function increase() {
      let height = parseFloat(element.style.height);
      height += stepHeight;
      opacity += stepOpacity;
      if (height >= fullHeight) {
          height = fullHeight;
      }
      if (opacity >= 1) {
          opacity = 1;
      }
      element.style.height = height + 'px';
      element.style.opacity = opacity;
      if (height < fullHeight || opacity < 1) {
          requestAnimationFrame(increase);
      }
  }
  increase();
}

function updateProgressBar(step) {
  const steps = document.querySelectorAll(".progress-step");

  steps.forEach((stepElement, index) => {
      if (index < step - 1) {
          stepElement.classList.add("complete");
          stepElement.textContent = '✓';
      } else {
          stepElement.classList.remove("complete");
          stepElement.textContent = index + 1;
      }
  });

  steps.forEach((stepElement, index) => {
      if (index === step - 1) {
          stepElement.classList.add("active");
      } else {
          stepElement.classList.remove("active");
      }
  });
}

document.addEventListener("DOMContentLoaded", function() {
  // Transition from q1 to q2
  document.querySelectorAll("#btngo1").forEach(function(button) {
      button.addEventListener("click", function(e) {
          e.preventDefault();

          let q1 = document.getElementById("q1");
          let q2 = document.getElementById("q2");

          fadeOutAndSlideUp(q1, 500);
          setTimeout(function() {
              fadeInAndSlideDown(q2, 500);
              updateProgressBar(2);
          }, 300);
      });
  });

  // Transition from q2 to q3
  document.querySelectorAll("#btngo2").forEach(function(button) {
      button.addEventListener("click", function(e) {
          e.preventDefault();

          let q2 = document.getElementById("q2");
          let q3 = document.getElementById("q3");

          fadeOutAndSlideUp(q2, 500);
          setTimeout(function() {
              fadeInAndSlideDown(q3, 500);
              updateProgressBar(3);
          }, 300);
      });
  });

  // Transition from q3 to q4
  document.querySelectorAll("#btngo3").forEach(function(button) {
      button.addEventListener("click", function(e) {
          e.preventDefault();

          let q3 = document.getElementById("q3");
          let q4 = document.getElementById("q4");

          fadeOutAndSlideUp(q3, 500);
          setTimeout(function() {
              fadeInAndSlideDown(q4, 500);
              updateProgressBar(4);
          }, 300);
      });
  });
});
