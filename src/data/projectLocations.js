// 项目地理位置数据
export const projectLocations = [
  {
    id: 1,
    name: "AQI Monitoring System",
    description: "Real-time air quality monitoring dashboard with data visualization",
    location: [-43.5321, 172.6362], // Christchurch
    category: "Data Science",
    technologies: ["Python", "React", "D3.js", "PostgreSQL"],
    image: "/aqi/Overview.png",
    status: "completed"
  },
  {
    id: 2,
    name: "DATA472 Fuel Price Analysis",
    description: "Comprehensive fuel price analysis and prediction system",
    location: [-43.5321, 172.6362], // Christchurch
    category: "Analytics",
    technologies: ["Python", "Pandas", "Scikit-learn", "Plotly"],
    image: "/data472/472.png",
    status: "completed"
  },
  {
    id: 3,
    name: "UC Programming Competition",
    description: "Algorithmic problem solving and competitive programming",
    location: [-43.5321, 172.6362], // Christchurch
    category: "Algorithm",
    technologies: ["C++", "Python", "Algorithms"],
    image: "/UC_F4.001.jpeg",
    status: "completed"
  },
  {
    id: 4,
    name: "FitsGo Fitness Platform",
    description: "Full-stack fitness tracking and social platform",
    location: [-36.8485, 174.7633], // Auckland
    category: "Full Stack",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    image: "/fitsgo.gif",
    status: "in-progress"
  },
  {
    id: 5,
    name: "Zespri Digital Solutions",
    description: "Agricultural technology and supply chain optimization",
    location: [-37.7870, 176.0677], // Tauranga
    category: "AgTech",
    technologies: ["Vue.js", "Python", "AWS", "IoT"],
    image: "/zespri.png",
    status: "completed"
  }
];

// 地图配置
export const mapConfig = {
  center: [-41.2865, 174.7762], // New Zealand center
  zoom: 6,
  minZoom: 5,
  maxZoom: 15,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
};

// 项目类别颜色
export const categoryColors = {
  "Data Science": "#3b82f6", // Blue
  "Analytics": "#8b5cf6",    // Purple
  "Algorithm": "#f59e0b",    // Amber
  "Full Stack": "#10b981",   // Emerald
  "AgTech": "#ef4444"        // Red
};
