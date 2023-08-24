document.addEventListener("DOMContentLoaded", function () {
    const videoContainer = document.querySelector(".vidurl");
    
    const apiKey = '4OLvd5Qn46oA4lwWIOwUG1Td5Chl45LQiMCFUZparv1v6EytAUXkYmw5'; // Replace with your actual Pexels API key
    
    fetch(`https://api.pexels.com/videos/popular`, {
      headers: {
        Authorization: apiKey
      }
    })
      .then(response => response.json())
      .then(data => {
        const fetchedVideos = data.videos;
        fetchedVideos.forEach(video => {
          const videoUrl = video.video_files.find(file => file.quality === 'hd').link;
          const videoTitle = video.user.name;
    
          const videoElement = document.createElement("div");
          videoElement.classList.add("vid");
          videoElement.innerHTML = `
            <div class="bottom">
              <div class="title">
                <p>${videoTitle}</p>
              </div>
              <div class="credentials">
                <div class="img-chnl"><img src="" alt=""></div>
                <div class="channel-name">
                  <p>Abhay Patel</p>
                </div>
                <div class="subscribe-btn"><button type="button">Subscribe</button></div>
              </div>
              <div class="icons-right">
              <div class="like">
                  <i class="ri-thumb-up-fill"></i>
                  <p>Like</p>
              </div>
              <div class="dislike">
                  <i class="ri-thumb-down-fill"></i>
                  <p>Dislike</p>
              </div>
              <div class="comments">
                  <i class="ri-discuss-fill"></i>
                  <p>Comments</p>
              </div>
              <div class="share">
                  <i class="ri-share-forward-fill"></i>
                  <p>Share</p>
              </div>
              <div class="img"><img src="" alt=""></div>
          </div>
            </div>
            <video>
              <source src="${videoUrl}" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          `;
    
          videoContainer.appendChild(videoElement);
        });
    
        const observerOptions = {
          threshold: 0.75, // Percentage of the element's visibility required to trigger
        };
    
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio > 0) {
              entry.target.play();
            } else {
              entry.target.pause();
            }
          });
        }, observerOptions);
    
        const videos = document.querySelectorAll(".vidurl video");
        videos.forEach((video) => {
          observer.observe(video);
          video.pause(); // Pause initially when not in view
        });
      })
      .catch(error => console.error('Error fetching videos:', error));
    
    // Like and Dislike functionality
    const likeIcons = document.querySelectorAll(".like i");
    const dislikeIcons = document.querySelectorAll(".dislike i");
    
    likeIcons.forEach((icon, index) => {
      icon.addEventListener("click", function () {
        this.style.color = "#FF0000"; // Change to red color
        dislikeIcons[index].style.color = "#000000"; // Reset dislike color
        localStorage.setItem(`like${index}`, true);
        localStorage.removeItem(`dislike${index}`);
      });
    });
    
    dislikeIcons.forEach((icon, index) => {
      icon.addEventListener("click", function () {
        this.style.color = "#000000"; // Change to black color
        likeIcons[index].style.color = "#000000"; // Reset like color
        localStorage.setItem(`dislike${index}`, true);
        localStorage.removeItem(`like${index}`);
      });
    });
    
    // Check and apply stored colors
    likeIcons.forEach((icon, index) => {
      if (localStorage.getItem(`like${index}`)) {
        icon.style.color = "#FF0000"; // Set red color
      }
    });
    
    dislikeIcons.forEach((icon, index) => {
      if (localStorage.getItem(`dislike${index}`)) {
        icon.style.color = "#000000"; // Set black color
      }
    });
  });
  