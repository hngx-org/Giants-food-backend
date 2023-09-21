# Team Giant Collaboration Workflow And Folder Structure

## Workflow for Committing Code and Making Pull Requests

This CONTRIBUTING file will guide you through the workflow for committing code and making pull requests to ensure a smooth and organized development process. Our project has two main branches: `main` and `development`, and we'll follow a collaborative branching model.

### Branches

1. **Main Branch (`main`):** This branch represents the production-ready codebase. It should always contain stable and tested code. Only the team lead or a designated person should merge code into this branch.

2. **Development Branch (`development`):** This branch is for ongoing development and integration of new features, bug fixes, and improvements. Collaborators will create feature branches and make pull requests to merge their code into this branch.

### Collaborator Workflow

Follow these steps when working on a task:

1. **Pull Latest Changes:** Before starting any work, ensure that your local copy of the repository is up-to-date with the latest changes on the `development` branch. Use the following commands:

   ```bash
   git checkout development
   git pull origin development
   ```

2. **Create a New Branch:** Create a new branch based on the task you are working on. Use a descriptive name for the branch, such as `feature/task-name` or `bugfix/issue-number`. For example:

   ```bash
   git checkout -b feature/new-feature
   ```

3. **Commit Your Changes:** Make your changes and commit them to your feature branch:

   ```bash
   git add .
   git commit -m "Brief description of the changes"
   ```

4. **Push Your Branch:** Push your branch to the remote repository (GitHub, GitLab, etc.):

   ```bash
   git push origin feature/new-feature
   ```

5. **Create a Pull Request (PR):** Go to the repository on the platform you're using and create a pull request from your feature branch to the `development` branch. Provide a clear and concise description of your changes and reference the task or issue number that this PR addresses.

6. **Code Review:** Other team members will review your code, provide feedback, and make sure it meets our coding standards. Address any feedback as needed.

7. **Merge into `development` Branch:** Once your PR has been approved, the team lead or a designated person will merge your changes into the `development` branch.

### Team Lead Workflow

As the team lead or designated person responsible for merging code into the `main` branch, follow these additional steps:

1. **Pull Latest Changes to `development` Branch:** Before merging into `main`, make sure the `development` branch is up-to-date with the latest changes. Use the following commands:

   ```bash
   git checkout development
   git pull origin development
   ```

2. **Merge `development` into `main`:** After thorough testing and when the `development` branch is stable and ready for release, merge it into the `main` branch:

   ```bash
   git checkout main
   git merge development
   ```

3. **Push Changes to `main`:** Push the merged `main` branch to the remote repository:

   ```bash
   git push origin main
   ```

## Codebase Folder Structure

This section of the documentation provides an overview of our codebase's folder structure, which is designed to promote code organization, maintainability, and collaboration among our development team.

### Config

The **config** folder houses essential configurations used throughout the codebase. Here, we centralize the setup of development tools like `morgan`, `logger`, define role definitions, manage token settings, and store environment variables accessible across various modules.

### Controllers

In the **controllers** folder, you'll find modules responsible for handling routes. For example, a controller for user authentication might be named `auth.controller.js`, while one for managing staff invitations could be named `invite.controller.js`. To ensure proper error handling for asynchronous functions, all controller functions should be wrapped within the `Asyncly` function defined in the **utils** folder. Here's an example:

```javascript
const httpStatus = require('http-status');
const Asyncly = require('../utils/Asyncly');
const { authService } = require('../services');

const register = Asyncly((req, res, next) => {
	// Logic to handle user registration
});
```

### Middlewares

Our **middlewares** folder contains a variety of middleware functions that can be used within Express routers. Currently, we have five distinct middlewares in place, each serving a specific purpose:

- **Auth.js**: Enforces access rights for users.
- **Error.js**: Provides custom error handlers for efficient error management.
- **Ratelimiter.js**: Ensures security by limiting the number of requests to specific routes within a given timeframe, guarding against malicious bot activity.
- **Validate.js**: Handles initial data validation for incoming API requests.
- **Verify.js**: Manages token verification.

### Model

The **model** folder is home to our `index.js` file, where we create our database instance, and it also hosts the Object-Relational Mapping (ORM) for all our tables/entities. `Sequelize` library is used to create a DB connection and define database models.

### Routes

Our **routes** folder contains all the endpoints through which the frontend communicates with our application. modules in this holder can be named as `auth.route` or any other suitable name that indicates the purpose of the module with the ".route" suffix.

### Services

Inside the **services** folder, we house all business logic utilized by other modules, primarily by controllers. This separation of concerns helps maintain a clean and organized codebase.

### Utils

Our **utils** folder provides a home for additional functionalities and utility functions used throughout the application. This separation aids in avoiding code duplication and improving code reusability.

### Validation

The **validation** folder stores validation schemas, serving as the initial checkpoint for verifying user inputs from all routes. Ensuring data integrity and security, these validations are a critical component of our application.

### Bin

Finally, the **bin** folder, located at the root level, contains the `www.js` file, which serves as the entry point into our application. This file is responsible for setting up our server and exiting the application gracefully if errors are encountered on initial start up.

### Summary

By adhering to this folder structure and workflow model, we can collaborate effectively on our team project, maintain code quality, and keep a stable production branch (`main`). Simultaneously, we can continue to develop new features and enhancements on the `development` branch. Remember, communication and collaboration are essential, so don't hesitate to reach out to the team lead or other members of the team for help or clarification. Happy coding! 😊🚀
