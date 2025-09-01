import { useEffect, useRef, useCallback, useState } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';
import PropTypes from 'prop-types';

// 技术关键词字典和分类（大幅扩展版 - 包含开发者职业相关术语）
const TECH_KEYWORDS = {
    // Frontend Frameworks & Libraries
    React: { category: 'Frontend Framework', weight: 5 },
    'React.js': { category: 'Frontend Framework', weight: 5 },
    Vue: { category: 'Frontend Framework', weight: 5 },
    'Vue.js': { category: 'Frontend Framework', weight: 5 },
    Angular: { category: 'Frontend Framework', weight: 5 },
    'Next.js': { category: 'Frontend Framework', weight: 5 },
    'Nuxt.js': { category: 'Frontend Framework', weight: 5 },
    Svelte: { category: 'Frontend Framework', weight: 4 },
    SvelteKit: { category: 'Frontend Framework', weight: 4 },
    Vite: { category: 'Build Tool', weight: 3 },
    Webpack: { category: 'Build Tool', weight: 3 },
    Parcel: { category: 'Build Tool', weight: 3 },
    Rollup: { category: 'Build Tool', weight: 3 },

    // Backend Frameworks & Runtime
    'Spring Boot': { category: 'Backend Framework', weight: 5 },
    Express: { category: 'Backend Framework', weight: 4 },
    'Express.js': { category: 'Backend Framework', weight: 4 },
    'Node.js': { category: 'Backend Runtime', weight: 5 },
    FastAPI: { category: 'Backend Framework', weight: 4 },
    Django: { category: 'Backend Framework', weight: 4 },
    Flask: { category: 'Backend Framework', weight: 4 },
    '.NET': { category: 'Backend Framework', weight: 4 },
    'ASP.NET': { category: 'Backend Framework', weight: 4 },
    Laravel: { category: 'Backend Framework', weight: 4 },
    Rails: { category: 'Backend Framework', weight: 4 },
    'Ruby on Rails': { category: 'Backend Framework', weight: 4 },
    'Nest.js': { category: 'Backend Framework', weight: 4 },
    Koa: { category: 'Backend Framework', weight: 3 },

    // Databases & Data Storage
    PostgreSQL: { category: 'Database', weight: 4 },
    MySQL: { category: 'Database', weight: 4 },
    MongoDB: { category: 'Database', weight: 4 },
    Redis: { category: 'Database', weight: 3 },
    SQLite: { category: 'Database', weight: 3 },
    'SQL Server': { category: 'Database', weight: 4 },
    Oracle: { category: 'Database', weight: 4 },
    Elasticsearch: { category: 'Database', weight: 4 },
    DynamoDB: { category: 'Database', weight: 3 },
    Cassandra: { category: 'Database', weight: 3 },
    Neo4j: { category: 'Database', weight: 3 },
    InfluxDB: { category: 'Database', weight: 3 },

    // Programming Languages
    JavaScript: { category: 'Programming Language', weight: 5 },
    TypeScript: { category: 'Programming Language', weight: 5 },
    Python: { category: 'Programming Language', weight: 5 },
    Java: { category: 'Programming Language', weight: 5 },
    'C#': { category: 'Programming Language', weight: 4 },
    Go: { category: 'Programming Language', weight: 4 },
    Rust: { category: 'Programming Language', weight: 4 },
    PHP: { category: 'Programming Language', weight: 4 },
    'C++': { category: 'Programming Language', weight: 4 },
    C: { category: 'Programming Language', weight: 3 },
    Ruby: { category: 'Programming Language', weight: 4 },
    Swift: { category: 'Programming Language', weight: 4 },
    Kotlin: { category: 'Programming Language', weight: 4 },
    Scala: { category: 'Programming Language', weight: 3 },
    R: { category: 'Programming Language', weight: 3 },
    MATLAB: { category: 'Programming Language', weight: 3 },
    Dart: { category: 'Programming Language', weight: 3 },

    // Cloud Platforms & Services
    AWS: { category: 'Cloud Platform', weight: 5 },
    Azure: { category: 'Cloud Platform', weight: 5 },
    'Google Cloud': { category: 'Cloud Platform', weight: 5 },
    GCP: { category: 'Cloud Platform', weight: 5 },
    EC2: { category: 'Cloud Service', weight: 3 },
    S3: { category: 'Cloud Service', weight: 3 },
    RDS: { category: 'Cloud Service', weight: 3 },
    Lambda: { category: 'Cloud Service', weight: 3 },
    CloudFormation: { category: 'Cloud Service', weight: 3 },
    Terraform: { category: 'Infrastructure', weight: 4 },
    CloudWatch: { category: 'Cloud Service', weight: 3 },
    CloudFront: { category: 'Cloud Service', weight: 3 },
    'API Gateway': { category: 'Cloud Service', weight: 3 },

    // DevOps & Infrastructure
    Docker: { category: 'DevOps', weight: 4 },
    Kubernetes: { category: 'DevOps', weight: 4 },
    Jenkins: { category: 'DevOps', weight: 3 },
    'GitHub Actions': { category: 'DevOps', weight: 3 },
    'GitLab CI': { category: 'DevOps', weight: 3 },
    CircleCI: { category: 'DevOps', weight: 3 },
    'Travis CI': { category: 'DevOps', weight: 3 },
    'Apache Airflow': { category: 'Data Pipeline', weight: 4 },
    Airflow: { category: 'Data Pipeline', weight: 4 },
    ETL: { category: 'Data Engineering', weight: 3 },
    'CI/CD': { category: 'DevOps', weight: 4 },
    'Continuous Integration': { category: 'DevOps', weight: 4 },
    'Continuous Deployment': { category: 'DevOps', weight: 4 },
    'Infrastructure as Code': { category: 'Infrastructure', weight: 4 },
    IaC: { category: 'Infrastructure', weight: 4 },

    // CSS & Styling
    'Tailwind CSS': { category: 'CSS Framework', weight: 4 },
    Bootstrap: { category: 'CSS Framework', weight: 3 },
    Sass: { category: 'CSS Preprocessor', weight: 3 },
    SCSS: { category: 'CSS Preprocessor', weight: 3 },
    CSS3: { category: 'CSS Technology', weight: 3 },
    'Material-UI': { category: 'CSS Framework', weight: 3 },
    'Styled Components': { category: 'CSS Framework', weight: 3 },
    Emotion: { category: 'CSS Framework', weight: 3 },
    'Chakra UI': { category: 'CSS Framework', weight: 3 },
    'Ant Design': { category: 'CSS Framework', weight: 3 },

    // Graphics & 3D
    'Three.js': { category: '3D Graphics', weight: 4 },
    WebGL: { category: '3D Graphics', weight: 4 },
    'D3.js': { category: 'Data Visualization', weight: 4 },
    'Chart.js': { category: 'Data Visualization', weight: 3 },
    'Canvas API': { category: 'Graphics', weight: 3 },
    SVG: { category: 'Graphics', weight: 3 },

    // API & Web Technologies
    'REST API': { category: 'API Technology', weight: 4 },
    GraphQL: { category: 'API Technology', weight: 4 },
    Swagger: { category: 'API Documentation', weight: 3 },
    OpenAPI: { category: 'API Documentation', weight: 3 },
    WebSocket: { category: 'Web API', weight: 3 },
    gRPC: { category: 'API Technology', weight: 3 },
    'JSON-RPC': { category: 'API Technology', weight: 2 },
    SOAP: { category: 'API Technology', weight: 2 },

    // Testing & Quality Assurance
    Jest: { category: 'Testing', weight: 3 },
    Cypress: { category: 'Testing', weight: 3 },
    Playwright: { category: 'Testing', weight: 3 },
    Selenium: { category: 'Testing', weight: 3 },
    Mocha: { category: 'Testing', weight: 3 },
    Chai: { category: 'Testing', weight: 3 },
    Jasmine: { category: 'Testing', weight: 3 },
    Vitest: { category: 'Testing', weight: 3 },
    'Unit Testing': { category: 'Testing', weight: 4 },
    'Integration Testing': { category: 'Testing', weight: 4 },
    'End-to-End Testing': { category: 'Testing', weight: 4 },
    'E2E Testing': { category: 'Testing', weight: 4 },
    'Test Driven Development': { category: 'Development Practice', weight: 4 },
    TDD: { category: 'Development Practice', weight: 4 },
    'Behavior Driven Development': { category: 'Development Practice', weight: 4 },
    BDD: { category: 'Development Practice', weight: 4 },

    // Package Managers & Tools
    npm: { category: 'Package Manager', weight: 2 },
    yarn: { category: 'Package Manager', weight: 2 },
    pnpm: { category: 'Package Manager', weight: 2 },
    pip: { category: 'Package Manager', weight: 2 },
    composer: { category: 'Package Manager', weight: 2 },
    maven: { category: 'Package Manager', weight: 2 },
    gradle: { category: 'Package Manager', weight: 2 },

    // Version Control & Collaboration
    Git: { category: 'Version Control', weight: 4 },
    GitHub: { category: 'Version Control', weight: 4 },
    GitLab: { category: 'Version Control', weight: 3 },
    Bitbucket: { category: 'Version Control', weight: 3 },
    SVN: { category: 'Version Control', weight: 2 },
    Mercurial: { category: 'Version Control', weight: 2 },
    'Pull Request': { category: 'Development Practice', weight: 3 },
    'Code Review': { category: 'Development Practice', weight: 4 },
    'Peer Review': { category: 'Development Practice', weight: 4 },

    // Authentication & Security
    OAuth: { category: 'Authentication', weight: 3 },
    JWT: { category: 'Authentication', weight: 3 },
    SAML: { category: 'Authentication', weight: 3 },
    'OpenID Connect': { category: 'Authentication', weight: 3 },
    LDAP: { category: 'Authentication', weight: 2 },
    'Two-Factor Authentication': { category: 'Security', weight: 3 },
    '2FA': { category: 'Security', weight: 3 },
    'SSL/TLS': { category: 'Security', weight: 3 },
    'Security Protocols': { category: 'Security', weight: 3 },
    Encryption: { category: 'Security', weight: 3 },
    'Penetration Testing': { category: 'Security', weight: 3 },
    'Vulnerability Assessment': { category: 'Security', weight: 3 },
    OWASP: { category: 'Security', weight: 3 },

    // Software Architecture & Design Patterns
    Microservices: { category: 'Architecture', weight: 4 },
    Microservice: { category: 'Architecture', weight: 4 },
    Monolithic: { category: 'Architecture', weight: 3 },
    SOA: { category: 'Architecture', weight: 3 },
    'Service-Oriented Architecture': { category: 'Architecture', weight: 3 },
    'Event-Driven Architecture': { category: 'Architecture', weight: 3 },
    Serverless: { category: 'Architecture', weight: 4 },
    'Domain-Driven Design': { category: 'Architecture', weight: 4 },
    DDD: { category: 'Architecture', weight: 4 },
    'Clean Architecture': { category: 'Architecture', weight: 4 },
    'Hexagonal Architecture': { category: 'Architecture', weight: 3 },
    MVC: { category: 'Design Pattern', weight: 3 },
    'MVP Pattern': { category: 'Design Pattern', weight: 3 },
    MVVM: { category: 'Design Pattern', weight: 3 },
    'Observer Pattern': { category: 'Design Pattern', weight: 3 },
    'Factory Pattern': { category: 'Design Pattern', weight: 3 },
    'Singleton Pattern': { category: 'Design Pattern', weight: 3 },
    'Strategy Pattern': { category: 'Design Pattern', weight: 3 },
    'Command Pattern': { category: 'Design Pattern', weight: 3 },

    // Project Management & Methodologies
    Agile: { category: 'Methodology', weight: 5 },
    Scrum: { category: 'Methodology', weight: 5 },
    Kanban: { category: 'Methodology', weight: 4 },
    Waterfall: { category: 'Methodology', weight: 3 },
    Lean: { category: 'Methodology', weight: 3 },
    DevOps: { category: 'Methodology', weight: 5 },
    Sprint: { category: 'Agile Practice', weight: 4 },
    'Sprint Planning': { category: 'Agile Practice', weight: 4 },
    'Daily Standup': { category: 'Agile Practice', weight: 3 },
    Retrospective: { category: 'Agile Practice', weight: 3 },
    'Sprint Review': { category: 'Agile Practice', weight: 3 },
    'Product Owner': { category: 'Role', weight: 3 },
    'Scrum Master': { category: 'Role', weight: 3 },
    'Tech Lead': { category: 'Role', weight: 4 },
    'Technical Lead': { category: 'Role', weight: 4 },
    'Solution Architect': { category: 'Role', weight: 4 },
    'DevOps Engineer': { category: 'Role', weight: 4 },
    'Full Stack Developer': { category: 'Role', weight: 4 },
    'Full-Stack': { category: 'Role', weight: 4 },
    'Frontend Developer': { category: 'Role', weight: 4 },
    'Backend Developer': { category: 'Role', weight: 4 },
    'Software Engineer': { category: 'Role', weight: 4 },
    'Senior Developer': { category: 'Role', weight: 4 },
    'Lead Developer': { category: 'Role', weight: 4 },

    // Team Collaboration & Communication
    'Cross-functional Team': { category: 'Team Work', weight: 4 },
    'Cross Team': { category: 'Team Work', weight: 4 },
    'Cross-functional': { category: 'Team Work', weight: 4 },
    'Team Leadership': { category: 'Leadership', weight: 4 },
    Mentoring: { category: 'Leadership', weight: 4 },
    'Knowledge Sharing': { category: 'Team Work', weight: 3 },
    'Technical Documentation': { category: 'Documentation', weight: 4 },
    'API Documentation': { category: 'Documentation', weight: 3 },
    'Code Documentation': { category: 'Documentation', weight: 3 },
    'Requirements Analysis': { category: 'Analysis', weight: 4 },
    'Technical Requirements': { category: 'Analysis', weight: 4 },
    'Business Requirements': { category: 'Analysis', weight: 3 },
    'Stakeholder Management': { category: 'Management', weight: 4 },
    'Client Communication': { category: 'Communication', weight: 4 },
    'Technical Presentation': { category: 'Communication', weight: 3 },

    // Performance & Optimization
    'Performance Optimization': { category: 'Performance', weight: 4 },
    'Performance Tuning': { category: 'Performance', weight: 4 },
    'Code Optimization': { category: 'Performance', weight: 4 },
    'Database Optimization': { category: 'Performance', weight: 4 },
    'Query Optimization': { category: 'Performance', weight: 4 },
    Caching: { category: 'Performance', weight: 4 },
    CDN: { category: 'Performance', weight: 3 },
    'Load Balancing': { category: 'Performance', weight: 4 },
    'Horizontal Scaling': { category: 'Scalability', weight: 4 },
    'Vertical Scaling': { category: 'Scalability', weight: 3 },
    'Auto Scaling': { category: 'Scalability', weight: 4 },
    'High Availability': { category: 'Scalability', weight: 4 },
    'Fault Tolerance': { category: 'Reliability', weight: 4 },
    'Disaster Recovery': { category: 'Reliability', weight: 3 },
    Monitoring: { category: 'Operations', weight: 4 },
    Logging: { category: 'Operations', weight: 4 },
    'Error Tracking': { category: 'Operations', weight: 3 },
    Alerting: { category: 'Operations', weight: 3 },

    // Data Engineering & Analytics
    'Data Pipeline': { category: 'Data Engineering', weight: 4 },
    'Data Warehouse': { category: 'Data Engineering', weight: 4 },
    'Data Lake': { category: 'Data Engineering', weight: 4 },
    'Big Data': { category: 'Data Engineering', weight: 4 },
    'Apache Spark': { category: 'Data Engineering', weight: 4 },
    'Apache Kafka': { category: 'Data Engineering', weight: 4 },
    Hadoop: { category: 'Data Engineering', weight: 3 },
    'Data Science': { category: 'Data Science', weight: 4 },
    'Machine Learning': { category: 'Machine Learning', weight: 4 },
    AI: { category: 'Machine Learning', weight: 4 },
    'Artificial Intelligence': { category: 'Machine Learning', weight: 4 },
    'Deep Learning': { category: 'Machine Learning', weight: 4 },
    'Neural Networks': { category: 'Machine Learning', weight: 4 },
    TensorFlow: { category: 'Machine Learning', weight: 4 },
    PyTorch: { category: 'Machine Learning', weight: 4 },
    'Scikit-learn': { category: 'Machine Learning', weight: 4 },
    Pandas: { category: 'Data Science', weight: 4 },
    NumPy: { category: 'Data Science', weight: 4 },
    Jupyter: { category: 'Data Science', weight: 3 },

    // Mobile Development
    'React Native': { category: 'Mobile Framework', weight: 4 },
    Flutter: { category: 'Mobile Framework', weight: 4 },
    Ionic: { category: 'Mobile Framework', weight: 3 },
    Xamarin: { category: 'Mobile Framework', weight: 3 },
    'Progressive Web App': { category: 'Mobile Technology', weight: 4 },
    PWA: { category: 'Mobile Technology', weight: 4 },
    'Mobile-First': { category: 'Development Practice', weight: 3 },
    'Responsive Design': { category: 'Design', weight: 4 },
    'Cross-Platform': { category: 'Development Practice', weight: 4 },

    // Quality & Best Practices
    'Code Quality': { category: 'Quality Assurance', weight: 4 },
    'Code Standards': { category: 'Quality Assurance', weight: 4 },
    'Best Practices': { category: 'Development Practice', weight: 4 },
    'Coding Standards': { category: 'Quality Assurance', weight: 4 },
    ESLint: { category: 'Code Quality', weight: 3 },
    Prettier: { category: 'Code Quality', weight: 3 },
    SonarQube: { category: 'Code Quality', weight: 3 },
    'Static Analysis': { category: 'Code Quality', weight: 3 },
    'Code Coverage': { category: 'Testing', weight: 3 },
    'Technical Debt': { category: 'Code Quality', weight: 4 },
    Refactoring: { category: 'Development Practice', weight: 4 },
    'Legacy Code': { category: 'Maintenance', weight: 3 },
    'Code Maintenance': { category: 'Maintenance', weight: 4 },
    'Bug Fixing': { category: 'Maintenance', weight: 4 },
    Debugging: { category: 'Development Practice', weight: 4 },
    Troubleshooting: { category: 'Problem Solving', weight: 4 },
    'Problem Solving': { category: 'Problem Solving', weight: 5 },
    'Critical Thinking': { category: 'Soft Skills', weight: 4 },
    'Analytical Skills': { category: 'Soft Skills', weight: 4 },

    // Tools & IDEs
    'Visual Studio Code': { category: 'Tool', weight: 3 },
    'VS Code': { category: 'Tool', weight: 3 },
    'IntelliJ IDEA': { category: 'Tool', weight: 3 },
    Eclipse: { category: 'Tool', weight: 2 },
    'Sublime Text': { category: 'Tool', weight: 2 },
    Atom: { category: 'Tool', weight: 2 },
    Vim: { category: 'Tool', weight: 3 },
    Emacs: { category: 'Tool', weight: 2 },
    Postman: { category: 'API Testing', weight: 3 },
    Insomnia: { category: 'API Testing', weight: 2 },
    Slack: { category: 'Communication Tool', weight: 2 },
    'Microsoft Teams': { category: 'Communication Tool', weight: 2 },
    Zoom: { category: 'Communication Tool', weight: 2 },
    Jira: { category: 'Project Management Tool', weight: 4 },
    Confluence: { category: 'Documentation Tool', weight: 3 },
    Trello: { category: 'Project Management Tool', weight: 3 },
    Asana: { category: 'Project Management Tool', weight: 3 },
    Notion: { category: 'Documentation Tool', weight: 3 },

    // Business & Domain Knowledge
    'Business Logic': { category: 'Business Knowledge', weight: 4 },
    'Domain Knowledge': { category: 'Business Knowledge', weight: 4 },
    'Business Analysis': { category: 'Analysis', weight: 4 },
    'User Experience': { category: 'UX/UI', weight: 4 },
    UX: { category: 'UX/UI', weight: 4 },
    'User Interface': { category: 'UX/UI', weight: 4 },
    UI: { category: 'UX/UI', weight: 4 },
    'User Research': { category: 'UX/UI', weight: 3 },
    'A/B Testing': { category: 'Testing', weight: 3 },
    'Feature Flags': { category: 'Development Practice', weight: 3 },
    'Feature Toggles': { category: 'Development Practice', weight: 3 },
    'Product Development': { category: 'Product', weight: 4 },
    MVP: { category: 'Product', weight: 4 },
    'Minimum Viable Product': { category: 'Product', weight: 4 },
    'Product Management': { category: 'Management', weight: 4 },
    'Project Management': { category: 'Management', weight: 4 },
    'Technical Project Management': { category: 'Management', weight: 4 },

    // Data Formats & Protocols
    XML: { category: 'Data Format', weight: 2 },
    JSON: { category: 'Data Format', weight: 3 },
    YAML: { category: 'Data Format', weight: 3 },
    CSV: { category: 'Data Format', weight: 2 },
    Protobuf: { category: 'Data Format', weight: 3 },
    Avro: { category: 'Data Format', weight: 3 },
    HTTP: { category: 'Protocol', weight: 4 },
    HTTPS: { category: 'Protocol', weight: 4 },
    'TCP/IP': { category: 'Protocol', weight: 3 },
    UDP: { category: 'Protocol', weight: 3 },
    WebRTC: { category: 'Protocol', weight: 3 },

    // Scheduling & Automation
    Cron: { category: 'Scheduling', weight: 2 },
    'Scheduled Tasks': { category: 'Scheduling', weight: 2 },
    'Task Automation': { category: 'Automation', weight: 3 },
    'Workflow Automation': { category: 'Automation', weight: 3 },
    'Process Automation': { category: 'Automation', weight: 3 },
    'Build Automation': { category: 'Automation', weight: 3 },
    'Deployment Automation': { category: 'Automation', weight: 4 },
    'Infrastructure Automation': { category: 'Automation', weight: 4 },

    // Emerging Technologies
    Blockchain: { category: 'Emerging Tech', weight: 3 },
    Cryptocurrency: { category: 'Emerging Tech', weight: 2 },
    IoT: { category: 'Emerging Tech', weight: 3 },
    'Internet of Things': { category: 'Emerging Tech', weight: 3 },
    AR: { category: 'Emerging Tech', weight: 3 },
    VR: { category: 'Emerging Tech', weight: 3 },
    'Augmented Reality': { category: 'Emerging Tech', weight: 3 },
    'Virtual Reality': { category: 'Emerging Tech', weight: 3 },
    'Edge Computing': { category: 'Emerging Tech', weight: 3 },
    'Quantum Computing': { category: 'Emerging Tech', weight: 2 },

    // Industry Standards & Compliance
    GDPR: { category: 'Compliance', weight: 3 },
    HIPAA: { category: 'Compliance', weight: 3 },
    SOX: { category: 'Compliance', weight: 2 },
    'PCI DSS': { category: 'Compliance', weight: 3 },
    'ISO 27001': { category: 'Compliance', weight: 2 },
    Accessibility: { category: 'Standards', weight: 4 },
    WCAG: { category: 'Standards', weight: 3 },
    SEO: { category: 'Web Standards', weight: 3 },
    'Web Standards': { category: 'Standards', weight: 3 },
    W3C: { category: 'Standards', weight: 2 },

    // Soft Skills & Professional Development
    Leadership: { category: 'Soft Skills', weight: 5 },
    Communication: { category: 'Soft Skills', weight: 5 },
    Teamwork: { category: 'Soft Skills', weight: 5 },
    Collaboration: { category: 'Soft Skills', weight: 5 },
    'Time Management': { category: 'Soft Skills', weight: 4 },
    Multitasking: { category: 'Soft Skills', weight: 3 },
    'Priority Management': { category: 'Soft Skills', weight: 4 },
    Adaptability: { category: 'Soft Skills', weight: 4 },
    'Learning Agility': { category: 'Soft Skills', weight: 4 },
    'Continuous Learning': { category: 'Professional Development', weight: 4 },
    'Professional Development': { category: 'Professional Development', weight: 4 },
    'Self-motivated': { category: 'Soft Skills', weight: 4 },
    Proactive: { category: 'Soft Skills', weight: 4 },
    Initiative: { category: 'Soft Skills', weight: 4 },
    Innovation: { category: 'Soft Skills', weight: 4 },
    'Creative Problem Solving': { category: 'Problem Solving', weight: 4 },
    'Technical Writing': { category: 'Communication', weight: 4 },
    'Public Speaking': { category: 'Communication', weight: 3 },
    'Presentation Skills': { category: 'Communication', weight: 4 },
    Negotiation: { category: 'Soft Skills', weight: 3 },
    'Conflict Resolution': { category: 'Soft Skills', weight: 3 },
    'Emotional Intelligence': { category: 'Soft Skills', weight: 4 },
    'Cultural Awareness': { category: 'Soft Skills', weight: 3 },
    'Remote Work': { category: 'Work Style', weight: 4 },
    'Distributed Teams': { category: 'Team Work', weight: 4 },
    'Global Teams': { category: 'Team Work', weight: 3 },
    'Work-Life Balance': { category: 'Work Style', weight: 3 },
};

