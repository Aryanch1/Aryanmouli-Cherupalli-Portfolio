/* Aryanmouli Cherupalli — content rendered from JS. Edit here. */

export const SITE = {
  name: 'Aryanmouli Cherupalli',
  email: 'aryanmouli.ch@gmail.com',
  location: 'United States',
  links: {
    linkedin: 'https://linkedin.com/in/aryanmouli-cherupalli',
    github: 'https://github.com/Aryanch1',
    leetcode: 'https://leetcode.com/u/Aryanmouli',
    geeksforgeeks: 'https://www.geeksforgeeks.org/profile/aryanmov1z0?tab=activity',
  },
};

/** The two faces of the hero. Hovering shows the other one; clicking swaps. */
export const MODES = {
  designer: {
    title: ['I build', 'products.'],
    body: '<span class="lead"><strong>Full-stack developer with 4 years of experience</strong> turning requirements into fast, secure, production-grade software. At Citratek I shipped <b>3 microservices</b> exposing <b>10 GraphQL operations</b>, cut response times by <b>~30%</b> with Redis caching and deployment time by <b>~40%</b> with Docker and CI/CD on AWS.</span> <span class="more">I\'ve built React and Spring Boot platforms, a Flutter app and semantic search over <b>5K+ documents</b>. I also think like an attacker: I analysed <b>1M+ security events</b> at Palo Alto Networks and saw <b>75%</b> of reported vulnerabilities fixed. Published researcher, Master\'s graduate, and the engineer who ships it end to end.</span> <em class="trust">Every number here is backed by a project, a role or a certificate you can open below.</em>',
    skills: ['Java', 'Spring Boot', 'React', 'Node.js', 'TypeScript', 'GraphQL', 'PostgreSQL', 'Redis', 'AWS', 'Docker', 'CI/CD', 'OWASP'],
    hint: 'Move to augment · Click to switch',
  },
  engineer: {
    title: ['I build', 'AI systems.'],
    body: '<span class="lead"><strong>I build AI that works in production, not just in demos.</strong> My LangGraph agents in BridgeAI cut educator quiz-creation work by <b>80%</b> and brought failed generations down from <b>15% to 3%</b>, with RAG over <b>500+ documents</b> in Pinecone.</span> <span class="more">At Citratek I shipped LangChain semantic search over <b>5K+ documents</b>. My hotel agent on Gemini and Google ADK ranks <b>4 booking sources</b> and cuts manual comparison by <b>~50%</b>. Retrieval first, verified answers, security by design.</span> <em class="trust">Every number here is backed by a project, a role or a certificate you can open below.</em>',
    skills: ['Python', 'LangChain', 'LangGraph', 'Pinecone', 'RAG', 'Gemini', 'Google ADK', 'Claude API', 'MCP', 'Agent Skills'],
    hint: 'Move to stay human · Click to switch',
  },
};

/** Pinned "craft" chapters (ids are used by the scroll/particle code, keep them). */
export const CRAFT = [
  {
    id: 'design',
    index: '01',
    title: 'Full-Stack',
    kicker: 'From requirement to release.',
    body: 'Java and Spring Boot services, Node.js and TypeScript microservices with GraphQL, React front ends and PostgreSQL, MongoDB and DynamoDB underneath. Cached, tested and tuned until the response times drop.',
    steps: ['Requirements', 'API', 'Interface', 'Test', 'Ship'],
    tags: ['Java', 'Spring Boot', 'React', 'Node.js', 'GraphQL'],
    image: 'assets/img/role-design.webp',
    alt: 'Illustrated portrait for the full-stack chapter',
    accent: '#ff5a1f',
  },
  {
    id: 'agents',
    index: '02',
    title: 'AI & LLM',
    kicker: 'From documents to answers.',
    body: 'Semantic search over thousands of documents, and multi-step agents orchestrated with LangGraph. Retrieval first, so answers come from real sources. Built into BridgeAI, which cut educator quiz-creation workload by 80%.',
    steps: ['Plan', 'Retrieve', 'Act', 'Verify'],
    tags: ['LangChain', 'LangGraph', 'Pinecone', 'RAG'],
    image: 'assets/img/role-agents.webp',
    alt: 'Illustrated portrait for the AI chapter',
    accent: '#45e6ff',
  },
  {
    id: 'data',
    index: '03',
    title: 'Cloud & Security',
    kicker: 'From code to production.',
    body: 'Services on Lambda, ECS, SQS and API Gateway, shipped with Docker and CI/CD, and written with OAuth2, RBAC and the OWASP Top 10 in mind. A cybersecurity internship at Palo Alto Networks taught the security half.',
    steps: ['Build', 'Secure', 'Containerise', 'Deploy', 'Monitor'],
    tags: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'OWASP'],
    image: 'assets/img/role-data.webp',
    alt: 'Illustrated portrait for the cloud and security chapter',
    accent: '#8f7bff',
  },
];

