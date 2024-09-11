import React, { useState, useEffect, useContext } from "react";
import { LogIn, LogOut, UserPlus } from "lucide-react";
import ThemeToggle, { ThemeContext } from "./ThemeToggle";

// Simple encryption function (for demonstration only)
const encrypt = (text) => {
  return btoa(text); // Base64 encoding
};

// Simple decryption function (for demonstration only)
const decrypt = (text) => {
  return atob(text); // Base64 decoding
};

const DSASheet = () => {
  const { darkMode } = useContext(ThemeContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [topics, setTopics] = useState([
    {
      name: "Arrays",
      subtopics: [
        {
          name: "Two Sum",
          difficulty: "Easy",
          completed: false,
          problemLink: "https://leetcode.com/problems/two-sum/description/",
          tutorialLink:
            "https://www.youtube.com/watch?v=UXDSeD9mN-k&pp=ygUQdHdvIHN1bSBsZWV0Y29kZQ%3D%3D",
          articleLink:
            "https://takeuforward.org/data-structure/two-sum-check-if-a-pair-with-given-sum-exists-in-array/",
        },
        {
          name: "Three Sum",
          difficulty: "Medium",
          completed: false,
          problemLink: "https://leetcode.com/problems/3sum/description/",
          tutorialLink: "https://www.youtube.com/watch?v=DhFh8Kw7ymk",
          articleLink:
            "https://takeuforward.org/data-structure/3-sum-find-triplets-that-add-up-to-a-zero/",
        },
        {
          name: "Reverse Pairs",
          difficulty: "Hard",
          completed: false,
          problemLink:
            "https://leetcode.com/problems/reverse-pairs/description/",
          tutorialLink: "https://www.youtube.com/watch?v=0e4bZaP3MDI",
          articleLink:
            "https://takeuforward.org/data-structure/count-reverse-pairs/",
        },
      ],
    },
    {
      name: "Linked Lists",
      subtopics: [
        {
          name: "Reverse Linked List",
          difficulty: "Easy",
          completed: false,
          problemLink:
            "https://leetcode.com/problems/reverse-linked-list/description/",
          tutorialLink: "https://www.youtube.com/watch?v=D2vI2DNJGd8",
          articleLink:
            "https://takeuforward.org/data-structure/reverse-a-linked-list/",
        },
        {
          name: "Sort List",
          difficulty: "Medium",
          completed: false,
          problemLink: "https://leetcode.com/problems/sort-list/",
          tutorialLink: "https://www.youtube.com/watch?v=8ocB7a_c-Cc",
          articleLink:
            "https://takeuforward.org/linked-list/sort-a-linked-list",
        },
        {
          name: "Reverse Nodes in k-Group",
          difficulty: "Hard",
          completed: false,
          problemLink:
            "https://leetcode.com/problems/reverse-nodes-in-k-group/description/",
          tutorialLink:
            "https://www.youtube.com/watch?v=Of0HPkk3JgI&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=35",
          articleLink:
            "https://takeuforward.org/data-structure/reverse-linked-list-in-groups-of-size-k/",
        },
      ],
    },
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setLoggedIn(true);
      setUsername(storedUser);
      loadUserProgress(storedUser);
    }
  }, []);

  const loadUserProgress = (user) => {
    const storedProgress = localStorage.getItem(`progress_${user}`);
    if (storedProgress) {
      setTopics(JSON.parse(storedProgress));
    }
  };

  const saveUserProgress = () => {
    localStorage.setItem(`progress_${username}`, JSON.stringify(topics));
  };

  const handleAuth = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (isRegistering) {
      // Registration
      const users = JSON.parse(localStorage.getItem("users") || "{}");
      if (users[username]) {
        setErrorMessage("Username already exists");
        return;
      }
      users[username] = encrypt(password);
      localStorage.setItem("users", JSON.stringify(users));
      setIsRegistering(false);
      setErrorMessage("Registration successful. Please log in.");
    } else {
      // Login
      const users = JSON.parse(localStorage.getItem("users") || "{}");
      if (!users[username] || decrypt(users[username]) !== password) {
        setErrorMessage("Invalid username or password");
        return;
      }
      setLoggedIn(true);
      localStorage.setItem("currentUser", username);
      loadUserProgress(username);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
    setPassword("");
    localStorage.removeItem("currentUser");
    setTopics(
      topics.map((topic) => ({
        ...topic,
        subtopics: topic.subtopics.map((subtopic) => ({
          ...subtopic,
          completed: false,
        })),
      }))
    );
  };

  const handleCheckbox = (topicIndex, subtopicIndex) => {
    const newTopics = [...topics];
    newTopics[topicIndex].subtopics[subtopicIndex].completed =
      !newTopics[topicIndex].subtopics[subtopicIndex].completed;
    setTopics(newTopics);
    saveUserProgress();
  };

  if (!loggedIn) {
    return (
      <div
        className={`min-h-screen ${
          darkMode ? "bg-gray-900" : "bg-gray-100"
        } flex items-center justify-center`}
      >
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <form
          onSubmit={handleAuth}
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } p-8 rounded-lg shadow-md w-full max-w-md mx-4`}
        >
          <h2
            className={`text-2xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {isRegistering ? "Register" : "Login"}
          </h2>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full p-2 mb-4 border rounded ${
              darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
            }`}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-2 mb-4 border rounded ${
              darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
            }`}
          />
          <button
            type="submit"
            className={`w-full ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white p-2 rounded flex items-center justify-center mb-4`}
          >
            {isRegistering ? (
              <UserPlus className="mr-2" />
            ) : (
              <LogIn className="mr-2" />
            )}
            {isRegistering ? "Register" : "Log In"}
          </button>
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className={`w-full ${
              darkMode ? "text-blue-400" : "text-blue-500"
            } hover:underline`}
          >
            {isRegistering
              ? "Already have an account? Log in"
              : "Need an account? Register"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } p-8`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">DSA Learning Sheet</h1>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <span>Welcome, {username}!</span>
          <ThemeToggle />
          <button
            onClick={handleLogout}
            className={`${
              darkMode
                ? "bg-red-600 hover:bg-red-700"
                : "bg-red-500 hover:bg-red-600"
            } text-white p-2 rounded flex items-center`}
          >
            <LogOut className="mr-2" />
            Logout
          </button>
        </div>
      </div>
      {topics.map((topic, topicIndex) => (
        <div key={topic.name} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{topic.name}</h2>
          {topic.subtopics.map((subtopic, subtopicIndex) => (
            <div
              key={subtopic.name}
              className={`${
                darkMode ? "bg-gray-800" : "bg-white"
              } p-4 rounded-lg shadow-md mb-4`}
            >
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <h3 className="text-xl font-medium">{subtopic.name}</h3>
                <span
                  className={`px-2 py-1 rounded ${
                    subtopic.difficulty === "Easy"
                      ? darkMode
                        ? "bg-green-700 text-green-200"
                        : "bg-green-200 text-green-800"
                      : subtopic.difficulty === "Medium"
                      ? darkMode
                        ? "bg-yellow-700 text-yellow-200"
                        : "bg-yellow-200 text-yellow-800"
                      : darkMode
                      ? "bg-red-700 text-red-200"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {subtopic.difficulty}
                </span>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row items-center space-x-0 sm:space-x-6 space-y-2 sm:space-y-0">
                <a
                  href={subtopic.tutorialLink}
                  className={`${
                    darkMode ? "text-blue-400" : "text-blue-500"
                  } cursor-pointer`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube Tutorial
                </a>
                <a
                  href={subtopic.problemLink}
                  className={`${
                    darkMode ? "text-blue-400" : "text-blue-500"
                  } cursor-pointer`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LeetCode
                </a>
                <a
                  href={subtopic.articleLink}
                  className={`${
                    darkMode ? "text-blue-400" : "text-blue-500"
                  } cursor-pointer`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Article
                </a>
              </div>
              <div className="mt-4 flex items-center">
                <input
                  type="checkbox"
                  checked={subtopic.completed}
                  onChange={() => handleCheckbox(topicIndex, subtopicIndex)}
                  className="mr-2 cursor-pointer"
                />
                <label>Mark as completed</label>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DSASheet;