// 获取类别对应的颜色 - 扩展支持专业开发词汇
const getCategoryColor = category => {
    const colors = {
        // 核心技术分类
        'Frontend Framework': '#3b82f6', // blue
        'Backend Framework': '#10b981', // emerald
        'Backend Runtime': '#059669', // emerald-600
        Database: '#8b5cf6', // purple
        'Programming Language': '#f97316', // orange
        'Cloud Platform': '#06b6d4', // cyan
        'Cloud Service': '#0891b2', // cyan-600
        DevOps: '#84cc16', // lime
        'Data Pipeline': '#22c55e', // green
        'Data Engineering': '#059669', // emerald-600
        'CSS Framework': '#ec4899', // pink
        'CSS Technology': '#db2777', // pink-600
        'CSS Preprocessor': '#be185d', // pink-700
        '3D Graphics': '#8b5cf6', // violet
        Graphics: '#7c3aed', // violet-600
        'Data Visualization': '#64748b', // slate
        'API Technology': '#84cc16', // lime
        'API Documentation': '#65a30d', // lime-600
        Testing: '#dc2626', // red-600
        Authentication: '#ea580c', // orange-600
        'Web API': '#2563eb', // blue-600
        Architecture: '#9333ea', // purple-600
        'Package Manager': '#ca8a04', // yellow-600
        'Version Control': '#6b7280', // gray-500
        Scheduling: '#6b7280', // gray-500
        'Data Format': '#4b5563', // gray-600
        'Build Tool': '#78716c', // stone-500
        Tool: '#57534e', // stone-600
        Infrastructure: '#44403c', // stone-700
        Security: '#dc2626', // red-600
        'Design Pattern': '#a855f7', // purple-500
        'Mobile Framework': '#ec4899', // pink-500
        'Mobile Technology': '#db2777', // pink-600
        'Code Quality': '#b45309', // amber-700
        'Quality Assurance': '#dc2626', // red-600
        Automation: '#6366f1', // indigo-500
        Protocol: '#64748b', // slate-500
        Standards: '#1e40af', // blue-700
        'Web Standards': '#1d4ed8', // blue-600
        Compliance: '#b91c1c', // red-700
        'Emerging Tech': '#7c3aed', // violet-600
        'Machine Learning': '#0891b2', // cyan-600
        'Data Science': '#0284c7', // sky-600
        Scalability: '#d97706', // amber-600
        Performance: '#f59e0b', // amber-500
        Reliability: '#dc2626', // red-600
        Operations: '#6366f1', // indigo-500
        Maintenance: '#4b5563', // gray-600
        'Communication Tool': '#8b5a2b', // amber-800
        'Project Management Tool': '#7c2d12', // red-900
        'Documentation Tool': '#92400e', // amber-800
        'API Testing': '#065f46', // emerald-800

        // 专业发展与软技能分类
        Methodology: '#059669', // emerald-600
        'Agile Practice': '#047857', // emerald-700
        Role: '#dc2626', // red-600
        'Team Work': '#3b82f6', // blue-500
        Leadership: '#7c2626', // red-800
        Communication: '#2563eb', // blue-600
        Documentation: '#1d4ed8', // blue-600
        Analysis: '#7c3aed', // violet-600
        Management: '#b91c1c', // red-700
        'Problem Solving': '#7c2d12', // red-900
        'Soft Skills': '#059669', // emerald-600
        'Professional Development': '#047857', // emerald-700
        'Work Style': '#6366f1', // indigo-500
        'Development Practice': '#3b82f6', // blue-500
        'Business Knowledge': '#7c3aed', // violet-600
        'UX/UI': '#ec4899', // pink-500
        Product: '#f59e0b', // amber-500
        Design: '#ec4899', // pink-500
        Default: '#6b7280', // gray-500
    };
    return colors[category] || colors['Default'];
};

