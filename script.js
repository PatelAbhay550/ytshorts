document.addEventListener("DOMContentLoaded", function () {
    const videoContainer = document.querySelector(".vidurl");
    const apiKey = '4OLvd5Qn46oA4lwWIOwUG1Td5Chl45LQiMCFUZparv1v6EytAUXkYmw5';

    fetch(`https://api.pexels.com/videos/popular`, { headers: { Authorization: apiKey } })
        .then(response => response.json())
        .then(data => {
            const fetchedVideos = data.videos;
            fetchedVideos.forEach(video => {
                const videoUrl = video.video_files.find(file => file.quality === 'hd').link;

                const videoElement = document.createElement("div");
                videoElement.classList.add("vid");
                videoElement.innerHTML = `
                    <div class="bottom">
                        <div class="title">
                            <p>${video.user.name}</p>
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

            const observerOptions = { threshold: 0.75 };
            const videos = document.querySelectorAll(".vidurl video");
            videos.forEach((video) => {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.intersectionRatio > 0) {
                            entry.target.play();
                        } else {
                            entry.target.pause();
                        }
                    });
                });

                observer.observe(video);
                video.pause();
            });
        })
        .catch(error => console.error('Error fetching videos:', error));

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

    const commentsBtns = document.querySelectorAll(".comments i, .comments p");
    const commentsSection = document.querySelector(".comments-section");
    const closeCommentsBtn = document.querySelector(".close-comments");
    const addCommentBtn = document.getElementById("add-comment");
    const newCommentInput = document.getElementById("new-comment");

    const openComments = () => {
        commentsSection.classList.add("show-comments");
        document.body.style.overflowY = "hidden"; // Disable scrolling
    };

    const closeComments = () => {
        commentsSection.classList.remove("show-comments");
        document.body.style.overflow = "auto"; // Enable scrolling
    };

    commentsBtns.forEach(element => {
        element.addEventListener("click", openComments);
    });

    closeCommentsBtn.addEventListener("click", closeComments);

    addCommentBtn.addEventListener("click", addComment);
    newCommentInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            addComment();
        }
    });

    function addComment() {
        const newCommentText = newCommentInput.value.trim();
        if (newCommentText !== "") {
            const newCommentElement = document.createElement("div");
            newCommentElement.classList.add("comment");
            newCommentElement.textContent = newCommentText;
            document.querySelector(".comments-list").appendChild(newCommentElement);
            newCommentInput.value = "";
        }
    }

    const video = document.querySelector("video");
    const onPlayIcon = document.getElementById("onplay");
    const onPauseIcon = document.getElementById("onpause");

    video.addEventListener("play", () => {
        onPlayIcon.style.display = "block";
        onPlayIcon.style.transform = "scale(3)";
        onPauseIcon.style.display = "none";

        setTimeout(() => {
            onPlayIcon.style.transform = "scale(0)";
        }, 1000);
    });

    video.addEventListener("pause", () => {
        onPauseIcon.style.display = "block";
        onPauseIcon.style.transform = "scale(3)";
        onPlayIcon.style.display = "none";

        setTimeout(() => {
            onPauseIcon.style.transform = "scale(0)";
        }, 1000);
    });

    video.addEventListener("click", () => {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });
});
