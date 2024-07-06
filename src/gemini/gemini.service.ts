import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class GeminiService {
  private genAI: any;
  private model: any;
  private generationConfig: any;

  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {
    this.genAI = new GoogleGenerativeAI(configService.get('GOOGLE_API_KEY'));

    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    this.generationConfig = {
      temperature: 0.85,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 800,
      responseMimeType: 'application/json',
    };
  }

  async generateQuestion1(goal: string) {
    const parts = [
      {
        text: 'input: Generate next question and answer is keyword  relate to content and 3 examples content:\nPersonal or Career Goals: Study AWS',
      },
      {
        text: 'output: {\n"nextQuestion": "What is your current level of knowledge about AWS?",\n"answer":"Current Skill Level: ",\n"exampleAnswer": [\n{"content":"Beginner"},\n{"content":"Intermediate"},\n{"content":"Advanced"},\n]\n}',
      },
      {
        text: 'input: Generate next question and answer is keyword  relate to content and 3 examples content:\nPersonal or Career Goals: Front-end Developer',
      },
      {
        text: 'output: {"nextQuestion": "What specific front-end technologies are you interested in learning or improving upon?","answer":"Interest: ", "exampleAnswer": [{"content": "React"}, {"content": "Angular"}, {"content": "Vue.js"}]}',
      },
      {
        text: 'input: Generate next question and answer is keyword  relate to content and 3 examples content:\nPersonal or Career Goals: Piano',
      },
      {
        text: 'output: {"nextQuestion": "Do you know anything about music theory?","answer":"Knowledge: ", "exampleAnswer": [{"content": "I understand scales and chords."}, {"content": "I know basic harmony and rhythm."}, {"content": "I don\'t have any knowledge about music"}]}',
      },
      {
        text: 'input: Generate next question and answer is keyword  relate to content and 3 examples content:\nPersonal or Career Goals: Guitar',
      },
      {
        text: 'output: {"nextQuestion": "What kind of guitar do you want to learn to play?","answer":"Guitar Type: ", "exampleAnswer": [{"content": "Acoustic"}, {"content": "Electric"}, {"content": "Classical"}]}',
      },
      {
        text: 'input: Generate next question and answer is keyword  relate to content and 3 examples content:\nPersonal or Career Goals: Back-end Developer',
      },
      {
        text: 'output: {"nextQuestion": "What specific back-end technologies are you interested in learning or improving upon?","answer":"Interest: ", "exampleAnswer": [{"content": "Node.js"}, {"content": "Python"}, {"content": "Java"}]}',
      },
      {
        text: 'input: Generate next question and answer is keyword  relate to content and 3 examples content:\nPersonal or Career Goals: Badminton',
      },
      {
        text: 'output: {"nextQuestion": "What are your current skills and experience with badminton?","answer":"Experience: ", "exampleAnswer": [{"content": "Beginner"}, {"content": "Intermediate"}, {"content": "Advanced"}]}',
      },
      {
        text: `input: Generate next question and answer is keyword  relate to content and 3 examples content:\n${goal}`,
      },
      { text: 'output: ' },
    ];

    const result = await this.model.generateContent({
      contents: [{ role: 'user', parts }],
      generationConfig: this.generationConfig,
    });
    const res = await result.response.text();
    const resJson = await JSON.parse(res);

    console.log(resJson);
    return resJson;
  }

  async generateQuestion2(info: string) {
    console.log(info);
    const parts = [
      {
        text: 'input: Generate next question and answer is keyword  relate to content and 3 examples content:\nPersonal or Career Goals: Study AWS\nCurrent Skill Level: Beginner',
      },
      {
        text: 'output: {\n"nextQuestion": "What specific areas of AWS are you interested in?",\n"answer":"Interest: ",\n"exampleAnswer": [\n{"content":"Compute"},\n{"content":"AI/ML"},\n{"content":"DevOps"},\n]\n}',
      },
      {
        text: 'input: Generate next question and answer is keyword  relate to content and 3 examples content:\nPersonal or Career Goals: Front-end Developer\nInterest: React',
      },
      {
        text: 'output: {"nextQuestion": "What is your current experience level with React?", "answer": "Experience Level: ", "exampleAnswer": [{"content": "Beginner"}, {"content": "Intermediate"}, {"content": "Advanced"}]}',
      },
      {
        text: "input: Generate next question and answer is keyword  relate to content and 3 examples content:\nPersonal or Career Goals: Piano\nKnowledge: I don't have any knowledge about music",
      },
      {
        text: 'output: {"nextQuestion": "What are your goals for learning piano? ", "answer": "Goals: ", "exampleAnswer": [{"content": "Learn basic chords and melodies"}, {"content": "Play specific songs"}, {"content": "Improve my musical theory knowledge"}]}',
      },
      {
        text: 'input: Generate next question and answer is keyword  relate to content and 3 examples content:\nPersonal or Career Goals: Guitar\nGuitar Type: Acoustic',
      },
      {
        text: 'output: {"nextQuestion": "What is your current experience level with acoustic guitar?", "answer": "Experience Level: ", "exampleAnswer": [{"content": "Beginner"}, {"content": "Intermediate"}, {"content": "Advanced"}]}',
      },
      {
        text: `input: Generate next question and answer is keyword  relate to content and 3 examples content:\n${info}`,
      },
      { text: 'output: ' },
    ];

    const result = await this.model.generateContent({
      contents: [{ role: 'user', parts }],
      generationConfig: this.generationConfig,
      // safetySettings: Adjust safety settings
      // See https://ai.google.dev/gemini-api/docs/safety-settings
    });

    const res = await result.response.text();
    const resJson = await JSON.parse(res);
    console.log(resJson);

    return resJson;
  }

  async generateQuestion3(info: string) {
    const parts = [
      {
        text: 'input: Generate next question and answer is keyword  relate to content and 3 examples content:\nPersonal or Career Goals:  Study AWS\nCurrent Skill Level: Beginner\nInterest: DevOps',
      },
      {
        text: 'output: {\n"nextQuestion": "What is your preferred learning style?",\n"answer":"Interest: ",\n"exampleAnswer": [\n{"content":"Reading"},\n{"content":"Online courses"},\n{"content":"Hands-on labs"},\n]\n}',
      },
      {
        text: 'input: Generate next question and answer is keyword  relate to content and 3 examples content:\nPersonal or Career Goals: Front-end Developer\nInterest: React\nExperience Level: Beginner',
      },
      {
        text: 'output: {\n"nextQuestion": "What is your preferred learning style?",\n"answer":"Interest: ",\n"exampleAnswer": [\n{"content":"Reading"},\n{"content":"Online courses"},\n{"content":"Hands-on labs"},\n]\n}',
      },
      {
        text: "input: Generate next question and answer is keyword  relate to content and 3 examples content:\nPersonal or Career Goals: Piano\nKnowledge: I don't have any knowledge about music\nGoals: Learn basic chords and melodies",
      },
      {
        text: 'output: {"nextQuestion": "What is your preferred learning style?", "answer":"Interest: ", "exampleAnswer": [{"content":"Video"}, {"content":"Online courses"}, {"content":"Practice"}]}',
      },
      {
        text: 'input: Generate next question and answer is keyword  relate to content and 3 examples content:\nPersonal or Career Goals: Guitar\nGuitar Type: Acoustic\nExperience Level: Intermediate',
      },
      {
        text: 'output: {"nextQuestion": "What is your preferred learning style?", "answer":"Interest: ", "exampleAnswer": [{"content":"Video"}, {"content":"Online courses"}, {"content":"Practice"}]}',
      },
      {
        text: `input: Generate next question and answer is keyword  relate to content and 3 examples content: \n${info}`,
      },
      { text: 'output: ' },
    ];

    const result = await this.model.generateContent({
      contents: [{ role: 'user', parts }],
      generationConfig: this.generationConfig,
      // safetySettings: Adjust safety settings
      // See https://ai.google.dev/gemini-api/docs/safety-settings
    });

    const res = await result.response.text();
    const resJson = await JSON.parse(res);
    console.log(resJson);

    return resJson;
  }

  async generateRoadmap(user: User, info: string, title: string) {
    const parts = [
      {
        text: 'input: You are an AI assistant helping a university student create a personalized roadmap to study AWS.\n\nGiven the following user information and goals, generate a detailed roadmap in JSON format.\n\n**User Information:**\n\n- Age: 20\n- Gender: Male\n- Location: Ha Noi\n- Occupation: Student\n\n**Goals and Expectations:**\n\n-Personal or Career Goals:  Study AWS\n-Current Skill Level: Beginner\n-Interest: DevOps\n-Interest: Online Course\n\n**Roadmap Structure:**\n\nThe roadmap should be structured as follows:\n\n* **Stages:** Each stage represents a major phase in the learning journey.\n    * **Name:** A descriptive name for the stage.\n    * **Timeframe:** Estimated duration of the stage (e.g., "3 months").\n    * **Tasks:** A list of tasks to be completed within the stage.\n* **Tasks:** Each task represents a specific learning objective.\n    * **Name:** A clear and concise name for the task.\n    * **Description:** A detailed explanation of what the task entails.\n    * **Time:** Estimated time required to complete the task.\n    * **Subtasks:** A list of smaller, actionable steps to achieve the task.\n* **Subtasks:**\n    * **Name:** A descriptive name for the subtask.\n    * **Description:** A brief explanation of the subtask.\n    * **Resources:** Links to relevant learning resources (e.g., online courses, tutorials, documentation).\n    * **Time:** Estimated time required to complete the subtask.\n\n**Example JSON Structure:**\n\n{\n  "Roadmap": {\n    "Stages": [\n      {\n        "Name": "Stage 1 Name",\n        "Timeframe": "3 months",\n        "Tasks": [\n          {\n            "Name": "Task 1 Name",\n            "Description": "Task 1 Description",\n            "Time": "1 month",\n            "Subtasks": [\n              {\n                "Name": "Subtask 1 Name",\n                "Description": "Subtask 1 Description",\n                "Resources": ["Resource 1 Link", "Resource 2 Link"],\n                "Time": "1 week"\n              },\n              // ... more subtasks(minimum 4 subtasks)\n            ]\n          },\n          // ... more tasks(minimum 3 tasks)\n        ]\n      },\n      // ... more stages(minimum 2 stages)\n    ]\n  }\n}\n\n\n**Important Notes:**\n\n* Tailor the roadmap to the user\'s age, location, occupation, and specific goals.\n* Provide realistic timeframes and suggest relevant resources for each subtask.\n* Ensure the JSON output is well-formatted and easy to read.',
      },
      {
        text: 'output: {"Roadmap": {"Stages": [{"Name": "AWS Fundamentals", "Timeframe": "2 months", "Tasks": [{"Name": "AWS Concepts and Services", "Description": "Gain a foundational understanding of AWS core concepts, key services, and the AWS cloud architecture.", "Time": "1 month", "Subtasks": [{"Name": "Introduction to AWS", "Description": "Learn about the history, benefits, and use cases of AWS.", "Resources": ["https://aws.amazon.com/what-is-aws/", "https://www.youtube.com/watch?v=Y-d3cV4T64c"], "Time": "1 week"}, {"Name": "AWS Global Infrastructure", "Description": "Explore the AWS global infrastructure, regions, and availability zones.", "Resources": ["https://aws.amazon.com/about-aws/global-infrastructure/"], "Time": "1 week"}, {"Name": "Compute Services (EC2, Lambda)", "Description": "Understand the different types of compute services available on AWS, including EC2 and Lambda.", "Resources": ["https://aws.amazon.com/ec2/", "https://aws.amazon.com/lambda/"], "Time": "1 week"}, {"Name": "Storage Services (S3, EBS)", "Description": "Learn about AWS storage options, including S3 for object storage and EBS for block storage.", "Resources": ["https://aws.amazon.com/s3/", "https://aws.amazon.com/ebs/"], "Time": "1 week"}, {"Name": "Networking Services (VPC, Route 53)", "Description": "Explore the AWS networking model, including VPCs, subnets, and Route 53 for DNS.", "Resources": ["https://aws.amazon.com/vpc/", "https://aws.amazon.com/route-53/"], "Time": "1 week"}]}, {"Name": "Hands-on Practice with AWS", "Description": "Apply your knowledge by working through practical exercises and building simple AWS projects.", "Time": "1 month", "Subtasks": [{"Name": "Create an AWS Account", "Description": "Sign up for a free AWS account and familiarize yourself with the AWS Management Console.", "Resources": ["https://aws.amazon.com/free/"], "Time": "1 week"}, {"Name": "Launch an EC2 Instance", "Description": "Learn how to launch and configure a virtual machine (EC2 instance) on AWS.", "Resources": ["https://aws.amazon.com/getting-started/tutorials/launch-an-ec2-instance/"], "Time": "1 week"}, {"Name": "Deploy a Simple Web Application", "Description": "Build a basic web application using AWS services and deploy it to AWS.", "Resources": ["https://aws.amazon.com/getting-started/tutorials/deploy-a-web-application/"], "Time": "2 weeks"}, {"Name": "Explore AWS Console and CLI", "Description": "Gain proficiency in using the AWS Management Console and the AWS Command Line Interface (CLI).", "Resources": ["https://aws.amazon.com/console/", "https://aws.amazon.com/cli/"], "Time": "1 week"}]}]}, {"Name": "DevOps with AWS", "Timeframe": "3 months", "Tasks": [{"Name": "Infrastructure as Code (IaC)", "Description": "Learn about Infrastructure as Code (IaC) and its benefits. Master tools like CloudFormation and Terraform for automated infrastructure provisioning.", "Time": "1.5 months", "Subtasks": [{"Name": "Introduction to IaC", "Description": "Understand the principles of Infrastructure as Code (IaC) and its advantages.", "Resources": ["https://aws.amazon.com/solutions/infrastructure-as-code/"], "Time": "1 week"}, {"Name": "AWS CloudFormation", "Description": "Learn how to use AWS CloudFormation to define and manage your AWS resources using templates.", "Resources": ["https://aws.amazon.com/cloudformation/"], "Time": "3 weeks"}, {"Name": "Terraform for AWS", "Description": "Explore Terraform, an open-source tool, to manage AWS infrastructure using declarative configuration.", "Resources": ["https://www.terraform.io/docs/providers/aws/index.html"], "Time": "3 weeks"}, {"Name": "Practical IaC Projects", "Description": "Build real-world IaC projects using either CloudFormation or Terraform.", "Resources": ["https://github.com/hashicorp/terraform-aws-examples"], "Time": "2 weeks"}]}, {"Name": "CI/CD Pipelines with AWS", "Description": "Learn to create Continuous Integration/Continuous Deployment (CI/CD) pipelines using AWS services like CodePipeline and CodeBuild.", "Time": "1 month", "Subtasks": [{"Name": "AWS CodePipeline", "Description": "Learn about AWS CodePipeline and its role in automating the release process.", "Resources": ["https://aws.amazon.com/codepipeline/"], "Time": "2 weeks"}, {"Name": "AWS CodeBuild", "Description": "Understand how AWS CodeBuild works to build, test, and package your applications.", "Resources": ["https://aws.amazon.com/codebuild/"], "Time": "2 weeks"}, {"Name": "Building CI/CD Pipelines", "Description": "Practice creating CI/CD pipelines using AWS CodePipeline and CodeBuild.", "Resources": ["https://aws.amazon.com/getting-started/tutorials/build-a-ci-cd-pipeline/"], "Time": "2 weeks"}, {"Name": "Implementing CI/CD best practices", "Description": "Learn about best practices for designing and implementing efficient and secure CI/CD pipelines.", "Resources": ["https://aws.amazon.com/blogs/devops/best-practices-for-building-continuous-delivery-pipelines-on-aws/"], "Time": "1 week"}]}, {"Name": "Monitoring and Logging", "Description": "Learn how to monitor and log your AWS applications and infrastructure using services like CloudWatch and CloudTrail.", "Time": "0.5 months", "Subtasks": [{"Name": "AWS CloudWatch", "Description": "Explore AWS CloudWatch for monitoring your applications and infrastructure.", "Resources": ["https://aws.amazon.com/cloudwatch/"], "Time": "2 weeks"}, {"Name": "AWS CloudTrail", "Description": "Understand how to use CloudTrail to audit and track activity in your AWS environment.", "Resources": ["https://aws.amazon.com/cloudtrail/"], "Time": "1 week"}, {"Name": "Setting up Monitoring and Logging", "Description": "Configure CloudWatch and CloudTrail to monitor and log your AWS resources.", "Resources": ["https://aws.amazon.com/getting-started/tutorials/monitor-your-applications/"], "Time": "2 weeks"}]}]}]}}',
      },
      {
        text: 'input: You are an AI assistant helping a university student create a personalized roadmap to become a front-end developer.\n\nGiven the following user information and goals, generate a detailed roadmap in JSON format.\n\n**User Information:**\n\n- Age: 20\n- Gender: Male\n- Location: Ha Noi\n- Occupation: Student\n\n**Goals and Expectations:**\n\n- Personal or Career Goals: Front-end Developer\n -Interest: React\n- Experience Level: Beginner\n-Interest: Online course\n\n\n**Roadmap Structure:**\n\nThe roadmap should be structured as follows:\n\n* **Stages:** Each stage represents a major phase in the learning journey.\n    * **Name:** A descriptive name for the stage.\n    * **Timeframe:** Estimated duration of the stage (e.g., "3 months").\n    * **Tasks:** A list of tasks to be completed within the stage.\n* **Tasks:** Each task represents a specific learning objective.\n    * **Name:** A clear and concise name for the task.\n    * **Description:** A detailed explanation of what the task entails.\n    * **Time:** Estimated time required to complete the task.\n    * **Subtasks:** A list of smaller, actionable steps to achieve the task.\n* **Subtasks:**\n    * **Name:** A descriptive name for the subtask.\n    * **Description:** A brief explanation of the subtask.\n    * **Resources:** Links to relevant learning resources (e.g., online courses, tutorials, documentation).\n    * **Time:** Estimated time required to complete the subtask.\n\n**Example JSON Structure:**\n\n{\n  "Roadmap": {\n    "Stages": [\n      {\n        "Name": "Stage 1 Name",\n        "Timeframe": "3 months",\n        "Tasks": [\n          {\n            "Name": "Task 1 Name",\n            "Description": "Task 1 Description",\n            "Time": "1 month",\n            "Subtasks": [\n              {\n                "Name": "Subtask 1 Name",\n                "Description": "Subtask 1 Description",\n                "Resources": ["Resource 1 Link", "Resource 2 Link"],\n                "Time": "1 week"\n              },\n              // ... more subtasks(minimum 4 subtasks)\n            ]\n          },\n          // ... more tasks(minimum 3 tasks)\n        ]\n      },\n      // ... more stages(minimum 2 stages)\n    ]\n  }\n}\n\n**Important Notes:**\n\n* Tailor the roadmap to the user\'s age, location, occupation, and specific goals.\n* Provide realistic timeframes and suggest relevant resources for each subtask.\n* Ensure the JSON output is well-formatted and easy to read.',
      },
      {
        text: 'output: {"Roadmap": {"Stages": [{"Name": "HTML, CSS, and JavaScript Fundamentals", "Timeframe": "2 months", "Tasks": [{"Name": "HTML Basics", "Description": "Learn the fundamental building blocks of web pages, including tags, attributes, and basic structure.", "Time": "2 weeks", "Subtasks": [{"Name": "HTML Structure and Elements", "Description": "Understand the structure of an HTML document, common elements like headings, paragraphs, lists, and tables.", "Resources": ["https://www.w3schools.com/html/", "https://developer.mozilla.org/en-US/docs/Web/HTML"], "Time": "1 week"}, {"Name": "HTML Attributes and Styling", "Description": "Learn about HTML attributes and how to use CSS for basic styling.", "Resources": ["https://www.w3schools.com/html/html_attributes.asp", "https://www.w3schools.com/css/"], "Time": "1 week"}]}, {"Name": "CSS Fundamentals", "Description": "Master CSS concepts, selectors, properties, and layout techniques.", "Time": "3 weeks", "Subtasks": [{"Name": "CSS Selectors", "Description": "Learn various CSS selectors for targeting specific elements on a web page.", "Resources": ["https://www.w3schools.com/css/css_selectors.asp", "https://developer.mozilla.org/en-US/docs/Web/CSS/Selectors"], "Time": "1 week"}, {"Name": "CSS Properties and Values", "Description": "Explore common CSS properties (e.g., color, font, background) and their values.", "Resources": ["https://www.w3schools.com/css/css_intro.asp", "https://developer.mozilla.org/en-US/docs/Web/CSS/Properties"], "Time": "1 week"}, {"Name": "CSS Layout Techniques", "Description": "Learn about different CSS layout methods, such as flexbox, grid, and floats.", "Resources": ["https://css-tricks.com/snippets/css/a-guide-to-flexbox/", "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout", "https://www.w3schools.com/css/css_float.asp"], "Time": "1 week"}]}, {"Name": "JavaScript Essentials", "Description": "Learn the basics of JavaScript, including variables, data types, operators, and control flow.", "Time": "4 weeks", "Subtasks": [{"Name": "JavaScript Basics", "Description": "Get introduced to JavaScript syntax, variables, data types, and operators.", "Resources": ["https://www.w3schools.com/js/default.asp", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"], "Time": "2 weeks"}, {"Name": "JavaScript Functions and Control Flow", "Description": "Learn about functions, control structures (if/else, loops), and how to manipulate data in JavaScript.", "Resources": ["https://www.w3schools.com/js/js_functions.asp", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements"], "Time": "2 weeks"}]}]}, {"Name": "Introduction to React", "Timeframe": "2 months", "Tasks": [{"Name": "React Fundamentals", "Description": "Learn the core concepts of React, including components, JSX, state, props, and lifecycle methods.", "Time": "1 month", "Subtasks": [{"Name": "React Components and JSX", "Description": "Understand the concept of components in React and how to use JSX for declarative UI rendering.", "Resources": ["https://reactjs.org/docs/introducing-jsx.html", "https://www.freecodecamp.org/news/react-jsx-explained-for-beginners/"], "Time": "2 weeks"}, {"Name": "React State and Props", "Description": "Learn about managing component state and passing data between components using props.", "Resources": ["https://reactjs.org/docs/state-and-lifecycle.html", "https://www.freecodecamp.org/news/react-state-and-props-explained-for-beginners/"], "Time": "2 weeks"}, {"Name": "React Lifecycle Methods", "Description": "Explore the different lifecycle methods of React components and their uses.", "Resources": ["https://reactjs.org/docs/state-and-lifecycle.html", "https://www.freecodecamp.org/news/react-lifecycle-methods-explained-for-beginners/"], "Time": "2 weeks"}, {"Name": "Building a Simple React App", "Description": "Create a basic React application to solidify your understanding of core concepts.", "Resources": ["https://create-react-app.dev/", "https://reactjs.org/docs/getting-started.html"], "Time": "2 weeks"}]}, {"Name": "React Advanced Concepts", "Description": "Dive deeper into React features, including routing, state management, and building complex applications.", "Time": "1 month", "Subtasks": [{"Name": "React Router", "Description": "Learn how to implement navigation and routing in React applications using React Router.", "Resources": ["https://reactrouter.com/docs/en/v6", "https://www.freecodecamp.org/news/react-router-tutorial/"], "Time": "2 weeks"}, {"Name": "State Management with Redux", "Description": "Explore Redux for managing application state efficiently, especially in large-scale projects.", "Resources": ["https://redux.js.org/", "https://www.freecodecamp.org/news/redux-tutorial-for-beginners/"], "Time": "2 weeks"}, {"Name": "Building a Real-World React Project", "Description": "Work on a more complex React project to apply your knowledge and gain hands-on experience.", "Resources": ["https://github.com/facebook/create-react-app", "https://www.freecodecamp.org/learn/front-end-libraries/react"], "Time": "2 weeks"}, {"Name": "React Testing", "Description": "Learn how to write unit tests for your React components.", "Resources": ["https://reactjs.org/docs/testing.html", "https://jestjs.io/docs/en/getting-started"], "Time": "2 weeks"}]}]}, {"Name": "Portfolio and Job Search", "Timeframe": "1 month", "Tasks": [{"Name": "Create a Front-end Portfolio", "Description": "Showcase your skills and projects by building a professional portfolio website.", "Time": "2 weeks", "Subtasks": [{"Name": "Portfolio Website Design", "Description": "Plan the design and layout of your portfolio, focusing on showcasing your projects effectively.", "Resources": ["https://www.awwwards.com/", "https://dribbble.com/"], "Time": "1 week"}, {"Name": "Build a Portfolio Website", "Description": "Use your HTML, CSS, and JavaScript knowledge to build a responsive and visually appealing portfolio website.", "Resources": ["https://www.freecodecamp.org/learn/front-end-libraries/react/build-a-portfolio-website", "https://www.w3schools.com/html/", "https://www.w3schools.com/css/"], "Time": "1 week"}]}, {"Name": "Job Search Strategies", "Description": "Learn effective job search techniques, including networking, online platforms, and resume/cover letter writing.", "Time": "1 week", "Subtasks": [{"Name": "Networking and Job Boards", "Description": "Explore online job boards and professional networks to find relevant job openings.", "Resources": ["https://www.linkedin.com/", "https://www.indeed.com/"], "Time": "1 week"}, {"Name": "Resume and Cover Letter Writing", "Description": "Learn how to write compelling resumes and cover letters that highlight your skills and experience.", "Resources": ["https://www.indeed.com/career-advice/resumes-cover-letters/resume-templates", "https://www.indeed.com/career-advice/resumes-cover-letters/cover-letter-samples"], "Time": "1 week"}]}, {"Name": "Interview Preparation", "Description": "Prepare for technical and behavioral interviews by practicing common questions and refining your answers.", "Time": "1 week", "Subtasks": [{"Name": "Front-end Interview Questions", "Description": "Research common front-end interview questions and prepare answers that demonstrate your understanding of concepts.", "Resources": ["https://www.freecodecamp.org/news/front-end-interview-questions-and-answers/", "https://www.interviewcake.com/"], "Time": "1 week"}, {"Name": "Behavioral Interview Practice", "Description": "Practice answering behavioral questions that assess your soft skills and problem-solving abilities.", "Resources": ["https://www.indeed.com/career-advice/interviewing/behavioral-interview-questions", "https://www.interviewcake.com/"], "Time": "1 week"}]}]}]}}',
      },
      {
        text: `input: You are an AI assistant helping a university student create a personalized roadmap to ${title}.\n\nGiven the following user information and goals, generate a detailed roadmap in JSON format.\n\n**User Information:**\n\n- Age: ${user.age}\n- Gender: ${user.gender}\n- Location: ${user.location}\n- Occupation: ${user.occupation}\n\n**Goals and Expectations:**\n\n${info}\n\n\n**Roadmap Structure:**\n\nThe roadmap should be structured as follows:\n\n* **Stages:** Each stage represents a major phase in the learning journey.\n    * **Name:** A descriptive name for the stage.\n    * **Timeframe:** Estimated duration of the stage (e.g., "3 months").\n    * **Tasks:** A list of tasks to be completed within the stage.\n* **Tasks:** Each task represents a specific learning objective.\n    * **Name:** A clear and concise name for the task.\n    * **Description:** A detailed explanation of what the task entails.\n    * **Time:** Estimated time required to complete the task.\n    * **Subtasks:** A list of smaller, actionable steps to achieve the task.\n* **Subtasks:**\n    * **Name:** A descriptive name for the subtask.\n    * **Description:** A brief explanation of the subtask.\n    * **Resources:** Links to relevant learning resources (e.g., online courses, tutorials, documentation).\n    * **Time:** Estimated time required to complete the subtask.\n\n**Example JSON Structure:**\n\n{\n  "Roadmap": {\n    "Stages": [\n      {\n        "Name": "Stage 1 Name",\n        "Timeframe": "3 months",\n        "Tasks": [\n          {\n            "Name": "Task 1 Name",\n            "Description": "Task 1 Description",\n            "Time": "1 month",\n            "Subtasks": [\n              {\n                "Name": "Subtask 1 Name",\n                "Description": "Subtask 1 Description",\n                "Resources": ["Resource 1 Link", "Resource 2 Link"],\n                "Time": "1 week"\n              },\n              // ... more subtasks(minimum 4 subtasks)\n            ]\n          },\n          // ... more tasks(minimum 3 tasks)\n        ]\n      },\n      // ... more stages(minimum 2 stages)\n    ]\n  }\n}\n\n**Important Notes:**\n\n* Tailor the roadmap to the user\'s age, location, occupation, and specific goals.\n* Provide realistic timeframes and suggest relevant resources for each subtask.\n* Ensure the JSON output is well-formatted and easy to read.`,
      },
      { text: 'output: ' },
    ];
    const result = await this.model.generateContent({
      contents: [{ role: 'user', parts }],
      generationConfig: {
        ...this.generationConfig,
        maxOutputTokens: 10000,
        temperature: 0.5,
      },
      // safetySettings: Adjust safety settings
      // See https://ai.google.dev/gemini-api/docs/safety-settings
    });

    const res = result.response.text();
    // const jsonString = await this.createJsonString(res);
    // console.log(jsonString);
    console.log(info);
    const resJson = await JSON.parse(res);

    console.log(resJson);

    const roadmap = await this.prismaService.roadmap.create({
      data: {
        userId: user.id,
        title,
        stages: resJson.Roadmap.Stages,
      },
    });

    return roadmap;
  }

  async getRoadmap(id: string) {
    const roadmap = await this.prismaService.roadmap.findUnique({
      where: {
        id,
      },
    });

    return roadmap;
  }

  async createJsonString(data: string) {
    return JSON.stringify(data);
  }
}
