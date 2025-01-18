import { Github } from '@/components/icons';
import { GithubIcon } from 'lucide-react';
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-8">
      <div className="container px-4 mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold text-white">DocuForge</h2>
          <p className="text-sm mt-2">
            Simplifying Legal Needs in One Unified Platform
          </p>
        </div>

        {/* Developer Section */}
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h3 className="text-lg font-semibold text-white">Developed by:</h3>
          <a
            href="https://github.com/daffarafi"
            target="_blank"
            rel="noopener noreferrer"
            className="group transition underline flex items-center gap-2"
          >
            <Github
              fill="fill-gray-300 group-hover:fill-white "
              size="w-5 h-5"
            />
            <span className="group-hover:text-white">M. Daffa'I Rafi .P</span>
          </a>
          <a
            href="https://github.com/m-azzam-azis"
            target="_blank"
            rel="noopener noreferrer"
            className="group transition underline flex items-center gap-2"
          >
            <Github
              fill="fill-gray-300 group-hover:fill-white "
              size="w-5 h-5"
            />
            <span className="group-hover:text-white">M. Azzam Azis</span>
          </a>
          <a
            href="https://github.com/nabeel1209"
            target="_blank"
            rel="noopener noreferrer"
            className="group transition underline flex items-center gap-2"
          >
            <Github
              fill="fill-gray-300 group-hover:fill-white "
              size="w-5 h-5"
            />
            <span className="group-hover:text-white">Nabeel Muhammad</span>
          </a>
        </div>
      </div>
      {/* Copyright Section */}
      <div className="mt-8 text-center text-sm border-t border-gray-700 py-4">
        © {new Date().getFullYear()} DocuForge. All rights reserved.
      </div>
    </footer>
  );
};
