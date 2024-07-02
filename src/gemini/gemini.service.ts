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
        text: 'input: From the information below, please create a roadmap for me showing the required or optional steps to complete the goal below:\n1. User Information\n   - Age:  18\n   - Gender: Female\n   - Location: Ho Chi Minh\n   - Occupation: University Student, Computer Science\n   2. Goals and Expectations\nPersonal or Career Goals: Front-end Developer\nInterest: React\nExperience Level: Beginner\nInterest: Online course',
      },
      {
        text: 'output: {\n  "Roadmap": {\n    "Stages": [\n      {\n        "Name": "Foundation Building",\n        "Timeframe": "3 months",\n        "Tasks": [\n          {\n            "Name": "Web Development Fundamentals",\n            "Description": "Learn the core concepts of HTML, CSS, and JavaScript.",\n            "Subtasks": [\n              {\n                "Name": "HTML Basics",\n                "Description": "Learn the structure of HTML documents and basic tags.",\n                "Resources": ["FreeCodeCamp", "W3Schools"],\n                "Time": "1 week"\n              },\n              {\n                "Name": "CSS Basics",\n                "Description": "Learn basic CSS for styling HTML elements.",\n                "Resources": ["FreeCodeCamp", "Codecademy"],\n                "Time": "1 week"\n              },\n              {\n                "Name": "JavaScript Basics",\n                "Description": "Learn basic JavaScript syntax and concepts.",\n                "Resources": ["FreeCodeCamp", "Codecademy"],\n                "Time": "2 weeks"\n              }\n            ],\n            "Time": "1 month"\n          },\n          {\n            "Name": "Web Design Principles",\n            "Description": "Learn about UI/UX design principles, color theory, and visual hierarchy.",\n            "Subtasks": [\n              {\n                "Name": "UI/UX Design",\n                "Description": "Understand the basics of user interface and user experience design.",\n                "Resources": ["Udemy course on UI/UX Design", "Medium articles"],\n                "Time": "1 week"\n              },\n              {\n                "Name": "Color Theory",\n                "Description": "Learn the fundamentals of color theory and its application in design.",\n                "Resources": ["Dribbble", "Design articles"],\n                "Time": "1 week"\n              },\n              {\n                "Name": "Visual Hierarchy",\n                "Description": "Learn about visual hierarchy and its importance in design.",\n                "Resources": ["Design principles articles", "Dribbble for inspiration"],\n                "Time": "2 weeks"\n              }\n            ],\n            "Time": "1 month"\n          },\n          {\n            "Name": "Version Control with Git",\n            "Description": "Learn how to use Git and GitHub for managing code.",\n            "Subtasks": [\n              {\n                "Name": "Git Basics",\n                "Description": "Understand Git basics, including repositories and commits.",\n                "Resources": ["GitHub documentation", "Atlassian tutorial"],\n                "Time": "1 week"\n              },\n              {\n                "Name": "Branching and Merging",\n                "Description": "Learn how to create branches and merge changes.",\n                "Resources": ["Udemy course on Git", "GitHub documentation"],\n                "Time": "1 week"\n              },\n              {\n                "Name": "Collaborating on GitHub",\n                "Description": "Learn how to collaborate with others using GitHub.",\n                "Resources": ["GitHub tutorials", "Atlassian Git tutorial"],\n                "Time": "2 weeks"\n              }\n            ],\n            "Time": "1 month"\n          }\n        ]\n      },\n      {\n        "Name": "Front-End Development Skills",\n        "Timeframe": "3 months",\n        "Tasks": [\n          {\n            "Name": "Advanced HTML & CSS",\n            "Description": "Dive deeper into HTML5 and CSS3 features.",\n            "Subtasks": [\n              {\n                "Name": "Responsive Design",\n                "Description": "Learn how to make websites responsive.",\n                "Resources": ["FreeCodeCamp", "MDN Web Docs"],\n                "Time": "2 weeks"\n              },\n              {\n                "Name": "CSS Animations",\n                "Description": "Learn to create animations using CSS.",\n                "Resources": ["CSS Tricks", "Online tutorials"],\n                "Time": "1 week"\n              },\n              {\n                "Name": "Using CSS Preprocessors",\n                "Description": "Learn about Sass and how to use it.",\n                "Resources": ["Sass documentation", "Codecademy"],\n                "Time": "1 week"\n              }\n            ],\n            "Time": "1 month"\n          },\n          {\n            "Name": "JavaScript Proficiency",\n            "Description": "Master JavaScript fundamentals.",\n            "Subtasks": [\n              {\n                "Name": "DOM Manipulation",\n                "Description": "Learn how to manipulate the DOM with JavaScript.",\n                "Resources": ["Eloquent JavaScript", "FreeCodeCamp"],\n                "Time": "1 week"\n              },\n              {\n                "Name": "Event Handling",\n                "Description": "Learn how to handle events in JavaScript.",\n                "Resources": ["JavaScript tutorials", "Udemy course"],\n                "Time": "1 week"\n              },\n              {\n                "Name": "Asynchronous Programming",\n                "Description": "Understand asynchronous programming and promises.",\n                "Resources": ["Eloquent JavaScript", "FreeCodeCamp"],\n                "Time": "2 weeks"\n              }\n            ],\n            "Time": "1 month"\n          },\n          {\n            "Name": "Front-End Libraries & Frameworks",\n            "Description": "Learn popular front-end libraries and frameworks.",\n            "Subtasks": [\n              {\n                "Name": "Introduction to React",\n                "Description": "Learn the basics of React.",\n                "Resources": ["React documentation", "Codecademy"],\n                "Time": "2 weeks"\n              },\n              {\n                "Name": "React Projects",\n                "Description": "Build small projects using React.",\n                "Resources": ["Udemy React course", "Online tutorials"],\n                "Time": "2 weeks"\n              },\n              {\n                "Name": "Exploring Other Frameworks",\n                "Description": "Get an overview of Angular or Vue.js.",\n                "Resources": ["Official documentation", "Online courses"],\n                "Time": "2 weeks"\n              }\n            ],\n            "Time": "1 month"\n          }\n        ]\n      },\n      {\n        "Name": "Portfolio Development & Networking",\n        "Timeframe": "6 months",\n        "Tasks": [\n          {\n            "Name": "Build Personal Portfolio Website",\n            "Description": "Showcase your skills through a portfolio website.",\n            "Subtasks": [\n              {\n                "Name": "Designing the Portfolio",\n                "Description": "Create a design layout for your portfolio.",\n                "Resources": ["Dribbble", "Figma"],\n                "Time": "2 weeks"\n              },\n              {\n                "Name": "Developing the Portfolio",\n                "Description": "Code the portfolio website.",\n                "Resources": ["GitHub Pages", "Netlify"],\n                "Time": "4 weeks"\n              }\n            ],\n            "Time": "2 months"\n          },\n          {\n            "Name": "Develop Capstone Projects",\n            "Description": "Work on personal projects or open-source contributions.",\n            "Subtasks": [\n              {\n                "Name": "Choose a Project",\n                "Description": "Select a project that showcases your skills.",\n                "Resources": ["FreeCodeCamp project ideas", "GitHub repositories"],\n                "Time": "2 weeks"\n              },\n              {\n                "Name": "Develop the Project",\n                "Description": "Work on the development of the chosen project.",\n                "Resources": ["Online coding resources", "Project tutorials"],\n                "Time": "8 weeks"\n              },\n              {\n                "Name": "Contribute to Open Source",\n                "Description": "Contribute to open-source projects.",\n                "Resources": ["GitHub", "Open-source guides"],\n                "Time": "2 weeks"\n              }\n            ],\n            "Time": "3 months"\n          },\n          {\n            "Name": "Networking and Job Search",\n            "Description": "Attend events and apply for jobs.",\n            "Subtasks": [\n              {\n                "Name": "Networking",\n                "Description": "Join online communities and attend meetups.",\n                "Resources": ["LinkedIn", "Meetup"],\n                "Time": "2 weeks"\n              },\n              {\n                "Name": "Job Applications",\n                "Description": "Apply for internships or junior developer roles.",\n                "Resources": ["Job boards", "Company websites"],\n                "Time": "2 weeks"\n              }\n            ],\n            "Time": "1 month"\n          }\n        ]\n      }\n    ]\n  }\n}',
      },
      {
        text: 'input: From the information below, please create a roadmap for me showing the required or optional steps to complete the goal below:\n1. User Information\n   - Age:  21\n   - Gender: Male\n   - Location: Hanoi\n   - Occupation: University Student, Computer Science\n   2. Goals and Expectations\nPersonal or Career Goals:  Study AWS\nCurrent Skill Level: Beginner\nInterest: DevOps\nInterest: Online Course',
      },
      {
        text: 'output: {\n  "Roadmap": {\n    "Stages": [\n      {\n        "Name": "Cloud Computing Fundamentals",\n        "Timeframe": "2 months",\n        "Tasks": [\n          {\n            "Name": "AWS Introduction",\n            "Description": "Learn the basics of cloud computing, AWS services, and its architecture.",\n            "Subtasks": [\n              {\n                "Name": "Understanding Cloud Computing",\n                "Description": "Learn what cloud computing is and its advantages.",\n                "Resources": ["AWS Free Tier overview", "AWS Cloud Practitioner Essentials"],\n                "Time": "1 week"\n              },\n              {\n                "Name": "Overview of AWS Services",\n                "Description": "Explore core AWS services and their purposes.",\n                "Resources": ["AWS Documentation", "AWS Whitepapers"],\n                "Time": "1 week"\n              },\n              {\n                "Name": "AWS Global Infrastructure",\n                "Description": "Learn about AWS regions, availability zones, and edge locations.",\n                "Resources": ["AWS Global Infrastructure documentation"],\n                "Time": "1 week"\n              },\n              {\n                "Name": "Navigating the AWS Management Console",\n                "Description": "Get familiar with the AWS Management Console interface.",\n                "Resources": ["AWS Console walkthrough", "Udemy course on AWS Essentials"],\n                "Time": "1 week"\n              }\n            ],\n            "Time": "1 month"\n          },\n          {\n            "Name": "AWS Core Services",\n            "Description": "Understand key services like EC2, S3, IAM, and VPC.",\n            "Subtasks": [\n              {\n                "Name": "Introduction to EC2",\n                "Description": "Learn how to launch and configure EC2 instances.",\n                "Resources": ["AWS EC2 documentation", "AWS tutorials on EC2"],\n                "Time": "1 week"\n              },\n              {\n                "Name": "S3 Basics",\n                "Description": "Understand the use of S3 for storage solutions.",\n                "Resources": ["AWS S3 documentation", "AWS tutorials on S3"],\n                "Time": "1 week"\n              },\n              {\n                "Name": "IAM Overview",\n                "Description": "Learn about user management and policies in IAM.",\n                "Resources": ["AWS IAM documentation", "AWS IAM tutorials"],\n                "Time": "1 week"\n              },\n              {\n                "Name": "VPC Fundamentals",\n                "Description": "Understand how to set up and manage a Virtual Private Cloud.",\n                "Resources": ["AWS VPC documentation", "AWS VPC tutorials"],\n                "Time": "1 week"\n              }\n            ],\n            "Time": "1 month"\n          }\n        ]\n      },\n      {\n        "Name": "AWS Development Skills",\n        "Timeframe": "2 months",\n        "Tasks": [\n          {\n            "Name": "Serverless Computing with Lambda",\n            "Description": "Develop and deploy serverless applications using AWS Lambda.",\n            "Subtasks": [\n              {\n                "Name": "Introduction to Serverless",\n                "Description": "Learn the principles of serverless computing.",\n                "Resources": ["AWS Lambda documentation", "Serverless Framework tutorials"],\n                "Time": "1 week"\n              },\n              {\n                "Name": "Creating Lambda Functions",\n                "Description": "Learn how to create Lambda functions using the console.",\n                "Resources": ["AWS Lambda documentation", "AWS Lambda tutorials"],\n                "Time": "1 week"\n              },\n              {\n                "Name": "Event Sources and Triggers",\n                "Description": "Understand how to trigger Lambda functions with events.",\n                "Resources": ["AWS Lambda documentation", "AWS tutorials"],\n                "Time": "1 week"\n              },\n              {\n                "Name": "Deploying with Serverless Framework",\n                "Description": "Use the Serverless Framework to deploy Lambda functions.",\n                "Resources": ["Serverless Framework guides", "Udemy course on AWS Lambda"],\n                "Time": "1 week"\n              }\n            ],\n            "Time": "1 month"\n          },\n          {\n            "Name": "Database Management with DynamoDB",\n            "Description": "Use DynamoDB for NoSQL database management in AWS.",\n            "Subtasks": [\n              {\n                "Name": "DynamoDB Basics",\n                "Description": "Learn the basics of DynamoDB and its data model.",\n                "Resources": ["AWS DynamoDB documentation", "DynamoDB tutorials"],\n                "Time": "1 week"\n              },\n              {\n                "Name": "Creating and Managing Tables",\n                "Description": "Set up tables and understand partition keys.",\n                "Resources": ["AWS DynamoDB documentation", "AWS tutorials on DynamoDB"],\n                "Time": "1 week"\n              },\n              {\n                "Name": "DynamoDB Streams and Triggers",\n                "Description": "Learn about DynamoDB Streams and triggering Lambda functions.",\n                "Resources": ["AWS DynamoDB Streams documentation"],\n                "Time": "1 week"\n              },\n              {\n                "Name": "Advanced DynamoDB Features",\n                "Description": "Explore features like Global Tables and secondary indexes.",\n                "Resources": ["AWS DynamoDB documentation", "Advanced DynamoDB tutorials"],\n                "Time": "1 week"\n              }\n            ],\n            "Time": "1 month"\n          }\n        ]\n      },\n      {\n        "Name": "AWS Security and Deployment",\n        "Timeframe": "2 months",\n        "Tasks": [\n          {\n            "Name": "Security Best Practices",\n            "Description": "Learn about security considerations in AWS.",\n            "Subtasks": [\n              {\n                "Name": "IAM Roles and Policies",\n                "Description": "Set up IAM roles and manage policies for secure access.",\n                "Resources": ["AWS IAM best practices", "AWS Security Hub"],\n                "Time": "1 week"\n              },\n              {\n                "Name": "Data Encryption",\n                "Description": "Implement data encryption using AWS KMS.",\n                "Resources": ["AWS KMS documentation", "Encryption tutorials"],\n                "Time": "1 week"\n              },\n              {\n                "Name": "Monitoring and Compliance",\n                "Description": "Use AWS tools for monitoring security and compliance.",\n                "Resources": ["AWS CloudTrail", "AWS Config", "AWS Security Hub"],\n                "Time": "1 week"\n              },\n              {\n                "Name": "Implementing Security Groups",\n                "Description": "Configure security groups and network ACLs.",\n                "Resources": ["AWS VPC documentation", "AWS tutorials on security groups"],\n                "Time": "1 week"\n              }\n            ],\n            "Time": "1 month"\n          },\n          {\n            "Name": "Deployment and Automation",\n            "Description": "Deploy applications to AWS using various tools.",\n            "Subtasks": [\n              {\n                "Name": "Using AWS CodePipeline",\n                "Description": "Set up CI/CD pipelines with AWS CodePipeline.",\n                "Resources": ["AWS CodePipeline documentation", "CodePipeline tutorials"],\n                "Time": "1 week"\n              },\n              {\n                "Name": "AWS CloudFormation",\n                "Description": "Automate infrastructure deployment using CloudFormation.",\n                "Resources": ["AWS CloudFormation documentation", "CloudFormation templates"],\n                "Time": "1 week"\n              },\n              {\n                "Name": "Deploying with Elastic Beanstalk",\n                "Description": "Use Elastic Beanstalk for quick application deployment.",\n                "Resources": ["AWS Elastic Beanstalk documentation", "Beanstalk tutorials"],\n                "Time": "1 week"\n              },\n              {\n                "Name": "Automating with AWS CLI",\n                "Description": "Use the AWS CLI for scripting and automation.",\n                "Resources": ["AWS CLI documentation", "AWS CLI tutorials"],\n                "Time": "1 week"\n              }\n            ],\n            "Time": "1 month"\n          }\n        ]\n      }\n    ]\n  }\n}',
      },
      {
        text: "input: From the information below, please create a roadmap for me showing the required or optional steps to complete the goal below:\n1. User Information\n   - Age:  21\n   - Gender: Male\n   - Location: Hanoi\n   - Occupation: University Student, Computer Science\n2. Goals and Expectations\nPersonal or Career Goals: Piano\nKnowledge: I don't have any knowledge about music\nGoals: Learn basic chords and melodies\nInterest: Practice",
      },
      {
        text: 'output: {\n  "Roadmap": {\n    "Stages": [\n      {\n        "Name": "Piano Fundamentals",\n        "Timeframe": "3 months",\n        "Tasks": [\n          {\n            "Name": "Music Theory Basics",\n            "Description": "Learn the fundamentals of music theory, including notes, scales, and key signatures.",\n            "Subtasks": [\n              {\n                "Name": "Understanding Notes",\n                "Description": "Learn about musical notes and their positions on the staff.",\n                "Resources": ["Online music theory courses", "YouTube tutorials on music notes"],\n                "Time": "1 week"\n              },\n              {\n                "Name": "Learning Scales",\n                "Description": "Practice major and minor scales.",\n                "Resources": ["Online scale exercises", "Books on scales"],\n                "Time": "1 week"\n              },\n              {\n                "Name": "Key Signatures",\n                "Description": "Understand key signatures and how to identify them.",\n                "Resources": ["Online tutorials", "Music theory books"],\n                "Time": "2 weeks"\n              }\n            ],\n            "Time": "1 month"\n          },\n          {\n            "Name": "Basic Chords and Finger Positioning",\n            "Description": "Learn to play basic chords and practice finger positioning.",\n            "Subtasks": [\n              {\n                "Name": "C Major Chord",\n                "Description": "Learn and practice the C major chord.",\n                "Resources": ["Online piano lessons", "Chord apps"],\n                "Time": "1 week"\n              },\n              {\n                "Name": "G Major Chord",\n                "Description": "Learn and practice the G major chord.",\n                "Resources": ["YouTube tutorials", "Piano apps"],\n                "Time": "1 week"\n              },\n              {\n                "Name": "D Major Chord",\n                "Description": "Learn and practice the D major chord.",\n                "Resources": ["Online lessons", "Piano apps"],\n                "Time": "1 week"\n              },\n              {\n                "Name": "Finger Positioning and Technique",\n                "Description": "Practice proper hand and finger positioning.",\n                "Resources": ["Piano lessons with a teacher", "Online tutorials"],\n                "Time": "1 week"\n              }\n            ],\n            "Time": "1 month"\n          },\n          {\n            "Name": "Simple Melodies and Sight-Reading",\n            "Description": "Practice playing simple melodies and learn basic sight-reading skills.",\n            "Subtasks": [\n              {\n                "Name": "Simple Melodies",\n                "Description": "Learn to play simple melodies.",\n                "Resources": ["Beginner sheet music", "Online tutorials"],\n                "Time": "2 weeks"\n              },\n              {\n                "Name": "Basic Sight-Reading",\n                "Description": "Practice sight-reading simple pieces.",\n                "Resources": ["Sight-reading apps", "Beginner sheet music"],\n                "Time": "2 weeks"\n              }\n            ],\n            "Time": "1 month"\n          }\n        ]\n      },\n      {\n        "Name": "Developing Proficiency",\n        "Timeframe": "6 months",\n        "Tasks": [\n          {\n            "Name": "Expanding Chord Knowledge",\n            "Description": "Learn more chords, including minor chords, seventh chords, and inversions.",\n            "Subtasks": [\n              {\n                "Name": "Minor Chords",\n                "Description": "Learn minor chords and their fingerings.",\n                "Resources": ["Piano lessons", "Chord books"],\n                "Time": "1 month"\n              },\n              {\n                "Name": "Seventh Chords",\n                "Description": "Learn seventh chords and how to play them.",\n                "Resources": ["Online tutorials", "Piano apps"],\n                "Time": "1 month"\n              },\n              {\n                "Name": "Chord Inversions",\n                "Description": "Practice chord inversions for smoother transitions.",\n                "Resources": ["Piano lessons", "Inversion exercises"],\n                "Time": "2 weeks"\n              }\n            ],\n            "Time": "2 months"\n          },\n          {\n            "Name": "Playing Songs and Pieces",\n            "Description": "Start learning and playing simple songs or pieces.",\n            "Subtasks": [\n              {\n                "Name": "Choosing Songs",\n                "Description": "Select songs that match your skill level.",\n                "Resources": ["Sheet music websites", "Piano books"],\n                "Time": "1 week"\n              },\n              {\n                "Name": "Learning Songs",\n                "Description": "Practice playing selected songs.",\n                "Resources": ["Online tutorials", "Piano apps"],\n                "Time": "2 months"\n              },\n              {\n                "Name": "Increasing Difficulty",\n                "Description": "Gradually learn more challenging pieces.",\n                "Resources": ["Intermediate sheet music", "Online lessons"],\n                "Time": "2 weeks"\n              }\n            ],\n            "Time": "3 months"\n          },\n          {\n            "Name": "Regular Practice and Performance",\n            "Description": "Practice consistently and consider performing.",\n            "Subtasks": [\n              {\n                "Name": "Practice Routines",\n                "Description": "Establish a regular practice routine.",\n                "Resources": ["Practice apps", "Online practice guides"],\n                "Time": "2 weeks"\n              },\n              {\n                "Name": "Performance Preparation",\n                "Description": "Prepare a piece for performance.",\n                "Resources": ["Performance tips", "Recital opportunities"],\n                "Time": "2 weeks"\n              }\n            ],\n            "Time": "1 month"\n          }\n        ]\n      }\n    ]\n  }\n}',
      },
      {
        text: `input: From the information below, please create a roadmap for me showing the required or optional steps to complete the goal below:\n1. User Information\n   - Age:  ${user.age}\n   - Gender: ${user.gender}\n   - Location: ${user.location}\n   - Occupation: ${user.occupation}\n  2. Goals and Expectations \n${info}`,
      },
      { text: 'output: ' },
    ];

    const result = await this.model.generateContent({
      contents: [{ role: 'user', parts }],
      generationConfig: {
        ...this.generationConfig,
        maxOutputTokens: 8000,
        temperature: 0.5,
      },
      // safetySettings: Adjust safety settings
      // See https://ai.google.dev/gemini-api/docs/safety-settings
    });

    const res = result.response.text();
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
    roadmap;

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
}