// 提取技术关键词
const extractTechKeywords = description => {
    if (!description) return [];

    // 处理不同类型的描述数据
    let text = '';
    if (Array.isArray(description)) {
        text = description.join(' ').toLowerCase();
    } else if (typeof description === 'object') {
        // 如果是对象，提取所有值并连接
        text = Object.values(description).flat().join(' ').toLowerCase();
    } else if (typeof description === 'string') {
        text = description.toLowerCase();
    } else {
        // 其他类型转换为字符串
        text = String(description).toLowerCase();
    }

    const keywords = [];

    Object.entries(TECH_KEYWORDS).forEach(([keyword, info]) => {
        const regex = new RegExp(
            `\\b${keyword.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`,
            'gi'
        );
        const matches = text.match(regex);
        if (matches) {
            keywords.push({
                word: keyword,
                category: info.category,
                importance: info.weight,
                count: matches.length,
            });
        }
    });

    return keywords.sort((a, b) => b.importance - a.importance);
};

const WordCloud = ({
    project,
    getProjectDescription,
    width = 400,
    minHeight = 200, // 改名为 minHeight，更语义化
    maxHeight = 500, // 新增最大高度限制
    className = '',
}) => {
    const svgRef = useRef();
    const containerRef = useRef();
    const [dynamicHeight, setDynamicHeight] = useState(minHeight); // 新增动态高度状态

    // 计算最适合的高度 - 简化版本
    const calculateOptimalHeight = useCallback(
        (words, containerWidth) => {
            if (!words || words.length === 0) return minHeight;

            // 简单的基于词汇数量的高度计算
            const wordCount = words.length;
            let calculatedHeight = minHeight;

            if (wordCount <= 10) {
                calculatedHeight = 250;
            } else if (wordCount <= 20) {
                calculatedHeight = 350;
            } else if (wordCount <= 30) {
                calculatedHeight = 450;
            } else {
                calculatedHeight = maxHeight;
            }

            // 根据容器宽度简单调整
            if (containerWidth < 400) {
                calculatedHeight += 50;
            }

            // 确保在范围内
            return Math.min(maxHeight, Math.max(minHeight, calculatedHeight));
        },
        [minHeight, maxHeight]
    );

    const generateWordCloud = useCallback(() => {
        if (!project || !svgRef.current || !containerRef.current) return;

        try {
            // 清除之前的内容
            d3.select(svgRef.current).selectAll('*').remove();

            // 获取项目描述和提取关键词
            const description = getProjectDescription(project);
            const techKeywords = extractTechKeywords(description);

            // 基础信息
            const basicInfo = [];
            if (project.year)
                basicInfo.push({
                    word: project.year.toString(),
                    category: 'Year',
                    importance: 2,
                });
            if (project.location)
                basicInfo.push({
                    word: project.location,
                    category: 'Location',
                    importance: 2,
                });
            if (project.company)
                basicInfo.push({
                    word: project.company,
                    category: 'Company',
                    importance: 2,
                });

            // 项目类型
            const types =
                project.tags && Array.isArray(project.tags) ? project.tags : [project.type];
            types.forEach(type => {
                if (type)
                    basicInfo.push({
                        word: type,
                        category: 'Type',
                        importance: 3,
                    });
            });

            // 合并所有词汇
            const allWords = [...basicInfo, ...techKeywords];

            if (allWords.length === 0) {
                setDynamicHeight(minHeight);
                return;
            }

            // 获取容器实际宽度
            const containerRect = containerRef.current.getBoundingClientRect();
            const actualWidth = containerRect.width || width;

            // 计算并设置最适合的高度
            const optimalHeight = calculateOptimalHeight(allWords, actualWidth);
            setDynamicHeight(optimalHeight);

            // 设置 SVG 尺寸
            const svg = d3
                .select(svgRef.current)
                .attr('width', actualWidth)
                .attr('height', optimalHeight)
                .attr('viewBox', `0 0 ${actualWidth} ${optimalHeight}`);

            // 创建词云布局 - 使用动态高度
            const layout = cloud()
                .size([actualWidth, optimalHeight])
                .words(
                    allWords.map(d => ({
                        text: d.word,
                        size: Math.max(12, Math.min(32, (d.importance || 1) * 6)), // 字体大小范围 12-32px
                        category: d.category,
                        importance: d.importance || 1,
                        count: d.count,
                    }))
                )
                .padding(3)
                .rotate(() => (Math.random() - 0.5) * 60) // 随机旋转 -30 到 30 度
                .font('Inter, system-ui, sans-serif')
                .fontSize(d => d.size)
                .on('end', draw);

            layout.start();

            function draw(words) {
                const g = svg
                    .append('g')
                    .attr('transform', `translate(${actualWidth / 2},${optimalHeight / 2})`);
                const texts = g
                    .selectAll('text')
                    .data(words)
                    .enter()
                    .append('text')
                    .style('font-size', d => `${d.size}px`)
                    .style('font-family', 'Inter, system-ui, sans-serif')
                    .style('font-weight', d =>
                        d.importance >= 4 ? '600' : d.importance >= 3 ? '500' : '400'
                    )
                    .style('fill', d => getCategoryColor(d.category))
                    .style('opacity', 0.9)
                    .style('cursor', 'default')
                    .attr('text-anchor', 'middle')
                    .attr('transform', d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
                    .text(d => d.text);

                // 添加悬停效果
                texts
                    .on('mouseover', function (event, d) {
                        d3.select(this)
                            .style('opacity', 1)
                            .style('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))')
                            .transition()
                            .duration(200)
                            .style('font-size', `${d.size * 1.1}px`);
                    })
                    .on('mouseout', function (event, d) {
                        d3.select(this)
                            .style('opacity', 0.9)
                            .style('filter', 'none')
                            .transition()
                            .duration(200)
                            .style('font-size', `${d.size}px`);
                    })
                    .append('title')
                    .text(d => `${d.category}${d.count ? ` (出现 ${d.count} 次)` : ''}`);

                // 添加入场动画
                texts
                    .style('opacity', 0)
                    .transition()
                    .duration(800)
                    .delay((d, i) => i * 50)
                    .style('opacity', 0.9);
            }
        } catch (error) {
            console.error('WordCloud generation error:', error);
            setDynamicHeight(minHeight);
            // 在SVG中显示错误信息
            const svg = d3.select(svgRef.current);
            svg.append('text')
                .attr('x', '50%')
                .attr('y', '50%')
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'middle')
                .style('fill', '#ef4444')
                .style('font-size', '14px')
                .text('无法生成词云，请稍后重试');
        }
    }, [project, getProjectDescription, width, calculateOptimalHeight, minHeight]);

    // 组件挂载和项目变化时生成词云
    useEffect(() => {
        generateWordCloud();
    }, [generateWordCloud]);

    // 监听窗口大小变化
    useEffect(() => {
        const handleResize = () => {
            setTimeout(generateWordCloud, 100); // 延迟重新生成避免频繁调用
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [generateWordCloud]);

    return (
        <div
            ref={containerRef}
            className={`w-full transition-all duration-500 ease-out ${className}`}
            style={{ height: `${dynamicHeight}px` }} // 使用动态计算的高度
        >
            <svg ref={svgRef} className="w-full h-full" style={{ height: `${dynamicHeight}px` }} />
        </div>
    );
};

WordCloud.propTypes = {
    project: PropTypes.object.isRequired,
    getProjectDescription: PropTypes.func.isRequired,
    width: PropTypes.number,
    minHeight: PropTypes.number,
    maxHeight: PropTypes.number,
    className: PropTypes.string,
};

export default WordCloud;
