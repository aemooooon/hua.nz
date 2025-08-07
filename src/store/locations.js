const locations = {
    "locations": [
        {
            "type": "work",
            "title": "Software Engineer",
            "name": "Zespri International",
            "description": "Built ETL pipelines and developed an interactive GIS-based web application for orchard sampling optimization.",
            "coordinates": [-37.7866, 176.4416],
            "location": "Bay of Plenty, New Zealand",
            "year": "2024-2025",
            "link": "https://www.zespri.com",
            "img": "/zespri_poster.png"
        },
        {
            "type": "work",
            "title": "Software Engineer",
            "name": "Realibox",
            "description": "Developed and maintained the central hub for Realibox’s 3D assets, using React with a WebGL-based library for the frontend and Node.js/Python for the backend. Implemented CI/CD pipelines using GitLab for code integration and deployment. Worked in an Agile environment, collaborating closely with PMs, QAs, and Designers to ensure feature delivery aligned with requirements.",
            "coordinates": [22.9951158, 113.3335372],
            "location": "Guangzhou, China",
            "year": "2021-2023",
            "link": "https://hub.realibox.com/",
            "img": ["/realibox-00.jpg", "realibox-01.jpeg"]
        },
        {
            "type": "work",
            "title": "Frontend Developer",
            "name": "Chongqing Nuclear Stone Technology",
            "description": "Develop H5 micro-apps on the WeChat platform, which include front-end page implementation, 3D scene tour and transition in panorama, and App deployment.",
            "coordinates": [29.5638, 106.5505],
            "location": "Chongqing, China",
            "year": "2020-2021",
            "link": "",
            "img": "/stone.jpg"
        },
        {
            "type": "project",
            "title": "Full Stack Developer",
            "name": "Real-time Air Quality Index Publish Platform",
            "description": "Developed a real-time Air Quality Index dashboard for a population of 5 million, involving an ETL workflow to extract XML data from a third-party Web service on schedule, transform it into structured objects, and load it into a MySQL database. The backend, built with Java Spring Boot, provided RESTful APIs for data access, while the front end, developed using React and EChart, visualized AQI trends and geographic distributions through interactive and dynamic charts.",
            "coordinates": [30.311395, 109.4795951],
            "location": "Enshi, Hubei, China",
            "year": "2020",
            "link": "https://aqi.eseemc.cn/",
            "img": ["/aqi.jpg", "AQI1.webp", "AQI2.webp", "AQI3.jpg", "AQI4.jpg", "AQI5.jpg"]
        },
        {
            "type": "education",
            "title": "Master of Applied Data Science",
            name: "University of Canterbury",
            "description": "Focus on Data Engineer, Visualisation and Deep Learning.",
            "coordinates": [-43.5232, 172.5835],
            "location": "Christchurch, New Zealand",
            "year": "2024-2025",
            "link": "https://www.canterbury.ac.nz",
            "img": ["uc-ds-all.jpg", "/hua_presentation.jpg"]
        },
        {
            "type": "education",
            "title": "Bachelor of Information Technology",
            "name": "Otago Polytechnic",
            "description": "Graduated with distinction, focuse on Web Development, full stack, and awarded Academic Excellence and Best Programmer.",
            "coordinates": [-45.8664633, 170.5182829],
            "location": "Dunedin, New Zealand",
            "year": "2017-2021",
            "link": "https://www.op.ac.nz",
            "img": ["awared-best-programmer.jpeg", "awared-excellence.jpeg"]
        },
        {
            "type": "project",
            "title": "Interactive 360° Virtual Tour Application",
            "name": "Changpingli · 常平里",
            "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
            "coordinates": [26.564722, 104.858717],
            "location": "Liupanshui, Guizhou, China",
            "year": "2020-2021",
            "link": "",
            "img": "/changpingli.jpg"
        },
        {
            "type": "project",
            "title": "Interactive 360° Virtual Tour Application",
            "name": "Dalincheng · 大林城",
            "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
            "coordinates": [25.725958, 104.449007],
            "location": "Liupanshui, Guizhou, China",
            "year": "2020-2021",
            "link": "",
            "img": "/dalincheng.jpg"
        },
        {
            "type": "project",
            "title": "Interactive 360° Virtual Tour Application",
            "name": "Fenghuangjiayuan · 凤凰嘉苑",
            "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
            "coordinates": [30.2788597, 109.4846285],
            "location": "Enshi, Hubei, China",
            "year": "2020-2021",
            "link": "",
            "img": "/fhjy.jpg"
        },
        {
            "type": "project",
            "title": "Interactive 360° Virtual Tour Application",
            "name": "Number 1 Parking · 公园①号",
            "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
            "coordinates": [27.326395, 105.280762],
            "location": "Bijie, Guizhou, China",
            "year": "2020-2021",
            "link": "",
            "img": "/gyyh.jpg"
        },
        {
            "type": "project",
            "title": "Interactive 360° Virtual Tour Application",
            "name": "Hengtianfengxijun · 恒天枫溪郡",
            "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
            "coordinates": [39.163164, 116.354244],
            "location": "Langfang, Hebei, China",
            "year": "2020-2021",
            "link": "",
            "img": "/htfxj.jpg"
        },
        {
            "type": "project",
            "title": "Interactive 360° Virtual Tour Application",
            "name": "Jiahe Garden in Sky · 家和空中花园",
            "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
            "coordinates": [29.475417, 109.406526],
            "location": "Enshi, Hubei, China",
            "year": "2020-2021",
            "link": "",
            "img": "/jhhy.jpg"
        },
        {
            "type": "project",
            "title": "Interactive 360° Virtual Tour Application",
            "name": "Jinnanwan · 金澜湾",
            "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
            "coordinates": [27.502244, 106.234353],
            "location": "Bijie, Guizhou, China",
            "year": "2020-2021",
            "link": "",
            "img": "/jlw.jpg"
        },
        {
            "type": "project",
            "title": "Interactive 360° Virtual Tour Application",
            "name": "Jiangnanyipin · 江南一品",
            "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
            "coordinates": [27.754975, 107.461993],
            "location": "Zunyi, Guizhou, China",
            "year": "2020-2021",
            "link": "",
            "img": "/jnyp.jpg"
        },
        {
            "type": "project",
            "title": "Interactive 360° Virtual Tour Application",
            "name": "Jiangxiangmingmen · 将相名门",
            "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
            "coordinates": [28.175622, 109.185229],
            "location": "Tongren, Guizhou, China",
            "year": "2020-2021",
            "link": "",
            "img": "/jxmm.jpg"
        },
        {
            "type": "project",
            "title": "Interactive 360° Virtual Tour Application",
            "name": "Jinsha · 金沙将相名门",
            "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
            "coordinates": [27.497812, 106.233872],
            "location": "Jinsha, Guizhou, China",
            "year": "2020-2021",
            "link": "",
            "img": "/jsjxmm.jpg"
        },
        {
            "type": "project",
            "title": "Interactive 360° Virtual Tour Application",
            "name": "Guiyuan · 盘州府壹号",
            "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
            "coordinates": [25.692363, 104.485536],
            "location": "Liupanshui, Guizhou, China",
            "year": "2020-2021",
            "link": "",
            "img": "/pzf.jpg"
        },
        {
            "type": "project",
            "title": "Interactive 360° Virtual Tour Application",
            "name": "Taifu Wutongxi · 泰府梧桐栖",
            "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
            "coordinates": [36.568705, 111.742927],
            "location": "Huozhou, Shanxi, China",
            "year": "2020-2021",
            "link": "",
            "img": "/tf.jpg"
        },
        {
            "type": "project",
            "title": "Interactive 360° Virtual Tour Application",
            "name": "Yuheyuan · 通盛御河园",
            "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
            "coordinates": [28.309843, 106.225531],
            "location": "Zaozhuang, Shandong, China",
            "year": "2020-2021",
            "link": "",
            "img": "/tsyhy.jpg"
        },
        {
            "type": "project",
            "title": "Interactive 360° Virtual Tour Application",
            "name": "Yuheyuan · 文璟上府",
            "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
            "coordinates": [26.24033, 109.140568],
            "location": "Liping, Guizhou, China",
            "year": "2020-2021",
            "link": "",
            "img": "/wjsf.jpg"
        },
        {
            "type": "project",
            "title": "Interactive 360° Virtual Tour Application",
            "name": "Dongsheng - 芯宸时代",
            "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
            "coordinates": [29.681751, 109.162283],
            "location": "Enshi，Hubei, China",
            "year": "2020-2021",
            "link": "",
            "img": "/xcsd.jpg"
        },
        {
            "type": "project",
            "title": "Interactive 360° Virtual Tour Application",
            "name": "Lvcheng · 迎宾华府",
            "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
            "coordinates": [39.122386, 116.415274],
            "location": "Langfang, Hebei, China",
            "year": "2020-2021",
            "link": "",
            "img": "/ybhf.jpg"
        },
        {
            "type": "project",
            "title": "Interactive 360° Virtual Tour Application",
            "name": "Jiahe · 雲尚星城",
            "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
            "coordinates": [29.688752, 109.149443],
            "location": "Enshi, Hubei, China",
            "year": "2020-2021",
            "link": "",
            "img": "/ysxc.jpg"
        },
        {
            "type": "project",
            "title": "Interactive 360° Virtual Tour Application",
            "name": "Yuecheng · 悦城",
            "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
            "coordinates": [27.579996, 106.864341],
            "location": "Zunyi, Guizhou, China",
            "year": "2020-2021",
            "link": "",
            "img": "/zyyc.jpg"
        },
        {
            "type": "project",
            "title": "Tenglong Cave",
            "name": "腾龙洞",
            "description": "Official Website",
            "coordinates": [30.3335111, 108.98434],
            "location": "Lichuan, Hubei, China",
            "year": "2019",
            "link": "http://tenglongdong.net.cn/",
            "img": "/tld.jpg"
        },
        {
            "type": "project",
            "title": "Badong Tourism Bureau",
            "name": "巴东县旅游局",
            "description": "Official Website",
            "coordinates": [31.0419753, 110.3386598],
            "location": "Badong, Hubei, China",
            "year": "2019",
            "link": "",
            "img": ""
        },
        {
            "type": "project",
            "title": "Jinguo Tea",
            "name": "金果茶叶",
            "description": "Official Website",
            "coordinates": [30.2889132, 110.2148372],
            "location": "Badong, Hubei, China",
            "year": "2019",
            "link": "",
            "img": ""
        },
        {
            "type": "project",
            "title": "Enshi Central Hospital",
            "name": "恩施州中心医院",
            "description": "Official Website",
            "coordinates": [30.297884, 109.4955927],
            "location": "Enshi, Hubei, China",
            "year": "2019",
            "link": "https://www.es9e.cn/",
            "img": "/es9e.jpg"
        },
        {
            "type": "project",
            "title": "FitsGo",
            "name": "Mobile App",
            "description": "This is a mobile application that aims to help get people to start exercising. This App is a cross-platform application which runs both of Android and IOS. It is built using React-Native and Google Firebase real-time database.",
            "coordinates": [-45.8750186, 170.4973482],
            "location": "Dunedin, New Zealand",
            "year": "2019",
            "link": "https://github.com/aemooooon/FitsGo",
            "img": ["/fitsgo.gif", "fitsgo-team.jpg"]
        },
        {
            "type": "project",
            "title": "ECAN Data Pipeline",
            "name": "University of Canterbury",
            "description": "Developed a system to aggregate data from over 20 sources, then centralized it into a central database. Web API is provided to the front end, enabling analyses and visualizations: Collect more than 20 people's data from the AWS EC2. Built data pipelines using Apache Airfow to automate ETL processes. Stored data in a PostgreSQL database on AWS RDS. Developed a Node.js API with Swagger documentation to serve endpoints. Implemented Python Streamlit and R Shiny dashboard to visualise data.",
            "coordinates": [-43.5357406, 172.6358119],
            "location": "Christchurch, New Zealand",
            "year": "2024",
            "link": "https://github.com/aemooooon/DATA472-Individual-Project-Submission",
            "img": ["/data472/472.png", "/data472/af01.jpg", "/data472/datapipeline.png", "/data472/FuelPriceData.jpg", "/data472/GasStationData.jpg", "/data472/ProjectManagement.jpg", "/data472/services.png", "/data472/v1.gif", "/data472/v2.gif", "/data472/", "/data472/WebApiResponse.jpg",]
        },
        {
            "type": "activity",
            "title": "Assisted IT Meetups",
            "name": "CITANZ CHCH Volunteer",
            "description": "Assisted in planning and managing IT community meetups once a month.",
            "coordinates": [-43.5828903, 172.5695089],
            "location": "Halswell Library, Christchurch",
            "year": "2024-2025",
            "link": "https://www.cita.org.nz/",
            "img": ["cita-02.jpg", "cita-01.jpg", "cita-04.jpg", "cita-03.jpg", "cita-05.jpg"]
        },
        {
            "type": "activity",
            "title": "Save Kiwi",
            "name": "AI Hackathon 2024",
            "description": "Design an AI solution to help existing organizations improve maintenance and analysis efficiency to better protect kiwi birds. It uses advanced tech to protect kiwi birds by combining smart cages, edge computing, and cloud analytics. Smart cages with RGB cameras monitor wildlife, while edge computing processes images in real-time using a vision-transformer model. This model distinguishes between kiwi birds, predators, and non-threatening animals. Predators are captured; others are released. Data is sent to a cloud platform for monitoring and alerts, enabling quick conservation responses.",
            "coordinates": [-43.5218726, 172.5674936],
            "location": "University of Canterbury, Christchurch",
            "year": "2024",
            "link": "https://www.cita.org.nz/",
            "img": ["/UC_F4.001.jpeg", "/UC_F4.002.jpeg", "f4.jpg"]
        }
    ]
};

export default locations;