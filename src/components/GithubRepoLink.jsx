import React, { useState, useEffect } from 'react';
import { Github } from 'lucide-react';

const GithubRepoLink = () => {
  const [stars, setStars] = useState(0);

  useEffect(() => {
    fetch('https://api.github.com/repos/murali2277/zorvyn-forntend')
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count !== undefined) {
          setStars(data.stargazers_count);
        }
      })
      .catch((err) => console.error("Error fetching github stars", err));
  }, []);

  return (
    <a 
      href="https://github.com/murali2277/zorvyn-forntend"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 p-2 px-3 sm:px-4 rounded-full glass-layer border border-glass-border hover:bg-glass-hover transition-all active:scale-95 text-textPrimary no-underline outline-none"
      title="View on GitHub"
    >
      <Github className="w-5 h-5" />
      <span className="font-medium text-sm">{stars} Stars</span>
    </a>
  );
};

export default GithubRepoLink;