import aws from './icons/aws.svg?raw';
import python from './icons/python.svg?raw';

const icons = import.meta.glob('./icons/*.svg', { query: '?raw', import: 'default', eager: true });
const ic = (n) => icons[`./icons/${n}.svg`];

/** Logos on the rotating ring: 14 tiles, the count the ring geometry was designed around. */
export const RING = [
  { name: 'AWS', svg: aws, tint: '#FF9900' },
  { name: 'S3', file: 's3.svg' },
  { name: 'Java', svg: ic('openjdk'), tint: '#f4f1ea' },
  { name: 'Spring Boot', svg: ic('springboot'), tint: '#6DB33F' },
  { name: 'React', svg: ic('react'), tint: '#61DAFB' },
  { name: 'Node.js', svg: ic('nodedotjs'), tint: '#5FA04E' },
  { name: 'TypeScript', svg: ic('typescript'), tint: '#3178C6' },
  { name: 'GraphQL', svg: ic('graphql'), tint: '#f4f1ea' },
  { name: 'Docker', svg: ic('docker'), tint: '#2496ED' },
  { name: 'Kubernetes', svg: ic('kubernetes'), tint: '#326CE5' },
  { name: 'PostgreSQL', svg: ic('postgresql'), tint: '#4169E1' },
  { name: 'MongoDB', svg: ic('mongodb'), tint: '#47A248' },
  { name: 'Python', svg: python, tint: '#5aa2e0' },
  { name: 'LangChain', svg: ic('langchain'), tint: '#7FC8FF' },
];

export const STACK_GROUPS = [
  { title: 'Languages', accent: '#ff5a1f', items: ['Java', 'Python', 'C', 'C++', 'C#', 'Dart', 'Kotlin', 'Objective-C', 'JavaScript (ES6+)', 'TypeScript', 'Operating Systems'] },
  { title: 'Frontend & Mobile', accent: '#ff5f9e', items: ['React.js', 'HTML5', 'CSS3', 'Responsive Design', 'Web Applications', 'Mobile Applications', 'Flutter'] },
  { title: 'Backend', accent: '#ffcf6b', items: ['Spring Boot', 'Node.js', 'REST APIs', 'GraphQL', 'Microservices', 'Flask'] },
  { title: 'Security', accent: '#8f7bff', items: ['JWT', 'OAuth2', 'RBAC', 'OWASP Top 10', 'HTTPS', 'CORS', 'Secure Coding', 'Metasploit', 'Wireshark'] },
  { title: 'Databases', accent: '#7dffb0', items: ['PostgreSQL', 'SQL', 'MongoDB', 'DynamoDB', 'Firebase', 'Redis'] },
  { title: 'Cloud & DevOps', accent: '#45e6ff', items: ['AWS EC2', 'S3', 'Lambda', 'ECS', 'SQS', 'API Gateway', 'CDK', 'CloudFormation', 'Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions'] },
  { title: 'Testing & Tools', accent: '#ff5a1f', items: ['JUnit', 'Jest', 'Unit Testing', 'Integration Testing', 'Debugging', 'Postman', 'Git', 'GitHub', 'Jira', 'Agile / Scrum', 'Code Reviews', 'SDLC'] },
  { title: 'AI / ML & Fundamentals', accent: '#45e6ff', items: ['LLM', 'RAG', 'LangChain', 'LangGraph', 'Pinecone', 'Semantic Search', 'Gemini', 'Google ADK', 'MCP', 'Data Structures', 'Algorithms', 'OOPS'] },
];
