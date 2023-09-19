# Team Giant Collaboration Workflow

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

By following this branching and workflow model, we can efficiently collaborate on our team project, ensure code quality, and maintain a stable production branch (`main`) while continuously developing new features and improvements on the `development` branch. Collaboration and communication are essential, so always stay in touch with the team and seek help or clarification when needed. Happy coding!:smile:
