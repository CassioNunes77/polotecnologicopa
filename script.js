// Script para a página do Polo Tecnológico de Paulo Afonso
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Inicializar AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // Navegação fixa ao rolar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Toggle do menu mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Botão voltar ao topo
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animação de contadores
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target.toLocaleString('pt-BR');
                }
            };
            updateCount();
        });
    };

    // Iniciar contadores quando estiverem visíveis
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('counter')) {
                    const target = +entry.target.getAttribute('data-target');
                    entry.target.innerText = '0';
                    const updateCount = () => {
                        const count = +entry.target.innerText;
                        const increment = target / speed;

                        if (count < target) {
                            entry.target.innerText = Math.ceil(count + increment);
                            setTimeout(updateCount, 1);
                        } else {
                            entry.target.innerText = target.toLocaleString('pt-BR');
                        }
                    };
                    updateCount();
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });

    // Inicializar mapas
    if (document.getElementById('map')) {
        const map = L.map('map').setView([-9.3983, -38.2159], 14);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Adicionar marcadores para pontos de infraestrutura
        const chesf = L.marker([-9.3983, -38.2159]).addTo(map);
        chesf.bindPopup("<b>Usina Hidrelétrica de Paulo Afonso</b><br>Fonte de energia limpa e renovável.");
        
        const ifba = L.marker([-9.4050, -38.2220]).addTo(map);
        ifba.bindPopup("<b>IFBA - Campus Paulo Afonso</b><br>Formação técnica e superior.");
        
        const uneb = L.marker([-9.4100, -38.2180]).addTo(map);
        uneb.bindPopup("<b>UNEB - Campus Paulo Afonso</b><br>Universidade Estadual da Bahia.");
        
        const centro = L.marker([-9.4000, -38.2100]).addTo(map);
        centro.bindPopup("<b>Centro Comercial</b><br>Área de comércio e serviços.");
    }

    if (document.getElementById('strategic-map')) {
        const strategicMap = L.map('strategic-map').setView([-9.3983, -38.2159], 7);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(strategicMap);

        // Adicionar marcador para Paulo Afonso
        const pauloAfonso = L.marker([-9.3983, -38.2159]).addTo(strategicMap);
        pauloAfonso.bindPopup("<b>Paulo Afonso</b><br>Polo Tecnológico do Nordeste");
        
        // Adicionar círculos de raio de distância
        L.circle([-9.3983, -38.2159], {
            color: 'blue',
            fillColor: '#30f',
            fillOpacity: 0.1,
            radius: 100000
        }).addTo(strategicMap);
        
        L.circle([-9.3983, -38.2159], {
            color: 'green',
            fillColor: '#3f0',
            fillOpacity: 0.1,
            radius: 200000
        }).addTo(strategicMap);
        
        L.circle([-9.3983, -38.2159], {
            color: 'orange',
            fillColor: '#f90',
            fillOpacity: 0.1,
            radius: 300000
        }).addTo(strategicMap);

        // Adicionar marcadores para cidades próximas
        const recife = L.marker([-8.0476, -34.8770]).addTo(strategicMap);
        recife.bindPopup("<b>Recife</b><br>430 km de Paulo Afonso");
        
        const salvador = L.marker([-12.9714, -38.5014]).addTo(strategicMap);
        salvador.bindPopup("<b>Salvador</b><br>460 km de Paulo Afonso");
        
        const aracaju = L.marker([-10.9472, -37.0731]).addTo(strategicMap);
        aracaju.bindPopup("<b>Aracaju</b><br>300 km de Paulo Afonso");
        
        const maceio = L.marker([-9.6498, -35.7089]).addTo(strategicMap);
        maceio.bindPopup("<b>Maceió</b><br>250 km de Paulo Afonso");
    }

    // Inicializar gráficos
    if (window.Chart) {
        // Gráfico de fibra óptica
        if (document.getElementById('fiberChart')) {
            const fiberCtx = document.getElementById('fiberChart').getContext('2d');
            const fiberChart = new Chart(fiberCtx, {
                type: 'line',
                data: {
                    labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
                    datasets: [{
                        label: 'Velocidade de Transmissão (Mbps)',
                        data: [10, 25, 40, 60, 80, 100, 150, 200],
                        backgroundColor: 'rgba(0, 86, 179, 0.2)',
                        borderColor: 'rgba(0, 86, 179, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(0, 86, 179, 1)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Gráfico de energia
        if (document.getElementById('energyChart')) {
            const energyCtx = document.getElementById('energyChart').getContext('2d');
            const energyChart = new Chart(energyCtx, {
                type: 'bar',
                data: {
                    labels: ['Paulo Afonso', 'Média Nordeste', 'Média Brasil'],
                    datasets: [{
                        label: 'Estabilidade de Fornecimento (%)',
                        data: [99.8, 97.5, 98.2],
                        backgroundColor: [
                            'rgba(0, 86, 179, 0.8)',
                            'rgba(255, 193, 7, 0.8)',
                            'rgba(108, 117, 125, 0.8)'
                        ],
                        borderColor: [
                            'rgba(0, 86, 179, 1)',
                            'rgba(255, 193, 7, 1)',
                            'rgba(108, 117, 125, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        }

        // Gráfico de formação acadêmica
        if (document.getElementById('educationChart')) {
            const educationCtx = document.getElementById('educationChart').getContext('2d');
            const educationChart = new Chart(educationCtx, {
                type: 'pie',
                data: {
                    labels: ['Ensino Superior', 'Ensino Técnico', 'Ensino Médio', 'Outros'],
                    datasets: [{
                        data: [30, 25, 35, 10],
                        backgroundColor: [
                            'rgba(0, 86, 179, 0.8)',
                            'rgba(0, 160, 227, 0.8)',
                            'rgba(255, 193, 7, 0.8)',
                            'rgba(108, 117, 125, 0.8)'
                        ],
                        borderColor: [
                            'rgba(0, 86, 179, 1)',
                            'rgba(0, 160, 227, 1)',
                            'rgba(255, 193, 7, 1)',
                            'rgba(108, 117, 125, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }

        // Gráfico de setores econômicos
        if (document.getElementById('sectorsChart')) {
            const sectorsCtx = document.getElementById('sectorsChart').getContext('2d');
            const sectorsChart = new Chart(sectorsCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Administração Pública', 'Comércio', 'Serviços', 'Outros'],
                    datasets: [{
                        data: [27.9, 27, 30.4, 14.7],
                        backgroundColor: [
                            'rgba(0, 86, 179, 0.8)',
                            'rgba(0, 160, 227, 0.8)',
                            'rgba(255, 193, 7, 0.8)',
                            'rgba(108, 117, 125, 0.8)'
                        ],
                        borderColor: [
                            'rgba(0, 86, 179, 1)',
                            'rgba(0, 160, 227, 1)',
                            'rgba(255, 193, 7, 1)',
                            'rgba(108, 117, 125, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }

        // Gráfico de custos comparativos
        if (document.getElementById('costsChart')) {
            const costsCtx = document.getElementById('costsChart').getContext('2d');
            const costsChart = new Chart(costsCtx, {
                type: 'bar',
                data: {
                    labels: ['Aluguel (m²)', 'Energia (kWh)', 'Mão de Obra', 'Impostos'],
                    datasets: [{
                        label: 'Paulo Afonso',
                        data: [25, 0.65, 2796, 15],
                        backgroundColor: 'rgba(0, 86, 179, 0.8)',
                        borderColor: 'rgba(0, 86, 179, 1)',
                        borderWidth: 1
                    }, {
                        label: 'Grandes Centros',
                        data: [60, 0.85, 3500, 25],
                        backgroundColor: 'rgba(255, 193, 7, 0.8)',
                        borderColor: 'rgba(255, 193, 7, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }

    // Calculadora de economia
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            const employees = parseInt(document.getElementById('employees').value) || 0;
            const space = parseInt(document.getElementById('space').value) || 0;
            const energy = parseInt(document.getElementById('energy').value) || 0;
            
            // Cálculo simplificado de economia
            const employeeSavings = employees * (3500 - 2796); // Diferença de salário médio
            const spaceSavings = space * (60 - 25); // Diferença de custo por m²
            const energySavings = energy * (0.85 - 0.65); // Diferença de custo por kWh
            
            const totalSavings = employeeSavings + spaceSavings + energySavings;
            
            document.getElementById('savings').innerText = totalSavings.toLocaleString('pt-BR');
        });
    }

    // Formulário de contato
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio de formulário
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerText;
            
            submitButton.innerText = 'Enviando...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
                contactForm.reset();
                submitButton.innerText = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }

    // Smooth scroll para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
