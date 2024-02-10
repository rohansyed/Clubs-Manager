This program is a club manager program. To use this program, you have:

1. Clone the repository
2. Open the repository in the container.
3. Start the mysql database in a terminal.
    1. service mysql start
    2. mysql < database.sql
    3. mysql
4. In another terminal, run:
    1. cd server
    2. npm install
    3. npm install --save sanitize-html
    4. npm install nodemailer
    5. npm start
5. You should now see a box in the bottom right hand corner of visual studio code, that asks you to open in browser, taking you to the current version of the website.
6. To lint run: curl -L http://localhost:8080/filename.filetype | html-validate --stdin (change the filename and filetype to suite the target file to be curled.

# Group Repository for COMP SCI 2207/7207 Web & Database Computing Web Application Project (2023 Semester 1) 

Your group's shared repository for the WDC 2023 Web App Project. 

Auto commit/push/sync to Github is disabled by default in this repository.  
- Enable the GitDoc extension to use this fucntionality (either in your VSCode settings, or in the Dev Container settings) 

See [HERE](https://myuni.adelaide.edu.au/courses/85266/pages/2023-web-application-group-project-specification) for the project specification.

We recommend using the 'Shared Repository Model (Branch & Pull)' to collaborate on your work in this single repostory.
- You can read more about collaborating on GitHub repositories [HERE](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests)
- When working on the same file at the same time, the 'Live Share' feature in VSCode can also help.
