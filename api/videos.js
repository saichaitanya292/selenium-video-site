export default function handler(req, res) {
  return res.status(200).json({
    videos: [
      {
        id: { videoId: "2oG2bQx1x7U" },
        title: "Selenium Java Full Course"
      },
      {
        id: { videoId: "6v0Jp1h4nN4" },
        title: "Selenium Automation for Beginners"
      },
      {
        id: { videoId: "Wxj8j9R3qYc" },
        title: "Selenium Framework Design Tutorial"
      },
      {
        id: { videoId: "0kQj4vZ5G9E" },
        title: "Selenium Interview Questions"
      },
      {
        id: { videoId: "8J7Wv4Zk7T0" },
        title: "Selenium with TestNG"
      },
      {
        id: { videoId: "YX9zL5xK9aE" },
        title: "Selenium Page Object Model Explained"
      }
    ],
    nextPageToken: null
  });
}