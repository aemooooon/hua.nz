const locations = {
    "locations": [
        {
            "type": "work",
            "title": "Software Engineer",
            "name": "Zespri International",
            "description": "Built ETL pipelines and developed an interactive GIS-based web application for orchard sampling optimization.",
            "coordinates": [-37.7866, 176.4416],
            "year": "2024-2025",
            "link": "https://www.zespri.com",
            "img": "/zespri_poster.png"
        },
        {
            "type": "work",
            "title": "Software Engineer",
            "name": "Realibox",
            "description": "Developed a 3D asset hub using React, WebGL, and Node.js. Created CI/CD pipelines for deployment.",
            "coordinates": [22.9951158, 113.3335372],
            "year": "2021-2023",
            "link": "https://hub.realibox.com/",
            "img": "/realibox.jpg"
        },
        {
            "type": "work",
            "title": "Frontend Developer",
            "name": "Chongqing Nuclear Stone Technology",
            "description": "Developed HTML5 micro-apps on WeChat platform, integrated 3D scene tours and panoramic views.",
            "coordinates": [29.5638, 106.5505],
            "year": "2020-2021",
            "link": "",
            "img": "/stone.jpg"
        },
        {
            "type": "work",
            "title": "Full Stack Developer",
            "name": "Hubei Day Digital Technology",
            "description": "Built a real-time AQI publishing system with Java Spring Boot and React frontend.",
            "coordinates": [30.311395, 109.4795951],
            "year": "2020",
            "link": "https://aqi.eseemc.cn/",
            "img": "/aqi.jpg",
        },
        {
            "type": "education",
            "title": "Master of Applied Data Science",
            name: "University of Canterbury",
            "description": "Focus on Data Engineer, Visualisation and Deep Learning.",
            "coordinates": [-43.5232, 172.5835],
            "year": "2024-2025",
            "link": "https://www.canterbury.ac.nz",
            "img": "/hua_presentation.jpg"
        },
        {
            "type": "education",
            "title": "Bachelor of Information Technology",
            "name": "Otago Polytechnic",
            "description": "Graduated with distinction, awarded Academic Excellence and Best Programmer.",
            "coordinates": [-45.8664633, 170.5182829],
            "year": "2017-2021",
            "link": "https://www.op.ac.nz",
            "img": "/op.jpg"
        },
        {
            "type": "project",
            "title": "Interactive 360° Virtual Tour Application",
            "name": "Changpingli · 常平里",
            "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
            "coordinates": [26.564722, 104.858717],
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
            "year": "2020-2021",
            "link": "http://tenglongdong.net.cn/",
            "img": "/tld.jpg"
        },
        {
            "type": "project",
            "title": "Badong Tourism Bureau",
            "name": "巴东县旅游局",
            "description": "Official Website",
            "coordinates": [31.0419753, 110.3386598],
            "year": "2020-2021",
            "link": "",
            "img": ""
        },
        {
            "type": "project",
            "title": "Jinguo Tea",
            "name": "金果茶叶",
            "description": "Official Website",
            "coordinates": [30.2889132, 110.2148372],
            "year": "2020-2021",
            "link": "",
            "img": ""
        },
        {
            "type": "project",
            "title": "Enshi Central Hospital",
            "name": "恩施州中心医院",
            "description": "Official Website",
            "coordinates": [30.297884, 109.4955927],
            "year": "2020-2021",
            "link": "https://www.es9e.cn/",
            "img": "/es9e.jpg"
        },
        {
            "type": "project",
            "title": "FitsGo",
            "name": "Mobile App",
            "description": "This is a mobile application that aims to help get people to start exercising. This App is a cross-platform application which runs both of Android and IOS. It is built using Facebook React-Native and Google Firebase real-time database. This app provides a set of target locations that the user can run/walk/bike. Only locations in your current region will be displayed to you. Routes to these locations are shown to the user when the user selects the marker and if the user chooses to go to these locations, the distance, calories burnt, the time it took to travel there and the marker badge will be added to their record. This is done so the user can keep track of their exercise journey through this application. The user can also adjust and customize their profile which includes their personnel details such as names, weight and date of birth.",
            "coordinates": [-45.8750186, 170.4973482],
            "year": "2019-2020",
            "link": "https://github.com/aemooooon/FitsGo",
            "img": "/fitsgo.gif"
        }
    ]
};

export default locations;