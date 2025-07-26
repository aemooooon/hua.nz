import useAppStore from '../../../store/useAppStore';

const EducationSection = () => {
  const { language } = useAppStore();

  const educationData = {
    en: {
      title: "Education",
      subtitle: "Academic Journey",
      education: [
        {
          degree: "Master of Data Science",
          institution: "University of Canterbury",
          location: "Christchurch, New Zealand",
          period: "2022 - 2024",
          description: "Specialized in machine learning, data analytics, and big data processing. Graduated with distinction.",
          courses: ["Machine Learning", "Data Mining", "Statistical Computing", "Big Data Analytics"]
        },
        {
          degree: "Bachelor of Computer Science",
          institution: "Previous University",
          location: "Location",
          period: "2018 - 2022",
          description: "Foundation in computer science principles, software engineering, and programming.",
          courses: ["Software Engineering", "Database Systems", "Web Development", "Algorithms"]
        }
      ],
      certifications: [
        "AWS Certified Developer",
        "Google Cloud Professional",
        "Microsoft Azure Fundamentals"
      ]
    },
    zh: {
      title: "教育背景",
      subtitle: "学术历程",
      education: [
        {
          degree: "数据科学硕士",
          institution: "坎特伯雷大学",
          location: "新西兰克赖斯特彻奇",
          period: "2022 - 2024",
          description: "专攻机器学习、数据分析和大数据处理。优异成绩毕业。",
          courses: ["机器学习", "数据挖掘", "统计计算", "大数据分析"]
        },
        {
          degree: "计算机科学学士",
          institution: "某大学",
          location: "某地",
          period: "2018 - 2022",
          description: "计算机科学基础、软件工程和编程基础。",
          courses: ["软件工程", "数据库系统", "Web开发", "算法"]
        }
      ],
      certifications: [
        "AWS 认证开发者",
        "谷歌云专业认证",
        "微软 Azure 基础认证"
      ]
    }
  };

  const content = educationData[language];

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 font-serif">
            {content.title}
          </h1>
          <p className="text-xl text-gray-300">
            {content.subtitle}
          </p>
        </div>

        {/* Education Timeline */}
        <div className="space-y-8 mb-12">
          {content.education.map((edu, index) => (
            <div 
              key={index}
              className="bg-black/30 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {edu.degree}
                  </h3>
                  <p className="text-lg text-blue-300 mb-1">
                    {edu.institution}
                  </p>
                  <p className="text-gray-400 text-sm mb-2">
                    {edu.location}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                    {edu.period}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">
                {edu.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {edu.courses.map((course, courseIndex) => (
                  <span 
                    key={courseIndex}
                    className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-sm"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-black/30 backdrop-blur-md rounded-lg p-6 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            {language === 'en' ? 'Certifications' : '认证'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {content.certifications.map((cert, index) => (
              <div 
                key={index}
                className="bg-gradient-to-r from-orange-600/20 to-purple-600/20 rounded-lg p-4 text-center border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300"
              >
                <span className="text-orange-300 font-medium">
                  {cert}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationSection;
