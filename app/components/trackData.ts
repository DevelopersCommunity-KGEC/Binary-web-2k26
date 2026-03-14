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
            'Create innovative platforms and tools to revolutionize learning experiences and educational accessibility.',
        icon: React.createElement(FaGraduationCap, { size: 52, className: "text-green-500" }),
        totalPrice: '5K',
        cashPrice: '3K',
        winnerName: 'Oxymoron',
        winnerUrl: 'https://github.com/muskanagarwal-15/EduVox',
        color: '#22c55e',
    },
    {
        title: 'Health',
        description:
            'Build applications and systems to address healthcare challenges, patient care and medical technology.',
        icon: React.createElement(FaHeartbeat, { size: 52, className: "text-green-500" }),
        totalPrice: '5K',
        cashPrice: '3K',
        winnerName: 'Dholakpur Warriors',
        winnerUrl: 'https://github.com/parthib2004/learnlytic-assist',
        color: '#22c55e',
    },
    {
        title: 'Web3',
        description:
            'Explore Blockchain, Decentralized Applications and the future of internet technologies.',
        icon: React.createElement(FaCubes, { size: 52, className: "text-green-500" }),
        totalPrice: '5K',
        cashPrice: '3K',
        winnerName: 'Warlocks',
        winnerUrl: 'https://github.com/mansi0xc/Wizard-s-Gambit',
        color: '#22c55e',
    },
    {
        title: 'AI/ML & CI',
        description:
            'Develop intelligent systems using AI, ML, and Computational Intelligence for efficient problem-solving. To be eligible for this track, teams must integrate Weights & Biases for model training, experiment tracking, and performance visualization.',
        icon: React.createElement(FaRobot, { size: 52, className: "text-green-500" }),
        totalPrice: '5K',
        cashPrice: '3K',
        winnerName: 'ROME',
        winnerUrl: 'https://github.com/asengupta07/RuinsOfRome',
        color: '#22c55e',
    },
    {
        title: 'IOT',
        description:
            'Design and prototype innovative IOT solutions, embedded systems and robotics.',
        icon: React.createElement(FaMicrochip, { size: 52, className: "text-green-500" }),
        totalPrice: '5K',
        cashPrice: '3K',
        winnerName: 'Quantum Quokkas',
        winnerUrl: 'https://github.com/Arnab582004/Sign-language-detection-and-home-automation',
        color: '#22c55e',
    },
    {
        title: 'Open Innovation',
        description:
            'Create solutions for any problem statement of your choice using cutting-edge technologies.',
        icon: React.createElement(FaLightbulb, { size: 52, className: "text-green-500" }),
        totalPrice: '5K',
        cashPrice: '3K',
        winnerName: 'Skull Crushers',
        winnerUrl: 'https://github.com/SagnikBasak04/NeuralDetect',
        color: '#22c55e',
    },
    {
        title: 'Best Beginners Team',
        description: 'Awarded to the best performing team consisting of first-time participants.',
        icon: React.createElement(FaUsers, { size: 52, className: "text-green-500" }),
        totalPrice: '5K',
        cashPrice: '3K',
        winnerName: 'HardCode',
        winnerUrl: 'https://github.com/wraptalk/wraptalk',
        color: '#22c55e',
    },
    {
        title: "People's Choice",
        description:
            'Given to the team that wins the most votes from the audience for their project.',
        icon: React.createElement(FaStar, { size: 52, className: "text-green-500" }),
        totalPrice: '5K',
        cashPrice: '3K',
        winnerName: 'D.TECHtors',
        winnerUrl: 'https://github.com/Animeshghosh07/BINARY',
        color: '#22c55e',
    },
    {
        title: 'Duality',
        description: 'Special track for Duality. $100 for winner.',
        icon: React.createElement(FaGhost, { size: 52, className: "text-green-500" }),
        totalPrice: '$100',
        color: '#22c55e',
    },
    {
        title: 'AlgoRand',
        description: 'Special track for AlgoRand. $300 for top 3 winners.',
        icon: React.createElement(FaCoins, { size: 52, className: "text-green-500" }),
        totalPrice: '$300',
        color: '#22c55e',
    },
    {
        title: 'Stellar',
        description: 'Special track for Stellar. $100 for winner.',
        icon: React.createElement(FaCode, { size: 52, className: "text-green-500" }),
        totalPrice: '$100',
        color: '#22c55e',
    },
    {
        title: 'Smallify AI',
        description: 'Special track for Smallify AI. Rs 5000 worth for winner.',
        icon: React.createElement(FaBrain, { size: 52, className: "text-green-500" }),
        totalPrice: 'Rs 5000',
        color: '#22c55e',
    },
    {
        title: 'Requestly',
        description: 'Special track for Requestly. $50 for winner.',
        icon: React.createElement(FaTools, { size: 52, className: "text-green-500" }),
        totalPrice: '$50',
        color: '#22c55e',
    },
];
