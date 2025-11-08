const express = require('express');
const path = require('path');
const app = express();

// Portfolio Website with Cybersecurity Blog
class SeekerPortfolio {
    constructor() {
        this.articles = JSON.parse(localStorage.getItem('cybersecurityArticles')) || [];
        this.currentSection = 'hero';
        this.typingMessages = [
            'Digital Wanderer',
            'Code Architect', 
            'Cybersecurity Researcher',
            'Privacy Advocate',
            'System Explorer'
        ];
        this.currentMessageIndex = 0;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startTypingAnimation();
        this.createBackgroundAnimation();
        this.setupScrollObserver();
        this.loadProjectCards();
        this.loadFloatingElements();
        this.setupContactPuzzle();
        this.setupBlogSection();
        this.checkForAdminAccess();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav__symbol').forEach(symbol => {
            symbol.addEventListener('click', (e) => {
                const target = e.target.dataset.target;
                this.scrollToSection(target);
            });
        });

        // Blog navigation
        const blogSymbol = document.createElement('span');
        blogSymbol.className = 'nav__symbol';
        blogSymbol.dataset.target = 'blog';
        blogSymbol.textContent = '◈';
        blogSymbol.addEventListener('click', (e) => {
            this.scrollToSection('blog');
        });
        document.querySelector('.nav__symbols').appendChild(blogSymbol);

        // Admin navigation
        const adminSymbol = document.createElement('span');
        adminSymbol.className = 'nav__symbol nav__symbol--admin';
        adminSymbol.dataset.target = 'admin';
        adminSymbol.textContent = '⚡';
        adminSymbol.style.display = 'none';
        adminSymbol.addEventListener('click', (e) => {
            this.scrollToSection('admin');
        });
        document.querySelector('.nav__symbols').appendChild(adminSymbol);

        // Orbs
        document.querySelectorAll('.orb').forEach((orb, index) => {
            orb.addEventListener('click', () => {
                this.triggerOrbEffect(orb, index);
            });
        });

        // Nav orb - secret admin access
        document.getElementById('navOrb').addEventListener('click', () => {
            this.handleNavOrbClick();
        });
    }

    scrollToSection(sectionName) {
        const section = document.getElementById(sectionName);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            this.currentSection = sectionName;
        }
    }

    startTypingAnimation() {
        const typingElement = document.getElementById('typingText');
        let messageIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typeWriter = () => {
            const currentMessage = this.typingMessages[messageIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentMessage.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentMessage.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentMessage.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                messageIndex = (messageIndex + 1) % this.typingMessages.length;
            }

            setTimeout(typeWriter, typeSpeed);
        };

        typeWriter();
    }

    createBackgroundAnimation() {
        let particles = [];
        let canvas, ctx;

        new p5(function(p) {
            p.setup = function() {
                canvas = p.createCanvas(p.windowWidth, p.windowHeight);
                canvas.parent('bgCanvas');
                canvas.id('p5Canvas');
                
                for (let i = 0; i < 50; i++) {
                    particles.push({
                        x: p.random(p.width),
                        y: p.random(p.height),
                        vx: p.random(-0.5, 0.5),
                        vy: p.random(-0.5, 0.5),
                        size: p.random(1, 3),
                        opacity: p.random(0.3, 0.8)
                    });
                }
            };

            p.draw = function() {
                p.clear();
                
                // Update and draw particles
                particles.forEach(particle => {
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    
                    // Wrap around screen
                    if (particle.x > p.width) particle.x = 0;
                    if (particle.x < 0) particle.x = p.width;
                    if (particle.y > p.height) particle.y = 0;
                    if (particle.y < 0) particle.y = p.height;
                    
                    p.fill(0, 245, 255, particle.opacity * 255);
                    p.noStroke();
                    p.circle(particle.x, particle.y, particle.size);
                });

                // Draw connections
                particles.forEach((particle, i) => {
                    particles.slice(i + 1).forEach(other => {
                        const distance = p.dist(particle.x, particle.y, other.x, other.y);
                        if (distance < 100) {
                            p.stroke(0, 245, 255, (1 - distance / 100) * 50);
                            p.strokeWeight(0.5);
                            p.line(particle.x, particle.y, other.x, other.y);
                        }
                    });
                });
            };

            p.windowResized = function() {
                p.resizeCanvas(p.windowWidth, p.windowHeight);
            };
        });
    }

    setupScrollObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.content-section').forEach(section => {
            observer.observe(section);
        });
    }

    loadProjectCards() {
        const projectGrid = document.getElementById('projectGrid');
        const projects = [
            {
                title: 'Neural Network Visualizer',
                description: 'Interactive visualization of artificial neural networks with real-time learning algorithms.',
                tech: ['JavaScript', 'P5.js', 'ML'],
                link: '#'
            },
            {
                title: 'Cryptographic Playground',
                description: 'Educational tool for exploring various encryption algorithms and cryptographic concepts.',
                tech: ['Python', 'Cryptography', 'Web'],
                link: '#'
            },
            {
                title: 'Quantum Computing Simulator',
                description: 'Browser-based quantum circuit simulator with educational quantum algorithms.',
                tech: ['JavaScript', 'Quantum', 'WebGL'],
                link: '#'
            }
        ];

        projectGrid.innerHTML = projects.map(project => `
            <div class="project-card">
                <h3 class="project-card__title">${project.title}</h3>
                <p class="project-card__description">${project.description}</p>
                <div class="project-card__tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    loadFloatingElements() {
        const container = document.getElementById('aboutElements');
        const symbols = ['⟨⟩', '∴', '◯', '△', '◇', '⟡', '⬢', '⟐'];
        
        symbols.forEach((symbol, index) => {
            const element = document.createElement('div');
            element.className = 'floating-element';
            element.textContent = symbol;
            element.style.left = `${Math.random() * 80 + 10}%`;
            element.style.top = `${Math.random() * 80 + 10}%`;
            element.style.animationDelay = `${index * 0.5}s`;
            element.style.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
            container.appendChild(element);
        });
    }

    setupContactPuzzle() {
        const puzzle = document.getElementById('contactPuzzle');
        const pieces = ['G', 'I', 'T', 'H', 'U', 'B', '@', 'M', 'E'];
        const solution = 'GITHUB@ME';
        let currentSequence = '';

        pieces.forEach((piece, index) => {
            const element = document.createElement('div');
            element.className = 'puzzle-piece';
            element.textContent = piece;
            element.addEventListener('click', () => {
                currentSequence += piece;
                element.classList.add('solved');
                
                if (currentSequence.length === solution.length) {
                    if (currentSequence === solution) {
                        this.showEasterEgg('🎉 Found me! Check GitHub! 🎉');
                    } else {
                        // Reset puzzle
                        setTimeout(() => {
                            currentSequence = '';
                            document.querySelectorAll('.puzzle-piece').forEach(p => {
                                p.classList.remove('solved');
                            });
                        }, 1000);
                    }
                }
            });
            puzzle.appendChild(element);
        });
    }

    setupBlogSection() {
        // Add blog section to main HTML
        const main = document.querySelector('.main');
        const blogSection = document.createElement('section');
        blogSection.className = 'content-section content-section--blog';
        blogSection.id = 'blog';
        blogSection.innerHTML = `
            <div class="section__container">
                <h2 class="section__title">◈ CYBER INSIGHTS</h2>
                <div class="blog-filters">
                    <button class="filter-btn active" data-filter="all">All</button>
                    <button class="filter-btn" data-filter="cybersecurity">Cybersecurity</button>
                    <button class="filter-btn" data-filter="privacy">Privacy</button>
                    <button class="filter-btn" data-filter="tools">Tools</button>
                </div>
                <div class="blog-grid" id="blogGrid">
                    <div class="no-articles">
                        <p>No articles published yet. Come back soon for cybersecurity insights!</p>
                    </div>
                </div>
            </div>
        `;
        
        // Insert before contact section
        const contactSection = document.getElementById('contact');
        main.insertBefore(blogSection, contactSection);

        // Add admin section
        const adminSection = document.createElement('section');
        adminSection.className = 'content-section content-section--admin';
        adminSection.id = 'admin';
        adminSection.style.display = 'none';
        adminSection.innerHTML = `
            <div class="section__container">
                <h2 class="section__title">⚡ ADMIN PORTAL</h2>
                <div class="admin-panel">
                    <form class="article-form" id="articleForm">
                        <div class="form-group">
                            <label for="articleTitle">Title</label>
                            <input type="text" id="articleTitle" required>
                        </div>
                        <div class="form-group">
                            <label for="articleCategory">Category</label>
                            <select id="articleCategory" required>
                                <option value="cybersecurity">Cybersecurity</option>
                                <option value="privacy">Privacy</option>
                                <option value="tools">Tools</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="articleSummary">Summary</label>
                            <textarea id="articleSummary" rows="3" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="articleContent">Content (Markdown supported)</label>
                            <textarea id="articleContent" rows="15" required></textarea>
                        </div>
                        <button type="submit" class="submit-btn">Publish Article</button>
                    </form>
                    <div class="article-management">
                        <h3>Manage Articles</h3>
                        <div class="article-list" id="adminArticleList"></div>
                    </div>
                </div>
            </div>
        `;
        main.appendChild(adminSection);

        this.setupBlogEventListeners();
        this.loadBlogArticles();
    }

    setupBlogEventListeners() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.filterArticles(e.target.dataset.filter);
            });
        });

        // Article form
        document.getElementById('articleForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.publishArticle();
        });
    }

    loadBlogArticles() {
        const blogGrid = document.getElementById('blogGrid');
        
        if (this.articles.length === 0) {
            blogGrid.innerHTML = '<div class="no-articles"><p>No articles published yet. Come back soon for cybersecurity insights!</p></div>';
            return;
        }

        blogGrid.innerHTML = this.articles.map(article => `
            <article class="blog-card" data-category="${article.category}">
                <div class="blog-card__header">
                    <span class="blog-card__category">${article.category}</span>
                    <span class="blog-card__date">${article.date}</span>
                </div>
                <h3 class="blog-card__title">${article.title}</h3>
                <p class="blog-card__summary">${article.summary}</p>
                <button class="read-more-btn" onclick="seekerPortfolio.openArticle(${article.id})">
                    Read More →
                </button>
            </article>
        `).join('');
    }

    filterArticles(category) {
        const articles = document.querySelectorAll('.blog-card');
        articles.forEach(article => {
            if (category === 'all' || article.dataset.category === category) {
                article.style.display = 'block';
            } else {
                article.style.display = 'none';
            }
        });
    }

    publishArticle() {
        const title = document.getElementById('articleTitle').value;
        const category = document.getElementById('articleCategory').value;
        const summary = document.getElementById('articleSummary').value;
        const content = document.getElementById('articleContent').value;

        const article = {
            id: Date.now(),
            title,
            category,
            summary,
            content,
            date: new Date().toLocaleDateString(),
            readTime: Math.ceil(content.split(' ').length / 200)
        };

        this.articles.unshift(article);
        localStorage.setItem('cybersecurityArticles', JSON.stringify(this.articles));
        
        this.loadBlogArticles();
        this.loadAdminArticleList();
        document.getElementById('articleForm').reset();
        
        this.showEasterEgg('Article published successfully! 🚀');
    }

    openArticle(id) {
        const article = this.articles.find(a => a.id === id);
        if (!article) return;

        // Create modal for full article
        const modal = document.createElement('div');
        modal.className = 'article-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${article.title}</h2>
                    <button class="close-btn" onclick="this.closest('.article-modal').remove()">×</button>
                </div>
                <div class="modal-meta">
                    <span class="category-tag">${article.category}</span>
                    <span class="date">${article.date}</span>
                    <span class="read-time">${article.readTime} min read</span>
                </div>
                <div class="modal-body">
                    <div class="article-content">${this.parseMarkdown(article.content)}</div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    parseMarkdown(text) {
        // Simple markdown parser
        return text
            .replace(/### (.*$)/gim, '<h3>$1</h3>')
            .replace(/## (.*$)/gim, '<h2>$1</h2>')
            .replace(/# (.*$)/gim, '<h1>$1</h1>')
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/`(.*?)`/gim, '<code>$1</code>')
            .replace(/\n/gim, '<br>');
    }

    handleNavOrbClick() {
        this.orbClickCount = (this.orbClickCount || 0) + 1;
        
        if (this.orbClickCount === 5) {
            this.enableAdminMode();
        }
    }

    enableAdminMode() {
        document.querySelector('.nav__symbol--admin').style.display = 'inline-block';
        document.getElementById('admin').style.display = 'block';
        this.showEasterEgg('Admin mode activated! ⚡');
        this.loadAdminArticleList();
    }

    checkForAdminAccess() {
        // Check if admin was previously enabled
        if (localStorage.getItem('adminEnabled') === 'true') {
            this.enableAdminMode();
        }
    }

    loadAdminArticleList() {
        const list = document.getElementById('adminArticleList');
        list.innerHTML = this.articles.map(article => `
            <div class="admin-article-item">
                <h4>${article.title}</h4>
                <p>Category: ${article.category} | Date: ${article.date}</p>
                <button onclick="seekerPortfolio.deleteArticle(${article.id})" class="delete-btn">Delete</button>
            </div>
        `).join('');
    }

    deleteArticle(id) {
        this.articles = this.articles.filter(a => a.id !== id);
        localStorage.setItem('cybersecurityArticles', JSON.stringify(this.articles));
        this.loadBlogArticles();
        this.loadAdminArticleList();
        this.showEasterEgg('Article deleted!');
    }

    triggerOrbEffect(orb, index) {
        anime({
            targets: orb,
            scale: [1, 1.5, 1],
            rotate: '360deg',
            duration: 600,
            easing: 'easeOutElastic(1, .8)'
        });
    }

    showEasterEgg(message) {
        const existing = document.querySelector('.easter-egg');
        if (existing) existing.remove();

        const easterEgg = document.createElement('div');
        easterEgg.className = 'easter-egg';
        easterEgg.innerHTML = `
            <div class="easter-egg__content">
                <span>✨</span>
                <span>${message}</span>
                <span>✨</span>
            </div>
        `;
        document.body.appendChild(easterEgg);

        setTimeout(() => easterEgg.classList.add('show'), 100);
        setTimeout(() => {
            easterEgg.classList.remove('show');
            setTimeout(() => easterEgg.remove(), 500);
        }, 3000);
    }
}

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.seekerPortfolio = new SeekerPortfolio();
});
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const posts = [
    {
        id: 1,
        title: "Welcome to our blog!",
        content: "This is our first post. Welcome everyone!",
        author: "admin",
        date: "2025-01-15"
    },
    {
        id: 2,
        title: "Tech Tips",
        content: "Here are some useful technology tips for beginners. Always keep your software updated!",
        author: "Some guy out there",
        date: "2025-01-20"
    },
    {
        id: 3,
        title: "Not the flag?",
        content: `Well luckily the content of the flag is hidden so here it is: ${FLAG}`,
        author: "admin",
        date: "2025-05-13"
    },
    {
        id: 5,
        title: "Did you know?",
        content: "This blog post site is pretty dope, right?",
        author: "???",
        date: "2025-06-20"
    },
];

app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/search', (req, res) => {
    const { query } = req.body;
    
    if (!query || typeof query !== 'string' || query.length !== 3) {
        return res.status(400).json({ 
            error: 'Query must be 3 characters.',
        });
    }

    const matchingPosts = posts
        .filter(post => 
            post.title.includes(query) ||
            post.content.includes(query) ||
            post.author.includes(query)
        )
        .map(post => ({
            ...post,
            content: post.content.replace(FLAG, '*'.repeat(FLAG.length))
    }));

    res.json({
        results: matchingPosts,
        count: matchingPosts.length,
        query: query
    });
});

app.get('/api/posts', (_, res) => {
    const publicPosts = posts.map(post => ({
        id: post.id,
        title: post.title,
        content: post.content.replace(FLAG, '*'.repeat(FLAG.length)),
        author: post.author,
        date: post.date
    }));
    
    res.json({
        posts: publicPosts,
        total: publicPosts.length
    });
});

app.use((_, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});