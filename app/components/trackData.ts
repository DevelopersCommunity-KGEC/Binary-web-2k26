import {
    FaGraduationCap,
    FaHeartbeat,
    FaCubes,
    FaRobot,
    FaMicrochip,
    FaLightbulb,
    FaUsers,
    FaStar,
    FaGhost,
    FaCoins,
    FaCode,
    FaBrain,
    FaTools,
} from 'react-icons/fa';
import React from 'react';

export interface Track {
    title: string;
    description: string;
    icon: React.ReactNode;
    totalPrice?: string;
    cashPrice?: string;
    winnerName?: string;
    winnerUrl?: string;
    color: string;
}

export const tracks: Track[] = [
    {
        title: 'Education',
        description:
            'The Education Track empowers participants to develop cutting-edge solutions that enhance learning experiences and bridge educational gaps. Participants can create applications that offer personalized learning pathways, improve access to quality education for underserved communities, or facilitate seamless collaboration between teachers and students. This track is all about using technology to revolutionize education and make learning accessible to all.',
        icon: React.createElement(FaGraduationCap, { size: 52, className: "text-green-500" }),
        totalPrice: '10K',
        cashPrice: '3K',
        winnerName: '',
        winnerUrl: '',
        color: '#22c55e',
    },
    {
        title: 'Health',
        description:
            'The Health Track encourages participants to develop innovative solutions that improve healthcare accessibility and efficiency. Participants can create applications that assist in remote patient monitoring, enhance mental health support, streamline medical data management, or promote healthier lifestyles. This track is all about leveraging technology to make healthcare smarter, more inclusive, and impactful.',
        icon: React.createElement(FaHeartbeat, { size: 52, className: "text-green-500" }),
        totalPrice: '10K',
        cashPrice: '3K',
        winnerName: '',
        winnerUrl: '',
        color: '#22c55e',
    },
    {
        title: 'Web3',
        description: `Teams participating in the Web3 track can choose among the following 2 tracks:

1. Algorand Track - Build a Web3 solution on the Algorand ecosystem based on the official problem statement. Prize: $300 for the top 3 teams.
`,
        icon: React.createElement(FaCubes, { size: 52, className: "text-green-500" }),
        totalPrice: '',
        cashPrice: '',
        winnerName: '',
        winnerUrl: '',
        color: '#22c55e',
    },
    {
        title: 'AI/ML & CI',
        description: `
Develop intelligent systems using AI, Machine Learning, or Computational Intelligence to solve real-world problems efficiently. Teams should focus on building innovative solutions that demonstrate effective model development, training, and performance evaluation.
`,
        icon: React.createElement(FaRobot, { size: 52, className: "text-green-500" }),
        totalPrice: '10K',
        cashPrice: '3K',
        winnerName: '',
        winnerUrl: '',
        color: '#22c55e',
    },
    {
        title: 'IOT',
        description:
            'The IoT Track challenges participants to develop innovative solutions that connect the physical and digital worlds. Participants can build smart home systems, optimize industrial processes, enhance healthcare monitoring, or create intelligent environmental sensors. This track is all about leveraging IoT technology to make systems smarter, more efficient, and interconnected.',
        icon: React.createElement(FaMicrochip, { size: 52, className: "text-green-500" }),
        totalPrice: '10K',
        cashPrice: '3K',
        winnerName: '',
        winnerUrl: '',
        color: '#22c55e',
    },
    {
        title: 'Open Innovation',
        description:
            'The Open Innovation Track gives participants the freedom to think beyond boundaries and create solutions that address real-world challenges. Whether it’s developing groundbreaking applications, optimizing existing processes, or exploring unconventional ideas, this track is all about encouraging creativity, experimentation, and impactful problem-solving.',
        icon: React.createElement(FaLightbulb, { size: 52, className: "text-green-500" }),
        totalPrice: '10K',
        cashPrice: '3K',
        winnerName: '',
        winnerUrl: '',
        color: '#22c55e',
    },
    {
        title: 'Best Beginners Team',
        description: 'Awarded to the best performing team consisting of first-time participants.',
        icon: React.createElement(FaUsers, { size: 52, className: "text-green-500" }),
        totalPrice: '10K',
        cashPrice: '3K',
        winnerName: '',
        winnerUrl: '',
        color: '#22c55e',
    },
    {
        title: "People's Choice",
        description:
            'Given to the team that wins the most votes from the audience for their project.',
        icon: React.createElement(FaStar, { size: 52, className: "text-green-500" }),
        totalPrice: '10K',
        cashPrice: '3K',
        winnerName: '',
        winnerUrl: '',
        color: '#22c55e',
    },
    {
        title: 'Duality',
        description: `The Duality AI Track, sponsored by Duality, requires participants to develop AI-driven solutions addressing the official problem statement provided by Duality.
Problem Statement: https://drive.google.com/file/d/1_GEa24CdgSNaO8VYZ0U7hxatjIDSfnhW/view?usp=drivesdk
Prize: $100 for the winning team`,
        icon: React.createElement(FaGhost, { size: 52, className: "text-green-500" }),
        totalPrice: '',
        color: '#22c55e',
    },
    {
        title: 'AlgoRand',
        description: `The Algorand Track, sponsored by Algorand, requires participants to build Web3-based solutions on the Algorand ecosystem addressing the official problem statement provided by Algorand.
        Prize: $300 for top 3 winning teams`,
        icon: React.createElement(FaCoins, { size: 52, className: "text-green-500" }),
        totalPrice: '',
        color: '#22c55e',
    },
    // {
    //     title: 'Stellar',
    //     description: `The Stellar Track, sponsored by Stellar, requires participants to develop Web3 and blockchain-based solutions using the Stellar network addressing the official problem statement provided by Stellar.
    //     Prize: $50 for the winning team`,
    //     icon: React.createElement(FaCode, { size: 52, className: "text-green-500" }),
    //     totalPrice: '',
    //     color: '#22c55e',
    // },
    // {
    //     title: 'Stellar',
    //     description: 'Special track for Stellar. $100 for winner.',
    //     icon: React.createElement(FaCode, { size: 52, className: "text-green-500" }),
    //     totalPrice: '$100',
    //     color: '#22c55e',
    // },
    {
        title: 'Smolify AI',
        description: `The Smolify AI Track invites participants to build intelligent solutions using the Smolify AI platform. Teams must leverage Smolify’s AI capabilities to create applications that simplify complex tasks, automate workflows, or generate meaningful insights to solve real-world problems. 
        Prize: ₹3000 for the winning team`,
        icon: React.createElement(FaBrain, { size: 52, className: "text-green-500" }),
        totalPrice: '',
        color: '#22c55e',
    },
    {
        title: 'Requestly',
        description: `Use the Requestly API Client to build projects that demonstrate effective API testing through HTTP requests (GET, POST, etc.), handling authentication, and validating responses; submissions will be evaluated based on how efficiently teams use the API client to test endpoints, debug APIs, and structure their requests, and must include a short demo/video showing Requestly in action along with a brief write-up explaining its impact on the project. 
        Prize: $100 for the winning team`,
        icon: React.createElement(FaTools, { size: 52, className: "text-green-500" }),
        totalPrice: '',
        color: '#22c55e',
    },
];
