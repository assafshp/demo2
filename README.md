# Web Calculator

A simple web-based calculator application for performing basic arithmetic operations.

## Features

- Basic arithmetic operations (addition, subtraction, multiplication, division)
- Number input (0-9, decimal point)
- Clear functionality (Clear All, Clear Entry)
- Display area for input and results
- Responsive design for various screen sizes
- Keyboard support for input and operations
- Error handling for invalid operations (e.g., division by zero, invalid input)

## Getting Started

To run this project locally, simply open the `index.html` file in your web browser.

## Development

The project consists of three main files:

- `index.html`: The main HTML structure of the calculator.
- `style.css`: Contains the CSS for styling the calculator.
- `script.js`: Contains the JavaScript logic for calculator functionality.

## Testing

1.  **Manual Testing:**
    *   Open `index.html` in your browser.
    *   Test all number and operation buttons to ensure they function correctly.
    *   Verify decimal point and clear (C, CE) functionalities.
    *   Test chained operations (e.g., 2 + 2 * 3).
    *   Test error cases: division by zero (e.g., 5 / 0), invalid input (e.g., multiple operators without numbers).
    *   Test keyboard support for all numbers, operators, Enter, Escape, Delete, and Backspace keys.
    *   Resize your browser window or use developer tools to test responsiveness on different screen sizes (mobile, tablet, desktop).

2.  **Cross-Browser Compatibility:**
    *   Test the calculator on major web browsers (Chrome, Firefox, Safari, Edge) to ensure consistent behavior and appearance.

## Deployment

This project can be deployed to any static hosting service.

**Example: Deploying to GitHub Pages**

1.  Create a new GitHub repository for your project.
2.  Push your code to the repository.
3.  Go to your repository settings on GitHub.
4.  Navigate to the "Pages" section.
5.  Select the `main` branch (or your preferred branch) as the source for GitHub Pages, and choose the `/ (root)` folder.
6.  Save the settings. Your site will be published at `https://<your-username>.github.io/<your-repository-name>/`.

---

## Development Log

This section outlines the steps taken during the development of this web calculator application:

1.  **Project Initialization**: Created the project directory "demo" and navigated into it.
2.  **Taskmaster Setup**: Initialized Taskmaster (`task-master init`) and reviewed its generated directories (e.g., `cursor/rules`, `PRD.txt`).
3.  **API Keys Configuration**: Configured necessary API keys for Taskmaster operations. Use .ENV.
4.  **MCP Enablement**: Enabled Taskmaster's MCP (Managed Control Plane) for enhanced integration.
5.  **PRD Creation**: Generated a Product Requirements Document (`web_calculator_prd.txt`) based on the provided `example_prd.txt` template for the new web calculator app. prompt: `based on the @example_prd.txt create me a prd document for my new web calcular app`
6.  **PRD Review**: Reviewed the generated PRD for accuracy and completeness.
7.  **Task Generation**: Parsed the PRD to automatically generate development tasks (`task-master parse-prd web_calculator_prd.txt`).
8.  **Task Listing**: Listed the generated tasks to get an overview (`task-master list`).
9.  **Task Detail Review**: Reviewed details for specific tasks (e.g., `task-master show 1`).
10. **Complexity Analysis**: Analyzed project complexity to identify tasks needing further breakdown (`task-master analyze-complexity`).
11. **Complexity Report Review**: Reviewed the detailed complexity report (`task-master complexity-report`).
12. **Task Implementation**: prompt: `Implment all tasks one by one based on task-master task list`
13. **Continued Development**: Continued with implementation steps as guided by the AI agent. 
14. **Task Status Review**: Regularly reviewed task list status throughout the development process (`task-master list`). At the end `run the app`.
15. **Testing Setup**: Added a testing framework (Jest) and implemented unit tests for the calculator's core logic. prompt: `add testing and take care of everything that tests will pass`.
16. **Commit Message Generation**: Created a commit message summarizing all completed work.
17. **Publish to GitHub**: Prepared the project for publishing to GitHub. Publish to Github.
18. Add repository secrets: `ANTHROPIC_API_KEY`, `CLAUDE_GITHUB_TOKEN`
19. Create GitHub workflows directory: `mkdir -p .github/workflows`
20. Create GitHub Actions workflow file: `touch .github/workflows/claude.yml`
21. Create GitHub Actions review workflow file: `touch .github/workflows/claude-review.yml`
22. Create Claude Markdown file: `touch CLAUDE.md`
23. Add content to newly created files.
24. Commit and push to main.
25. Create new branch: `git checkout -b assaf/new-branch`
26. Add intentionally buggy code.
27. Commit and push: `git commit -m "<message>"` and `git push origin <branch-name>`
28. Create pull request.
29. View Claude code actions.
30. Request Claude to review security: `@claude review security`
31. Create new issue for Claude: `new issue -> @claude implement a new UI feature to toggle between dark mode (as it is now to light mode) in a new PR`