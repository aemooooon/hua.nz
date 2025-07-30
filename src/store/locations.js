// locations.js
// 数据源，支持中英文双语结构

const locations = {
  locations: [
    {
      "type": "work",
      "title": { en: "Software Engineer", zh: "软件工程师" },
      "name": { en: "Zespri International", zh: "佳沛国际" },
      "description": { en: "Built ETL pipelines and developed an interactive GIS-based web application for orchard sampling optimization.", zh: "默认中文描述" },
      "coordinates": [-37.7866, 176.4416],
      "location": { en: "Bay of Plenty, New Zealand", zh: "新西兰丰盛湾" },
      "year": "2024-2025",
      "link": "https://www.zespri.com",
      "img": "/zespri_poster.png"
    },
    {
      "type": "work",
      "title": { en: "Software Engineer", zh: "软件工程师" },
      "name": { en: "Realibox", zh: "Realibox" },
      "description": { en: "Developed and maintained the central hub for Realibox’s 3D assets, using React with a WebGL-based library for the frontend and Node.js/Python for the backend. Implemented CI/CD pipelines using GitLab for code integration and deployment. Worked in an Agile environment, collaborating closely with PMs, QAs, and Designers to ensure feature delivery aligned with requirements.", zh: "默认中文描述" },
      "coordinates": [22.9951158, 113.3335372],
      "location": { en: "Guangzhou, China", zh: "中国广州" },
      "year": "2021-2023",
      "link": "https://hub.realibox.com/",
      "img": ["/realibox-00.jpg", "realibox-01.jpeg"]
    },
    {
      "type": "work",
      "title": { en: "Frontend Developer", zh: "前端开发工程师" },
      "name": { en: "Chongqing Nuclear Stone Technology", zh: "重庆核石科技" },
      "description": { en: "Develop H5 micro-apps on the WeChat platform, which include front-end page implementation, 3D scene tour and transition in panorama, and App deployment.", zh: "默认中文描述" },
      "coordinates": [29.5638, 106.5505],
      "location": { en: "Chongqing, China", zh: "中国重庆" },
      "year": "2020-2021",
      "link": "",
      "img": "/stone.jpg"
    },
    {
      "type": "project",
      "title": { en: "Full Stack Developer", zh: "全栈开发者" },
      "name": { en: "Real-time Air Quality Index Publish Platform", zh: "实时空气质量指数发布平台" },
      "description": { en: "Developed a real-time Air Quality Index dashboard for a population of 5 million, involving an ETL workflow to extract XML data from a third-party Web service on schedule, transform it into structured objects, and load it into a MySQL database. The backend, built with Java Spring Boot, provided RESTful APIs for data access, while the front end, developed using React and EChart, visualized AQI trends and geographic distributions through interactive and dynamic charts.", zh: "默认中文描述" },
      "coordinates": [30.311395, 109.4795951],
      "location": { en: "Enshi, Hubei, China", zh: "中国湖北恩施" },
      "year": "2020",
      "link": "https://aqi.eseemc.cn/",
      "img": ["/aqi.jpg", "AQI1.webp", "AQI2.webp", "AQI3.jpg", "AQI4.jpg", "AQI5.jpg"]
    },
    {
      "type": "education",
      "title": { en: "Master of Applied Data Science", zh: "应用数据科学硕士" },
      "name": { en: "University of Canterbury", zh: "坎特伯雷大学" },
      "description": { en: "Focus on Data Engineer, Visualisation and Deep Learning.", zh: "默认中文描述" },
      "coordinates": [-43.5232, 172.5835],
      "location": { en: "Christchurch, New Zealand", zh: "新西兰基督城" },
      "year": "2024-2025",
      "link": "https://www.canterbury.ac.nz",
      "img": ["uc-ds-all.jpg", "/hua_presentation.jpg"]
    },
    {
      "type": "education",
      "title": { en: "Bachelor of Information Technology", zh: "信息技术学士" },
      "name": { en: "Otago Polytechnic", zh: "奥塔哥理工学院" },
      "description": { en: "Graduated with distinction, focuse on Web Development, full stack, and awarded Academic Excellence and Best Programmer.", zh: "默认中文描述" },
      "coordinates": [-45.8664633, 170.5182829],
      "location": { en: "Dunedin, New Zealand", zh: "新西兰但尼丁" },
      "year": "2017-2021",
      "link": "https://www.op.ac.nz",
      "img": ["awared-best-programmer.jpeg", "awared-excellence.jpeg"]
    },
    {
      "type": "project",
      "title": { en: "Interactive 360° Virtual Tour Application", zh: "互动360°虚拟漫游应用" },
      "name": { en: "Changpingli", zh: "常平里" },
      "description": { en: "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.", zh: "默认中文描述" },
      "coordinates": [26.564722, 104.858717],
      "location": { en: "Liupanshui, Guizhou, China", zh: "中国贵州六盘水" },
      "year": "2020-2021",
      "link": "",
      "img": "/changpingli.jpg"
    },
    {
      "type": "project",
      "title": { en: "Interactive 360° Virtual Tour Application", zh: "互动360°虚拟漫游应用" },
      "name": { en: "Dalincheng", zh: "大林城" },
      "description": { en: "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.", zh: "默认中文描述" },
      "coordinates": [25.725958, 104.449007],
      "location": { en: "Liupanshui, Guizhou, China", zh: "中国贵州六盘水" },
      "year": "2020-2021",
      "link": "",
      "img": "/dalincheng.jpg"
    },
    {
      "type": "project",
      "title": { en: "Interactive 360° Virtual Tour Application", zh: "互动360°虚拟漫游应用" },
      "name": { en: "Fenghuangjiayuan", zh: "凤凰嘉苑" },
      "description": { en: "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.", zh: "默认中文描述" },
      "coordinates": [30.2788597, 109.4846285],
      "location": { en: "Enshi, Hubei, China", zh: "中国湖北恩施" },
      "year": "2020-2021",
      "link": "",
      "img": "/fhjy.jpg"
    },
    {
      "type": "project",
      "title": { en: "Interactive 360° Virtual Tour Application", zh: "互动360°虚拟漫游应用" },
      "name": { en: "Changpingli", zh: "常平里" },
      "description": { en: "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.", zh: "默认中文描述" },
      "coordinates": [26.564722, 104.858717],
      "location": { en: "Liupanshui, Guizhou, China", zh: "中国贵州六盘水" },
      "year": "2020-2021",
      "link": "",
      "img": "/changpingli.jpg"
    },
    {
      "type": "project",
      "title": { en: "Interactive 360° Virtual Tour Application", zh: "互动360°虚拟漫游应用" },
      "name": { en: "Dalincheng", zh: "大林城" },
      "description": { en: "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.", zh: "默认中文描述" },
      "coordinates": [25.725958, 104.449007],
      "location": { en: "Liupanshui, Guizhou, China", zh: "中国贵州六盘水" },
      "year": "2020-2021",
      "link": "",
      "img": "/dalincheng.jpg"
    },
    {
      "type": "project",
      "title": { en: "Interactive 360° Virtual Tour Application", zh: "互动360°虚拟漫游应用" },
      "name": { en: "Fenghuangjiayuan", zh: "凤凰嘉苑" },
      "description": { en: "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.", zh: "默认中文描述" },
      "coordinates": [30.2788597, 109.4846285],
      "location": { en: "Enshi, Hubei, China", zh: "中国湖北恩施" },
      "year": "2020-2021",
      "link": "",
      "img": "/fhjy.jpg"
    },
    {
      "type": "project",
      "title": { en: "Interactive 360° Virtual Tour Application", zh: "互动360°虚拟漫游应用" },
      "name": { en: "Number 1 Parking", zh: "公园①号" },
      "description": { en: "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.", zh: "默认中文描述" },
      "coordinates": [27.326395, 105.280762],
      "location": { en: "Bijie, Guizhou, China", zh: "中国贵州毕节" },
      "year": "2020-2021",
      "link": "",
      "img": "/gyyh.jpg"
    },
    {
      "type": "project",
      "title": { en: "Interactive 360° Virtual Tour Application", zh: "互动360°虚拟漫游应用" },
      "name": { en: "Hengtianfengxijun", zh: "恒天枫溪郡" },
      "description": { en: "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.", zh: "默认中文描述" },
      "coordinates": [39.163164, 116.354244],
      "location": { en: "Langfang, Hebei, China", zh: "中国河北廊坊" },
      "year": "2020-2021",
      "link": "",
      "img": "/htfxj.jpg"
    },
    {
      "type": "project",
      "title": { en: "Interactive 360° Virtual Tour Application", zh: "互动360°虚拟漫游应用" },
      "name": { en: "Jiahe Garden in Sky", zh: "家和空中花园" },
      "description": { en: "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.", zh: "默认中文描述" },
      "coordinates": [29.475417, 109.406526],
      "location": { en: "Enshi, Hubei, China", zh: "中国湖北恩施" },
      "year": "2020-2021",
      "link": "",
      "img": "/jhhy.jpg"
    },
    {
      "type": "project",
      "title": { en: "Interactive 360° Virtual Tour Application", zh: "互动360°虚拟漫游应用" },
      "name": { en: "Jinnanwan", zh: "金澜湾" },
      "description": { en: "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.", zh: "默认中文描述" },
      "coordinates": [27.502244, 106.234353],
      "location": { en: "Bijie, Guizhou, China", zh: "中国贵州毕节" },
      "year": "2020-2021",
      "link": "",
      "img": "/jlw.jpg"
    },
    {
      "type": "project",
      "title": { en: "Interactive 360° Virtual Tour Application", zh: "互动360°虚拟漫游应用" },
      "name": { en: "Jiangnanyipin", zh: "江南一品" },
      "description": { en: "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.", zh: "默认中文描述" },
      "coordinates": [27.754975, 107.461993],
      "location": { en: "Zunyi, Guizhou, China", zh: "中国贵州遵义" },
      "year": "2020-2021",
      "link": "",
      "img": "/jnyp.jpg"
    },
    {
      "type": "project",
      "title": { en: "Interactive 360° Virtual Tour Application", zh: "互动360°虚拟漫游应用" },
      "name": { en: "Jiangxiangmingmen", zh: "将相名门" },
      "description": { en: "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.", zh: "默认中文描述" },
      "coordinates": [28.175622, 109.185229],
      "location": { en: "Tongren, Guizhou, China", zh: "中国贵州铜仁" },
      "year": "2020-2021",
      "link": "",
      "img": "/jxmm.jpg"
    },
    {
      "type": "project",
      "title": { en: "Interactive 360° Virtual Tour Application", zh: "互动360°虚拟漫游应用" },
      "name": { en: "Jinsha", zh: "金沙将相名门" },
      "description": { en: "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.", zh: "默认中文描述" },
      "coordinates": [27.497812, 106.233872],
      "location": { en: "Jinsha, Guizhou, China", zh: "中国贵州金沙" },
      "year": "2020-2021",
      "link": "",
      "img": "/jsjxmm.jpg"
    },
    {
      "type": "project",
      "title": { en: "Interactive 360° Virtual Tour Application", zh: "互动360°虚拟漫游应用" },
      "name": { en: "Guiyuan", zh: "盘州府壹号" },
      "description": { en: "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.", zh: "默认中文描述" },
      "coordinates": [25.692363, 104.485536],
      "location": { en: "Liupanshui, Guizhou, China", zh: "中国贵州六盘水" },
      "year": "2020-2021",
      "link": "",
      "img": "/pzf.jpg"
    },
    {
      "type": "project",
      "title": { en: "Interactive 360° Virtual Tour Application", zh: "互动360°虚拟漫游应用" },
      "name": { en: "Taifu Wutongxi", zh: "泰府梧桐栖" },
      "description": { en: "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.", zh: "默认中文描述" },
      "coordinates": [36.568705, 111.742927],
      "location": { en: "Huozhou, Shanxi, China", zh: "中国山西霍州" },
      "year": "2020-2021",
      "link": "",
      "img": "/tf.jpg"
    },
    {
      "type": "project",
      "title": { en: "Interactive 360° Virtual Tour Application", zh: "互动360°虚拟漫游应用" },
      "name": { en: "Yuheyuan", zh: "通盛御河园" },
      "description": { en: "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.", zh: "默认中文描述" },
      "coordinates": [28.309843, 106.225531],
      "location": { en: "Zaozhuang, Shandong, China", zh: "中国山东枣庄" },
      "year": "2020-2021",
      "link": "",
      "img": "/tsyhy.jpg"
    },
    {
      "type": "project",
      "title": { en: "Interactive 360° Virtual Tour Application", zh: "互动360°虚拟漫游应用" },
      "name": { en: "Yuheyuan", zh: "文璟上府" },
      "description": { en: "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.", zh: "默认中文描述" },
      "coordinates": [26.24033, 109.140568],
      "location": { en: "Liping, Guizhou, China", zh: "中国贵州黎平" },
      "year": "2020-2021",
      "link": "",
      "img": "/wjsf.jpg"
    },
    {
      "type": "project",
      "title": { en: "Interactive 360° Virtual Tour Application", zh: "互动360°虚拟漫游应用" },
      "name": { en: "Dongsheng", zh: "芯宸时代" },
      "description": { en: "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.", zh: "默认中文描述" },
      "coordinates": [29.681751, 109.162283],
      "location": { en: "Enshi, Hubei, China", zh: "中国湖北恩施" },
      "year": "2020-2021",
      "link": "",
      "img": "/xcsd.jpg"
    },
    {
      "type": "project",
      "title": { en: "Interactive 360° Virtual Tour Application", zh: "互动360°虚拟漫游应用" },
      "name": { en: "Lvcheng", zh: "迎宾华府" },
      "description": { en: "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.", zh: "默认中文描述" },
      "coordinates": [39.122386, 116.415274],
      "location": { en: "Langfang, Hebei, China", zh: "中国河北廊坊" },
      "year": "2020-2021",
      "link": "",
      "img": "/ybhf.jpg"
    },
    {
      "type": "project",
      "title": { en: "Interactive 360° Virtual Tour Application", zh: "互动360°虚拟漫游应用" },
      "name": { en: "Jiahe", zh: "雲尚星城" },
      "description": { en: "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.", zh: "默认中文描述" },
      "coordinates": [29.688752, 109.149443],
      "location": { en: "Enshi, Hubei, China", zh: "中国湖北恩施" },
      "year": "2020-2021",
      "link": "",
      "img": "/ysxc.jpg"
    },
    {
      "type": "project",
      "title": { en: "Interactive 360° Virtual Tour Application", zh: "互动360°虚拟漫游应用" },
      "name": { en: "Yuecheng · 悦城", zh: "悦城" },
      "description": { en: "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.", zh: "默认中文描述" },
      "coordinates": [27.579996, 106.864341],
      "location": { en: "Zunyi, Guizhou, China", zh: "中国贵州遵义" },
      "year": "2020-2021",
      "link": "",
      "img": "/zyyc.jpg"
    },
    {
      "type": "project",
      "title": { en: "Tenglong Cave", zh: "腾龙洞" },
      "name": { en: "Tenglong Cave", zh: "腾龙洞" },
      "description": { en: "Official Website", zh: "官方网站" },
      "coordinates": [30.3335111, 108.98434],
      "location": { en: "Lichuan, Hubei, China", zh: "中国湖北利川" },
      "year": "2019",
      "link": "http://tenglongdong.net.cn/",
      "img": "/tld.jpg"
    },
    {
      "type": "project",
      "title": { en: "Badong Tourism Bureau", zh: "巴东县旅游局" },
      "name": { en: "Badong Tourism Bureau", zh: "巴东县旅游局" },
      "description": { en: "Official Website", zh: "官方网站" },
      "coordinates": [31.0419753, 110.3386598],
      "location": { en: "Badong, Hubei, China", zh: "中国湖北巴东" },
      "year": "2019",
      "link": "",
      "img": ""
    },
    {
      "type": "project",
      "title": { en: "Jinguo Tea", zh: "金果茶叶" },
      "name": { en: "Jinguo Tea", zh: "金果茶叶" },
      "description": { en: "Official Website", zh: "官方网站" },
      "coordinates": [30.2889132, 110.2148372],
      "location": { en: "Badong, Hubei, China", zh: "中国湖北巴东" },
      "year": "2019",
      "link": "",
      "img": ""
    },
    {
      "type": "project",
      "title": { en: "Enshi Central Hospital", zh: "恩施州中心医院" },
      "name": { en: "Enshi Central Hospital", zh: "恩施州中心医院" },
      "description": { en: "Official Website", zh: "官方网站" },
      "coordinates": [30.297884, 109.4955927],
      "location": { en: "Enshi, Hubei, China", zh: "中国湖北恩施" },
      "year": "2019",
      "link": "https://www.es9e.cn/",
      "img": "/es9e.jpg"
    },
    {
      "type": "project",
      "title": { en: "FitsGo", zh: "FitsGo" },
      "name": { en: "Mobile App", zh: "移动应用" },
      "description": { en: "This is a mobile application that aims to help get people to start exercising. This App is a cross-platform application which runs both of Android and IOS. It is built using React-Native and Google Firebase real-time database.", zh: "默认中文描述" },
      "coordinates": [-45.8750186, 170.4973482],
      "location": { en: "Dunedin, New Zealand", zh: "新西兰但尼丁" },
      "year": "2019",
      "link": "https://github.com/aemooooon/FitsGo",
      "img": ["/fitsgo.gif", "fitsgo-team.jpg"]
    },
    {
      "type": "project",
      "title": { en: "ECAN Data Pipeline", zh: "ECAN数据管道" },
      "name": { en: "University of Canterbury", zh: "坎特伯雷大学" },
      "description": { en: "Developed a system to aggregate data from over 20 sources, then centralized it into a central database. Web API is provided to the front end, enabling analyses and visualizations: Collect more than 20 people's data from the AWS EC2. Built data pipelines using Apache Airfow to automate ETL processes. Stored data in a PostgreSQL database on AWS RDS. Developed a Node.js API with Swagger documentation to serve endpoints. Implemented Python Streamlit and R Shiny dashboard to visualise data.", zh: "默认中文描述" },
      "coordinates": [-43.5357406, 172.6358119],
      "location": { en: "Christchurch, New Zealand", zh: "新西兰基督城" },
      "year": "2024",
      "link": "https://github.com/aemooooon/DATA472-Individual-Project-Submission",
      "img": ["/data472/472.png", "/data472/af01.jpg", "/data472/datapipeline.png", "/data472/FuelPriceData.jpg", "/data472/GasStationData.jpg", "/data472/ProjectManagement.jpg", "/data472/services.png", "/data472/v1.gif", "/data472/v2.gif", "/data472/WebApiResponse.jpg"]
    },
    {
      "type": "activity",
      "title": { en: "Assisted IT Meetups", zh: "协助IT聚会" },
      "name": { en: "CITANZ CHCH Volunteer", zh: "CITANZ基督城志愿者" },
      "description": { en: "Assisted in planning and managing IT community meetups once a month.", zh: "默认中文描述" },
      "coordinates": [-43.5828903, 172.5695089],
      "location": { en: "Halswell Library, Christchurch", zh: "新西兰基督城Halswell图书馆" },
      "year": "2024-2025",
      "link": "https://www.cita.org.nz/",
      "img": ["cita-02.jpg", "cita-01.jpg", "cita-04.jpg", "cita-03.jpg", "cita-05.jpg"]
    },
    {
      "type": "activity",
      "title": { en: "Save Kiwi", zh: "拯救奇异鸟" },
      "name": { en: "AI Hackathon 2024", zh: "AI黑客松2024" },
      "description": { en: "Design an AI solution to help existing organizations improve maintenance and analysis efficiency to better protect kiwi birds. It uses advanced tech to protect kiwi birds by combining smart cages, edge computing, and cloud analytics. Smart cages with RGB cameras monitor wildlife, while edge computing processes images in real-time using a vision-transformer model. This model distinguishes between kiwi birds, predators, and non-threatening animals. Predators are captured; others are released. Data is sent to a cloud platform for monitoring and alerts, enabling quick conservation responses.", zh: "默认中文描述" },
      "coordinates": [-43.5218726, 172.5674936],
      "location": { en: "University of Canterbury, Christchurch", zh: "新西兰基督城坎特伯雷大学" },
      "year": "2024",
      "link": "https://www.cita.org.nz/",
      "img": ["/UC_F4.001.jpeg", "/UC_F4.002.jpeg", "f4.jpg"]
    }
  ]
};

export default locations;