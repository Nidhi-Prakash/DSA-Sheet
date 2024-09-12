## Project Overview: DSA Learning Sheet

Hi, my name is Nidhi Prakash, and today I’m going to walk you through my DSA Learning Sheet project. It’s a tool built with React, Tailwind CSS and JavaScript that helps users track their progress while learning Data Structures and Algorithms through various problems and tutorials. Let’s dive in.

### Theme Toggle & Dark Mode

The application starts with a login or registration system. Depending on the user's preference, they can switch between light mode and dark mode, thanks to a theme toggle button. The app is responsive, ensuring a great user experience across devices.

### User Authentication, Encryption, & Decryption

The authentication system allows users to register or log in. When a user registers, their password is encrypted using Base64 encoding, which adds a layer of security to the stored data. During login, the password is decrypted to verify the user's credentials, ensuring secure authentication while keeping things simple.

### DSA Topic List

Once logged in, users can see different topics related to data structures and algorithms. For example, we have ‘Arrays’ and ‘Linked Lists’, each containing a list of subtopics. These subtopics come with problem links, YouTube tutorials, and articles, so users can easily access learning resources.

### Tracking Progress

For each subtopic, there’s a checkbox that allows users to mark problems as completed. This data is stored locally for each user, so when they log back in, their progress is saved. The difficulty level of each problem is also displayed for easy reference.

### Logout Functionality

When users are done, they can log out with the ‘Logout’ button. Their progress will be saved for the next session, and the app will reset to its initial state.

### Conclusion

That’s a brief overview of my project. This tool is aimed at helping learners track their DSA journey efficiently with a focus on security, easy access to resources, and a clean, user-friendly interface. Thanks for checking it out!
