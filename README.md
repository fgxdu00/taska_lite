# ✦ DarkTodo

A minimal, elegant to-do list web application built with vanilla **HTML**, **CSS**, and **JavaScript**.  
Designed with a clean dark theme and focused on simplicity, speed, and offline persistence using `localStorage`.

---

## ✧ Features

### 📝 Task Creation
- A single-line input field for adding new tasks
- An adjacent **Add** button for quick submission
- Tasks can also be added by pressing **Enter**
- Prevents empty submissions

### ✔ Task Management
Each created task includes:
- A **completion checkbox**
- A **task title**
- A **delete button**

Users can:
- Mark tasks as completed (with visual styling update)
- Remove tasks individually
- See changes reflected instantly

### 💾 Persistent Storage
- All tasks are automatically stored in the browser's `localStorage`
- Tasks remain saved after page refresh or browser restart
- No backend or external database required

### 🌙 Dark Theme Design
The interface uses a modern dark color palette:
- Deep background tones
- Soft contrast for text readability
- Subtle hover effects
- Clean layout with consistent spacing

The design focuses on reducing eye strain while maintaining clarity and usability.

---

## ✧ Interface Structure

### Header
- App title displayed prominently at the top
- Centered layout for visual balance

### Task Input Section
- Single-line text input
- Add button aligned horizontally
- Clean spacing and responsive layout

### Task List
- Vertical list layout
- Each task appears as a styled container
- Checkbox on the left
- Task text in the center
- Delete button on the right

Completed tasks are visually distinguished (e.g., strikethrough text and reduced opacity).

---

## ✧ Technical Details

### Technologies Used
- HTML5 (structure)
- CSS3 (styling and layout)
- Vanilla JavaScript (functionality)

### Data Structure
Tasks are stored in `localStorage` as a serialized JSON array:

```json
[
  {
    "id": 1700000000000,
    "text": "Finish project",
    "completed": false
  }
]